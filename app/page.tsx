import Link from 'next/link'
import Image from 'next/image'
import { getMarketData } from '@/lib/coingecko'
import { getNews } from '@/lib/rss'
import { prisma } from '@/lib/db'
import { HomeClient } from '@/components/home-client'
import { AlertTriangle, ArrowRight, BookOpen, TrendingUp, Newspaper } from 'lucide-react'

export default async function HomePage() {
  const [market, news, articles] = await Promise.all([
    getMarketData('usd').catch(() => []),
    getNews().catch(() => []),
    prisma.article.findMany({ take: 4, orderBy: { createdAt: 'desc' } }).catch(() => []),
  ])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.newsbtc.com/wp-content/uploads/2024/10/DALL%C2%B7E-2024-10-24-09.00.26-A-dramatic-and-eye-catching-image-of-a-Bitcoin-coin-glowing-intensely-with-a-fiery-golden-orange-hue-against-a-dark-stormy-sky-background.-The-coin-s.png?fit=1792%2C1024"
            alt="Bitcoin dorado brillante sobre fondo oscuro y dramático"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:py-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Entiende el mundo cripto y decide con{' '}
              <span className="text-primary">información</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Datos de mercado en tiempo real, noticias de fuentes fiables y contenido educativo original para que inviertas de forma responsable.
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
                href="/noticias"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <Newspaper className="h-4 w-4" />
                Ver noticias
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeClient market={market} news={news?.slice(0, 4) ?? []} articles={articles} />
    </>
  )
}
