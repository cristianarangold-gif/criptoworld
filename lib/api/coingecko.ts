import type { CoinMarketData, MarketOverview } from '@/types';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timer);
      if (res.status === 429) {
        // Rate limited — wait and retry
        const wait = Math.min(2000 * (attempt + 1), 6000);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
      return res;
    } catch (err: unknown) {
      clearTimeout(timer);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw new Error('CoinGecko: max retries exceeded');
}

export async function getCoinsMarkets(limit = 50): Promise<CoinMarketData[]> {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
  const res = await fetchWithRetry(url);
  return res.json();
}

export async function getGlobalData(): Promise<MarketOverview> {
  const url = `${BASE_URL}/global`;
  const res = await fetchWithRetry(url);
  const json = await res.json();
  const d = json?.data;
  if (!d) throw new Error('CoinGecko global data empty');
  return {
    totalMarketCap: d?.total_market_cap?.usd ?? 0,
    totalVolume24h: d?.total_volume?.usd ?? 0,
    btcDominance: d?.market_cap_percentage?.btc ?? 0,
    ethDominance: d?.market_cap_percentage?.eth ?? 0,
    btcPrice: 0,
    ethPrice: 0,
    btcChange24h: 0,
    ethChange24h: 0,
    activeCurrencies: d?.active_cryptocurrencies ?? 0,
  };
}
