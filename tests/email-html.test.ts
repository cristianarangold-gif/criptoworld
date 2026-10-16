import { test } from 'node:test'
import assert from 'node:assert/strict'
import { digestToEmailHtml, createDraft } from '../lib/email-html'
import { loadDigests } from '../lib/digests'

const digest = { ...loadDigests('tests/fixtures/resumenes')[0], body: '## Las noticias de la semana\n\n- **MiCA** y [la guía](/aprende/mica-regulacion-cripto-espana) <script>x</script> & más\n\nOtro párrafo con *énfasis* y [fuente](https://example.com).' }
const SITE = 'https://criptoworld.org'

test('digestToEmailHtml convierte el resumen en HTML de email con enlaces absolutos y baja', () => {
  const html = digestToEmailHtml(digest, SITE)
  assert.match(html, /<h1[^>]*>Resumen de ejemplo, semana 42<\/h1>/)
  assert.match(html, /<h2[^>]*>Las noticias de la semana<\/h2>/)
  assert.match(html, /<li[^>]*><strong>MiCA<\/strong> y <a href="https:\/\/criptoworld\.org\/aprende\/mica-regulacion-cripto-espana"/)
  assert.match(html, /<a href="https:\/\/example\.com"/)
  assert.match(html, /<em>énfasis<\/em>/)
  assert.ok(html.includes('&lt;script&gt;x&lt;/script&gt; &amp; más'))
  assert.ok(!html.includes('<script>'))
  assert.ok(html.includes(`${SITE}/resumen-semanal/2026-semana-42`))
  assert.ok(html.includes('{{ unsubscribe }}'))
})

test('createDraft crea una campaña en borrador y nunca la envía', async () => {
  const calls: { url: string; body: any }[] = []
  const fetchMock = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(init.body as string) })
    return new Response(JSON.stringify({ id: 42 }), { status: 201 })
  }) as unknown as typeof fetch
  const r = await createDraft(digest, { fetch: fetchMock, env: { BREVO_API_KEY: 'k', BREVO_LIST_ID: '7' }, siteUrl: SITE })
  assert.deepEqual(r, { ok: true, id: 42 })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://api.brevo.com/v3/emailCampaigns')
  assert.ok(!calls.some(c => /sendNow|sendTest/.test(c.url)))
  const b = calls[0].body
  assert.equal(b.subject, 'Resumen de ejemplo, semana 42')
  assert.deepEqual(b.sender, { name: 'CriptoMundo', email: 'contacto@criptoworld.org' })
  assert.deepEqual(b.recipients, { listIds: [7] })
  assert.match(b.htmlContent, /unsubscribe/)
  assert.equal(b.scheduledAt, undefined)
})

test('createDraft sin configuración no llama a Brevo', async () => {
  const never = (async () => { throw new Error('no') }) as unknown as typeof fetch
  const r = await createDraft(digest, { fetch: never, env: {}, siteUrl: SITE })
  assert.equal(r.ok, false)
})
