export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getNews } from '@/lib/rss'

export async function GET() {
  try {
    const news = await getNews()
    return NextResponse.json(news)
  } catch {
    return NextResponse.json([])
  }
}
