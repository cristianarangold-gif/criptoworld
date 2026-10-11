'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, PieChart, Zap } from 'lucide-react';
import { cn, formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import type { MarketOverview } from '@/types';

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  suffix,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change?: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/80 p-4 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-lg font-bold text-foreground">
          {value}{suffix ? suffix : ''}
        </span>
        {change != null && (
          <span className={cn('flex items-center gap-0.5 text-xs font-mono', change >= 0 ? 'text-green-500' : 'text-red-500')}>
            {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatPercent(change)}
          </span>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  const { dict } = useI18n();
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/market/overview');
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setOverview(json?.data ?? null);
      } catch {
        // handled
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const h = dict?.home ?? ({} as Record<string, string>);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
        {/* Hero text */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {h.heroTitle ?? 'Track the Crypto Market with Clarity'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
            {h.heroSubtitle ?? 'Real-time prices, verified news, and expert analysis.'}
          </p>
        </div>

        {/* Stats grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard
              icon={Zap}
              label="Bitcoin"
              value={formatCurrency(overview?.btcPrice)}
              change={overview?.btcChange24h}
            />
            <StatCard
              icon={Activity}
              label="Ethereum"
              value={formatCurrency(overview?.ethPrice)}
              change={overview?.ethChange24h}
            />
            <StatCard
              icon={BarChart3}
              label={h.totalMarketCap ?? 'Total Market Cap'}
              value={formatCurrency(overview?.totalMarketCap, { compact: true })}
            />
            <StatCard
              icon={Activity}
              label={h.volume24h ?? '24h Volume'}
              value={formatCurrency(overview?.totalVolume24h, { compact: true })}
            />
            <StatCard
              icon={PieChart}
              label={h.btcDominance ?? 'BTC Dominance'}
              value={`${(overview?.btcDominance ?? 0).toFixed(1)}%`}
            />
            <StatCard
              icon={PieChart}
              label={h.ethDominance ?? 'ETH Dominance'}
              value={`${(overview?.ethDominance ?? 0).toFixed(1)}%`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
