'use client';

import { useEffect, useState } from 'react';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';
import type { TickerCoin } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_COINS = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple', 'cardano', 'dogecoin', 'avalanche-2'];

export function CryptoTicker() {
  const [coins, setCoins] = useState<TickerCoin[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/market?limit=20');
        if (!res.ok) return;
        const json = await res.json();
        const all: TickerCoin[] = (json?.data ?? []).filter((c: TickerCoin) =>
          TICKER_COINS.includes(c?.id ?? '')
        );
        if (!cancelled) setCoins(all);
      } catch {
        // silently fail
      }
    }
    load();
    const interval = setInterval(load, 90_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  if (!coins?.length) return null;

  const doubled = [...coins, ...coins];

  return (
    <div className="border-b border-border/30 bg-card/50 overflow-hidden">
      <div className="animate-ticker flex items-center gap-6 whitespace-nowrap py-1.5 px-4">
        {doubled.map((coin, i) => {
          const positive = (coin?.price_change_percentage_24h ?? 0) >= 0;
          return (
            <div key={`${coin?.id}-${i}`} className="flex items-center gap-2 text-xs">
              <span className="font-medium text-foreground uppercase">{coin?.symbol ?? ''}</span>
              <span className="font-mono text-foreground">
                {formatCurrency(coin?.current_price, { decimals: coin?.current_price < 1 ? 4 : 2 })}
              </span>
              <span
                className={cn(
                  'flex items-center gap-0.5 font-mono',
                  positive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {formatPercent(coin?.price_change_percentage_24h)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
