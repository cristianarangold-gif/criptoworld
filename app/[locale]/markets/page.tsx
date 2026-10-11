'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import { Sparkline } from '@/components/market/sparkline';
import type { CoinMarketData } from '@/types';

type SortKey = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'market_cap' | 'total_volume';

export default function MarketsPage() {
  const { dict } = useI18n();
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('market_cap_rank');
  const [sortAsc, setSortAsc] = useState(true);

  const m = dict?.markets ?? ({} as Record<string, string>);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/market?limit=100');
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setCoins(json?.data ?? []);
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let result = [...(coins ?? [])];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c?.name?.toLowerCase()?.includes(q) || c?.symbol?.toLowerCase()?.includes(q)
      );
    }
    result.sort((a, b) => {
      const av = (a as unknown as Record<string, number>)?.[sortKey] ?? 0;
      const bv = (b as unknown as Record<string, number>)?.[sortKey] ?? 0;
      return sortAsc ? av - bv : bv - av;
    });
    return result;
  }, [coins, search, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === 'market_cap_rank'); }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {m.title ?? 'Cryptocurrency Markets'}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{m.subtitle ?? ''}</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={m.searchPlaceholder ?? 'Search cryptocurrency…'}
          className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border/50 text-xs text-muted-foreground">
                <th className="cursor-pointer py-3 text-left font-medium" onClick={() => toggleSort('market_cap_rank')}>{m.rank ?? '#'}</th>
                <th className="py-3 text-left font-medium">{m.name ?? 'Name'}</th>
                <th className="cursor-pointer py-3 text-right font-medium" onClick={() => toggleSort('current_price')}>{m.price ?? 'Price'}</th>
                <th className="py-3 text-right font-medium">{m.change1h ?? '1h %'}</th>
                <th className="cursor-pointer py-3 text-right font-medium" onClick={() => toggleSort('price_change_percentage_24h')}>{m.change24h ?? '24h %'}</th>
                <th className="py-3 text-right font-medium">{m.change7d ?? '7d %'}</th>
                <th className="cursor-pointer py-3 text-right font-medium" onClick={() => toggleSort('market_cap')}>{m.marketCap ?? 'Market Cap'}</th>
                <th className="cursor-pointer py-3 text-right font-medium" onClick={() => toggleSort('total_volume')}>{m.volume ?? 'Volume'}</th>
                <th className="py-3 text-right font-medium">7d</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((coin: CoinMarketData) => {
                const p24h = coin?.price_change_percentage_24h ?? 0;
                const p1h = coin?.price_change_percentage_1h_in_currency;
                const p7d = coin?.price_change_percentage_7d_in_currency;
                const sparkData = coin?.sparkline_in_7d?.price ?? [];
                return (
                  <tr key={coin?.id} className="border-b border-border/30 transition-colors hover:bg-accent/30">
                    <td className="py-3 text-sm text-muted-foreground">{coin?.market_cap_rank}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-7 w-7 shrink-0">
                          {coin?.image && (
                            <Image src={coin.image} alt={coin?.name ?? ''} fill className="rounded-full object-cover" sizes="28px" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-foreground">{coin?.name}</span>
                        <span className="text-xs uppercase text-muted-foreground">{coin?.symbol}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right font-mono text-sm text-foreground">{formatCurrency(coin?.current_price)}</td>
                    <td className="py-3 text-right">
                      {p1h != null ? (
                        <span className={cn('text-xs font-mono', p1h >= 0 ? 'text-green-500' : 'text-red-500')}>{formatPercent(p1h)}</span>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3 text-right">
                      <span className={cn('text-xs font-mono', p24h >= 0 ? 'text-green-500' : 'text-red-500')}>{formatPercent(p24h)}</span>
                    </td>
                    <td className="py-3 text-right">
                      {p7d != null ? (
                        <span className={cn('text-xs font-mono', p7d >= 0 ? 'text-green-500' : 'text-red-500')}>{formatPercent(p7d)}</span>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3 text-right font-mono text-sm text-muted-foreground">{formatCurrency(coin?.market_cap, { compact: true })}</td>
                    <td className="py-3 text-right font-mono text-sm text-muted-foreground">{formatCurrency(coin?.total_volume, { compact: true })}</td>
                    <td className="py-3 text-right">
                      <Sparkline data={sparkData} positive={p24h >= 0} width={80} height={28} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
