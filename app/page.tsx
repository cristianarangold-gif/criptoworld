import Link from 'next/link'
import { getMarketData } from '@/lib/coingecko'
import { getAllGuides } from '@/lib/guides'
import { HomeClient } from '@/components/home-client'
import { BookOpen, TrendingUp } from 'lucide-react'

export default async function HomePage() {
  const market = await getMarketData('usd').catch(() => [])
  const articles = getAllGuides()
    .slice(0, 8)
    .map(g => ({ id: g.slug, slug: g.slug, category: g.category, title: g.title, description: g.description, readTime: g.readTime }))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:py-32 sm:px-6 lg:px-8">
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
                href="/mercado"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Explorar mercado
              </Link>
              <Link
                href="/aprende"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Empieza a aprender
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeClient market={market} articles={articles} />
    </>
  )
}
