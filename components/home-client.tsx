'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SparklineChart } from '@/components/sparkline-chart'
import { PriceChange } from '@/components/price-change'
import { formatUsd, formatCompact } from '@/lib/format'
import { ArrowRight, BookOpen, ExternalLink, AlertTriangle, Clock } from 'lucide-react'
import type { CoinMarket } from '@/lib/coingecko'
import type { NewsItem } from '@/lib/rss'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function HomeClient({ market, news, articles }: {
  market: CoinMarket[]
  news: NewsItem[]
  articles: any[]
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Market summary */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ staggerChildren: 0.05 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Mercado en vivo</h2>
          <Link href="/mercado" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Ver todo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {(market ?? []).slice(0, 8).map((coin: CoinMarket) => (
            <motion.div key={coin?.id} variants={fadeUp} transition={{ duration: 0.4 }}>
              <Link
                href={`/mercado?coin=${coin?.id}`}
                className="block glass-card rounded-xl p-4 hover:border-primary/30 transition-all hover:glow-orange group"
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
                <p className="font-mono text-lg font-bold">{formatUsd(coin?.current_price)}</p>
                <div className="flex items-center justify-between mt-2">
                  <PriceChange value={coin?.price_change_percentage_24h} />
                  <SparklineChart data={coin?.sparkline_in_7d?.price ?? []} width={60} height={24} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured News */}
      {(news ?? []).length > 0 && (
        <motion.section
          className="py-12 border-t border-border/40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">Noticias destacadas</h2>
            <Link href="/noticias" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Todas las noticias <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {news.map((item: NewsItem, i: number) => (
              <motion.a
                key={item?.link ?? i}
                href={item?.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all group"
              >
                <div className="relative aspect-video bg-muted">
                  {item?.imageUrl ? (
                    <Image src={item.imageUrl} alt={item?.title ?? 'Noticia'} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <span className="text-xs">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">{item?.title}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item?.source}</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>
      )}

      {/* Articles */}
      {(articles ?? []).length > 0 && (
        <motion.section
          className="py-12 border-t border-border/40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">Artículos recomendados</h2>
            <Link href="/aprende" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((a: any) => (
              <motion.div key={a?.id} variants={fadeUp} transition={{ duration: 0.4 }}>
                <Link
                  href={`/aprende/${a?.slug}`}
                  className="block glass-card rounded-xl p-5 hover:border-primary/30 transition-all group h-full"
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
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Disclaimer */}
      <section className="py-8 border-t border-border/40">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Aviso:</strong> CriptoMundo es una plataforma informativa y educativa. La información mostrada no constituye asesoramiento financiero ni recomendación de inversión. Las criptomonedas son activos volátiles y de alto riesgo.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
