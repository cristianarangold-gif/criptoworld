import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { extractInternalLinks } from './internal-links'

// Respuestas a dudas fiscales y legales: una página por pregunta, en content/respuestas/<slug>.md.

export const ANSWER_CATEGORIES = {
  hacienda: 'Hacienda',
  normativa: 'Normativa',
  'seguridad-herencias': 'Seguridad y herencias',
} as const
export type AnswerCategory = keyof typeof ANSWER_CATEGORIES

export interface Answer {
  slug: string
  pregunta: string
  descripcion: string
  categoria: AnswerCategory
  corta: string
  updated: string
  sources: { title: string; url: string }[]
  related: { title: string; href: string }[]
  body: string
  words: number
}

export const OFFICIAL_DOMAINS = ['agenciatributaria.gob.es', 'boe.es', 'cnmv.es', 'eur-lex.europa.eu', 'esma.europa.eu', 'hacienda.gob.es']
const DIR = path.join(process.cwd(), 'content', 'respuestas')
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''))
const countWords = (s: string) => s.split(/\s+/).filter(Boolean).length

export function loadAnswers(dir = DIR): Answer[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      const body = content.trim()
      return {
        slug: file.replace(/\.md$/, ''),
        pregunta: data.pregunta ?? '',
        descripcion: data.descripcion ?? '',
        categoria: data.categoria,
        corta: data.corta ?? '',
        updated: isoDate(data.updated),
        sources: data.sources ?? [],
        related: data.related ?? [],
        body,
        words: countWords(body),
      }
    })
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)))
}
const sortKey = (a: Answer) => `${Object.keys(ANSWER_CATEGORIES).indexOf(a.categoria)}-${a.slug}`

let cache: Answer[] | null = null
export function getAllAnswers(): Answer[] {
  return (cache ??= loadAnswers())
}

export function getAnswer(slug: string): Answer | undefined {
  return getAllAnswers().find(a => a.slug === slug)
}

const isOfficial = (url: string) => {
  try {
    const host = new URL(url).hostname
    return url.startsWith('https://') && OFFICIAL_DOMAINS.some(d => host === d || host.endsWith(`.${d}`))
  } catch {
    return false
  }
}

export function validateAnswers(items: Answer[], known: Set<string>): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const a of items) {
    const e = (msg: string) => errors.push(`${a.slug}: ${msg}`)
    if (seen.has(a.slug)) e('slug repetido')
    seen.add(a.slug)
    if (!a.pregunta.trim()) e('falta la pregunta')
    if (!a.descripcion.trim() || a.descripcion.length > 160) e(`descripción de ${a.descripcion.length} caracteres (1–160)`)
    if (!(a.categoria in ANSWER_CATEGORIES)) e(`categoría desconocida: ${a.categoria}`)
    const n = countWords(a.corta)
    if (n < 25 || n > 70) e(`respuesta corta de ${n} palabras (25–70)`)
    if (!a.sources.some(s => isOfficial(s?.url ?? ''))) e('necesita al menos una fuente oficial')
    if (a.words < 300) e(`${a.words} palabras (mínimo 300)`)
    const links = [...extractInternalLinks(a.body), ...extractInternalLinks(a.related.map(r => `](${r.href})`).join(' '))]
    const broken = [...new Set(links.filter(l => !known.has(l)))]
    if (broken.length) e(`enlaces internos rotos: ${broken.join(', ')}`)
  }
  return errors
}
