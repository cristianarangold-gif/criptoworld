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

import { toIcs, googleCalendarUrl } from '../lib/calendar'

const unfold = (ics: string) => ics.replace(/\r\n /g, '')

test('toIcs genera un VCALENDAR válido con eventos de día completo', () => {
  const ics = toIcs([ev(), ev({ id: 'modelo-721', inicio: '2027-01-01', fin: '2027-03-31' })], { name: 'CriptoMundo', url: 'https://criptoworld.org/calendario' })
  assert.ok(ics.startsWith('BEGIN:VCALENDAR\r\nVERSION:2.0\r\n'))
  assert.match(ics, /PRODID:/)
  assert.match(ics, /X-WR-CALNAME:CriptoMundo/)
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 2)
  assert.match(ics, /DTSTART;VALUE=DATE:20261105\r\nDTEND;VALUE=DATE:20261106/)
  assert.match(ics, /DTSTART;VALUE=DATE:20270101\r\nDTEND;VALUE=DATE:20270401/)
  assert.match(ics, /UID:segundo-plazo-renta-2025@criptoworld\.org/)
  assert.ok(ics.endsWith('END:VCALENDAR\r\n'))
  assert.ok(!/[^\r]\n/.test(ics), 'todas las líneas terminan en CRLF')
})

test('toIcs escapa comas, punto y coma y saltos de línea, y pliega líneas largas sin romper UTF-8', () => {
  const long = 'Árbol, raíz; y más\nsegunda línea ' + 'ñandú '.repeat(30)
  const ics = toIcs([ev({ descripcion: long, aproximada: true })], { name: 'X', url: 'https://criptoworld.org/calendario' })
  for (const line of ics.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75, `línea de ${Buffer.byteLength(line, 'utf8')} octetos`)
  const desc = unfold(ics).match(/DESCRIPTION:(.*)/)![1]
  assert.ok(desc.includes('Árbol\\, raíz\; y más\\nsegunda línea'))
  assert.ok(desc.includes('Fecha aproximada'))
  assert.ok(desc.includes('ñandú ñandú'))
})

test('googleCalendarUrl usa la plantilla con fechas de día completo', () => {
  const u = new URL(googleCalendarUrl(ev({ fin: '2026-11-06' }), 'https://criptoworld.org/calendario'))
  assert.equal(u.searchParams.get('action'), 'TEMPLATE')
  assert.equal(u.searchParams.get('dates'), '20261105/20261107')
  assert.equal(u.searchParams.get('text'), 'Segundo plazo de la Renta 2025')
  assert.match(u.searchParams.get('details')!, /criptoworld\.org\/calendario/)
})
