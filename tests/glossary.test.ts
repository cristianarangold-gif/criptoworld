import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseGlossary, termSlug, getGlossary } from '../lib/glossary'
import { getAllLessons } from '../lib/academia-data'

const SAMPLE = `Introducción que se ignora.

### Halving
Evento que reduce a la mitad la recompensa de minería de Bitcoin.

Lección: bitcoin

### Pérdida impermanente
Diferencia entre aportar liquidez a un pool y mantener los tokens.
Ocurre cuando los precios se separan.
`

test('parseGlossary lee términos, definiciones y lección', () => {
  const terms = parseGlossary(SAMPLE)
  assert.equal(terms.length, 2)
  assert.deepEqual(terms[0], { term: 'Halving', slug: 'halving', definition: 'Evento que reduce a la mitad la recompensa de minería de Bitcoin.', lesson: 'bitcoin' })
  assert.equal(terms[1].slug, 'perdida-impermanente')
  assert.equal(terms[1].definition, 'Diferencia entre aportar liquidez a un pool y mantener los tokens. Ocurre cuando los precios se separan.')
  assert.equal(terms[1].lesson, undefined)
})

test('termSlug normaliza acentos y espacios', () => {
  assert.equal(termSlug('Pérdida impermanente'), 'perdida-impermanente')
  assert.equal(termSlug('KYC (Know Your Customer)'), 'kyc-know-your-customer')
})

test('el glosario real no tiene slugs repetidos y tiene al menos 140 términos', () => {
  const g = getGlossary()
  assert.ok(g.length >= 140, `solo ${g.length} términos`)
  const slugs = g.map(t => t.slug)
  assert.equal(new Set(slugs).size, slugs.length, 'slugs repetidos')
})

test('toda lección enlazada desde el glosario existe', () => {
  const lessons = new Set(getAllLessons().map(l => l.slug))
  const missing = getGlossary().filter(t => t.lesson && !lessons.has(t.lesson)).map(t => `${t.term} → ${t.lesson}`)
  assert.deepEqual(missing, [])
})

test('todo término de los glosarios de las lecciones está en el glosario', () => {
  const slugs = new Set(getGlossary().map(t => t.slug))
  const missing = getAllLessons().flatMap(l => Object.keys(l.glossary)).map(termSlug).filter(s => !slugs.has(s))
  assert.deepEqual([...new Set(missing)], [])
})
