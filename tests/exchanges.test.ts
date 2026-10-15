import { test } from 'node:test'
import assert from 'node:assert/strict'
import cnmv from '../data/cnmv-psc.json'
import fixture from './fixtures/exchanges.json'
import { getExchanges, validateExchanges, matchesFilters, type ExchangesFile, type Plataforma } from '../lib/exchanges'

test('la instantánea de la CNMV tiene la lista completa y una fecha válida', () => {
  assert.ok(cnmv.entidades.length >= 150, String(cnmv.entidades.length))
  assert.equal(new Set(cnmv.entidades).size, cnmv.entidades.length)
  assert.match(cnmv.fecha, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(cnmv.url.startsWith('https://'))
  for (const e of ['BITCOINFORME, S.L. (BIT2ME)', 'COINBASE LUXEMBOURG S.A.']) assert.ok(cnmv.entidades.includes(e), e)
})

const today = '2026-10-16'
const base = fixture as ExchangesFile
const withP = (patch: Partial<Plataforma>): ExchangesFile => ({ ...base, plataformas: [{ ...base.plataformas[0], ...patch }] })

test('la plataforma de ejemplo es válida', () => {
  assert.deepEqual(validateExchanges(base, cnmv.entidades, today), [])
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
    const errors = validateExchanges(file, cnmv.entidades, today)
    assert.equal(errors.length, 1, `${re} → ${errors}`)
    assert.match(errors[0], re)
  }
})

test('validateExchanges detecta slugs repetidos', () => {
  const p = base.plataformas[0]
  assert.match(validateExchanges({ ...base, plataformas: [p, p] }, cnmv.entidades, today).join(), /repetid/)
})

test('el comparador tiene las 12 plataformas, válidas y en orden alfabético', () => {
  const file = getExchanges()
  assert.deepEqual(validateExchanges(file, cnmv.entidades, new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' })), [])
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
