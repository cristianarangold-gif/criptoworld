import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, Rss, ScrollText } from 'lucide-react'
import { getAllDigests } from '@/lib/digests'
import { paginate } from '@/lib/news'
import { formatDate } from '@/lib/guides'
import { NewsletterForm } from '@/components/newsletter-form'
import { newsletterEnabled } from '@/lib/newsletter'

type Props = { searchParams: Promise<{ pagina?: string }> }
const pageOf = (v?: string) => (v === undefined ? 1 : /^\d+$/.test(v) ? Number(v) : NaN)

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = pageOf((await searchParams).pagina)
  return {
    title: page > 1 ? `Resumen semanal cripto (página ${page})` : 'Resumen semanal cripto',
    description: 'Cada lunes, lo más importante de la semana en criptomonedas explicado para quien vive en España: noticias, qué significan para ti, el mercado y las próximas fechas.',
    alternates: { canonical: page > 1 ? `/resumen-semanal?pagina=${page}` : '/resumen-semanal' },
    ...(getAllDigests().length === 0 ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function ResumenesPage({ searchParams }: Props) {
  const result = paginate(getAllDigests(), pageOf((await searchParams).pagina))
  if (!result) notFound()
  const { items, page, pages } = result

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <ScrollText className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Resumen semanal</h1>
      </div>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          Cada lunes, lo más importante de la semana anterior en cinco minutos: las noticias que publicamos, lo que
          significan si vives en España, cómo se movió el mercado, las fechas que se acercan y algo para aprender. Como el
          resto de CriptoMundo, cita sus fuentes y no recomienda comprar ni vender.
        </p>
        <p className="text-sm">
          ¿Prefieres seguirlo con un lector de RSS?{' '}
          <a href="/feed.xml" className="inline-flex items-center gap-1 text-primary underline underline-offset-2"><Rss className="h-3.5 w-3.5" />Suscríbete al feed</a>. Las noticias de cada día están en{' '}
          <Link href="/noticias" className="text-primary underline underline-offset-2">Noticias</Link>.
        </p>
      </div>

      {newsletterEnabled() && (
        <div className="mt-8">
          <NewsletterForm />
        </div>
      )}

      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border/50 p-6 text-muted-foreground">
          El primer resumen se publicará el próximo lunes. Mientras tanto, tienes las{' '}
          <Link href="/noticias" className="text-primary underline underline-offset-2">noticias</Link> y el{' '}
          <Link href="/calendario" className="text-primary underline underline-offset-2">calendario cripto y fiscal</Link>.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map(d => (
            <li key={d.slug}>
              <Link href={`/resumen-semanal/${d.slug}`} className="glow-card glass-card group block rounded-xl p-5">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Del {formatDate(d.inicio)} al {formatDate(d.fin)}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{d.titulo}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label="Páginas" className="mt-10 flex items-center justify-between text-sm">
          {page > 1 ? <Link href={page === 2 ? '/resumen-semanal' : `/resumen-semanal?pagina=${page - 1}`} className="text-primary hover:underline">← Más recientes</Link> : <span />}
          <span className="text-muted-foreground">Página {page} de {pages}</span>
          {page < pages ? <Link href={`/resumen-semanal?pagina=${page + 1}`} className="text-primary hover:underline">Anteriores →</Link> : <span />}
        </nav>
      )}
    </div>
  )
}
