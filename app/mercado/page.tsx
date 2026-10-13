import { Metadata } from 'next'
import { getMarketData } from '@/lib/coingecko'
import { MercadoClient } from '@/components/mercado-client'
import { MarketPanel } from '@/components/market-panel'
import { getFearGreed, getGlobalMarket } from '@/lib/sentiment'

export const metadata: Metadata = {
  title: 'Mercado',
  description: 'Datos en vivo de las principales criptomonedas: precios, variaciones, capitalización y gráficos.',
}

export default async function MercadoPage() {
  const [market, fearGreed, global] = await Promise.all([
    getMarketData('usd').catch(() => []),
    getFearGreed(),
    getGlobalMarket(),
  ])
  return <MercadoClient initialData={market} panel={<MarketPanel fearGreed={fearGreed} global={global} />} />
}
