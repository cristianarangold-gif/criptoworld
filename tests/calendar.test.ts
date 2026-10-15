import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateCalendar, upcoming, past, getCalendar, CATEGORIAS, type Evento, type CalendarioFile } from '../lib/calendar'
import { knownPaths } from '../lib/known-paths'

const ev = (p: Partial<Evento> = {}): Evento => ({
  id: 'segundo-plazo-renta-2025',
  titulo: 'Segundo plazo de la Renta 2025',
  categoria: 'hacienda',
  inicio: '2026-11-05',
  aproximada: false,
  descripcion: 'Último día para pagar el segundo plazo si fraccionaste el pago.',
  enlace: { title: 'Cómo declarar', href: '/aprende/declarar-criptomonedas-hacienda' },
  fuente: { title: 'AEAT', url: 'https://sede.agenciatributaria.gob.es/' },
  ...p,
})
const file = (eventos: Evento[]): CalendarioFile => ({ revisado: '2026-10-15', eventos })
const known = knownPaths()

test('un evento correcto es válido', () => {
  assert.deepEqual(validateCalendar(file([ev()]), known), [])
})

test('validateCalendar detecta cada error', () => {
  const cases: [Evento[], RegExp][] = [
    [[ev({ inicio: '2026-13-40' })], /fecha/],
    [[ev({ fin: '2026-11-01' })], /fin/],
    [[ev({ fuente: { title: 'x', url: 'http://x.com' } })], /fuente/],
    [[ev({ enlace: { title: 'x', href: '/aprende/no-existe' } })], /no-existe/],
    [[ev({ categoria: 'mercado' as Evento['categoria'] })], /categor/],
    [[ev(), ev()], /repetid/],
    [[ev({ descripcion: '' })], /descripci/],
  ]
  for (const [eventos, re] of cases) {
    const errors = validateCalendar(file(eventos), known)
    assert.equal(errors.length, 1, `${re} → ${errors}`)
    assert.match(errors[0], re)
  }
})

test('upcoming incluye los rangos en curso y ordena por inicio; past va al revés', () => {
  const a = ev({ id: 'a', inicio: '2026-11-05' })
  const b = ev({ id: 'b', inicio: '2026-10-01', fin: '2026-10-31' })
  const c = ev({ id: 'c', inicio: '2026-09-01' })
  const d = ev({ id: 'd', inicio: '2026-08-01' })
  assert.deepEqual(upcoming([a, b, c, d], '2026-10-15').map(e => e.id), ['b', 'a'])
  assert.deepEqual(past([a, b, c, d], '2026-10-15').map(e => e.id), ['c', 'd'])
  assert.deepEqual(upcoming([b], '2026-10-31').map(e => e.id), ['b'])
  assert.deepEqual(upcoming([b], '2026-11-01'), [])
})

test('el calendario publicado es válido y tiene fechas futuras en cada categoría', () => {
  const cal = getCalendar()
  assert.deepEqual(validateCalendar(cal, knownPaths()), [])
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' })
  for (const c of CATEGORIAS) assert.ok(upcoming(cal.eventos, today).some(e => e.categoria === c), `sin fechas futuras: ${c}`)
})
