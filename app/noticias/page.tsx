import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Newspaper } from 'lucide-react'
import { getAllNews, paginate } from '@/lib/news'
import { NewsCard } from '@/components/news-card'

type Props = { searchParams: Promise<{ pagina?: string }> }
const pageOf = (v?: string) => (v === undefined ? 1 : /^\d+$/.test(v) ? Number(v) : NaN)

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = pageOf((await searchParams).pagina)
  const empty = getAllNews().length === 0
  return {
    title: page > 1 ? `Noticias cripto (página ${page})` : 'Noticias cripto',
    description: 'Noticias de criptomonedas explicadas en español: regulación, Hacienda, seguridad y mercado, con lo que significan para ti si vives en España.',
    alternates: { canonical: page > 1 ? `/noticias?pagina=${page}` : '/noticias' },
    ...(empty ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function NoticiasPage({ searchParams }: Props) {
  const all = getAllNews()
  const result = paginate(all, pageOf((await searchParams).pagina))
  if (!result) notFound()
  const { items, page, pages } = result

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <Newspaper className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Noticias cripto</h1>
      </div>
      <p className="max-w-3xl text-muted-foreground leading-relaxed">
        Una o dos noticias al día sobre lo que de verdad afecta a quien tiene o quiere tener criptomonedas en España:
        regulación, Hacienda, seguridad y los cambios importantes del mercado. Cada noticia cita sus fuentes, explica qué
        significa para ti y la revisa{' '}
        <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">el autor</Link> antes de publicarse.
        Nada de esto es una recomendación de inversión.
      </p>

      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border/50 p-6 text-muted-foreground">
          Todavía no hay noticias publicadas. Mientras tanto, puedes empezar por la{' '}
          <Link href="/empieza-aqui" className="text-primary underline underline-offset-2">ruta para aprender desde cero</Link>.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map(n => <NewsCard key={n.slug} item={n} />)}
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Páginas" className="mt-10 flex items-center justify-between text-sm">
          {page > 1 ? <Link href={page === 2 ? '/noticias' : `/noticias?pagina=${page - 1}`} className="text-primary hover:underline">← Más recientes</Link> : <span />}
          <span className="text-muted-foreground">Página {page} de {pages}</span>
          {page < pages ? <Link href={`/noticias?pagina=${page + 1}`} className="text-primary hover:underline">Anteriores →</Link> : <span />}
        </nav>
      )}
    </div>
  )
}
