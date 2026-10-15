import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseMarkets, maxDrawdownOf } from '../lib/coin-market'

test('parseMarkets indexa por id e ignora monedas sin precio', () => {
  const out = parseMarkets([
    { id: 'bitcoin', current_price: 70000, price_change_percentage_24h: -1.5, market_cap: 1.4e12, market_cap_rank: 1, circulating_supply: 2e7, max_supply: 21e6 },
    { id: 'roto', current_price: null },
    { id: 'ethereum', current_price: 2500, price_change_percentage_24h: 2, market_cap: 3e11, market_cap_rank: 2, circulating_supply: 1.2e8, max_supply: null },
  ])
  assert.deepEqual(Object.keys(out), ['bitcoin', 'ethereum'])
  assert.deepEqual(out.bitcoin, { price: 70000, change24h: -1.5, marketCap: 1.4e12, rank: 1, circulating: 2e7, maxSupply: 21e6 })
  assert.equal(out.ethereum.maxSupply, null)
})

test('parseMarkets devuelve {} ante respuestas no válidas', () => {
  assert.deepEqual(parseMarkets(null), {})
  assert.deepEqual(parseMarkets({ error: 'rate limit' }), {})
})

test('maxDrawdownOf calcula la peor caída desde un máximo', () => {
  assert.equal(maxDrawdownOf([100, 50, 200, 100]), -50)
  assert.equal(maxDrawdownOf([1]), 0)
  assert.equal(maxDrawdownOf([1, 2, 3]), 0)
})
