import { SITE } from '@/lib/site'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = SITE.url

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/area-personal/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
