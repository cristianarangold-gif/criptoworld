export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getCoinPrice } from '@/lib/coingecko'
import { getMarketData } from '@/lib/coingecko'

export async function POST(req: NextRequest) {
  try {
    const { coinId, amount, date } = await req.json()
    if (!coinId || !amount || !date) {
      return NextResponse.json({ error: 'Faltan par\u00e1metros' }, { status: 400 })
    }
    // date comes as YYYY-MM-DD, CoinGecko wants dd-mm-yyyy
    const [y, m, d] = date.split('-')
    const cgDate = `${d}-${m}-${y}`
    const historicalPrice = await getCoinPrice(coinId, cgDate)
    if (!historicalPrice) {
      return NextResponse.json({ error: 'No se pudieron obtener datos hist\u00f3ricos para esa fecha' }, { status: 404 })
    }
    // Get current price
    const market = await getMarketData('usd')
    const coin = market.find((c: any) => c?.id === coinId)
    const currentPrice = coin?.current_price ?? 0
    const invested = parseFloat(amount)
    const coinsBought = invested / historicalPrice
    const currentValue = coinsBought * currentPrice
    const pnl = currentValue - invested
    const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0

    return NextResponse.json({
      coinId,
      coinName: coin?.name ?? coinId,
      invested,
      historicalPrice,
      currentPrice,
      coinsBought,
      currentValue,
      pnl,
      pnlPercent,
      date,
    })
  } catch {
    return NextResponse.json({ error: 'Error en la simulaci\u00f3n' }, { status: 500 })
  }
}
