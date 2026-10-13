import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getSiteStats } from '../lib/site-stats'

test('getSiteStats devuelve los recuentos reales', () => {
  assert.deepEqual(getSiteStats(), { lessons: 29, guides: 9, tools: 10 })
})
