import data from '../data/calendario.json'
import { cleanPath } from './internal-links'

// Calendario cripto y fiscal: fechas oficiales (Hacienda y normativa) e hitos previsibles de las redes.
// Cada fecha lleva su fuente; las estimadas se marcan como aproximadas. Se exporta a .ics para suscribirse.

export const CATEGORIAS = ['hacienda', 'normativa', 'red'] as const
export type Categoria = (typeof CATEGORIAS)[number]
export const CATEGORIA_LABEL: Record<Categoria, string> = { hacienda: 'Hacienda', normativa: 'Normativa', red: 'Redes' }

export interface Evento {
  id: string
  titulo: string
  categoria: Categoria
  inicio: string
  fin?: string
  aproximada: boolean
  descripcion: string
  enlace?: { title: string; href: string }
  fuente: { title: string; url: string }
}

export interface CalendarioFile {
  revisado: string
  eventos: Evento[]
}

const isDate = (d?: string) => !!d && /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d
const end = (e: Evento) => e.fin ?? e.inicio

export function getCalendar(): CalendarioFile {
  return data as unknown as CalendarioFile
}

export function validateCalendar(file: CalendarioFile, known: Set<string>): string[] {
  const errors: string[] = []
  if (!isDate(file.revisado)) errors.push(`revisado no válido: ${file.revisado}`)
  const seen = new Set<string>()
  for (const e of file.eventos) {
    const err = (msg: string) => errors.push(`${e.id}: ${msg}`)
    if (seen.has(e.id)) err('id repetido')
    seen.add(e.id)
    if (!(CATEGORIAS as readonly string[]).includes(e.categoria)) err(`categoría desconocida: ${e.categoria}`)
    if (!isDate(e.inicio) || (e.fin !== undefined && !isDate(e.fin))) err('fecha no válida')
    else if (e.fin && e.fin < e.inicio) err('el fin es anterior al inicio')
    if (!e.titulo?.trim()) err('falta el título')
    if (!e.descripcion?.trim()) err('falta la descripción')
    if (!e.fuente?.url?.startsWith('https://')) err('la fuente necesita una URL https://')
    if (e.enlace && !known.has(cleanPath(e.enlace.href))) err(`enlace interno roto: ${e.enlace.href}`)
  }
  return errors
}

/** Eventos que aún no han terminado (incluye rangos en curso), del más próximo al más lejano. */
export function upcoming(eventos: Evento[], today: string): Evento[] {
  return eventos.filter(e => end(e) >= today).sort((a, b) => a.inicio.localeCompare(b.inicio) || a.id.localeCompare(b.id))
}

/** Eventos ya terminados, del más reciente al más antiguo. */
export function past(eventos: Evento[], today: string): Evento[] {
  return eventos.filter(e => end(e) < today).sort((a, b) => end(b).localeCompare(end(a)) || a.id.localeCompare(b.id))
}

// ── Exportación a calendarios (iCalendar, RFC 5545) ─────────────────────────────────────────
const compact = (d: string) => d.replace(/-/g, '')
const nextDay = (d: string) => new Date(Date.parse(`${d}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10)
const escapeText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

// Pliega una línea en trozos de 75 octetos como máximo (las de continuación empiezan por un espacio)
// sin partir caracteres UTF-8.
function fold(line: string): string {
  const out: string[] = []
  let cur = ''
  let bytes = 0
  for (const ch of line) {
    const b = Buffer.byteLength(ch, 'utf8')
    const limit = out.length === 0 ? 75 : 74
    if (bytes + b > limit) {
      out.push(cur)
      cur = ''
      bytes = 0
    }
    cur += ch
    bytes += b
  }
  out.push(cur)
  return out.join('\r\n ')
}

const describe = (e: Evento, pageUrl: string) =>
  [e.aproximada ? 'Fecha aproximada. ' : '', e.descripcion, `\n\nMás información: ${pageUrl}`, `\nFuente: ${e.fuente.url}`].join('')

export function toIcs(eventos: Evento[], opts: { name: string; url: string; stamp?: Date }): string {
  const stamp = (opts.stamp ?? new Date()).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CriptoMundo//Calendario cripto y fiscal//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(opts.name)}`,
    'X-WR-TIMEZONE:Europe/Madrid',
  ]
  for (const e of eventos) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}@criptoworld.org`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(e.inicio)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(e.fin ?? e.inicio))}`,
      `SUMMARY:${escapeText(e.aproximada ? `${e.titulo} (fecha aproximada)` : e.titulo)}`,
      `DESCRIPTION:${escapeText(describe(e, opts.url))}`,
      `URL:${opts.url}`,
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.map(fold).join('\r\n') + '\r\n'
}

export function googleCalendarUrl(e: Evento, pageUrl: string): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.titulo,
    dates: `${compact(e.inicio)}/${compact(nextDay(e.fin ?? e.inicio))}`,
    details: describe(e, pageUrl),
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}
