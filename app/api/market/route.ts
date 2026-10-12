export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getMarketData } from '@/lib/coingecko'

export async function GET(req: NextRequest) {
  try {
    const currency = req.nextUrl.searchParams.get('currency') || 'usd'
    const data = await getMarketData(currency)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
