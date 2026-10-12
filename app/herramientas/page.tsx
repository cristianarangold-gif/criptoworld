import { Metadata } from 'next'
import { HerramientasClient } from './herramientas-client'

export const metadata: Metadata = {
  title: 'Herramientas Cripto — CriptoMundo',
  description: 'Calculadoras y herramientas gratuitas para inversores de criptomonedas: DCA, staking, conversor, rentabilidad y más.',
  openGraph: {
    title: 'Herramientas Cripto — CriptoMundo',
    description: '11 calculadoras cripto gratuitas en español para tomar mejores decisiones de inversión.',
  },
}

export default function HerramientasPage() {
  return <HerramientasClient />
}
