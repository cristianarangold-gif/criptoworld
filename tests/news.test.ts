import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { loadNews, getAllNews, validateNews, type NewsItem } from '../lib/news'
import { knownPaths } from '../lib/internal-links'

const FIX = 'tests/fixtures/noticias'
const today = new Date().toISOString().slice(0, 10)
const known = (items: NewsItem[]) => knownPaths(items.map(n => `/noticias/${n.slug}`))

test('loadNews lee, ordena por fecha (más reciente primero) y normaliza fechas', () => {
  const items = loadNews(FIX)
  assert.deepEqual(items.map(n => n.slug), ['ejemplo-dos', 'ejemplo-uno'])
  assert.equal(items[0].fecha, '2026-10-12')
  assert.ok(items[0].words >= 400)
})

test('las noticias de ejemplo son válidas', () => {
  const items = loadNews(FIX)
  assert.deepEqual(validateNews(items, known(items), today), [])
})

test('validateNews detecta cada error', () => {
  const base = loadNews(FIX)[0]
  const cases: [Partial<NewsItem>, RegExp][] = [
    [{ descripcion: 'x'.repeat(161) }, /descripci/],
    [{ fecha: '2999-01-01' }, /fecha/],
    [{ fuentes: [] }, /fuente/],
    [{ fuentes: [{ title: 'a', url: 'http://example.com' }] }, /fuente/],
    [{ body: base.body.replace('## Para entenderlo', '## Otra') }, /Para entenderlo/],
    [{ words: 399 }, /palabras/],
    [{ body: base.body + '\n[x](/aprende/no-existe)' }, /no-existe/],
    [{ relacionados: [{ title: 'x', href: '/academia/no-existe' }] }, /no-existe/],
    [{ titulo: '' }, /t[ií]tulo/],
  ]
  for (const [patch, re] of cases) {
    const item = { ...base, ...patch }
    const errors = validateNews([item], known([item]), today)
    assert.equal(errors.length, 1, `${JSON.stringify(patch).slice(0, 60)} → ${errors}`)
    assert.match(errors[0], re)
    assert.match(errors[0], new RegExp(base.slug))
  }
})

test('validateNews detecta slugs repetidos', () => {
  const [a] = loadNews(FIX)
  assert.match(validateNews([a, a], known([a]), today).join(), /repetid/)
})

test('un directorio sin noticias devuelve una lista vacía', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'noticias-'))
  fs.writeFileSync(path.join(dir, '.gitkeep'), '')
  assert.deepEqual(loadNews(dir), [])
})

test('las noticias publicadas son válidas', () => {
  const items = getAllNews()
  assert.deepEqual(validateNews(items, known(items), today), [])
})
