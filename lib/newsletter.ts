// Suscripción al boletín con Brevo: doble confirmación (nadie entra en la lista hasta que pulsa el enlace
// del email) y registro de la fecha y el origen del consentimiento. La clave solo vive en variables de entorno.

type Env = Partial<Record<'BREVO_API_KEY' | 'BREVO_LIST_ID' | 'BREVO_DOI_TEMPLATE_ID', string>>
export type SignupResult = { ok: true } | { ok: false; status: number; error: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const CONFIRMED_URL = 'https://criptoworld.org/boletin/confirmado'

export function newsletterEnabled(env: Env = { BREVO_API_KEY: process.env.BREVO_API_KEY, BREVO_LIST_ID: process.env.BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID: process.env.BREVO_DOI_TEMPLATE_ID }): boolean {
  return !!(env.BREVO_API_KEY && env.BREVO_LIST_ID && env.BREVO_DOI_TEMPLATE_ID)
}

export function parseSignup(body: unknown): { ok: true; email: string; trap: boolean } | { ok: false; status: number; error: string } {
  const b = (body ?? {}) as { email?: unknown; consent?: unknown; web?: unknown }
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''
  if (!email || email.length > 254 || !EMAIL.test(email)) return { ok: false, status: 400, error: 'Escribe un email válido.' }
  if (b.consent !== true) return { ok: false, status: 400, error: 'Para suscribirte tienes que aceptar la política de privacidad.' }
  // «web» es un campo oculto: las personas no lo ven; si viene relleno, es un bot.
  const trap = typeof b.web === 'string' && b.web.trim() !== ''
  return { ok: true, email, trap }
}

export async function subscribe(
  email: string,
  deps: { fetch: typeof fetch; env: Env; now: Date; source?: string }
): Promise<SignupResult> {
  const { env } = deps
  if (!newsletterEnabled(env)) return { ok: false, status: 503, error: 'El boletín todavía no está disponible.' }
  try {
    const res = await deps.fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY!, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        includeListIds: [Number(env.BREVO_LIST_ID)],
        templateId: Number(env.BREVO_DOI_TEMPLATE_ID),
        redirectionUrl: CONFIRMED_URL,
        attributes: { CONSENT_DATE: deps.now.toISOString(), CONSENT_SOURCE: deps.source ?? 'web' },
      }),
    })
    if (res.ok) return { ok: true }
  } catch {
    // red caída o Brevo no responde: mismo mensaje genérico
  }
  return { ok: false, status: 502, error: 'No hemos podido completar la suscripción. Inténtalo de nuevo más tarde.' }
}

/** Límite sencillo en memoria: `max` peticiones por clave en cada ventana de `windowMs`. */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>()
  return (key: string, now: number): boolean => {
    const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
    if (recent.length >= max) {
      hits.set(key, recent)
      return false
    }
    recent.push(now)
    hits.set(key, recent)
    return true
  }
}
