import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { extractInternalLinks } from './internal-links'

// Fichas de criptomonedas: una por moneda en content/criptos/<slug>.md, escritas a mano.
// Las cifras de mercado no van en el texto: las pone la página con datos en vivo.

export interface Coin {
  slug: string
  nombre: string
  simbolo: string
  coingecko: string
  historico: string
  descripcion: string
  lanzamiento: string
  creador: string
  consenso: string
  suministro_max: string
  web: string
  leccion?: string
  updated: string
  sources: { title: string; url: string }[]
  related: { title: string; href: string }[]
  body: string
  words: number
}

export const COIN_SECTIONS = [
  'Qué es',
  'Para qué se usa',
  'Cómo funciona',
  'Riesgos concretos',
  'Cómo comprarla en España con seguridad',
  'Cómo tributa',
]
export const COIN_ORDER = ['bitcoin', 'ethereum', 'xrp', 'bnb', 'solana', 'cardano', 'dogecoin', 'chainlink', 'tron', 'avalanche', 'polkadot', 'litecoin']
export const MIN_WORDS = 700
const DIR = path.join(process.cwd(), 'content', 'criptos')
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''))
const order = (slug: string) => (COIN_ORDER.indexOf(slug) + 1 || 99)

export function loadCoins(dir = DIR): Coin[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      const body = content.trim()
      return {
        slug: file.replace(/\.md$/, ''),
        nombre: data.nombre ?? '',
        simbolo: data.simbolo ?? '',
        coingecko: data.coingecko ?? '',
        historico: data.historico ?? '',
        descripcion: data.descripcion ?? '',
        lanzamiento: String(data.lanzamiento ?? ''),
        creador: data.creador ?? '',
        consenso: data.consenso ?? '',
        suministro_max: String(data.suministro_max ?? ''),
        web: data.web ?? '',
        ...(data.leccion ? { leccion: data.leccion } : {}),
        updated: isoDate(data.updated),
        sources: data.sources ?? [],
        related: data.related ?? [],
        body,
        words: body.split(/\s+/).filter(Boolean).length,
      }
    })
    .sort((a, b) => order(a.slug) - order(b.slug) || a.slug.localeCompare(b.slug))
}

let cache: Coin[] | null = null
export function getAllCoins(): Coin[] {
  return (cache ??= loadCoins())
}

export function getCoin(slug: string): Coin | undefined {
  return getAllCoins().find(c => c.slug === slug)
}

export function validateCoins(items: Coin[], known: Set<string>, historyIds: string[], lessonSlugs: string[]): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()
  const ids = new Set<string>()
  for (const c of items) {
    const e = (msg: string) => errors.push(`${c.slug}: ${msg}`)
    if (slugs.has(c.slug)) e('slug repetido')
    else if (c.coingecko && ids.has(c.coingecko)) e(`coingecko repetido: ${c.coingecko}`)
    slugs.add(c.slug)
    ids.add(c.coingecko)
    if (!c.descripcion.trim() || c.descripcion.length > 160) e(`descripción de ${c.descripcion.length} caracteres (1–160)`)
    if (!c.coingecko.trim()) e('falta el id de coingecko')
    if (!historyIds.includes(c.historico)) e(`id de histórico desconocido: ${c.historico}`)
    if (c.leccion && !lessonSlugs.includes(c.leccion)) e(`lección inexistente: ${c.leccion}`)
    if (!c.sources.length || c.sources.some(s => !s?.url?.startsWith('https://'))) e('necesita al menos una fuente y todas con https://')
    for (const s of COIN_SECTIONS)
      if (!new RegExp(`^## ${s}\\s*$`, 'm').test(c.body)) e(`falta la sección «## ${s}»`)
    if (c.words < MIN_WORDS) e(`${c.words} palabras (mínimo ${MIN_WORDS})`)
    const links = [...extractInternalLinks(c.body), ...extractInternalLinks(c.related.map(r => `](${r.href})`).join(' '))]
    const broken = [...new Set(links.filter(l => !known.has(l)))]
    if (broken.length) e(`enlaces internos rotos: ${broken.join(', ')}`)
  }
  return errors
}
