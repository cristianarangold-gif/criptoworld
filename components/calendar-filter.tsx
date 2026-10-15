'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Filtro por categoría del calendario. Todas las fechas están en el HTML del servidor; esto solo oculta.
export function CalendarFilter({ options }: { options: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-cat]').forEach(el => {
      el.hidden = active !== null && el.dataset.cat !== active
    })
    document.querySelectorAll<HTMLElement>('[data-month]').forEach(g => {
      g.hidden = !g.querySelector('[data-cat]:not([hidden])')
    })
  }, [active])

  const all = [{ id: '', label: 'Todas' }, ...options]
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {all.map(o => {
        const on = (active ?? '') === o.id
        return (
          <button
            key={o.id || 'todas'}
            type="button"
            aria-pressed={on}
            onClick={() => setActive(o.id || null)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              on ? 'border-primary bg-primary/15 text-foreground' : 'border-border/60 hover:bg-muted/50'
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
