import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatEur, countUpValue } from '../lib/format'

test('formatEur usa formato español con punto de miles', () => {
  assert.equal(formatEur(61240.5), '61.240,50 €')
  assert.equal(formatEur(1200), '1.200,00 €')
  assert.equal(formatEur(0.5), '0,500000 €')
  assert.equal(formatEur(null), '—')
})

test('countUpValue no da negativos si el primer fotograma es anterior al inicio', () => {
  assert.equal(countUpValue(29, -16, 1200), 0)
})

test('countUpValue empieza en 0, sube y termina en el valor exacto', () => {
  assert.equal(countUpValue(29, 0, 1200), 0)
  assert.equal(countUpValue(29, 600, 1200), 25)
  assert.equal(countUpValue(29, 1200, 1200), 29)
  assert.equal(countUpValue(29, 5000, 1200), 29)
})
