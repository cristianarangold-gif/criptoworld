import { prisma } from '@/lib/db'
import { headers } from 'next/headers'
import { MetadataRoute } from 'next'
import { getAllLessons } from '@/lib/academia-data'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hdrs = await headers()
  const host = hdrs.get('x-forwarded-host') || process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const baseUrl = host.startsWith('http') ? host : `https://${host}`

  const articles = await prisma.article.findMany({ select: { slug: true, updatedAt: true } }).catch(() => [])

  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/mercado`, changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: `${baseUrl}/noticias`, changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: `${baseUrl}/aprende`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/academia`, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/herramientas`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/aviso-legal`, changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  const articlePages = (articles ?? []).map((a: any) => ({
    url: `${baseUrl}/aprende/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const lessonPages = getAllLessons().map(l => ({
    url: `${baseUrl}/academia/${l.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages, ...lessonPages]
}
