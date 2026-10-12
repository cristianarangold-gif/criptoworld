'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Filter, Newspaper, Clock } from 'lucide-react'
import type { NewsItem } from '@/lib/rss'

const CATEGORIES = ['Todas', 'Bitcoin', 'Ethereum', 'ETF y Mercados', 'Regulación', 'Blockchain', 'Economía', 'Actualidad']
const fadeUp = { hidden: { opacity: 1, y: 8 }, visible: { opacity: 1, y: 0 } }

function timeAgo(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'Hace menos de 1h'
    if (hours < 24) return `Hace ${hours}h`
    const days = Math.floor(hours / 24)
    return `Hace ${days}d`
  } catch { return '' }
}

export function NoticiasClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [category, setCategory] = useState('Todas')
  const news = initialNews ?? []

  const filtered = category === 'Todas' ? news : news.filter((n: NewsItem) => n?.category === category)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Noticias del mundo cripto</h1>
        <p className="mt-2 text-muted-foreground">Noticias reales de fuentes verificadas. Los titulares se muestran en su idioma original con enlace a la fuente.</p>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-none pb-2">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              category === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Newspaper className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No hay noticias disponibles{category !== 'Todas' ? ` en la categoría "${category}"` : ''}.</p>
          <p className="text-sm text-muted-foreground mt-1">Las fuentes podrían no estar disponibles temporalmente.</p>
        </div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          {filtered.map((item: NewsItem, i: number) => (
            <motion.a
              key={item?.link ?? i}
              href={item?.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all group flex flex-col"
            >
              <div className="relative aspect-video bg-muted/50">
                {item?.imageUrl ? (
                  <Image src={item.imageUrl} alt={item?.title ?? 'Noticia'} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Newspaper className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="rounded-full bg-card px-2.5 py-0.5 text-[10px] font-medium text-foreground/70">
                    {item?.category}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 bg-card rounded-b-xl">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{item?.title}</h3>
                {item?.description && (
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                )}
                <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    {item?.source}
                    <ExternalLink className="h-3 w-3" />
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {timeAgo(item?.pubDate ?? '')}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  )
}
