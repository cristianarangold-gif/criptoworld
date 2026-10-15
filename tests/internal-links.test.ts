import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractInternalLinks, knownPaths } from '../lib/internal-links'

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
