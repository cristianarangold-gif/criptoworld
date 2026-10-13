import { Gauge, PieChart, Coins } from 'lucide-react'
import { FearGreedGauge } from '@/components/fear-greed-gauge'
import type { GlobalMarket } from '@/lib/sentiment'

// Panel encima de la tabla de /mercado. Cada tarjeta desaparece si su fuente ha fallado (dato null).

const nf = (n: number, dec: number) =>
  n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: 'always' } as unknown as Intl.NumberFormatOptions)

// En español, un billón son 10^12.
const bigEur = (n: number) => (n >= 1e12 ? `${nf(n / 1e12, 2)} billones €` : `${nf(n / 1e9, 0)} mil millones €`)

function Card({ icon: Icon, title, children, note }: { icon: typeof Gauge; title: string; children: React.ReactNode; note: string }) {
  return (
    <div className="glow-card glass-card rounded-xl p-5 flex flex-col">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </h2>
      <div className="flex-1 py-3">{children}</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
    </div>
  )
}

export function MarketPanel({ fearGreed, global }: { fearGreed: { value: number; label: string } | null; global: GlobalMarket | null }) {
  if (!fearGreed && !global) return null
  return (
    <section aria-label="Indicadores del mercado" className="grid gap-4 md:grid-cols-3 mb-8">
      {fearGreed && (
        <Card
          icon={Gauge}
          title="Índice de miedo y codicia"
          note="Resume el ánimo del mercado a partir de la volatilidad, el volumen, las redes sociales y la dominancia de Bitcoin (alternative.me). No predice el precio: el miedo o la codicia pueden durar semanas."
        >
          <div className="flex items-center gap-4">
            <FearGreedGauge value={fearGreed.value} />
            <p>
              <span className="block font-display text-3xl font-bold text-foreground">{fearGreed.value}</span>
              <span className="block text-sm text-muted-foreground">de 100 · {fearGreed.label}</span>
            </p>
          </div>
        </Card>
      )}
      {global && (
        <Card
          icon={PieChart}
          title="Dominancia de Bitcoin"
          note="Qué parte del valor de todo el mercado cripto corresponde a Bitcoin. Si sube, el dinero se concentra en Bitcoin; no indica si el mercado va a subir o a bajar."
        >
          <p className="font-display text-3xl font-bold text-foreground">{nf(global.btcDominance, 1)} %</p>
          <div className="mt-3 h-2 w-full rounded-full bg-muted" aria-hidden="true">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, global.btcDominance)}%` }} />
          </div>
        </Card>
      )}
      {global && (
        <Card
          icon={Coins}
          title="Capitalización total"
          note="Suma del valor de todas las criptomonedas que sigue CoinGecko, stablecoins incluidas. La variación es la de las últimas 24 horas y no anticipa la siguiente."
        >
          <p className="font-display text-2xl font-bold text-foreground">{bigEur(global.totalCapEur)}</p>
          <p className={global.capChange24h >= 0 ? 'mt-1 text-sm text-emerald-500' : 'mt-1 text-sm text-red-500'}>
            {global.capChange24h > 0 ? '+' : ''}
            {nf(global.capChange24h, 2)} % en 24 h
          </p>
        </Card>
      )}
    </section>
  )
}
