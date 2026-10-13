import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Calculadoras de /herramientas: la explicación de cada una vive en content/herramientas/<slug>.md
// y el campo `calculator` indica qué componente de components/calculators.tsx se muestra.

export interface Tool {
  slug: string
  title: string
  short: string
  description: string
  calculator: string
  order: number
  updated: string
  related: { title: string; href: string }[]
  sources: { title: string; url: string }[]
  body: string
}

const DIR = path.join(process.cwd(), 'content', 'herramientas')
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v))
let cache: Tool[] | null = null

export function getAllTools(): Tool[] {
  if (cache) return cache
  cache = fs
    .readdirSync(DIR)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'))
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title,
        short: data.short,
        description: data.description,
        calculator: data.calculator,
        order: data.order ?? 99,
        updated: isoDate(data.updated),
        related: data.related ?? [],
        sources: data.sources ?? [],
        body: content.trim(),
      }
    })
    .sort((a, b) => a.order - b.order)
  return cache
}

export function getTool(slug: string): Tool | undefined {
  return getAllTools().find(t => t.slug === slug)
}
