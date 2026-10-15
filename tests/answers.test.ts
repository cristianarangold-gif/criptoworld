import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadAnswers, getAllAnswers, validateAnswers, type Answer } from '../lib/answers'
import { knownPaths } from '../lib/internal-links'

const FIX = 'tests/fixtures/respuestas'
const known = (items: Answer[]) => knownPaths(items.map(a => `/respuestas/${a.slug}`))
const words = (n: number) => Array(n).fill('palabra').join(' ')

test('la respuesta de ejemplo se lee y es válida', () => {
  const items = loadAnswers(FIX)
  assert.equal(items.length, 1)
  assert.equal(items[0].updated, '2026-10-15')
  assert.deepEqual(validateAnswers(items, known(items)), [])
})

test('validateAnswers detecta cada error', () => {
  const base = loadAnswers(FIX)[0]
  const cases: [Partial<Answer>, RegExp][] = [
    [{ corta: words(24) }, /corta/],
    [{ corta: words(71) }, /corta/],
    [{ categoria: 'otra' as Answer['categoria'] }, /categor/],
    [{ sources: [{ title: 'x', url: 'https://cointelegraph.com/a' }] }, /oficial/],
    [{ words: 299 }, /palabras/],
    [{ body: base.body + ' [x](/aprende/no-existe)' }, /no-existe/],
    [{ pregunta: '' }, /pregunta/],
    [{ descripcion: 'x'.repeat(161) }, /descripci/],
  ]
  for (const [patch, re] of cases) {
    const item = { ...base, ...patch }
    const errors = validateAnswers([item], known([item]))
    assert.equal(errors.length, 1, `${JSON.stringify(patch).slice(0, 50)} → ${errors}`)
    assert.match(errors[0], re)
  }
})

test('validateAnswers acepta subdominios oficiales y detecta slugs repetidos', () => {
  const [a] = loadAnswers(FIX)
  assert.deepEqual(validateAnswers([{ ...a, sources: [{ title: 'BOE', url: 'https://www.boe.es/x' }] }], known([a])), [])
  assert.match(validateAnswers([a, a], known([a])).join(), /repetid/)
})

test('las respuestas publicadas son válidas', () => {
  const items = getAllAnswers()
  assert.deepEqual(validateAnswers(items, known(items)), [])
})
