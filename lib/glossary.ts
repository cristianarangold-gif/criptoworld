import fs from 'fs'
import path from 'path'
import { slugify } from '@/lib/slug'

// Glosario A–Z. Formato de content/glosario.md: cada término empieza con «### Término», sigue su
// definición (uno o más párrafos) y, opcionalmente, una línea «Lección: slug».

export interface GlossaryTerm {
  term: string
  slug: string
  definition: string
  lesson?: string
}

export const termSlug = (term: string) => slugify(term)

export function parseGlossary(md: string): GlossaryTerm[] {
  return md
    .split(/^### /m)
    .slice(1)
    .map(block => {
      const [first, ...rest] = block.split('\n')
      const term = first.trim()
      let lesson: string | undefined
      const text: string[] = []
      for (const line of rest) {
        const m = line.match(/^Lección:\s*(\S+)\s*$/)
        if (m) lesson = m[1]
        else if (line.trim()) text.push(line.trim())
      }
      const entry: GlossaryTerm = { term, slug: termSlug(term), definition: text.join(' ') }
      if (lesson) entry.lesson = lesson
      return entry
    })
}

let cache: GlossaryTerm[] | null = null

export function getGlossary(): GlossaryTerm[] {
  if (!cache) {
    const md = fs.readFileSync(path.join(process.cwd(), 'content', 'glosario.md'), 'utf8')
    cache = parseGlossary(md).sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }))
  }
  return cache
}
