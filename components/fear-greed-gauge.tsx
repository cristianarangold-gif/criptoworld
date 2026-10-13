// Velocímetro SVG del índice de miedo y codicia: semicírculo de rojo (0) a verde (100) y una aguja.
// El SVG es decorativo; la cifra y la etiqueta van en texto al lado.

const CX = 100
const CY = 100
const R = 80
// Tramos del índice (los mismos que classifyFearGreed) y su color.
const BANDS: [number, number, string][] = [
  [0, 25, '#ef4444'],
  [25, 45, '#f97316'],
  [45, 56, '#eab308'],
  [56, 76, '#84cc16'],
  [76, 100, '#22c55e'],
]

const point = (v: number, r = R) => {
  const a = Math.PI - (v / 100) * Math.PI
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)].map(n => n.toFixed(2)).join(',')
}
const arc = (from: number, to: number) => `M${point(from)} A${R},${R} 0 0 1 ${point(to)}`

export function FearGreedGauge({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 200 112" className="w-full max-w-[220px]" aria-hidden="true">
      {BANDS.map(([a, b, color]) => (
        <path key={a} d={arc(a + 0.6, b - 0.6)} fill="none" stroke={color} strokeWidth="14" />
      ))}
      <g transform={`rotate(${(value / 100) * 180} ${CX} ${CY})`}>
        <line x1={CX} y1={CY} x2={CX - R + 18} y2={CY} stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-foreground" />
      </g>
      <circle cx={CX} cy={CY} r="6" className="fill-foreground" />
    </svg>
  )
}
