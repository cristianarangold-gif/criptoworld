import { Metadata } from 'next'
import { getMarketData } from '@/lib/coingecko'
import { MercadoClient } from '@/components/mercado-client'

export const metadata: Metadata = {
  title: 'Mercado',
  description: 'Datos en vivo de las principales criptomonedas: precios, variaciones, capitalización y gráficos.',
}

export default async function MercadoPage() {
  const market = await getMarketData('usd').catch(() => [])
  return <MercadoClient initialData={market} />
}
