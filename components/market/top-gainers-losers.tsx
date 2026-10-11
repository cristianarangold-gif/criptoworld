'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import type { CoinMarketData, GainerLoser } from '@/types';

export function TopGainersLosers() {
  const { dict } = useI18n();
  const [gainers, setGainers] = useState<GainerLoser[]>([]);
  const [losers, setLosers] = useState<GainerLoser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/market?limit=100');
        if (!res.ok) return;
        const json = await res.json();
        const all: CoinMarketData[] = json?.data ?? [];
        const sorted = [...all].sort(
          (a, b) => (b?.price_change_percentage_24h ?? 0) - (a?.price_change_percentage_24h ?? 0)
        );
        if (!cancelled) {
          setGainers(sorted.slice(0, 5));
          setLosers(sorted.slice(-5).reverse());
        }
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

  function CoinRow({ coin, isGainer }: { coin: GainerLoser; isGainer: boolean }) {
    const positive = (coin?.price_change_percentage_24h ?? 0) >= 0;
    return (
      <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/30">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 shrink-0">
            {coin?.image && (
              <Image src={coin.image} alt={coin?.name ?? 'coin'} fill className="rounded-full object-cover" sizes="32px" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{coin?.name ?? ''}</p>
            <p className="text-xs uppercase text-muted-foreground">{coin?.symbol ?? ''}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono text-foreground">{formatCurrency(coin?.current_price)}</p>
          <p className={cn('flex items-center justify-end gap-0.5 text-xs font-mono', positive ? 'text-green-500' : 'text-red-500')}>
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatPercent(coin?.price_change_percentage_24h)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {h.gainersTitle ?? 'Top Gainers'} & {h.losersTitle ?? 'Top Losers'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{h.gainersLosersSubtitle ?? ''}</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-14 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-green-500">
              <TrendingUp className="h-4 w-4" /> {h.gainersTitle ?? 'Top Gainers'}
            </h3>
            <div className="space-y-1">
              {gainers.map((c) => <CoinRow key={c?.id} coin={c} isGainer />)}
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-red-500">
              <TrendingDown className="h-4 w-4" /> {h.losersTitle ?? 'Top Losers'}
            </h3>
            <div className="space-y-1">
              {losers.map((c) => <CoinRow key={c?.id} coin={c} isGainer={false} />)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
