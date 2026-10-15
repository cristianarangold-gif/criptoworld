import { getAllNews } from '@/lib/news'
import { getAllDigests } from '@/lib/digests'
import { toRss } from '@/lib/feed'
import { SITE } from '@/lib/site'

export const revalidate = 3600

export function GET() {
  const items = [
    ...getAllNews().map(n => ({ title: n.titulo, url: `${SITE.url}/noticias/${n.slug}`, date: n.fecha, description: n.descripcion })),
    ...getAllDigests().map(d => ({ title: d.titulo, url: `${SITE.url}/resumen-semanal/${d.slug}`, date: d.publicado, description: d.descripcion })),
  ]
  const xml = toRss(items, { title: 'CriptoMundo: noticias y resúmenes semanales', url: SITE.url, description: 'Noticias de criptomonedas explicadas para quien vive en España y un resumen cada lunes.' })
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
