import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { extractInternalLinks } from './internal-links'

// Resumen semanal: content/resumenes/<AAAA>-semana-<NN>.md (semana ISO, de lunes a domingo).
// Lo redacta la rutina de los lunes (docs/rutina-resumen.md) y se publica cuando el propietario fusiona su PR.

export interface Digest {
  slug: string
  titulo: string
  descripcion: string
  inicio: string
  fin: string
  publicado: string
  fuentes: { title: string; url: string }[]
  body: string
  words: number
}

export const DIGEST_SECTIONS = [
  'Las noticias de la semana',
  'Lo que importa si vives en España',
  'El mercado en siete días',
  'Próximas fechas',
  'Para aprender esta semana',
]
export const MIN_WORDS = 400
const DIR = path.join(process.cwd(), 'content', 'resumenes')
const SLUG = /^(\d{4})-semana-(\d{2})$/
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''))
const utc = (d: string) => new Date(`${d}T00:00:00Z`)
const fmt = (d: Date) => d.toISOString().slice(0, 10)
const isDate = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(utc(d).getTime()) && fmt(utc(d)) === d

export function isoWeek(date: string): { year: number; week: number } {
  const d = utc(date)
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day) // jueves de esa semana: decide el año ISO
  const year = d.getUTCFullYear()
  const week = Math.ceil(((d.getTime() - Date.UTC(year, 0, 1)) / 86_400_000 + 1) / 7)
  return { year, week }
}

export function weekRange(year: number, week: number): { inicio: string; fin: string } {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const monday = new Date(jan4.getTime() - ((jan4.getUTCDay() || 7) - 1) * 86_400_000 + (week - 1) * 7 * 86_400_000)
  return { inicio: fmt(monday), fin: fmt(new Date(monday.getTime() + 6 * 86_400_000)) }
}

export const digestSlug = (year: number, week: number) => `${year}-semana-${String(week).padStart(2, '0')}`

export function loadDigests(dir = DIR): Digest[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      const body = content.trim()
      return {
        slug: file.replace(/\.md$/, ''),
        titulo: data.titulo ?? '',
        descripcion: data.descripcion ?? '',
        inicio: isoDate(data.inicio),
        fin: isoDate(data.fin),
        publicado: isoDate(data.publicado),
        fuentes: data.fuentes ?? [],
        body,
        words: body.split(/\s+/).filter(Boolean).length,
      }
    })
    .sort((a, b) => b.inicio.localeCompare(a.inicio))
}

let cache: Digest[] | null = null
export function getAllDigests(): Digest[] {
  return (cache ??= loadDigests())
}

export function getDigest(slug: string): Digest | undefined {
  return getAllDigests().find(d => d.slug === slug)
}

export function validateDigests(items: Digest[], known: Set<string>, today: string): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const d of items) {
    const e = (msg: string) => errors.push(`${d.slug}: ${msg}`)
    if (seen.has(d.slug)) e('slug repetido')
    seen.add(d.slug)
    const m = d.slug.match(SLUG)
    if (!m) e('el slug debe ser AAAA-semana-NN')
    else {
      const r = weekRange(Number(m[1]), Number(m[2]))
      if (d.inicio !== r.inicio || d.fin !== r.fin)
        e(`inicio y fin deben ser el lunes y el domingo de la semana del slug (${r.inicio} a ${r.fin})`)
    }
    if (!isDate(d.publicado) || d.publicado > today || !isDate(d.inicio) || d.inicio > today) e('fecha no válida o futura')
    if (!d.titulo.trim()) e('falta el título')
    if (!d.descripcion.trim() || d.descripcion.length > 160) e(`descripción de ${d.descripcion.length} caracteres (1–160)`)
    if (!d.fuentes.length || d.fuentes.some(f => !f?.url?.startsWith('https://'))) e('necesita al menos una fuente y todas con https://')
    for (const s of DIGEST_SECTIONS) if (!new RegExp(`^## ${s}\\s*$`, 'm').test(d.body)) e(`falta la sección «## ${s}»`)
    if (d.words < MIN_WORDS) e(`${d.words} palabras (mínimo ${MIN_WORDS})`)
    const broken = [...new Set(extractInternalLinks(d.body).filter(l => !known.has(l)))]
    if (broken.length) e(`enlaces internos rotos: ${broken.join(', ')}`)
  }
  return errors
}

/** La semana ISO completa anterior a la que contiene `today` (la que resume la rutina de los lunes). */
export function previousWeek(today: string): { slug: string; inicio: string; fin: string } {
  const lastWeekDay = fmt(new Date(utc(today).getTime() - 7 * 86_400_000))
  const { year, week } = isoWeek(lastWeekDay)
  return { slug: digestSlug(year, week), ...weekRange(year, week) }
}
