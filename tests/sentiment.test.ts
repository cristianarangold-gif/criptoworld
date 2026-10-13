import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyFearGreed, parseFearGreed, toTickerItems } from '../lib/sentiment'
import type { CoinMarket } from '../lib/coingecko'

test('classifyFearGreed usa los rangos del índice', () => {
  assert.equal(classifyFearGreed(0), 'Miedo extremo')
  assert.equal(classifyFearGreed(24), 'Miedo extremo')
  assert.equal(classifyFearGreed(25), 'Miedo')
  assert.equal(classifyFearGreed(50), 'Neutral')
  assert.equal(classifyFearGreed(57), 'Codicia')
  assert.equal(classifyFearGreed(100), 'Codicia extrema')
})

test('parseFearGreed lee la respuesta de alternative.me', () => {
  assert.deepEqual(parseFearGreed({ data: [{ value: '57' }] }), { value: 57, label: 'Codicia' })
})

test('parseFearGreed devuelve null ante respuestas inválidas', () => {
  assert.equal(parseFearGreed({}), null)
  assert.equal(parseFearGreed(null), null)
  assert.equal(parseFearGreed({ data: [{ value: 'abc' }] }), null)
})

const coin = (i: number, price: number | null): CoinMarket =>
  ({ id: `c${i}`, symbol: `c${i}`, name: `C${i}`, image: '', current_price: price as number, market_cap: 0, market_cap_rank: i, total_volume: 0, price_change_percentage_24h: 1.5 })

test('toTickerItems devuelve 8 monedas en mayúsculas y omite las que no tienen precio', () => {
  const coins = [coin(1, null), ...Array.from({ length: 9 }, (_, i) => coin(i + 2, 100 + i))]
  const items = toTickerItems(coins)
  assert.equal(items.length, 8)
  assert.equal(items[0].symbol, 'C2')
  assert.deepEqual(items[0], { symbol: 'C2', price: 100, change: 1.5 })
})

test('toTickerItems omite las stablecoins, que no aportan información en la cinta', () => {
  const coins = [coin(1, 60000), { ...coin(2, 0.92), symbol: 'usdt' }, { ...coin(3, 0.92), symbol: 'usdc' }, coin(4, 2400)]
  assert.deepEqual(toTickerItems(coins).map(i => i.symbol), ['C1', 'C4'])
})
