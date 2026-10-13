import { formatEur } from '@/lib/format'
import type { TickerItem } from '@/lib/sentiment'

// Cinta de precios de la portada. La lista va duplicada para que el bucle de la animación sea continuo;
// la segunda copia se oculta a los lectores de pantalla. Se pausa al pasar el ratón y, con
// «reducir movimiento», queda quieta y se puede desplazar a mano.
export function PriceTicker({ items, fearGreed }: { items: TickerItem[]; fearGreed: { value: number; label: string } | null }) {
  if (items.length === 0) return null

  const row = (hidden: boolean) => (
    <ul className="ticker-row flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map(item => (
        <li key={item.symbol} className="flex items-center gap-1.5 px-5 text-sm whitespace-nowrap">
          <span className="font-semibold text-foreground">{item.symbol}</span>
          <span className="font-mono text-foreground/90">{formatEur(item.price)}</span>
          <span className={item.change >= 0 ? 'text-gain' : 'text-loss'}>
            {item.change >= 0 ? '+' : ''}
            {item.change.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %
          </span>
        </li>
      ))}
      {fearGreed && (
        <li className="px-5 text-sm whitespace-nowrap text-muted-foreground">
          Miedo y codicia: <span className="font-semibold text-foreground">{fearGreed.value}</span> ({fearGreed.label})
        </li>
      )}
    </ul>
  )

  return (
    <div className="ticker relative border-y border-border/40 bg-card/60 py-2.5 overflow-hidden" aria-label="Precios de las principales criptomonedas en euros">
      <div className="ticker-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
