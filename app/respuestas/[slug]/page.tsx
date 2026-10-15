import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, ExternalLink, MessageCircleQuestion, UserRound } from 'lucide-react'
import { getAllAnswers, getAnswer, ANSWER_CATEGORIES } from '@/lib/answers'
import { formatDate } from '@/lib/guides'
import { Markdown } from '@/components/markdown'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return getAllAnswers().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getAnswer((await params).slug)
  if (!a) return { title: 'Respuesta no encontrada' }
  return { title: a.pregunta, description: a.descripcion, alternates: { canonical: `/respuestas/${a.slug}` } }
}

export default async function RespuestaPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getAnswer((await params).slug)
  if (!a) notFound()
  const others = getAllAnswers().filter(o => o.categoria === a.categoria && o.slug !== a.slug).slice(0, 4)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'es-ES',
      mainEntity: [{ '@type': 'Question', name: a.pregunta, acceptedAnswer: { '@type': 'Answer', text: a.corta } }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Dudas frecuentes', item: `${SITE.url}/respuestas` },
        { '@type': 'ListItem', position: 3, name: a.pregunta, item: `${SITE.url}/respuestas/${a.slug}` },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/respuestas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Todas las dudas
      </Link>
      <article>
        <p className="flex items-center gap-2 mb-3 text-sm font-medium text-secondary">
          <MessageCircleQuestion className="h-4 w-4" />
          {ANSWER_CATEGORIES[a.categoria]}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{a.pregunta}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            Por <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Revisada el <time dateTime={a.updated}>{formatDate(a.updated)}</time>
          </span>
        </div>

        <div className="glass-card rounded-xl p-5 my-8 border-l-4 border-primary">
          <p className="text-sm font-semibold text-primary mb-1">Respuesta corta</p>
          <p className="text-foreground/90 leading-relaxed">{a.corta}</p>
        </div>

        <Markdown source={a.body} />

        <p className="mt-8 rounded-lg border border-border/50 p-4 text-xs text-muted-foreground">
          Información general con fines divulgativos, no asesoramiento fiscal ni jurídico. La normativa y los criterios de
          Hacienda cambian: comprueba la fecha de revisión y, si tu caso es complejo, consulta con un asesor fiscal.
        </p>

        <section className="mt-10 border-t border-border/40 pt-6">
          <h2 className="font-display text-lg font-bold mb-3">Fuentes</h2>
          <ul className="space-y-2 text-sm">
            {a.sources.map(s => (
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

        {(a.related.length > 0 || others.length > 0) && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-bold mb-3">Para seguir leyendo</h2>
            <ul className="space-y-2 text-sm">
              {a.related.map(r => (
                <li key={r.href}><Link href={r.href} className="text-primary underline underline-offset-2">{r.title}</Link></li>
              ))}
              {others.map(o => (
                <li key={o.slug}><Link href={`/respuestas/${o.slug}`} className="text-primary underline underline-offset-2">{o.pregunta}</Link></li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  )
}
