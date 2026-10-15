// Lectura de fuentes RSS/Atom para la rutina diaria de noticias (scripts/noticias-candidatas.mjs).
// Sin dependencias: el XML de los feeds es sencillo y basta con expresiones regulares.

export type Source = { name: string; url: string; official: boolean; keywords?: string[] }
export type FeedItem = { title: string; url: string; published: Date | null; source: string; official: boolean }

export function parseSources(txt: string): Source[] {
  return txt
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const [name, url, kind, filter] = l.split('|').map(s => s.trim())
      const keywords = filter ? filter.split(',').map(k => k.trim().toLowerCase()).filter(Boolean) : undefined
      return { name, url, official: kind === 'oficial', ...(keywords ? { keywords } : {}) }
    })
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e: string) =>
      e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENTITIES[e.toLowerCase()] ?? m
    )
    .replace(/\s+/g, ' ')
    .trim()
}

const tag = (block: string, name: string) => {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))
  return m ? decode(m[1]) : ''
}
const date = (s: string) => {
  const d = s ? new Date(s) : null
  return d && !isNaN(d.getTime()) ? d : null
}

// Las fuentes generales (Comisión Europea, BCE...) llevan palabras clave: solo pasan los títulos que contengan alguna.
export function parseFeed(xml: string, source: Pick<Source, 'name' | 'official' | 'keywords'>): FeedItem[] {
  const base = { source: source.name, official: source.official }
  const rss = [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map(([b]) => ({
    ...base,
    title: tag(b, 'title'),
    url: tag(b, 'link'),
    published: date(tag(b, 'pubDate') || tag(b, 'dc:date')),
  }))
  const atom = [...xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/gi)].map(([b]) => {
    const link = b.match(/<link[^>]*rel=["']alternate["'][^>]*>/i)?.[0] ?? b.match(/<link[^>]*>/i)?.[0] ?? ''
    return {
      ...base,
      title: tag(b, 'title'),
      url: decode(link.match(/href=["']([^"']+)["']/i)?.[1] ?? ''),
      published: date(tag(b, 'published') || tag(b, 'updated')),
    }
  })
  const kw = source.keywords
  return [...rss, ...atom]
    .filter(i => i.title && i.url)
    .filter(i => !kw?.length || kw.some(k => i.title.toLowerCase().includes(k)))
}

export function selectCandidates(items: FeedItem[], now: Date, hours = 26, limit = 15): FeedItem[] {
  const from = now.getTime() - hours * 3600_000
  const seen = new Set<string>()
  return items
    .filter(i => i.published && i.published.getTime() >= from && i.published.getTime() <= now.getTime() + 3600_000)
    .filter(i => !seen.has(i.url) && seen.add(i.url))
    .sort((a, b) => Number(b.official) - Number(a.official) || b.published!.getTime() - a.published!.getTime())
    .slice(0, limit)
}

export function toMarkdown(items: FeedItem[], failures: string[]): string {
  if (!items.length) return ''
  const lines = items.map(i => `- [${i.title}](${i.url}) — ${i.source}${i.official ? ' (oficial)' : ''}, ${i.published!.toISOString().slice(0, 16).replace('T', ' ')} UTC`)
  const out = ['## Candidatas', '', ...lines]
  if (failures.length) out.push('', '## Fuentes que han fallado', '', ...failures.map(f => `- ${f}`))
  return out.join('\n') + '\n'
}
