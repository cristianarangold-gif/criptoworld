import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, ExternalLink, ScrollText, UserRound } from 'lucide-react'
import { getAllDigests, getDigest } from '@/lib/digests'
import { formatDate } from '@/lib/guides'
import { Markdown } from '@/components/markdown'
import { ReadingProgress } from '@/components/reading-progress'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return getAllDigests().map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = getDigest((await params).slug)
  if (!d) return { title: 'Resumen no encontrado' }
  return { title: d.titulo, description: d.descripcion, alternates: { canonical: `/resumen-semanal/${d.slug}` } }
}

export default async function ResumenPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDigest((await params).slug)
  if (!d) notFound()
  const url = `${SITE.url}/resumen-semanal/${d.slug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: d.titulo,
      description: d.descripcion,
      datePublished: d.publicado,
      dateModified: d.publicado,
      inLanguage: 'es-ES',
      mainEntityOfPage: url,
      author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-nosotros` },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      citation: d.fuentes.map(f => f.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Resumen semanal', item: `${SITE.url}/resumen-semanal` },
        { '@type': 'ListItem', position: 3, name: d.titulo, item: url },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <Link href="/resumen-semanal" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Todos los resúmenes
      </Link>
      <article>
        <p className="flex items-center gap-2 mb-3 text-sm font-medium text-secondary">
          <ScrollText className="h-4 w-4" />
          Resumen semanal · del {formatDate(d.inicio)} al {formatDate(d.fin)}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{d.titulo}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            Por <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Publicado el <time dateTime={d.publicado}>{formatDate(d.publicado)}</time>
          </span>
        </div>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{d.descripcion}</p>
        <div className="mt-8"><Markdown source={d.body} /></div>

        <section className="mt-12 border-t border-border/40 pt-6">
          <h2 className="font-display text-lg font-bold mb-3">Fuentes</h2>
          <ul className="space-y-2 text-sm">
            {d.fuentes.map(f => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />{f.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-8 rounded-lg border border-border/50 p-4 text-xs text-muted-foreground">
          Información general con fines divulgativos; no es asesoramiento financiero ni una recomendación de inversión.
        </p>
      </article>
    </div>
  )
}
