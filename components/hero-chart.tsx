// Fondo decorativo de la portada: cuadrícula y una línea de precio que se dibuja una sola vez.
// Es SVG puro (sin JavaScript) y no oculta nada: el texto de la portada está por encima.
const LINE = 'M0,250 L60,232 L120,240 L180,198 L240,210 L300,165 L360,182 L420,138 L480,150 L540,104 L600,118 L660,80 L720,92 L780,58 L800,62'

export function HeroChart() {
  return (
    <div className="hero-chart pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div className="hero-grid absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="hsl(33 93% 54%)" stopOpacity="0.28" />
            <stop offset="1" stopColor="hsl(33 93% 54%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${LINE} L800,300 L0,300 Z`} fill="url(#hero-area)" className="hero-area" />
        <path d={LINE} fill="none" stroke="hsl(33 93% 54%)" strokeWidth="2.5" pathLength={1} className="hero-line" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
