import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { isoWeek, weekRange, loadDigests, getAllDigests, validateDigests, type Digest } from '../lib/digests'
import { knownPaths } from '../lib/known-paths'

const FIX = 'tests/fixtures/resumenes'
const today = '2026-10-20'
const known = (items: Digest[]) => knownPaths(items.map(d => `/resumen-semanal/${d.slug}`))

test('isoWeek y weekRange calculan la semana ISO, también en el cambio de año', () => {
  assert.deepEqual(isoWeek('2026-10-12'), { year: 2026, week: 42 })
  assert.deepEqual(isoWeek('2026-10-18'), { year: 2026, week: 42 })
  assert.deepEqual(weekRange(2026, 42), { inicio: '2026-10-12', fin: '2026-10-18' })
  assert.deepEqual(isoWeek('2026-12-28'), { year: 2026, week: 53 })
  assert.deepEqual(isoWeek('2027-01-03'), { year: 2026, week: 53 })
  assert.deepEqual(isoWeek('2027-01-04'), { year: 2027, week: 1 })
  assert.deepEqual(weekRange(2027, 1), { inicio: '2027-01-04', fin: '2027-01-10' })
})

test('el resumen de ejemplo se lee y es válido', () => {
  const items = loadDigests(FIX)
  assert.equal(items.length, 1)
  assert.equal(items[0].inicio, '2026-10-12')
  assert.deepEqual(validateDigests(items, known(items), today), [])
})

test('validateDigests detecta cada error', () => {
  const base = loadDigests(FIX)[0]
  const cases: [Partial<Digest>, RegExp][] = [
    [{ slug: '2026-sem-42' }, /slug/],
    [{ inicio: '2026-10-13', fin: '2026-10-19' }, /lunes|semana/],
    [{ fin: '2026-10-17' }, /fin/],
    [{ publicado: '2999-01-01' }, /fecha/],
    [{ body: base.body.replace('## Próximas fechas', '## Fechas') }, /Próximas fechas/],
    [{ words: 399 }, /palabras/],
    [{ fuentes: [{ title: 'x', url: 'http://x.com' }] }, /fuente/],
    [{ body: base.body + ' [x](/aprende/no-existe)' }, /no-existe/],
    [{ descripcion: 'x'.repeat(161) }, /descripci/],
  ]
  for (const [patch, re] of cases) {
    const item = { ...base, ...patch }
    const errors = validateDigests([item], known([item]), today)
    assert.equal(errors.length, 1, `${JSON.stringify(patch).slice(0, 50)} → ${errors}`)
    assert.match(errors[0], re)
  }
  assert.match(validateDigests([base, base], known([base]), today).join(), /repetid/)
})

test('un directorio vacío no falla', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'resumenes-'))
  assert.deepEqual(loadDigests(dir), [])
})

test('los resúmenes publicados son válidos', () => {
  const items = getAllDigests()
  assert.deepEqual(validateDigests(items, known(items), new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' })), [])
})
