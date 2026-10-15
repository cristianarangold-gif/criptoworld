import { getCalendar, toIcs } from '@/lib/calendar'
import { SITE } from '@/lib/site'

// Un solo evento: /calendario/<id>.ics
export function generateStaticParams() {
  return getCalendar().eventos.map(e => ({ id: `${e.id}.ics` }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const e = id.endsWith('.ics') ? getCalendar().eventos.find(x => x.id === id.slice(0, -4)) : undefined
  if (!e) return new Response('No encontrado', { status: 404 })
  const ics = toIcs([e], { name: e.titulo, url: `${SITE.url}/calendario` })
  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${e.id}.ics"`,
    },
  })
}
