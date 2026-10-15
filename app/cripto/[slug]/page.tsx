import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, ExternalLink, LineChart, UserRound } from 'lucide-react'
import { getAllCoins, getCoin } from '@/lib/coins'
import { getLiveCoins, maxDrawdownOf } from '@/lib/coin-market'
import { getHistory } from '@/lib/historical'
import { getLessonBySlug } from '@/lib/academia-data'
import { formatDate } from '@/lib/guides'
import { formatBig, formatEur } from '@/lib/format'
import { Markdown } from '@/components/markdown'
import { ValueChart, monthLabel } from '@/components/value-chart'
import { ReadingProgress } from '@/components/reading-progress'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return getAllCoins().map(c => ({ slug: c.slug }))
}

const titleOf = (c: { nombre: string; simbolo: string }) => `${c.nombre} (${c.simbolo}): qué es, riesgos y cómo comprarla en España`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCoin((await params).slug)
  if (!c) return { title: 'Criptomoneda no encontrada' }
  return { title: titleOf(c), description: c.descripcion, alternates: { canonical: `/cripto/${c.slug}` } }
}

function Stat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn('mt-0.5 font-semibold text-foreground', className)}>{value}</dd>
    </div>
  )
}

export default async function CriptoPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCoin((await params).slug)
  if (!c) notFound()
  const live = (await getLiveCoins([c.coingecko]))[c.coingecko]
  const history = getHistory(c.historico)
  const drawdown = maxDrawdownOf(history.map(p => p.price))
  const lesson = c.leccion ? getLessonBySlug(c.leccion) : undefined
  const url = `${SITE.url}/cripto/${c.slug}`
  const pct = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2).replace('.', ',')} %`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: titleOf(c),
      description: c.descripcion,
      dateModified: c.updated,
      inLanguage: 'es-ES',
      mainEntityOfPage: url,
      author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-nosotros` },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      citation: c.sources.map(s => s.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Fichas de criptomonedas', item: `${SITE.url}/cripto` },
        { '@type': 'ListItem', position: 3, name: c.nombre, item: url },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <Link href="/cripto" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Todas las fichas
      </Link>
      <article>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{titleOf(c)}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            Por <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Revisada el <time dateTime={c.updated}>{formatDate(c.updated)}</time>
          </span>
        </div>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{c.descripcion}</p>

        {live && (
          <section aria-label="Datos de mercado" className="glass-card rounded-xl p-5 mt-8">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Stat label="Precio" value={formatEur(live.price)} />
              <Stat label="Cambio en 24 h" value={pct(live.change24h)} className={live.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'} />
              <Stat label="Capitalización" value={formatBig(live.marketCap, '€')} />
              {live.rank > 0 && <Stat label="Posición por capitalización" value={`n.º ${live.rank}`} />}
              <Stat label="En circulación" value={`${formatBig(live.circulating)} ${c.simbolo}`} />
              <Stat label="Suministro máximo" value={live.maxSupply ? `${formatBig(live.maxSupply)} ${c.simbolo}` : 'Sin límite fijo'} />
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Datos de CoinGecko en euros, actualizados cada pocos minutos. No son una recomendación de compra ni de venta.</p>
          </section>
        )}

        <section aria-label="Ficha técnica" className="mt-6 rounded-xl border border-border/50 p-5">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat label="Lanzamiento" value={c.lanzamiento} />
            <Stat label="Creador" value={c.creador} />
            <Stat label="Consenso" value={c.consenso} />
            <Stat label="Suministro máximo" value={c.suministro_max} />
            <div>
              <dt className="text-xs text-muted-foreground">Web oficial</dt>
              <dd className="mt-0.5">
                <a href={c.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  {new URL(c.web).hostname.replace(/^www\./, '')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </dd>
            </div>
            {lesson && (
              <div>
                <dt className="text-xs text-muted-foreground">Para entender la tecnología</dt>
                <dd className="mt-0.5"><Link href={`/academia/${lesson.slug}`} className="font-semibold text-primary hover:underline">Lección: {lesson.title}</Link></dd>
              </div>
            )}
          </dl>
        </section>

        {history.length > 1 && (
          <section aria-labelledby="historico" className="mt-8">
            <h2 id="historico" className="font-display text-xl font-bold">Evolución del precio en euros</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Cierre de cada mes desde {monthLabel(history[0].month)}. Su peor caída desde un máximo en este periodo, con precios
              mensuales, fue del <strong className="text-foreground">{drawdown.toFixed(1).replace('.', ',')} %</strong>.
            </p>
            <ValueChart
              series={history.map(p => ({ month: p.month, invested: 0, value: p.price }))}
              showInvested={false}
              valueLabel="Precio de cierre mensual (€)"
              label={`Precio mensual de ${c.nombre} en euros entre ${monthLabel(history[0].month)} y ${monthLabel(history[history.length - 1].month)}; peor caída desde un máximo: ${drawdown.toFixed(1)} %.`}
            />
            <Link
              href={`/herramientas/simulador-historico?moneda=${c.historico}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <LineChart className="h-4 w-4 text-primary" />
              Simula una inversión en {c.nombre}
            </Link>
          </section>
        )}

        <div className="mt-10">
          <Markdown source={c.body} />
        </div>

        <section className="mt-12 border-t border-border/40 pt-6">
          <h2 className="font-display text-lg font-bold mb-3">Fuentes</h2>
          <ul className="space-y-2 text-sm">
            {c.sources.map(s => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {c.related.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-bold mb-3">Para seguir leyendo</h2>
            <ul className="space-y-2 text-sm">
              {c.related.map(r => (
                <li key={r.href}><Link href={r.href} className="text-primary underline underline-offset-2">{r.title}</Link></li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 rounded-lg border border-border/50 p-4 text-xs text-muted-foreground">
          Información general con fines divulgativos; no es una recomendación de inversión. Las criptomonedas son muy
          volátiles y puedes perder todo lo invertido. ¿Has visto un error? Escríbeme a{' '}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>.
        </p>
      </article>
    </div>
  )
}
