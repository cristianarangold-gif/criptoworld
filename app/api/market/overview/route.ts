export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getMarketOverview } from '@/lib/api/market-data';

export async function GET() {
  const { data, source } = await getMarketOverview();
  return NextResponse.json({ data, source, timestamp: new Date().toISOString() });
}
