import Link from 'next/link'
import { getMarketData } from '@/lib/coingecko'
import { getAllGuides } from '@/lib/guides'
import { getAllNews } from '@/lib/news'
import { HomeNews } from '@/components/home-news'
import { getAllCoins } from '@/lib/coins'
import { getAllDigests } from '@/lib/digests'
import { NewsletterForm } from '@/components/newsletter-form'
import { newsletterEnabled } from '@/lib/newsletter'
import { getSiteStats } from '@/lib/site-stats'
import { getFearGreed, toTickerItems } from '@/lib/sentiment'
import { HomeClient } from '@/components/home-client'
import { HeroChart } from '@/components/hero-chart'
import { CountUp } from '@/components/count-up'
import { PriceTicker } from '@/components/price-ticker'
import { Compass, Calculator, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const [market, fearGreed] = await Promise.all([
    getMarketData('eur').catch(() => []),
    getFearGreed(),
  ])
  const stats = getSiteStats()
  const latest = getAllNews().slice(0, 4)
  const digest = getAllDigests()[0]
  const articles = getAllGuides()
    .slice(0, 8)
    .map(g => ({ id: g.slug, slug: g.slug, category: g.category, title: g.title, description: g.description, readTime: g.readTime }))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroChart />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:py-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Entiende el mundo cripto y decide con{' '}
              <span className="text-primary">información</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Guías en español para entender Bitcoin, Ethereum, las stablecoins o DeFi, conocer sus riesgos y saber qué dice la normativa, con datos de mercado en tiempo real.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/empieza-aqui"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Compass className="h-4 w-4" />
                Empieza aquí
              </Link>
              <Link
                href="/herramientas"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Calculadoras
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              <Link href="/academia" className="hover:text-foreground"><strong className="text-foreground text-base"><CountUp value={stats.lessons} /></strong> lecciones</Link>
              <span className="mx-2">·</span>
              <Link href="/aprende" className="hover:text-foreground"><strong className="text-foreground text-base"><CountUp value={stats.guides} /></strong> guías</Link>
              <span className="mx-2">·</span>
              <Link href="/herramientas" className="hover:text-foreground"><strong className="text-foreground text-base"><CountUp value={stats.tools} /></strong> herramientas</Link>
            </p>
          </div>
        </div>
        <div className="relative z-10">
          <PriceTicker items={toTickerItems(market)} fearGreed={fearGreed} />
        </div>
      </section>

      <HomeNews news={latest} digest={digest} />

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="fichas-cripto">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="fichas-cripto" className="font-display text-2xl font-bold">Fichas de criptomonedas</h2>
          <Link href="/cripto" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="flex flex-wrap gap-2">
          {getAllCoins().map(c => (
            <li key={c.slug}>
              <Link href={`/cripto/${c.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-sm hover:border-primary/50 hover:text-primary transition-colors">
                <span className="font-medium">{c.nombre}</span>
                <span className="text-xs text-muted-foreground">{c.simbolo}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {newsletterEnabled() && (
        <section className="mx-auto max-w-3xl px-4 pt-14 sm:px-6 lg:px-8">
          <NewsletterForm />
        </section>
      )}

      <HomeClient market={market} articles={articles} />
    </>
  )
}
