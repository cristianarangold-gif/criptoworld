// Crea en Brevo el borrador del boletín para cada resumen semanal recibido como argumento.
// Uso: npx tsx scripts/boletin-borrador.ts content/resumenes/2026-semana-43.md [...]
// Necesita BREVO_API_KEY y BREVO_LIST_ID (GitHub Secrets). Nunca envía: solo crea borradores.
import path from 'node:path'
import { loadDigests } from '../lib/digests'
import { createDraft } from '../lib/email-html'

async function main() {
  const files = process.argv.slice(2).filter(f => f.endsWith('.md'))
  const env = { BREVO_API_KEY: process.env.BREVO_API_KEY, BREVO_LIST_ID: process.env.BREVO_LIST_ID }
  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    console.log('::notice::Brevo no está configurado (faltan BREVO_API_KEY o BREVO_LIST_ID); no se crea ningún borrador.')
    return
  }
  const all = loadDigests(path.join(process.cwd(), 'content', 'resumenes'))
  let failed = false
  for (const f of files) {
    const d = all.find(x => x.slug === path.basename(f, '.md'))
    if (!d) {
      console.log(`::warning::No encuentro el resumen ${f}`)
      continue
    }
    const r = await createDraft(d, { fetch, env, siteUrl: 'https://criptoworld.org' })
    if (r.ok) console.log(`Borrador creado en Brevo (campaña ${r.id}) para ${d.slug}. Revísalo y envíalo desde Brevo.`)
    else {
      console.log(`::error::No se pudo crear el borrador de ${d.slug}: ${r.error}`)
      failed = true
    }
  }
  if (failed) process.exitCode = 1
}

main()
