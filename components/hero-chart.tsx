import Link from 'next/link'
import { getBitcoinChart } from '@/lib/hero-chart'

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const mesLargo = (m: string) => `${MESES[Number(m.slice(5, 7)) - 1]} de ${m.slice(0, 4)}`

// Historia real de bitcoin: la línea se dibuja una vez y los marcadores enlazan a la explicación de cada hito.
// Es solo CSS y SVG, así que se ve entero sin JavaScript o con «reducir movimiento».
export function HeroChart() {
  const c = getBitcoinChart()
  const resumen = `Bitcoin en euros desde ${mesLargo(c.desde)} hasta ${mesLargo(c.hasta)}. Su mayor caída entre cierres mensuales fue del ${c.peor.pct} %, de ${mesLargo(c.peor.desde)} a ${mesLargo(c.peor.hasta)}.`

  return (
    <figure className="min-w-0">
      <figcaption>
        <p className="font-display text-lg font-bold">Bitcoin también cae: su historia real, en euros</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Su mayor caída fue del <strong className="text-loss">{c.peor.pct} %</strong>, de {mesLargo(c.peor.desde)} a {mesLargo(c.peor.hasta)}.
        </p>
      </figcaption>

      <div className="relative mt-4 ml-12 mr-3 h-56 sm:h-72">
        {c.ejeY.map(v => (
          <div key={v} className="absolute inset-x-0 border-t border-border/40" style={{ top: `${100 - (v / c.techo) * 100}%` }}>
            <span className="absolute -left-12 -top-2 w-10 whitespace-nowrap text-right text-[11px] tabular-nums text-muted-foreground">{v / 1000}k €</span>
          </div>
        ))}
        <svg className="hero-line absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={resumen}>
          <defs>
            <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="hsl(33 93% 54%)" stopOpacity="0.22" />
              <stop offset="1" stopColor="hsl(33 93% 54%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${c.linea} L100,100 L0,100 Z`} fill="url(#hero-area)" />
          <path d={c.linea} fill="none" stroke="hsl(33 93% 54%)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        {c.hitos.map((h, i) => (
          <Link
            key={h.mes}
            href={h.href}
            aria-label={`${i + 1}. ${h.titulo}, ${mesLargo(h.mes)}`}
            title={`${h.titulo} (${mesLargo(h.mes)})`}
            style={{ left: `${h.x}%`, top: `${h.y}%`, animationDelay: `${1.3 + i * 0.12}s` }}
            className="hero-mark absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {i + 1}
          </Link>
        ))}
        {c.ejeX.map(a => (
          <span key={a.anio} className="absolute -bottom-5 -translate-x-1/2 text-[11px] tabular-nums text-muted-foreground" style={{ left: `${a.x}%` }}>{a.anio}</span>
        ))}
      </div>

      <ol className="mt-9 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
        {c.hitos.map((h, i) => (
          <li key={h.mes} className="flex gap-2">
            <span className="w-4 shrink-0 text-right font-bold text-primary">{i + 1}</span>
            <Link href={h.href} className="text-muted-foreground hover:text-foreground">
              <span className="text-foreground">{h.titulo}</span> ({mesLargo(h.mes)})
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground">
        Cierres mensuales hasta {mesLargo(c.hasta)}. Fuente: Binance y Banco Central Europeo. Lo que ha pasado no predice lo que pasará.
      </p>
    </figure>
  )
}
