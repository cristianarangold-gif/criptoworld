import { test } from 'node:test'
import assert from 'node:assert/strict'
import { backtest } from '../lib/backtest'
import { getHistory } from '../lib/historical'

const S = [
  { month: '2020-01', price: 100 },
  { month: '2020-02', price: 50 },
  { month: '2020-03', price: 200 },
]
const ok = (r: ReturnType<typeof backtest>) => {
  if ('error' in r) throw new Error(r.error)
  return r
}
const close = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`)

test('todo de golpe: valor, rentabilidad y peor caída', () => {
  const r = ok(backtest(S, { mode: 'lump', amount: 100, from: '2020-01', to: '2020-03' }))
  close(r.invested, 100)
  close(r.value, 200)
  close(r.profit, 100)
  close(r.roi, 100)
  close(r.maxDrawdown.pct, -50)
  close(r.maxDrawdown.eur, -50)
  assert.deepEqual(r.series.map(p => p.value), [100, 50, 200])
})

test('DCA mensual: aporta cada mes, ambos extremos incluidos', () => {
  const r = ok(backtest(S, { mode: 'dca', amount: 100, from: '2020-01', to: '2020-03' }))
  close(r.invested, 300)
  close(r.value, 700) // 1 + 2 + 0,5 unidades × 200
  assert.deepEqual(r.series.map(p => p.invested), [100, 200, 300])
})

test('el periodo puede acabar antes del último mes de la serie', () => {
  const r = ok(backtest(S, { mode: 'lump', amount: 100, from: '2020-01', to: '2020-02' }))
  close(r.value, 50)
  close(r.roi, -50)
})

test('errores: mes final anterior al inicial y meses sin datos', () => {
  assert.deepEqual(backtest(S, { mode: 'lump', amount: 100, from: '2020-03', to: '2020-01' }), {
    error: 'El mes final es anterior al inicial',
  })
  assert.deepEqual(backtest(S, { mode: 'lump', amount: 100, from: '2019-12', to: '2020-03' }), {
    error: 'No hay datos de esta moneda para ese periodo',
  })
  assert.deepEqual(backtest(S, { mode: 'dca', amount: 100, from: '2020-01', to: '2020-04' }), {
    error: 'No hay datos de esta moneda para ese periodo',
  })
})

test('caso real: BTC, 1.000 € de golpe de 2021-01 a 2022-12', () => {
  const h = getHistory('btc')
  const p0 = h.find(p => p.month === '2021-01')!.price
  const p1 = h.find(p => p.month === '2022-12')!.price
  const r = ok(backtest(h, { mode: 'lump', amount: 1000, from: '2021-01', to: '2022-12' }))
  close(r.value, (1000 / p0) * p1)
  const slice = h.filter(p => p.month >= '2021-01' && p.month <= '2022-12').map(p => p.price)
  let peak = 0, worst = 0
  for (const p of slice) { peak = Math.max(peak, p); worst = Math.min(worst, p / peak - 1) }
  close(r.maxDrawdown.pct, worst * 100)
})
