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

const coin = (symbol: string, price: number | null): CoinMarket =>
  ({ id: symbol, symbol, name: symbol, image: '', current_price: price as number, market_cap: 0, market_cap_rank: 0, total_volume: 0, price_change_percentage_24h: 1.5 })

test('toTickerItems solo muestra monedas conocidas, en mayúsculas, como mucho 8 y con precio', () => {
  const syms = ['btc', 'eth', 'xrp', 'bnb', 'sol', 'trx', 'doge', 'ada', 'link', 'avax']
  const items = toTickerItems([coin('btc', null), ...syms.slice(1).map((s, i) => coin(s, 100 + i))])
  assert.equal(items.length, 8)
  assert.deepEqual(items[0], { symbol: 'ETH', price: 100, change: 1.5 })
})

test('toTickerItems omite stablecoins y tokens poco conocidos aunque estén arriba por capitalización', () => {
  const coins = [coin('btc', 60000), coin('usdt', 0.92), coin('figr_heloc', 0.99), coin('usdc', 0.92), coin('eth', 2400)]
  assert.deepEqual(toTickerItems(coins).map(i => i.symbol), ['BTC', 'ETH'])
})
