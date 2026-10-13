import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, ArrowRight } from 'lucide-react'
import { getAllTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Calculadoras cripto gratuitas',
  description: 'Calculadoras en euros para criptomonedas: rentabilidad, DCA, staking, comisiones, capitalización, satoshis, gas de Ethereum, interés compuesto e IRPF de las ganancias.',
  alternates: { canonical: '/herramientas' },
}

export default function HerramientasPage() {
  const tools = getAllTools()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Calculadoras cripto</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Herramientas para hacer números antes de decidir: cuánto ganas o pierdes de verdad tras comisiones, qué
          supone invertir cada mes, cuánto pagarías a Hacienda o cuánto cuesta una transacción en Ethereum. Cada
          calculadora explica su fórmula, incluye un ejemplo resuelto y avisa de sus limitaciones. Todos los
          cálculos se hacen en tu navegador: no guardamos ni enviamos ningún dato que escribas.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(t => (
          <Link
            key={t.slug}
            href={`/herramientas/${t.slug}`}
            className="glow-card glass-card rounded-xl p-5 hover:border-primary/30 group flex flex-col"
          >
            <h2 className="text-base font-semibold group-hover:text-primary transition-colors">{t.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.short}</p>
            <span className="mt-auto pt-4 text-xs text-primary flex items-center gap-1">
              Abrir calculadora <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
        <p><strong>Aviso:</strong> estas calculadoras son orientativas y no constituyen asesoramiento financiero ni fiscal. Los resultados dependen de los datos que introduces y de supuestos simplificados que cada página explica.</p>
      </div>
    </div>
  )
}
