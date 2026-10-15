import { getAllGuides } from './guides'
import { getAllTools } from './tools'
import { getAllLessons } from './academia-data'

// Comprobación de enlaces internos del contenido en Markdown (noticias, respuestas...).

const STATIC = [
  '/', '/mercado', '/aprende', '/academia', '/herramientas', '/glosario', '/empieza-aqui', '/noticias', '/respuestas',
  '/sobre-nosotros', '/contacto', '/aviso-legal', '/privacidad', '/cookies',
]

const clean = (href: string) => {
  const p = href.split(/[#?]/)[0]
  return p.length > 1 ? p.replace(/\/+$/, '') : p
}

export function extractInternalLinks(md: string): string[] {
  return [...md.matchAll(/\]\((\/[^)\s]*)\)/g)].map(m => clean(m[1]))
}

export function knownPaths(extra: string[] = []): Set<string> {
  return new Set([
    ...STATIC,
    ...getAllLessons().map(l => `/academia/${l.slug}`),
    ...getAllGuides().map(g => `/aprende/${g.slug}`),
    ...getAllTools().map(t => `/herramientas/${t.slug}`),
    ...extra.map(clean),
  ])
}
