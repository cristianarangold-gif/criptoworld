import type { CoinMarketData } from '@/types';

const BASE_URL = 'https://api.coincap.io/v2';
const TIMEOUT_MS = 8000;

interface CoinCapAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  supply: string;
  maxSupply: string | null;
}

export async function getCoinCapMarkets(limit = 50): Promise<CoinMarketData[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE_URL}/assets?limit=${limit}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`CoinCap ${res.status}`);
    const json = await res.json();
    const assets: CoinCapAsset[] = json?.data ?? [];
    return assets.map((a: CoinCapAsset) => ({
      id: a.id,
      symbol: a.symbol?.toLowerCase() ?? '',
      name: a.name ?? '',
      image: `https://content.nexo.com/media/litecoin-blog.jpg`,
      current_price: parseFloat(a.priceUsd) || 0,
      market_cap: parseFloat(a.marketCapUsd) || 0,
      market_cap_rank: parseInt(a.rank) || 0,
      total_volume: parseFloat(a.volumeUsd24Hr) || 0,
      price_change_percentage_24h: parseFloat(a.changePercent24Hr) || 0,
      price_change_percentage_1h_in_currency: undefined,
      price_change_percentage_7d_in_currency: undefined,
      circulating_supply: parseFloat(a.supply) || 0,
      max_supply: a.maxSupply ? parseFloat(a.maxSupply) : null,
      ath: 0,
      atl: 0,
      sparkline_in_7d: undefined,
    }));
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}
