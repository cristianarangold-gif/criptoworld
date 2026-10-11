export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { aggregateNews } from '@/lib/api/rss-aggregator';

export async function GET(request: Request) {
  // Protect with a simple token
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const expected = process.env.CRON_SECRET;
  if (expected && token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await aggregateNews();
    return NextResponse.json({ ...result, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('News cron error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
