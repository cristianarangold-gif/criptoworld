import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateRoute, getRoute, knownSlugs, resolveStep, type RouteStage } from '../lib/route-plan'

const known = { leccion: ['bitcoin'], guia: ['estafas-cripto'], herramienta: ['simulador-dca'], respuesta: ['declarar-si-no-he-vendido'], pagina: ['comparador-exchanges'] }

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
  assert.ok(flat.includes('herramienta:test-estafa'))
  assert.ok(flat.includes('herramienta:simulador-historico'))
})

test('resolveStep da título, enlace y minutos', () => {
  const r = resolveStep({ tipo: 'leccion', slug: 'bitcoin' })
  assert.equal(r.href, '/academia/bitcoin')
  assert.ok(r.title.length > 0)
  assert.ok(r.minutes > 0)
})

test('la ruta acepta pasos de tipo respuesta y los resuelve a /respuestas', () => {
  const ok: RouteStage[] = [{ titulo: 'A', descripcion: 'd', pasos: [{ tipo: 'respuesta', slug: 'declarar-si-no-he-vendido' }] }]
  assert.deepEqual(validateRoute(ok, known), [])
  const bad: RouteStage[] = [{ titulo: 'A', descripcion: 'd', pasos: [{ tipo: 'respuesta', slug: 'no-existe' }] }]
  assert.match(validateRoute(bad, known)[0], /respuesta «no-existe»/)
  const r = resolveStep({ tipo: 'respuesta', slug: 'declarar-si-no-he-vendido' })
  assert.equal(r.href, '/respuestas/declarar-si-no-he-vendido')
  assert.equal(r.minutes, 2)
  assert.match(r.title, /no he vendido/)
})

test('la etapa 3 de la ruta incluye la respuesta sobre declarar sin vender', () => {
  assert.ok(getRoute()[2].pasos.some(p => p.tipo === 'respuesta' && p.slug === 'declarar-si-no-he-vendido'))
})

test('la ruta acepta el paso de tipo página del comparador', () => {
  const ok: RouteStage[] = [{ titulo: 'A', descripcion: 'd', pasos: [{ tipo: 'pagina', slug: 'comparador-exchanges' }] }]
  assert.deepEqual(validateRoute(ok, known), [])
  const bad: RouteStage[] = [{ titulo: 'A', descripcion: 'd', pasos: [{ tipo: 'pagina', slug: 'no-existe' }] }]
  assert.equal(validateRoute(bad, known).length, 1)
  const r = resolveStep({ tipo: 'pagina', slug: 'comparador-exchanges' })
  assert.equal(r.href, '/comparador-exchanges')
  assert.equal(r.minutes, 5)
  assert.ok(getRoute()[1].pasos.some(p => p.tipo === 'pagina' && p.slug === 'comparador-exchanges'))
})
