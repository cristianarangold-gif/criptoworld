import { Metadata } from 'next'
import Link from 'next/link'
import { Compass, CalendarDays } from 'lucide-react'
import { getRoute, resolveStep } from '@/lib/route-plan'
import { RouteProgress } from '@/components/route-progress'
import { formatDate } from '@/lib/guides'
import { SITE } from '@/lib/site'

const UPDATED = '2026-10-14'

export const metadata: Metadata = {
  title: 'Empieza aquí: ruta para aprender criptomonedas desde cero',
  description: 'Un itinerario en 4 etapas para entender las criptomonedas desde cero: fundamentos, comprar y guardar con seguridad, Hacienda y normativa, y gestión del riesgo.',
  alternates: { canonical: '/empieza-aqui' },
}

export default function EmpiezaAquiPage() {
  const stages = getRoute().map(s => ({ ...s, pasos: s.pasos.map(resolveStep) }))
  const totalMin = stages.flatMap(s => s.pasos).reduce((n, p) => n + p.minutes, 0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <Compass className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Empieza aquí</h1>
      </div>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          Si nunca has tenido criptomonedas, o las tienes pero no acabas de entender qué estás haciendo, esta ruta
          ordena el contenido de CriptoMundo en el orden en que conviene leerlo. Primero lo básico: qué es una
          blockchain y en qué se diferencian Bitcoin, Ethereum y las stablecoins. Después, lo que necesitas antes de
          comprar nada: dónde se puede comprar legalmente en España, cómo se guardan las claves y cómo reconocer las
          estafas más habituales.
        </p>
        <p>
          La tercera etapa es la que casi nadie explica bien: qué cambia con el reglamento europeo MiCA, cómo se
          declaran las ganancias a Hacienda y cuándo hay que presentar el modelo 721. La última te ayuda a decidir
          con cabeza: cuánto arriesgar, cómo invertir de forma periódica y qué hay detrás de DeFi y el staking.
        </p>
        <p>
          Son unos <strong className="text-foreground">{totalMin} minutos</strong> de lectura en total. Marca cada paso
          cuando lo termines: tu progreso se guarda en este navegador, sin necesidad de cuenta. Nada de lo que leas
          aquí es una recomendación de inversión; el objetivo es que entiendas lo que haces antes de hacerlo.
        </p>
      </div>
      <p className="mt-3 mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" />
        Revisada el <time dateTime={UPDATED}>{formatDate(UPDATED)}</time> por{' '}
        <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
      </p>

      <RouteProgress stages={stages} />
    </div>
  )
}
