import { getCoinsMarkets, getGlobalData } from './coingecko';
import { getCoinCapMarkets } from './coincap';
import type { CoinMarketData, MarketOverview } from '@/types';

// In-memory cache with TTL
interface CacheEntry<T> {
  data: T;
  ts: number;
}

const cache: Record<string, CacheEntry<unknown>> = {};

function getCached<T>(key: string, ttlMs: number): T | null {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > ttlMs) return null;
  return entry.data as T;
}

function setCache<T>(key: string, data: T) {
  cache[key] = { data, ts: Date.now() };
}

const MARKET_TTL = 90_000; // 90 seconds
const GLOBAL_TTL = 120_000; // 2 minutes

export async function getMarketCoins(limit = 50): Promise<{ data: CoinMarketData[]; source: string }> {
  const cacheKey = `markets_${limit}`;
  const cached = getCached<CoinMarketData[]>(cacheKey, MARKET_TTL);
  if (cached) return { data: cached, source: 'cache' };

  try {
    const data = await getCoinsMarkets(limit);
    setCache(cacheKey, data);
    return { data, source: 'coingecko' };
  } catch (_err) {
    console.warn('CoinGecko failed, trying CoinCap fallback:', _err instanceof Error ? _err.message : _err);
    try {
      const data = await getCoinCapMarkets(limit);
      setCache(cacheKey, data);
      return { data, source: 'coincap' };
    } catch (err2) {
      console.error('Both market APIs failed:', err2 instanceof Error ? err2.message : err2);
      const stale = getCached<CoinMarketData[]>(cacheKey, MARKET_TTL * 10);
      if (stale) return { data: stale, source: 'stale-cache' };
      return { data: [], source: 'unavailable' };
    }
  }
}

export async function getMarketOverview(): Promise<{ data: MarketOverview; source: string }> {
  const cacheKey = 'global_overview';
  const cached = getCached<MarketOverview>(cacheKey, GLOBAL_TTL);
  if (cached) return { data: cached, source: 'cache' };

  try {
    const overview = await getGlobalData();
    // Enrich with BTC/ETH prices from markets
    const { data: coins } = await getMarketCoins(10);
    const btc = coins?.find((c: CoinMarketData) => c.id === 'bitcoin' || c.symbol === 'btc');
    const eth = coins?.find((c: CoinMarketData) => c.id === 'ethereum' || c.symbol === 'eth');
    overview.btcPrice = btc?.current_price ?? 0;
    overview.ethPrice = eth?.current_price ?? 0;
    overview.btcChange24h = btc?.price_change_percentage_24h ?? 0;
    overview.ethChange24h = eth?.price_change_percentage_24h ?? 0;
    setCache(cacheKey, overview);
    return { data: overview, source: 'coingecko' };
  } catch {
    const stale = getCached<MarketOverview>(cacheKey, GLOBAL_TTL * 10);
    if (stale) return { data: stale, source: 'stale-cache' };
    return {
      data: {
        totalMarketCap: 0, totalVolume24h: 0, btcDominance: 0, ethDominance: 0,
        btcPrice: 0, ethPrice: 0, btcChange24h: 0, ethChange24h: 0, activeCurrencies: 0,
      },
      source: 'unavailable',
    };
  }
}
