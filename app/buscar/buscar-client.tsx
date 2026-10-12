'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'

type Result = { type: string; title: string; href: string; desc?: string }

export function BuscarClient({ initialQuery }: { initialQuery: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = async (q: string) => {
    if (q.trim().length < 2) { setResults([]); return }
    setLoading(true)
    setSearched(true)
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const d = await r.json()
      setResults(d.results || [])
    } catch { setResults([]) }
    setLoading(false)
  }

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    doSearch(query)
    router.replace(`/buscar?q=${encodeURIComponent(query)}`, { scroll: false })
  }

  const typeColors: Record<string, string> = {
    'lección': 'bg-emerald-500/10 text-emerald-400',
    'artículo': 'bg-secondary/10 text-secondary',
    'herramienta': 'bg-primary/10 text-primary',
    'página': 'bg-muted text-muted-foreground',
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-6">Buscar</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar lecciones, artículos, herramientas..."
            className="w-full rounded-xl bg-muted/50 border border-border/50 pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
        </div>
      </form>

      {loading && <p className="text-muted-foreground text-sm">Buscando...</p>}
      
      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground">No se encontraron resultados para «{query}»</p>
          <p className="text-sm text-muted-foreground mt-1">Intenta con otros términos de búsqueda</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground mb-4">{results.length} resultado{results.length !== 1 ? 's' : ''}</p>
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              className="block glass-card rounded-xl p-4 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                  {r.desc && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.desc}</p>}
                </div>
                <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium shrink-0 ${typeColors[r.type] || 'bg-muted text-muted-foreground'}`}>{r.type}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
