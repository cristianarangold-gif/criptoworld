import { test } from 'node:test'
import assert from 'node:assert/strict'
import fixture from './fixtures/exchanges.json'
import { entidadNames } from '../lib/cnmv'
import { comisionPublicada, porcentajeEfectivo, getExchanges, validateExchanges, matchesFilters, type ExchangesFile, type Plataforma } from '../lib/exchanges'

const today = '2026-10-16'
const base = fixture as ExchangesFile
const withP = (patch: Partial<Plataforma>): ExchangesFile => ({ ...base, plataformas: [{ ...base.plataformas[0], ...patch }] })

test('la plataforma de ejemplo es válida', () => {
  assert.deepEqual(validateExchanges(base, entidadNames(), today), [])
})

test('validateExchanges detecta cada error', () => {
  const c = base.plataformas[0].comisiones
  const cases: [ExchangesFile, RegExp][] = [
    [withP({ entidad: 'INVENTADA S.L.' }), /CNMV/],
    [withP({ comisiones: { ...c, compra_rapida: { ...c.compra_rapida, fuente: '' } } }), /compra_rapida/],
    [withP({ comisiones: { ...c, mercado_taker: { ...c.mercado_taker, fuente: 'http://x.com' } } }), /mercado_taker/],
    [withP({ comisiones: { ...c, deposito_eur: { ...c.deposito_eur, comprobado: '2999-01-01' } } }), /deposito_eur/],
    [withP({ comisiones: { ...c, retirada_eur: { ...c.retirada_eur, valor: '' } } }), /retirada_eur/],
    [withP({ pagos: ['sepa', 'cheque' as 'sepa'] }), /pago/],
    [withP({ destaca: '' }), /destaca/],
    [withP({ ojo: ' ' }), /ojo/],
    [{ ...base, revisado: 'ayer' }, /revisado/],
  ]
  for (const [file, re] of cases) {
    const errors = validateExchanges(file, entidadNames(), today)
    assert.equal(errors.length, 1, `${re} → ${errors}`)
    assert.match(errors[0], re)
  }
})

test('validateExchanges detecta slugs repetidos', () => {
  const p = base.plataformas[0]
  assert.match(validateExchanges({ ...base, plataformas: [p, p] }, entidadNames(), today).join(), /repetid/)
})

test('el comparador tiene las 12 plataformas, válidas y en orden alfabético', () => {
  const file = getExchanges()
  assert.deepEqual(validateExchanges(file, entidadNames(), new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' })), [])
  assert.deepEqual([...file.plataformas.map(p => p.slug)].sort(), ['bit2me', 'bitpanda', 'bitvavo', 'bybit', 'coinbase', 'criptan', 'cryptocom', 'etoro', 'kraken', 'okx', 'revolut', 'trade-republic'])
  const names = file.plataformas.map(p => p.nombre)
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, 'es')))
})

test('matchesFilters exige todos los filtros y trata null como «no cumple»', () => {
  const p = base.plataformas[0]
  assert.equal(matchesFilters(p, []), true)
  assert.equal(matchesFilters(p, ['tarjeta']), true)
  assert.equal(matchesFilters(p, ['bizum']), false)
  assert.equal(matchesFilters(p, ['wallet']), true)
  assert.equal(matchesFilters(p, ['staking']), false)
  assert.equal(matchesFilters(p, ['espanol', 'wallet']), true)
  assert.equal(matchesFilters({ ...p, retirada_wallet: false }, ['wallet']), false)
})

test('comisionPublicada aplica el porcentaje, el mínimo y la parte fija, y redondea a céntimos', () => {
  assert.equal(comisionPublicada({ porcentaje: 0.25, minimo: 0, fijo: 0 }, 100), 0.25)
  assert.equal(comisionPublicada({ porcentaje: 0.99, minimo: 0.99, fijo: 0 }, 50), 0.99)
  assert.equal(comisionPublicada({ porcentaje: 0.99, minimo: 0.99, fijo: 0 }, 200), 1.98)
  assert.equal(comisionPublicada({ porcentaje: 0, minimo: 0, fijo: 1 }, 10), 1)
  assert.equal(comisionPublicada({ porcentaje: 1, minimo: 0, fijo: 1 }, 33.33), 1.33)
  assert.equal(comisionPublicada(null, 100), null)
})

test('validateExchanges exige coste_compra coherente con la comisión publicada', () => {
  const c = base.plataformas[0].comisiones
  const conValor = (valor: string) => ({ ...c, compra_rapida: { ...c.compra_rapida, valor } })
  const cases: [ExchangesFile, RegExp][] = [
    [withP({ coste_compra: { formula: null, nota: ' ' } }), /nota/],
    [withP({ coste_compra: { formula: { porcentaje: 1, minimo: 0, fijo: 0 }, nota: '' } }), /nota/],
    [withP({ coste_compra: { formula: { porcentaje: 11, minimo: 0, fijo: 0 }, nota: 'x' }, comisiones: conValor('11 %') }), /porcentaje/],
    [withP({ coste_compra: { formula: { porcentaje: 0, minimo: 0, fijo: 0 }, nota: 'x' } }), /sin coste/],
    [withP({ comisiones: conValor('2 %') }), /1 %/],
    [withP({ coste_compra: { formula: { porcentaje: 0, minimo: 0, fijo: 1 }, nota: 'x' } }), /1 €/],
  ]
  for (const [file, re] of cases) assert.match(validateExchanges(file, entidadNames(), today).join(), re)
})

test('la comisión publicada de 100 € coincide con las tarifas revisadas', () => {
  const coste = Object.fromEntries(getExchanges().plataformas.map(p => [p.slug, comisionPublicada(p.coste_compra.formula, 100)]))
  assert.deepEqual(coste, {
    bit2me: 0.95, bitpanda: 0.99, bitvavo: 0.25, bybit: null, coinbase: null, criptan: 0.99,
    cryptocom: 0.8, etoro: 1, kraken: 1, okx: null, revolut: null, 'trade-republic': 1,
  })
})

test('porcentajeEfectivo no arrastra el redondeo de los céntimos', () => {
  assert.equal(porcentajeEfectivo({ porcentaje: 0.25, minimo: 0, fijo: 0 }, 50), 0.25)
  assert.equal(porcentajeEfectivo({ porcentaje: 0.99, minimo: 0.99, fijo: 0 }, 50), 1.98)
  assert.equal(porcentajeEfectivo({ porcentaje: 0, minimo: 0, fijo: 1 }, 10), 10)
})
