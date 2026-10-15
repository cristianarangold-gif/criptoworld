// Datos en vivo de las fichas de criptomonedas (CoinGecko, desde el servidor y con caché).
// Si la API falla, devuelve {} y la página se muestra sin el bloque de datos.

export type LiveCoin = { price: number; change24h: number; marketCap: number; rank: number; circulating: number; maxSupply: number | null }

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

export function parseMarkets(json: unknown): Record<string, LiveCoin> {
  if (!Array.isArray(json)) return {}
  const out: Record<string, LiveCoin> = {}
  for (const c of json) {
    const price = num(c?.current_price)
    if (typeof c?.id !== 'string' || price === null) continue
    out[c.id] = {
      price,
      change24h: num(c.price_change_percentage_24h) ?? 0,
      marketCap: num(c.market_cap) ?? 0,
      rank: num(c.market_cap_rank) ?? 0,
      circulating: num(c.circulating_supply) ?? 0,
      maxSupply: num(c.max_supply),
    }
  }
  return out
}

export async function getLiveCoins(ids: string[]): Promise<Record<string, LiveCoin>> {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${ids.map(encodeURIComponent).join(',')}&price_change_percentage=24h`
    const res = await fetch(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) })
    if (!res.ok) return {}
    return parseMarkets(await res.json())
  } catch {
    return {}
  }
}

/** Mayor caída desde un máximo previo, en porcentaje (≤ 0). */
export function maxDrawdownOf(prices: number[]): number {
  let peak = -Infinity
  let worst = 0
  for (const p of prices) {
    peak = Math.max(peak, p)
    worst = Math.min(worst, (p / peak - 1) * 100)
  }
  return worst
}
