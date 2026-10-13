import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Guías prácticas de /aprende. Cada guía es un archivo Markdown en content/guias/
// con su ficha (título, fecha, fuentes...) en el frontmatter.

export interface GuideSource {
  title: string
  url: string
}

export interface Guide {
  slug: string
  title: string
  description: string
  summary: string
  category: string
  order: number
  published: string
  updated: string
  readTime: number
  sources: GuideSource[]
  related: string[]
  body: string
}

export const GUIDE_CATEGORIES = ['Fiscalidad y normativa', 'Seguridad', 'Invertir con cabeza'] as const

const DIR = path.join(process.cwd(), 'content', 'guias')
let cache: Guide[] | null = null

function load(): Guide[] {
  if (cache) return cache
  cache = fs
    .readdirSync(DIR)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'))
      const words = content.split(/\s+/).filter(Boolean).length
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        summary: data.summary,
        category: data.category,
        order: data.order ?? 99,
        published: String(data.published),
        updated: String(data.updated ?? data.published),
        readTime: Math.max(1, Math.round(words / 220)),
        sources: data.sources ?? [],
        related: data.related ?? [],
        body: content.trim(),
      } satisfies Guide
    })
    .sort((a, b) => a.order - b.order)
  return cache
}

export function getAllGuides(): Guide[] {
  return load()
}

export function getGuide(slug: string): Guide | undefined {
  return load().find(g => g.slug === slug)
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}
