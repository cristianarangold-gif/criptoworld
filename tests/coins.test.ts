import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadCoins, getAllCoins, validateCoins, type Coin } from '../lib/coins'
import { knownPaths } from '../lib/known-paths'
import { HISTORY } from '../lib/historical'
import { getAllLessons } from '../lib/academia-data'

const FIX = 'tests/fixtures/criptos'
const hist = Object.keys(HISTORY.monedas)
const lessons = getAllLessons().map(l => l.slug)
const check = (items: Coin[]) => validateCoins(items, knownPaths(items.map(c => `/cripto/${c.slug}`)), hist, lessons)

test('la ficha de ejemplo se lee y es válida', () => {
  const items = loadCoins(FIX)
  assert.equal(items.length, 1)
  assert.equal(items[0].updated, '2026-10-15')
  assert.equal(items[0].lanzamiento, '2009')
  assert.deepEqual(check(items), [])
})

test('validateCoins detecta cada error', () => {
  const base = loadCoins(FIX)[0]
  const cases: [Partial<Coin>, RegExp][] = [
    [{ body: base.body.replace('## Riesgos concretos', '## Riesgos') }, /Riesgos concretos/],
    [{ words: 699 }, /palabras/],
    [{ descripcion: 'x'.repeat(161) }, /descripci/],
    [{ sources: [] }, /fuente/],
    [{ coingecko: '' }, /coingecko/],
    [{ historico: 'nope' }, /hist/],
    [{ leccion: 'no-existe' }, /lecci/],
    [{ body: base.body + ' [x](/aprende/no-existe)' }, /no-existe/],
  ]
  for (const [patch, re] of cases) {
    const errors = check([{ ...base, ...patch }])
    assert.equal(errors.length, 1, `${JSON.stringify(patch).slice(0, 50)} → ${errors}`)
    assert.match(errors[0], re)
  }
})

test('validateCoins detecta slugs y coingecko repetidos', () => {
  const [a] = loadCoins(FIX)
  assert.match(check([a, a]).join(), /repetid/)
  assert.match(check([a, { ...a, slug: 'otra' }]).join(), /coingecko repetido/)
})

test('las fichas publicadas son válidas', () => {
  assert.deepEqual(check(getAllCoins()), [])
})
