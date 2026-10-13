import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatEur } from '../lib/format'

test('formatEur usa formato español con punto de miles', () => {
  assert.equal(formatEur(61240.5), '61.240,50 €')
  assert.equal(formatEur(1200), '1.200,00 €')
  assert.equal(formatEur(0.5), '0,500000 €')
  assert.equal(formatEur(null), '—')
})
