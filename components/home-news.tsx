import Link from 'next/link'
import { ArrowRight, CalendarDays, Newspaper, CalendarRange } from 'lucide-react'
import { formatDate } from '@/lib/guides'
import type { NewsItem } from '@/lib/news'
import type { Digest } from '@/lib/digests'

type Item = Pick<NewsItem, 'slug' | 'titulo' | 'descripcion' | 'fecha'>

// Apartado de noticias de la portada: la última noticia en grande y, al lado,
// las siguientes y el último resumen semanal.
export function HomeNews({ news, digest }: { news: Item[]; digest?: Pick<Digest, 'slug' | 'titulo' | 'descripcion'> }) {
  const [featured, ...rest] = news
  if (!featured) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="noticias-portada">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="noticias-portada" className="flex items-center gap-2 font-display text-3xl font-bold sm:text-4xl">
            <Newspaper className="h-8 w-8 text-primary" />
            Noticias
          </h2>
          <p className="mt-2 text-muted-foreground">Lo que ha pasado en el mundo cripto y qué significa para ti si vives en España.</p>
        </div>
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
        >
          Ver todas las noticias <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Link
          href={`/noticias/${featured.slug}`}
          className="glow-card glass-card group flex flex-col justify-between rounded-2xl border-primary/30 p-6 sm:p-8 hover:border-primary/60 transition-colors lg:col-span-2"
        >
          <div>
            <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">Última noticia</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={featured.fecha}>{formatDate(featured.fecha)}</time>
              </span>
            </p>
            <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors sm:text-3xl lg:text-4xl">
              {featured.titulo}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{featured.descripcion}</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 font-semibold text-primary">
            Leer la noticia <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="flex flex-col gap-4">
          {rest.map(n => (
            <Link key={n.slug} href={`/noticias/${n.slug}`} className="glow-card glass-card group block rounded-xl p-5 hover:border-primary/40 transition-colors">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                <time dateTime={n.fecha}>{formatDate(n.fecha)}</time>
              </p>
              <h3 className="mt-2 font-display font-bold leading-snug text-foreground group-hover:text-primary transition-colors">{n.titulo}</h3>
            </Link>
          ))}
          {digest && (
            <Link href={`/resumen-semanal/${digest.slug}`} className="glow-card glass-card group block rounded-xl p-5 hover:border-primary/40 transition-colors">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                <CalendarRange className="h-3.5 w-3.5" />
                Resumen de la semana
              </p>
              <h3 className="mt-2 font-display font-bold leading-snug text-foreground group-hover:text-primary transition-colors">{digest.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{digest.descripcion}</p>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
