'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import { Sparkline } from './sparkline';
import type { CoinMarketData } from '@/types';

export function TrendingCoins() {
  const { dict, locale } = useI18n();
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/market?limit=10');
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

  const h = dict?.home ?? ({} as Record<string, string>);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {h.trendingTitle ?? 'Trending Cryptocurrencies'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{h.trendingSubtitle ?? ''}</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : coins?.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">{dict?.common?.error ?? 'Data unavailable'}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-xs text-muted-foreground">
                <th className="py-3 text-left font-medium">#</th>
                <th className="py-3 text-left font-medium">{dict?.markets?.name ?? 'Name'}</th>
                <th className="py-3 text-right font-medium">{dict?.markets?.price ?? 'Price'}</th>
                <th className="py-3 text-right font-medium">24h %</th>
                <th className="hidden py-3 text-right font-medium md:table-cell">{dict?.markets?.marketCap ?? 'Market Cap'}</th>
                <th className="hidden py-3 text-right font-medium lg:table-cell">{dict?.markets?.volume ?? 'Volume'}</th>
                <th className="hidden py-3 text-right font-medium lg:table-cell">7d</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin: CoinMarketData) => {
                const positive = (coin?.price_change_percentage_24h ?? 0) >= 0;
                const sparkData = coin?.sparkline_in_7d?.price ?? [];
                return (
                  <tr
                    key={coin?.id}
                    className="border-b border-border/30 transition-colors hover:bg-accent/30"
                  >
                    <td className="py-3 text-sm text-muted-foreground">{coin?.market_cap_rank ?? ''}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 shrink-0">
                          {coin?.image && (
                            <Image
                              src={coin.image}
                              alt={coin?.name ?? 'coin'}
                              fill
                              className="rounded-full object-cover"
                              sizes="32px"
                            />
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{coin?.name ?? ''}</span>
                          <span className="ml-2 text-xs uppercase text-muted-foreground">{coin?.symbol ?? ''}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right font-mono text-sm text-foreground">
                      {formatCurrency(coin?.current_price)}
                    </td>
                    <td className="py-3 text-right">
                      <span className={cn('inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-mono', positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500')}>
                        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {formatPercent(coin?.price_change_percentage_24h)}
                      </span>
                    </td>
                    <td className="hidden py-3 text-right font-mono text-sm text-muted-foreground md:table-cell">
                      {formatCurrency(coin?.market_cap, { compact: true })}
                    </td>
                    <td className="hidden py-3 text-right font-mono text-sm text-muted-foreground lg:table-cell">
                      {formatCurrency(coin?.total_volume, { compact: true })}
                    </td>
                    <td className="hidden py-3 text-right lg:table-cell">
                      <Sparkline data={sparkData} positive={positive} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
