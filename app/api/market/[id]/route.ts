export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getCoinHistory } from '@/lib/coingecko'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const days = parseInt(req.nextUrl.searchParams.get('days') || '7')
    const currency = req.nextUrl.searchParams.get('currency') || 'usd'
    const data = await getCoinHistory(id, days, currency)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ prices: [] }, { status: 500 })
  }
}
