import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { extractInternalLinks } from './internal-links'

// Noticias propias: cada una es content/noticias/<slug>.md. Las redacta la rutina diaria
// (docs/rutina-noticias.md) y se publican cuando el propietario fusiona su PR.

export interface NewsItem {
  slug: string
  titulo: string
  descripcion: string
  fecha: string
  fuentes: { title: string; url: string }[]
  relacionados: { title: string; href: string }[]
  body: string
  words: number
}

export const NEWS_SECTIONS = ['Qué ha pasado', 'Qué significa para ti si vives en España', 'Para entenderlo']
export const MIN_WORDS = 400
const DIR = path.join(process.cwd(), 'content', 'noticias')
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''))

export function loadNews(dir = DIR): NewsItem[] {
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
        fecha: isoDate(data.fecha),
        fuentes: data.fuentes ?? [],
        relacionados: data.relacionados ?? [],
        body,
        words: body.split(/\s+/).filter(Boolean).length,
      }
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha) || a.slug.localeCompare(b.slug))
}

let cache: NewsItem[] | null = null
export function getAllNews(): NewsItem[] {
  return (cache ??= loadNews())
}

export function getNews(slug: string): NewsItem | undefined {
  return getAllNews().find(n => n.slug === slug)
}

export function validateNews(items: NewsItem[], known: Set<string>, today: string): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const n of items) {
    const e = (msg: string) => errors.push(`${n.slug}: ${msg}`)
    if (seen.has(n.slug)) e('slug repetido')
    seen.add(n.slug)
    if (!n.titulo.trim()) e('falta el título')
    if (!n.descripcion.trim() || n.descripcion.length > 160) e(`descripción de ${n.descripcion.length} caracteres (1–160)`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(n.fecha) || isNaN(Date.parse(n.fecha)) || n.fecha > today) e(`fecha no válida o futura: ${n.fecha}`)
    if (!n.fuentes.length || n.fuentes.some(f => !f?.url?.startsWith('https://'))) e('necesita al menos una fuente y todas con https://')
    for (const s of NEWS_SECTIONS)
      if (!new RegExp(`^## ${s}\\s*$`, 'm').test(n.body)) e(`falta la sección «## ${s}»`)
    if (n.words < MIN_WORDS) e(`${n.words} palabras (mínimo ${MIN_WORDS})`)
    const links = [...extractInternalLinks(n.body), ...extractInternalLinks(n.relacionados.map(r => `](${r.href})`).join(' '))]
    const broken = [...new Set(links.filter(l => !known.has(l)))]
    if (broken.length) e(`enlaces internos rotos: ${broken.join(', ')}`)
  }
  return errors
}

export function paginate<T>(items: T[], page: number, size = 12): { items: T[]; page: number; pages: number } | null {
  const pages = Math.max(1, Math.ceil(items.length / size))
  if (!Number.isInteger(page) || page < 1 || page > pages) return null
  return { items: items.slice((page - 1) * size, page * size), page, pages }
}
