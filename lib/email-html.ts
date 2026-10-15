import type { Digest } from './digests'

// Convierte un resumen semanal en el HTML del boletín y crea el borrador en Brevo.
// Solo crea borradores: el propietario revisa y envía desde Brevo. No hay ninguna llamada de envío.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const A = 'color:#d97706;text-decoration:underline'

function inline(text: string, siteUrl: string): string {
  let out = esc(text)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const url = href.startsWith('/') ? `${siteUrl}${href}` : href.replace(/&amp;/g, '&')
    return `<a href="${esc(url)}" style="${A}">${label}</a>`
  })
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
  return out
}

export function markdownToEmail(md: string, siteUrl: string): string {
  const html: string[] = []
  let list: string[] = []
  const flush = () => {
    if (list.length) html.push(`<ul style="padding-left:20px;margin:0 0 16px">${list.join('')}</ul>`)
    list = []
  }
  for (const block of md.split(/\n{2,}/)) {
    const lines = block.trim().split('\n')
    if (!lines[0]) continue
    if (lines[0].startsWith('## ')) {
      flush()
      html.push(`<h2 style="font-size:18px;margin:24px 0 8px;color:#111">${inline(lines[0].slice(3), siteUrl)}</h2>`)
      if (lines.length > 1) html.push(`<p style="margin:0 0 16px">${inline(lines.slice(1).join(' '), siteUrl)}</p>`)
    } else if (lines.every(l => /^[-*] /.test(l))) {
      list.push(...lines.map(l => `<li style="margin:0 0 8px">${inline(l.slice(2), siteUrl)}</li>`))
    } else {
      flush()
      html.push(`<p style="margin:0 0 16px">${inline(lines.join(' '), siteUrl)}</p>`)
    }
  }
  flush()
  return html.join('\n')
}

export function digestToEmailHtml(d: Digest, siteUrl: string): string {
  const web = `${siteUrl}/resumen-semanal/${d.slug}`
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(d.titulo)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#27272a;line-height:1.55">
<div style="max-width:600px;margin:0 auto;background:#ffffff;padding:28px 24px">
<p style="margin:0 0 4px;font-size:13px;color:#d97706;font-weight:bold">CriptoMundo · Resumen semanal</p>
<h1 style="font-size:24px;margin:0 0 8px;color:#111">${esc(d.titulo)}</h1>
<p style="margin:0 0 20px;color:#52525b">${esc(d.descripcion)}</p>
<p style="margin:0 0 24px;font-size:13px"><a href="${esc(web)}" style="${A}">Leer en la web</a></p>
${markdownToEmail(d.body, siteUrl)}
<hr style="border:none;border-top:1px solid #e4e4e7;margin:28px 0 16px">
<p style="font-size:12px;color:#71717a;margin:0 0 8px">Información general con fines divulgativos; no es asesoramiento financiero ni una recomendación de inversión.</p>
<p style="font-size:12px;color:#71717a;margin:0">Recibes este email porque te suscribiste al boletín de <a href="${siteUrl}" style="${A}">criptoworld.org</a>. <a href="{{ unsubscribe }}" style="${A}">Darte de baja</a>.</p>
</div></body></html>`
}

type DraftEnv = Partial<Record<'BREVO_API_KEY' | 'BREVO_LIST_ID', string>>

export async function createDraft(
  d: Digest,
  deps: { fetch: typeof fetch; env: DraftEnv; siteUrl: string }
): Promise<{ ok: true; id: number } | { ok: false; error: string }> {
  if (!deps.env.BREVO_API_KEY || !deps.env.BREVO_LIST_ID) return { ok: false, error: 'Brevo no está configurado' }
  const res = await deps.fetch('https://api.brevo.com/v3/emailCampaigns', {
    method: 'POST',
    headers: { 'api-key': deps.env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      name: `Resumen semanal ${d.slug}`,
      subject: d.titulo,
      previewText: d.descripcion,
      sender: { name: 'CriptoMundo', email: 'contacto@criptoworld.org' },
      replyTo: 'contacto@criptoworld.org',
      htmlContent: digestToEmailHtml(d, deps.siteUrl),
      recipients: { listIds: [Number(deps.env.BREVO_LIST_ID)] },
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (res.ok && typeof data.id === 'number') return { ok: true, id: data.id }
  return { ok: false, error: `Brevo respondió ${res.status}` }
}
