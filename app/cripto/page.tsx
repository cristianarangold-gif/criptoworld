import { Metadata } from 'next'
import Link from 'next/link'
import { Coins } from 'lucide-react'
import { getAllCoins } from '@/lib/coins'
import { getLiveCoins } from '@/lib/coin-market'
import { formatEur } from '@/lib/format'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Fichas de criptomonedas: qué es cada una, riesgos y cómo comprarla en España',
  description: 'Bitcoin, Ethereum, XRP, Solana y otras 8 criptomonedas explicadas en español: para qué sirven, cómo funcionan, sus riesgos concretos y cómo tributan en España.',
  alternates: { canonical: '/cripto' },
}

export default async function CriptoIndexPage() {
  const coins = getAllCoins()
  const live = await getLiveCoins(coins.map(c => c.coingecko))
  const sorted = Object.keys(live).length ? [...coins].sort((a, b) => (live[a.coingecko]?.rank || 999) - (live[b.coingecko]?.rank || 999)) : coins

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <Coins className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Fichas de criptomonedas</h1>
      </div>
      <div className="max-w-3xl space-y-3 text-muted-foreground leading-relaxed">
        <p>
          Una ficha por cada una de las criptomonedas más conocidas: qué es, para qué se usa, cómo funciona, sus riesgos
          concretos, cómo comprarla con seguridad en España y cómo tributa. Cada ficha incluye su precio en vivo y su
          evolución mensual en euros desde que cotiza.
        </p>
        <p>
          Que una moneda tenga ficha no significa que sea una buena inversión: estas páginas explican, no recomiendan. Si
          estás empezando, la <Link href="/empieza-aqui" className="text-primary underline underline-offset-2">ruta para aprender desde cero</Link> te
          ayuda a entender lo básico antes.
        </p>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map(c => {
          const l = live[c.coingecko]
          return (
            <li key={c.slug}>
              <Link href={`/cripto/${c.slug}`} className="glow-card glass-card group flex h-full flex-col rounded-xl p-4">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{c.nombre}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{c.simbolo}</span>
                </span>
                {l && (
                  <span className="mt-1 flex items-baseline gap-2 text-sm">
                    <span className="text-foreground">{formatEur(l.price)}</span>
                    <span className={cn('text-xs', l.change24h >= 0 ? 'text-emerald-500' : 'text-red-500')}>
                      {l.change24h > 0 ? '+' : ''}{l.change24h.toFixed(2).replace('.', ',')} % 24 h
                    </span>
                  </span>
                )}
                <span className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.descripcion}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      {Object.keys(live).length > 0 && <p className="mt-4 text-xs text-muted-foreground">Precios en euros de CoinGecko, actualizados cada pocos minutos.</p>}
    </div>
  )
}
