import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { formatDate } from '@/lib/guides'
import type { NewsItem } from '@/lib/news'

export function NewsCard({ item }: { item: Pick<NewsItem, 'slug' | 'titulo' | 'descripcion' | 'fecha'> }) {
  return (
    <Link href={`/noticias/${item.slug}`} className="glow-card glass-card group block rounded-xl p-5 hover:border-primary/40 transition-colors">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" />
        <time dateTime={item.fecha}>{formatDate(item.fecha)}</time>
      </p>
      <h3 className="mt-2 font-display font-bold text-foreground group-hover:text-primary transition-colors">{item.titulo}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.descripcion}</p>
    </Link>
  )
}
