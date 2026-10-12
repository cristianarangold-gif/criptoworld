import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
})

export interface NewsItem {
  title: string
  link: string
  description: string
  pubDate: string
  source: string
  sourceUrl: string
  imageUrl: string | null
  category: string
}

const FEEDS = [
  { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', name: 'CoinDesk', site: 'https://coindesk.com' },
  { url: 'https://cointelegraph.com/rss', name: 'Cointelegraph', site: 'https://cointelegraph.com' },
  { url: 'https://es.cointelegraph.com/rss', name: 'Cointelegraph ES', site: 'https://es.cointelegraph.com' },
  { url: 'https://decrypt.co/feed', name: 'Decrypt', site: 'https://decrypt.co' },
]

const CATEGORIES: Record<string, string[]> = {
  'Regulación': ['regulación', 'regulation', 'sec', 'law', 'legal', 'compliance', 'gobierno', 'government', 'ban', 'tax'],
  'Bitcoin': ['bitcoin', 'btc', 'halving', 'satoshi', 'lightning network'],
  'Ethereum': ['ethereum', 'eth', 'vitalik', 'solidity', 'erc-20', 'merge'],
  'ETF y Mercados': ['etf', 'wall street', 'nasdaq', 'spot etf', 'market', 'trading', 'bull', 'bear'],
  'Blockchain': ['blockchain', 'defi', 'nft', 'web3', 'smart contract', 'dao', 'layer 2', 'l2'],
  'Economía': ['inflation', 'fed', 'interest rate', 'macro', 'economy', 'dollar', 'inflación', 'economía', 'banco central'],
}

function categorize(text: string): string {
  const lower = text.toLowerCase()
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw: string) => lower.includes(kw))) return cat
  }
  return 'Actualidad'
}

function extractImage(item: any): string | null {
  if (item?.['media:content']?.['@_url']) return item['media:content']['@_url']
  if (item?.['media:thumbnail']?.['@_url']) return item['media:thumbnail']['@_url']
  if (item?.enclosure?.['@_url']) return item.enclosure['@_url']
  const desc = String(item?.description ?? item?.['content:encoded'] ?? '')
  const match = desc.match(/<img[^>]+src=["']([^"']+)["']/)
  return match?.[1] ?? null
}

function stripHtml(html: string): string {
  return html?.replace?.(/<[^>]*>/g, '')?.replace(/&[^;]+;/g, ' ')?.trim?.()?.slice(0, 300) ?? ''
}

let cache: { items: NewsItem[]; ts: number } = { items: [], ts: 0 }
const CACHE_TTL = 3600 * 1000 // 1 hour

export async function getNews(): Promise<NewsItem[]> {
  if (Date.now() - cache.ts < CACHE_TTL && cache.items.length > 0) {
    return cache.items
  }
  const allItems: NewsItem[] = []
  const seenUrls = new Set<string>()

  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const controller = new AbortController()
        const tid = setTimeout(() => controller.abort(), 8000)
        const res = await fetch(feed.url, {
          signal: controller.signal,
          next: { revalidate: 3600 },
        })
        clearTimeout(tid)
        if (!res.ok) return []
        const xml = await res.text()
        const parsed = parser.parse(xml)
        const channel = parsed?.rss?.channel ?? parsed?.feed
        const items = channel?.item ?? channel?.entry ?? []
        const arr = Array.isArray(items) ? items : [items]
        return arr.map((item: any) => {
          const link = item?.link?.['@_href'] ?? item?.link ?? ''
          const title = item?.title ?? ''
          const desc = stripHtml(item?.description ?? item?.summary ?? item?.['content:encoded'] ?? '')
          const pubDate = item?.pubDate ?? item?.published ?? item?.updated ?? ''
          const imageUrl = extractImage(item)
          const text = `${title} ${desc}`
          return {
            title: String(title),
            link: String(link),
            description: desc,
            pubDate: String(pubDate),
            source: feed.name,
            sourceUrl: feed.site,
            imageUrl,
            category: categorize(text),
          } as NewsItem
        })
      } catch {
        return []
      }
    })
  )

  for (const r of results) {
    if (r.status === 'fulfilled') {
      for (const item of r.value) {
        if (item?.link && !seenUrls.has(item.link)) {
          seenUrls.add(item.link)
          allItems.push(item)
        }
      }
    }
  }

  allItems.sort((a, b) => {
    const da = new Date(a.pubDate).getTime() || 0
    const db = new Date(b.pubDate).getTime() || 0
    return db - da
  })

  cache = { items: allItems, ts: Date.now() }
  return allItems
}
