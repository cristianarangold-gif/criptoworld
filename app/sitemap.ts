import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const locales = ['en', 'es'];
  const staticPages = ['', '/markets', '/news', '/learn', '/legal/terms', '/legal/privacy', '/legal/cookies', '/legal/risk-disclosure'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'hourly' : 'weekly',
        priority: page === '' ? 1 : 0.7,
      });
    }
  }

  return entries;
}
