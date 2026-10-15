// Feed RSS 2.0 con las últimas noticias y resúmenes semanales.

export type FeedItem = { title: string; url: string; date: string; description: string }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// Las publicaciones solo tienen fecha: se fija a las 08:00 UTC para que el orden sea estable.
const rfc822 = (d: string) => new Date(`${d}T08:00:00Z`).toUTCString()

export function toRss(items: FeedItem[], channel: { title: string; url: string; description: string }, max = 20): string {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date) || b.url.localeCompare(a.url)).slice(0, max)
  const body = sorted
    .map(i =>
      [
        '    <item>',
        `      <title>${esc(i.title)}</title>`,
        `      <link>${esc(i.url)}</link>`,
        `      <guid isPermaLink="true">${esc(i.url)}</guid>`,
        `      <pubDate>${rfc822(i.date)}</pubDate>`,
        `      <description>${esc(i.description)}</description>`,
        '    </item>',
      ].join('\n')
    )
    .join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(channel.title)}</title>`,
    `    <link>${esc(channel.url)}</link>`,
    `    <description>${esc(channel.description)}</description>`,
    '    <language>es-es</language>',
    `    <atom:link href="${esc(channel.url)}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...(sorted[0] ? [`    <lastBuildDate>${rfc822(sorted[0].date)}</lastBuildDate>`] : []),
    body,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
