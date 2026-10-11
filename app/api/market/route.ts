export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getMarketCoins } from '@/lib/api/market-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 250);
  const { data, source } = await getMarketCoins(limit);
  return NextResponse.json({ data, source, timestamp: new Date().toISOString() });
}
