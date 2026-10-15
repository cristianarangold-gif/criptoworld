// Imprime en Markdown las noticias candidatas de las últimas 26 horas para la rutina diaria.
// Uso: npx tsx scripts/noticias-candidatas.ts   (sin candidatas no imprime nada)
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parseSources, parseFeed, selectCandidates, toMarkdown, type FeedItem } from '../lib/news-feed'

async function main() {
  const sources = parseSources(readFileSync(path.join(__dirname, '..', 'data', 'fuentes-noticias.txt'), 'utf8'))
  const items: FeedItem[] = []
  const failures: string[] = []
  await Promise.all(
    sources.map(async s => {
      try {
        const res = await fetch(s.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CriptoMundo-noticias/1.0; +https://criptoworld.org)' },
          signal: AbortSignal.timeout(15000),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        items.push(...parseFeed(await res.text(), s))
      } catch (e) {
        failures.push(`${s.name}: ${(e as Error).message}`)
      }
    })
  )
  process.stdout.write(toMarkdown(selectCandidates(items, new Date()), failures))
}

main()
