import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSignup, subscribe, createRateLimiter, newsletterEnabled } from '../lib/newsletter'

const env = { BREVO_API_KEY: 'k', BREVO_LIST_ID: '7', BREVO_DOI_TEMPLATE_ID: '3' }
const now = new Date('2026-10-15T10:00:00Z')

test('parseSignup normaliza el email y exige el consentimiento', () => {
  assert.deepEqual(parseSignup({ email: '  Ana@Example.COM ', consent: true }), { ok: true, email: 'ana@example.com', trap: false })
  assert.equal(parseSignup({ email: 'ana@example.com', consent: false }).ok, false)
  assert.equal(parseSignup({ email: 'no-es-un-email', consent: true }).ok, false)
  assert.equal(parseSignup({ email: 'a'.repeat(250) + '@x.com', consent: true }).ok, false)
  assert.equal(parseSignup(null).ok, false)
  const r = parseSignup({ email: 'ana@example.com', consent: false })
  assert.ok(!r.ok && r.status === 400)
})

test('parseSignup marca como trampa si el campo oculto viene relleno', () => {
  assert.deepEqual(parseSignup({ email: 'bot@example.com', consent: true, web: 'http://spam' }), { ok: true, email: 'bot@example.com', trap: true })
})

test('newsletterEnabled exige las tres variables', () => {
  assert.equal(newsletterEnabled(env), true)
  assert.equal(newsletterEnabled({ BREVO_API_KEY: 'k' }), false)
})

test('subscribe llama al endpoint de doble confirmación de Brevo con el consentimiento', async () => {
  const calls: { url: string; init: RequestInit }[] = []
  const fetchMock = (async (url: string, init: RequestInit) => {
    calls.push({ url, init })
    return new Response(null, { status: 204 })
  }) as unknown as typeof fetch
  const r = await subscribe('ana@example.com', { fetch: fetchMock, env, now, source: '/resumen-semanal' })
  assert.deepEqual(r, { ok: true })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation')
  assert.equal((calls[0].init.headers as Record<string, string>)['api-key'], 'k')
  const body = JSON.parse(calls[0].init.body as string)
  assert.deepEqual(body.includeListIds, [7])
  assert.equal(body.templateId, 3)
  assert.equal(body.redirectionUrl, 'https://criptoworld.org/boletin/confirmado')
  assert.equal(body.attributes.CONSENT_DATE, '2026-10-15T10:00:00.000Z')
  assert.equal(body.attributes.CONSENT_SOURCE, '/resumen-semanal')
})

test('subscribe devuelve 503 sin configuración y un error genérico si Brevo falla', async () => {
  const never = (async () => { throw new Error('no debería llamarse') }) as unknown as typeof fetch
  assert.deepEqual(await subscribe('ana@example.com', { fetch: never, env: {}, now }), { ok: false, status: 503, error: 'El boletín todavía no está disponible.' })
  const fail = (async () => new Response(JSON.stringify({ code: 'invalid_parameter', message: 'secreto interno' }), { status: 400 })) as unknown as typeof fetch
  const r = await subscribe('ana@example.com', { fetch: fail, env, now })
  assert.equal(r.ok, false)
  assert.ok(!r.ok && r.status === 502 && !r.error.includes('secreto'))
  const boom = (async () => { throw new Error('red caída') }) as unknown as typeof fetch
  const r2 = await subscribe('ana@example.com', { fetch: boom, env, now })
  assert.ok(!r2.ok && r2.status === 502)
})

test('el límite permite 5 peticiones por IP cada 10 minutos', () => {
  const limit = createRateLimiter(5, 10 * 60_000)
  const t = now.getTime()
  for (let i = 0; i < 5; i++) assert.equal(limit('1.1.1.1', t + i), true)
  assert.equal(limit('1.1.1.1', t + 10), false)
  assert.equal(limit('2.2.2.2', t + 10), true)
  assert.equal(limit('1.1.1.1', t + 10 * 60_000 + 1), true)
})

test('si Brevo rechaza la petición, se registra su código de error sin el email', async () => {
  const logged: string[] = []
  const orig = console.error
  console.error = (...a: unknown[]) => { logged.push(a.join(' ')) }
  try {
    const fail = (async () => new Response(JSON.stringify({ code: 'invalid_parameter', message: 'Template is not a valid double opt-in template' }), { status: 400 })) as unknown as typeof fetch
    await subscribe('ana@example.com', { fetch: fail, env, now })
  } finally {
    console.error = orig
  }
  assert.equal(logged.length, 1)
  assert.match(logged[0], /Brevo 400 invalid_parameter: Template is not a valid double opt-in template/)
  assert.ok(!logged[0].includes('ana@example.com'))
})
