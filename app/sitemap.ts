import { getAllGuides } from '@/lib/guides'
import { getAllTools } from '@/lib/tools'
import { MetadataRoute } from 'next'
import { getAllLessons } from '@/lib/academia-data'
import { SITE } from '@/lib/site'
import { getAllNews } from '@/lib/news'
import { getAllAnswers } from '@/lib/answers'
import { getAllCoins } from '@/lib/coins'
import { getAllDigests } from '@/lib/digests'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url


  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/mercado`, changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: `${baseUrl}/aprende`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/academia`, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/herramientas`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/glosario`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/noticias`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/resumen-semanal`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/calendario`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/comparador-exchanges`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/cripto`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/respuestas`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/empieza-aqui`, changeFrequency: 'monthly' as const, priority: 0.9 },
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

  const newsPages = getAllNews().map(n => ({
    url: `${baseUrl}/noticias/${n.slug}`,
    lastModified: new Date(`${n.fecha}T12:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const answerPages = getAllAnswers().map(a => ({
    url: `${baseUrl}/respuestas/${a.slug}`,
    lastModified: new Date(`${a.updated}T12:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const coinPages = getAllCoins().map(c => ({
    url: `${baseUrl}/cripto/${c.slug}`,
    lastModified: new Date(`${c.updated}T12:00:00Z`),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const digestPages = getAllDigests().map(d => ({
    url: `${baseUrl}/resumen-semanal/${d.slug}`,
    lastModified: new Date(`${d.publicado}T12:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...digestPages, ...newsPages, ...answerPages, ...coinPages, ...articlePages, ...lessonPages, ...toolPages]
}
