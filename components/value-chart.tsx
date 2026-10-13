// Gráfico SVG propio (sin librería): valor de la inversión frente a lo aportado, mes a mes.

type Point = { month: string; invested: number; value: number }

const W = 600
const H = 260
const PAD = { top: 12, right: 12, bottom: 28, left: 64 }
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export const monthLabel = (m: string) => `${MONTHS[Number(m.slice(5, 7)) - 1]} ${m.slice(0, 4)}`
const euros = (n: number) =>
  `${n.toLocaleString('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' } as unknown as Intl.NumberFormatOptions)} €`

// Paso «redondo» para el eje: 1, 2 o 5 × 10^n.
function niceStep(max: number, ticks = 4) {
  const raw = max / ticks
  const mag = 10 ** Math.floor(Math.log10(raw))
  return [1, 2, 5, 10].map(f => f * mag).find(s => s >= raw)!
}

export function ValueChart({ series, label }: { series: Point[]; label: string }) {
  if (series.length < 2) return null
  const max = Math.max(...series.map(p => Math.max(p.value, p.invested)))
  const step = niceStep(max || 1)
  const top = Math.ceil(max / step) * step || step
  const iw = W - PAD.left - PAD.right
  const ih = H - PAD.top - PAD.bottom
  const x = (i: number) => PAD.left + (i / (series.length - 1)) * iw
  const y = (v: number) => PAD.top + ih - (v / top) * ih
  const line = (k: 'value' | 'invested') => series.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[k]).toFixed(1)}`).join(' ')
  const yTicks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step)
  const nx = Math.min(5, series.length)
  const xTicks = Array.from(new Set(Array.from({ length: nx }, (_, i) => Math.round((i * (series.length - 1)) / (nx - 1)))))

  return (
    <figure className="mt-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={label}>
        {yTicks.map(t => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="stroke-border" strokeWidth="1" strokeDasharray={t ? '3 4' : undefined} />
            <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" className="fill-muted-foreground" fontSize="11">{euros(t)}</text>
          </g>
        ))}
        {xTicks.map(i => (
          <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === series.length - 1 ? 'end' : 'middle'} className="fill-muted-foreground" fontSize="11">
            {monthLabel(series[i].month)}
          </text>
        ))}
        <path d={line('invested')} fill="none" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="5 4" />
        <path d={line('value')} fill="none" stroke="hsl(33 93% 54%)" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-[hsl(33_93%_54%)]" />Valor de la inversión</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-5 border-t border-dashed border-muted-foreground" />Dinero aportado</span>
      </figcaption>
    </figure>
  )
}
