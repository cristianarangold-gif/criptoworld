import { headers } from 'next/headers'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const hdrs = await headers()
  const host = hdrs.get('x-forwarded-host') || process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const baseUrl = host.startsWith('http') ? host : `https://${host}`

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/area-personal/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
