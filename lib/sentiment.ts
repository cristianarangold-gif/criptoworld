import type { CoinMarket } from '@/lib/coingecko'

// Datos de sentimiento y de la cinta de precios. Las llamadas externas van siempre por el servidor,
// con caché, y devuelven null si fallan: la interfaz simplemente no muestra ese bloque.

export function classifyFearGreed(value: number): string {
  if (value <= 24) return 'Miedo extremo'
  if (value <= 44) return 'Miedo'
  if (value <= 55) return 'Neutral'
  if (value <= 75) return 'Codicia'
  return 'Codicia extrema'
}

export function parseFearGreed(json: unknown): { value: number; label: string } | null {
  const raw = (json as { data?: { value?: unknown }[] } | null)?.data?.[0]?.value
  const value = Number(raw)
  if (raw === undefined || raw === null || !Number.isFinite(value) || value < 0 || value > 100) return null
  return { value, label: classifyFearGreed(value) }
}

export async function getFearGreed(): Promise<{ value: number; label: string } | null> {
  try {
    const res = await fetch('https://api.alternative.me/fng/?limit=1', { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return parseFearGreed(await res.json())
  } catch {
    return null
  }
}

// Solo monedas conocidas: el ranking por capitalización incluye stablecoins y tokens de activos reales
// que valen siempre ~1 € y no aportan nada en la cinta. Se mantiene el orden por capitalización.
const TICKER_SYMBOLS = new Set(['btc', 'eth', 'xrp', 'bnb', 'sol', 'trx', 'doge', 'ada', 'link', 'avax', 'dot', 'ltc', 'xlm', 'bch', 'ton', 'sui'])

export type TickerItem = { symbol: string; price: number; change: number }

export function toTickerItems(coins: CoinMarket[], n = 8): TickerItem[] {
  return coins
    .filter(c => Number.isFinite(c?.current_price) && c.current_price > 0 && TICKER_SYMBOLS.has(c.symbol?.toLowerCase()))
    .slice(0, n)
    .map(c => ({ symbol: c.symbol.toUpperCase(), price: c.current_price, change: c.price_change_percentage_24h ?? 0 }))
}
