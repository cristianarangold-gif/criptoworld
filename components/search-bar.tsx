'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Result = { type: string; title: string; href: string; desc?: string }

export function SearchBar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const search = (q: string) => {
    setQuery(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (q.trim().length < 2) { setResults([]); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const d = await r.json()
        setResults(d.results || [])
      } catch { setResults([]) }
      setLoading(false)
    }, 300)
  }

  const go = (href: string) => {
    setOpen(false)
    setQuery('')
    setResults([])
    router.push(href)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length >= 2) {
      go(`/buscar?q=${encodeURIComponent(query)}`)
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted" aria-label="Buscar">
        <Search className="h-4 w-4" />
      </button>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => search(e.target.value)}
            placeholder="Buscar..."
            className="w-48 sm:w-64 rounded-lg bg-muted/50 border border-border/50 pl-8 pr-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setResults([]) }} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown results */}
      {(results.length > 0 || (query.length >= 2 && !loading)) && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 rounded-xl glass-card border border-border/50 shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.length === 0 && !loading ? (
            <div className="p-4 text-sm text-muted-foreground text-center">Sin resultados para «{query}»</div>
          ) : (
            <div className="py-1">
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => go(r.href)}
                  className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.title}</div>
                    {r.desc && <div className="text-xs text-muted-foreground truncate mt-0.5">{r.desc}</div>}
                  </div>
                  <span className="text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground shrink-0 mt-0.5">{r.type}</span>
                </button>
              ))}
              <button
                onClick={() => go(`/buscar?q=${encodeURIComponent(query)}`)}
                className="w-full text-left px-4 py-2.5 border-t border-border/30 text-sm text-primary hover:bg-muted/50 flex items-center gap-2"
              >
                Ver todos los resultados <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
