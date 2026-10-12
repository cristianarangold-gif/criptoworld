const CG_BASE = 'https://api.coingecko.com/api/v3'
const CC_BASE = 'https://api.coincap.io/v2'

export interface CoinMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  sparkline_in_7d?: { price: number[] }
}

export interface CoinHistory {
  prices: [number, number][]
}

async function fetchWithTimeout(url: string, opts?: RequestInit, timeout = 10000) {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal })
    clearTimeout(tid)
    return res
  } catch (e: any) {
    clearTimeout(tid)
    throw e
  }
}

export async function getMarketData(currency = 'usd', perPage = 50): Promise<CoinMarket[]> {
  try {
    const url = `${CG_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=24h`
    const res = await fetchWithTimeout(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`)
    return await res.json()
  } catch {
    return fallbackCoinCap(currency)
  }
}

async function fallbackCoinCap(currency: string): Promise<CoinMarket[]> {
  try {
    const res = await fetchWithTimeout(`${CC_BASE}/assets?limit=50`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const data = await res.json()
    const rate = currency === 'eur' ? 0.92 : 1
    return (data?.data ?? []).map((c: any) => ({
      id: c?.id ?? '',
      symbol: c?.symbol?.toLowerCase?.() ?? '',
      name: c?.name ?? '',
      image: `https://mkt-static.crypto.com/types-of-cryptocurrency-2.webp ?? 'btc'}@2x.png`,
      current_price: parseFloat(c?.priceUsd ?? '0') * rate,
      market_cap: parseFloat(c?.marketCapUsd ?? '0') * rate,
      market_cap_rank: parseInt(c?.rank ?? '0'),
      total_volume: parseFloat(c?.volumeUsd24Hr ?? '0') * rate,
      price_change_percentage_24h: parseFloat(c?.changePercent24Hr ?? '0'),
    }))
  } catch {
    return []
  }
}

export async function getCoinHistory(id: string, days = 7, currency = 'usd'): Promise<CoinHistory> {
  try {
    const url = `${CG_BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    const res = await fetchWithTimeout(url, { next: { revalidate: 300 } })
    if (!res.ok) throw new Error(`CoinGecko history ${res.status}`)
    return await res.json()
  } catch {
    return { prices: [] }
  }
}

export async function getCoinPrice(id: string, date: string): Promise<number | null> {
  // date format: dd-mm-yyyy
  try {
    const url = `${CG_BASE}/coins/${id}/history?date=${date}&localization=false`
    const res = await fetchWithTimeout(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    return data?.market_data?.current_price?.usd ?? null
  } catch {
    return null
  }
}

export async function getSimplePrice(ids: string[], currency = 'usd'): Promise<Record<string, { usd: number }>> {
  try {
    const url = `${CG_BASE}/simple/price?ids=${ids.join(',')}&vs_currencies=${currency}`
    const res = await fetchWithTimeout(url, { next: { revalidate: 60 } })
    if (!res.ok) return {}
    return await res.json()
  } catch {
    return {}
  }
}
