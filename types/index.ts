// ─── Market Data Types ─────────────────────────────────

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  circulating_supply: number;
  max_supply: number | null;
  ath: number;
  atl: number;
  sparkline_in_7d?: { price: number[] };
}

export interface TickerCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface MarketOverview {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  btcPrice: number;
  ethPrice: number;
  btcChange24h: number;
  ethChange24h: number;
  activeCurrencies: number;
}

export interface NewsArticleType {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  originalUrl: string | null;
  originalPublishedAt: string | null;
  author: string | null;
  category: { id: number; slug: string; nameEn: string; nameEs: string } | null;
  status: string;
  featured: boolean;
  readTimeMinutes: number | null;
  isEditorial: boolean;
  locale: string;
  createdAt: string;
}

export type GainerLoser = Pick<CoinMarketData, 'id' | 'symbol' | 'name' | 'image' | 'current_price' | 'price_change_percentage_24h'>;
