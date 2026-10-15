import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, ExternalLink, Newspaper, UserRound } from 'lucide-react'
import { getAllNews, getNews } from '@/lib/news'
import { formatDate } from '@/lib/guides'
import { Markdown } from '@/components/markdown'
import { ReadingProgress } from '@/components/reading-progress'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return getAllNews().map(n => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getNews((await params).slug)
  if (!n) return { title: 'Noticia no encontrada' }
  return {
    title: n.titulo,
    description: n.descripcion,
    alternates: { canonical: `/noticias/${n.slug}` },
    openGraph: { type: 'article', title: n.titulo, description: n.descripcion, publishedTime: n.fecha, authors: [SITE.owner] },
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const n = getNews((await params).slug)
  if (!n) notFound()
  const url = `${SITE.url}/noticias/${n.slug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: n.titulo,
      description: n.descripcion,
      datePublished: n.fecha,
      dateModified: n.fecha,
      inLanguage: 'es-ES',
      mainEntityOfPage: url,
      author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-nosotros` },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      citation: n.fuentes.map(f => f.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Noticias', item: `${SITE.url}/noticias` },
        { '@type': 'ListItem', position: 3, name: n.titulo, item: url },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <Link href="/noticias" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Todas las noticias
      </Link>
      <article>
        <p className="flex items-center gap-2 mb-3 text-sm font-medium text-secondary">
          <Newspaper className="h-4 w-4" />
          Noticia
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{n.titulo}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            Por <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <time dateTime={n.fecha}>{formatDate(n.fecha)}</time>
          </span>
        </div>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{n.descripcion}</p>

        <div className="mt-8">
          <Markdown source={n.body} />
        </div>

        <section className="mt-12 border-t border-border/40 pt-6">
          <h2 className="font-display text-lg font-bold mb-3">Fuentes</h2>
          <ul className="space-y-2 text-sm">
            {n.fuentes.map(f => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {f.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {n.relacionados.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-bold mb-3">Para seguir leyendo</h2>
            <ul className="space-y-2 text-sm">
              {n.relacionados.map(r => (
                <li key={r.href}><Link href={r.href} className="text-primary underline underline-offset-2">{r.title}</Link></li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 rounded-lg border border-border/50 p-4 text-xs text-muted-foreground">
          Información general con fines divulgativos; no es asesoramiento financiero ni una recomendación de inversión.
          ¿Has visto un error? Escríbeme a <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>.
        </p>
      </article>
    </div>
  )
}
