import { getAllGuides } from '@/lib/guides'
import { getAllTools } from '@/lib/tools'
import { MetadataRoute } from 'next'
import { getAllLessons } from '@/lib/academia-data'
import { SITE } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url


  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/mercado`, changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: `${baseUrl}/aprende`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/academia`, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/herramientas`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/sobre-nosotros`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contacto`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/aviso-legal`, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${baseUrl}/privacidad`, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${baseUrl}/cookies`, changeFrequency: 'yearly' as const, priority: 0.2 },
  ]

  const articlePages = getAllGuides().map(g => ({
    url: `${baseUrl}/aprende/${g.slug}`,
    lastModified: new Date(`${g.updated}T12:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const lessonPages = getAllLessons().map(l => ({
    url: `${baseUrl}/academia/${l.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolPages = getAllTools().map(t => ({
    url: `${baseUrl}/herramientas/${t.slug}`,
    lastModified: new Date(`${t.updated}T12:00:00Z`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...lessonPages, ...toolPages]
}
