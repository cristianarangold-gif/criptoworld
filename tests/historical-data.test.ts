import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HISTORY, getHistory, pickInitialCoin } from '../lib/historical'

const IDS = ['btc', 'eth', 'bnb', 'sol', 'xrp', 'ada', 'doge', 'link', 'trx', 'avax', 'dot', 'ltc']
const next = (m: string) => {
  const [y, mo] = m.split('-').map(Number)
  return mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`
}

test('las 12 monedas están y sus meses son consecutivos, con precios positivos', () => {
  assert.deepEqual(Object.keys(HISTORY.monedas).sort(), [...IDS].sort())
  for (const id of IDS) {
    const h = getHistory(id)
    assert.ok(h.length >= 60, `${id}: ${h.length} meses`)
    assert.equal(h[0].month, HISTORY.monedas[id].desde, id)
    for (let i = 1; i < h.length; i++) assert.equal(h[i].month, next(h[i - 1].month), `${id} ${h[i].month}`)
    assert.ok(h.every(p => p.price > 0), id)
  }
})

test('BTC empieza en 2017-08 o antes y su cierre de 2021-10 es razonable', () => {
  const h = getHistory('btc')
  assert.ok(h[0].month <= '2017-08')
  const oct21 = h.find(p => p.month === '2021-10')!
  assert.ok(oct21.price > 45000 && oct21.price < 60000, String(oct21.price))
})

test('actualizado es una fecha válida y el último mes ya está cerrado', () => {
  assert.match(HISTORY.actualizado, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(!isNaN(Date.parse(HISTORY.actualizado)))
  const last = getHistory('btc').at(-1)!.month
  assert.ok(last < HISTORY.actualizado.slice(0, 7))
})

test('una moneda desconocida devuelve una lista vacía', () => {
  assert.deepEqual(getHistory('nope'), [])
})

test('pickInitialCoin acepta ids existentes sin distinguir mayúsculas y si no, usa BTC', () => {
  assert.equal(pickInitialCoin(['btc', 'sol'], 'SOL'), 'sol')
  assert.equal(pickInitialCoin(['btc'], 'xyz'), 'btc')
  assert.equal(pickInitialCoin(['btc'], undefined), 'btc')
})
