export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10) || 20, 100);
  const featured = searchParams.get('featured');

  const where: Record<string, unknown> = { status: 'PUBLISHED' };
  if (category) where.category = { slug: category };
  if (featured === 'true') where.featured = true;

  const articles = await prisma.newsArticle.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  const data = articles.map((a: Record<string, unknown>) => ({
    ...a,
    createdAt: (a.createdAt as Date)?.toISOString?.() ?? null,
    updatedAt: (a.updatedAt as Date)?.toISOString?.() ?? null,
    originalPublishedAt: (a.originalPublishedAt as Date | null)?.toISOString?.() ?? null,
  }));

  return NextResponse.json({ data });
}
