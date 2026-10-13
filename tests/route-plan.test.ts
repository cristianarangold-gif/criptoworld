import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateRoute, getRoute, knownSlugs, resolveStep, type RouteStage } from '../lib/route-plan'

const known = { leccion: ['bitcoin'], guia: ['estafas-cripto'], herramienta: ['simulador-dca'] }

test('validateRoute acepta pasos existentes', () => {
  const stages: RouteStage[] = [{ titulo: 'A', descripcion: 'd', pasos: [{ tipo: 'leccion', slug: 'bitcoin' }, { tipo: 'guia', slug: 'estafas-cripto' }] }]
  assert.deepEqual(validateRoute(stages, known), [])
})

test('validateRoute nombra el slug que no existe', () => {
  const stages: RouteStage[] = [{ titulo: 'A', descripcion: 'd', pasos: [{ tipo: 'leccion', slug: 'no-existe' }] }]
  const errors = validateRoute(stages, known)
  assert.equal(errors.length, 1)
  assert.match(errors[0], /no-existe/)
})

test('la ruta real tiene 4 etapas válidas y los pasos del diseño', () => {
  const route = getRoute()
  assert.equal(route.length, 4)
  assert.deepEqual(validateRoute(route, knownSlugs()), [])
  const flat = route.flatMap(s => s.pasos.map(p => `${p.tipo}:${p.slug}`))
  assert.deepEqual(route[0].pasos.map(p => p.slug), ['bitcoin', 'blockchain', 'ethereum', 'stablecoin', 'altcoin'])
  assert.ok(flat.includes('guia:declarar-criptomonedas-hacienda'))
  assert.ok(flat.includes('herramienta:calculadora-impuestos-criptomonedas'))
  assert.ok(!flat.some(f => f.includes('test-estafa') || f.includes('simulador-historico')))
})

test('resolveStep da título, enlace y minutos', () => {
  const r = resolveStep({ tipo: 'leccion', slug: 'bitcoin' })
  assert.equal(r.href, '/academia/bitcoin')
  assert.ok(r.title.length > 0)
  assert.ok(r.minutes > 0)
})
