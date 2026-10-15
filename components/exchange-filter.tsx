'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Option = { id: string; label: string }

// Filtros del comparador: ocultan en el cliente las filas y tarjetas que no cumplen. El HTML del servidor
// muestra las 12 plataformas, así que sin JavaScript se ve todo. data-flags lista lo que cumple cada una.
export function ExchangeFilter({ options, total }: { options: readonly Option[]; total: number }) {
  const [active, setActive] = useState<string[]>([])
  const [shown, setShown] = useState(total)

  useEffect(() => {
    const visible = new Set<string>()
    document.querySelectorAll<HTMLElement>('[data-exchange]').forEach(el => {
      const flags = (el.dataset.flags ?? '').split(' ')
      const match = active.every(f => flags.includes(f))
      el.hidden = !match
      if (match) visible.add(el.dataset.exchange!)
    })
    setShown(visible.size)
  }, [active])

  const toggle = (id: string) => setActive(a => (a.includes(id) ? a.filter(x => x !== id) : [...a, id]))

  return (
    <div className="rounded-xl border border-border/50 p-4">
      <p className="text-sm font-semibold text-foreground">Filtrar por lo que necesitas</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.id}
            type="button"
            onClick={() => toggle(o.id)}
            aria-pressed={active.includes(o.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              active.includes(o.id) ? 'border-primary bg-primary/15 text-foreground' : 'border-border/60 hover:bg-muted/50'
            )}
          >
            {o.label}
          </button>
        ))}
        {active.length > 0 && (
          <button type="button" onClick={() => setActive([])} className="px-2 text-sm text-primary underline underline-offset-2">
            Quitar filtros
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
        {active.length ? `${shown} de ${total} plataformas cumplen todos los filtros. Un dato «sin confirmar» cuenta como que no cumple.` : `${total} plataformas`}
      </p>
    </div>
  )
}
