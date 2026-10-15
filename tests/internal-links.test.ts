import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractInternalLinks } from '../lib/internal-links'
import { knownPaths } from '../lib/known-paths'

test('extractInternalLinks devuelve rutas internas sin ancla ni barra final', () => {
  assert.deepEqual(
    extractInternalLinks('[a](/glosario#gas) [b](https://x.com) [c](/aprende/estafas-cripto/) [d](/)'),
    ['/glosario', '/aprende/estafas-cripto', '/']
  )
})

test('knownPaths conoce lecciones, guías, herramientas y páginas fijas', () => {
  const k = knownPaths()
  for (const p of ['/', '/academia/bitcoin', '/aprende/estafas-cripto', '/herramientas/test-estafa', '/glosario', '/noticias', '/respuestas', '/privacidad'])
    assert.ok(k.has(p), p)
  assert.ok(!k.has('/aprende/no-existe'))
})

test('knownPaths añade rutas extra', () => {
  assert.ok(knownPaths(['/noticias/x']).has('/noticias/x'))
})

test('knownPaths incluye las respuestas, las noticias y las fichas', () => {
  const k = knownPaths()
  assert.ok(k.has('/respuestas/tributacion-staking'))
  assert.ok(k.has('/cripto'))
})
