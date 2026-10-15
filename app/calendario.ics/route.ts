import { getCalendar, toIcs } from '@/lib/calendar'
import { SITE } from '@/lib/site'

// Suscripción al calendario completo (Google Calendar, iPhone, Outlook).
export const revalidate = 86400

export function GET() {
  const ics = toIcs(getCalendar().eventos, { name: 'CriptoMundo: calendario cripto y fiscal', url: `${SITE.url}/calendario` })
  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="criptomundo.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
