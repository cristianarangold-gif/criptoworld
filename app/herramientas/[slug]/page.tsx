import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calculator as CalcIcon, ExternalLink, AlertTriangle, CalendarDays } from 'lucide-react'
import { getAllTools, getTool } from '@/lib/tools'
import { formatDate } from '@/lib/guides'
import { Markdown } from '@/components/markdown'
import { Calculator } from '@/components/calculators'
import { SITE } from '@/lib/site'
import { HISTORY, getHistory } from '@/lib/historical'

export function generateStaticParams() {
  return getAllTools().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return { title: 'Calculadora no encontrada' }
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/herramientas/${slug}` },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()
  const label = tool.calculator === 'estafa' ? 'Test' : tool.calculator === 'historico' ? 'Simulador' : 'Calculadora'
  const extra =
    tool.calculator === 'historico'
      ? Object.entries(HISTORY.monedas).map(([id, c]) => ({ id, nombre: c.nombre, points: getHistory(id) }))
      : undefined
  const others = getAllTools().filter(t => t.slug !== slug).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.description,
    url: `${SITE.url}/herramientas/${slug}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Cualquiera (navegador web)',
    inLanguage: 'es-ES',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-nosotros` },
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/herramientas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Todas las calculadoras
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{tool.title}</h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">{tool.description}</p>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" />
        Revisada el <time dateTime={tool.updated}>{formatDate(tool.updated)}</time> por{' '}
        <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
      </p>

      <section className="glass-card rounded-xl p-6 my-8" aria-label={label}>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <CalcIcon className="h-5 w-5 text-primary" />
          {label}
        </h2>
        <Calculator id={tool.calculator} extra={extra} />
      </section>

      <Markdown source={tool.body} />

      {tool.related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold mb-3">Para entenderlo mejor</h2>
          <ul className="space-y-2 text-sm">
            {tool.related.map(r => (
              <li key={r.href}>
                <Link href={r.href} className="text-primary underline underline-offset-2">{r.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.sources.length > 0 && (
        <section className="mt-8 border-t border-border/40 pt-6">
          <h2 className="font-display text-lg font-bold mb-3">Fuentes</h2>
          <ul className="space-y-2 text-sm">
            {tool.sources.map(s => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Aviso:</strong> calculadora orientativa. No constituye asesoramiento financiero ni fiscal. Los datos que escribes no salen de tu navegador.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold mb-4">Otras calculadoras</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {others.map(o => (
            <Link key={o.slug} href={`/herramientas/${o.slug}`} className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all group">
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">{o.title}</span>
              <p className="mt-1 text-xs text-muted-foreground">{o.short}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
