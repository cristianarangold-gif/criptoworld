import { getAllGuides } from './guides'
import { getAllTools } from './tools'
import { getAllLessons } from './academia-data'
import { getAllAnswers } from './answers'
import { getAllNews } from './news'
import { getAllCoins } from './coins'
import { getAllDigests } from './digests'
import { STATIC_PATHS, cleanPath } from './internal-links'

// Todas las rutas internas que existen, para validar los enlaces del contenido en Markdown.
// Va aparte de internal-links.ts porque answers, news y coins importan extractInternalLinks de allí.
export function knownPaths(extra: string[] = []): Set<string> {
  return new Set([
    ...STATIC_PATHS,
    ...getAllLessons().map(l => `/academia/${l.slug}`),
    ...getAllGuides().map(g => `/aprende/${g.slug}`),
    ...getAllTools().map(t => `/herramientas/${t.slug}`),
    ...getAllAnswers().map(a => `/respuestas/${a.slug}`),
    ...getAllNews().map(n => `/noticias/${n.slug}`),
    ...getAllCoins().map(c => `/cripto/${c.slug}`),
    ...getAllDigests().map(d => `/resumen-semanal/${d.slug}`),
    ...extra.map(cleanPath),
  ])
}
