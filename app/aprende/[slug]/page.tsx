import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, Clock, AlertTriangle, ExternalLink, UserRound, CalendarDays } from 'lucide-react'
import { getAllGuides, getGuide, formatDate } from '@/lib/guides'
import { Markdown, headings } from '@/components/markdown'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return getAllGuides().map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guía no encontrada' }
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/aprende/${slug}` },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      authors: [SITE.owner],
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const toc = headings(guide.body)
  const related = guide.related.map(getGuide).filter(Boolean) as NonNullable<ReturnType<typeof getGuide>>[]
  const url = `${SITE.url}/aprende/${slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      datePublished: guide.published,
      dateModified: guide.updated,
      inLanguage: 'es-ES',
      mainEntityOfPage: url,
      author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-nosotros` },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      citation: guide.sources.map(s => s.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITE.url}/aprende` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/aprende" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Todas las guías
      </Link>

      <article>
        <div className="flex items-center gap-2 mb-3 text-sm">
          <BookOpen className="h-4 w-4 text-secondary" />
          <span className="text-secondary font-medium">{guide.category}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{guide.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            Por <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Actualizado el <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {guide.readTime} min de lectura
          </span>
        </div>

        <div className="glass-card rounded-xl p-5 my-8 border-l-4 border-secondary">
          <p className="text-sm font-semibold text-secondary mb-1">En resumen</p>
          <p className="text-sm text-foreground/90 leading-relaxed">{guide.summary}</p>
        </div>

        {toc.length > 2 && (
          <nav aria-label="Índice" className="mb-8 rounded-xl border border-border/50 p-5">
            <p className="text-sm font-semibold text-foreground mb-2">En esta guía</p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {toc.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-muted-foreground hover:text-primary">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Markdown source={guide.body} />

        {guide.sources.length > 0 && (
          <section className="mt-12 border-t border-border/40 pt-6">
            <h2 className="font-display text-lg font-bold mb-3">Fuentes</h2>
            <ul className="space-y-2 text-sm">
              {guide.sources.map(s => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              ¿Has visto un dato desactualizado? Escríbeme a <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a> y lo reviso.
            </p>
          </section>
        )}

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Aviso:</strong> esta guía es divulgativa y no constituye asesoramiento financiero, fiscal ni legal. Las criptomonedas son activos de alto riesgo. Para decisiones concretas, consulta con un profesional habilitado.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold mb-4">Sigue leyendo</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map(r => (
              <Link key={r.slug} href={`/aprende/${r.slug}`} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group">
                <span className="text-xs text-secondary font-medium">{r.category}</span>
                <h3 className="mt-1 text-base font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
