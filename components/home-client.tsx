'use client'
import Link from 'next/link'
import Image from 'next/image'
import { SparklineChart } from '@/components/sparkline-chart'
import { PriceChange } from '@/components/price-change'
import { formatEur } from '@/lib/format'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import type { CoinMarket } from '@/lib/coingecko'


export function HomeClient({ market, articles }: {
  market: CoinMarket[]
  articles: any[]
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Market summary */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Mercado en vivo</h2>
          <Link href="/mercado" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Ver todo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {(market ?? []).slice(0, 8).map((coin: CoinMarket) => (
            <div key={coin?.id}>
              <Link
                href={`/mercado?coin=${coin?.id}`}
                className="glow-card block glass-card rounded-xl p-4 hover:border-primary/30 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src={coin?.image ?? ''}
                    alt={coin?.name ?? ''}
                    width={28}
                    height={28}
                    className="rounded-full"
                    unoptimized
                  />
                  <div>
                    <p className="text-sm font-semibold">{coin?.name}</p>
                    <p className="text-xs text-muted-foreground uppercase">{coin?.symbol}</p>
                  </div>
                </div>
                <p className="font-mono text-lg font-bold">{formatEur(coin?.current_price)}</p>
                <div className="flex items-center justify-between mt-2">
                  <PriceChange value={coin?.price_change_percentage_24h} />
                  <SparklineChart data={coin?.sparkline_in_7d?.price ?? []} width={60} height={24} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      {(articles ?? []).length > 0 && (
        <section className="py-12 border-t border-border/40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">Guías prácticas</h2>
            <Link href="/aprende" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((a: any) => (
              <div key={a?.id}>
                <Link
                  href={`/aprende/${a?.slug}`}
                  className="glow-card block glass-card rounded-xl p-5 hover:border-primary/30 group h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-secondary" />
                    <span className="text-xs text-secondary font-medium">{a?.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">{a?.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{a?.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {a?.readTime ?? 5} min lectura
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
