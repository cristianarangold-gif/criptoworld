import { NextRequest, NextResponse } from 'next/server'
import { parseSignup, subscribe, createRateLimiter } from '@/lib/newsletter'

const limit = createRateLimiter(5, 10 * 60_000)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconocida'
  if (!limit(ip, Date.now())) return NextResponse.json({ ok: false, error: 'Demasiados intentos. Prueba de nuevo en unos minutos.' }, { status: 429 })

  const parsed = parseSignup(await req.json().catch(() => null))
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status })
  if (parsed.trap) return NextResponse.json({ ok: true })

  const source = req.headers.get('referer')?.replace(/^https?:\/\/[^/]+/, '').slice(0, 100) || 'web'
  const r = await subscribe(parsed.email, { fetch, env: { BREVO_API_KEY: process.env.BREVO_API_KEY, BREVO_LIST_ID: process.env.BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID: process.env.BREVO_DOI_TEMPLATE_ID }, now: new Date(), source })
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: r.error }, { status: r.status })
}
