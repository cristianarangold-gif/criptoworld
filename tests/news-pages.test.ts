import { test } from 'node:test'
import assert from 'node:assert/strict'
import { paginate } from '../lib/news'

const arr = Array.from({ length: 25 }, (_, i) => i)

test('paginate reparte de 12 en 12', () => {
  const p3 = paginate(arr, 3)!
  assert.equal(p3.pages, 3)
  assert.deepEqual(p3.items, [24])
  assert.deepEqual(paginate(arr, 1)!.items.length, 12)
})

test('paginate rechaza páginas fuera de rango o no enteras', () => {
  for (const p of [4, 0, 1.5, NaN, -1]) assert.equal(paginate(arr, p), null, String(p))
})

test('sin elementos, la página 1 existe y está vacía', () => {
  assert.deepEqual(paginate([], 1), { items: [], page: 1, pages: 1 })
  assert.equal(paginate([], 2), null)
})
