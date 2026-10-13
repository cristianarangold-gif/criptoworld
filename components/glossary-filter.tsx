'use client'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { fold } from '@/lib/slug'

// Buscador del glosario: oculta en el cliente los términos que no coinciden. Todos los términos
// siguen en el HTML del servidor, así que el contenido completo es visible sin JavaScript.
export function GlossaryFilter({ total }: { total: number }) {
  const [q, setQ] = useState('')
  const [shown, setShown] = useState(total)

  useEffect(() => {
    const needle = fold(q.trim())
    let count = 0
    document.querySelectorAll<HTMLElement>('[data-term]').forEach(el => {
      const match = !needle || (el.dataset.term ?? '').includes(needle)
      el.hidden = !match
      if (match) count++
    })
    document.querySelectorAll<HTMLElement>('[data-letter-group]').forEach(g => {
      g.hidden = !g.querySelector('[data-term]:not([hidden])')
    })
    setShown(count)
  }, [q])

  return (
    <div className="max-w-md">
      <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Buscar un término…"
        aria-label="Buscar en el glosario"
        className="w-full rounded-lg border border-border/50 bg-muted/50 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
      />
      </div>
      <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
        {q ? `${shown} de ${total} términos` : `${total} términos`}
      </p>
    </div>
  )
}
