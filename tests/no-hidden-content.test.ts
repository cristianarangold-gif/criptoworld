import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'fs'
import path from 'path'

// El contenido renderizado en el servidor nunca debe empezar oculto (ni para el público ni para Google).
// Excepciones explícitas: elementos que solo aparecen al hacer clic (no contenido inicial):
// el panel de detalle de /mercado y el formulario desplegable del área personal.
const ALLOWED = new Set(['components/mercado-client.tsx', 'components/area-personal-client.tsx'])
const PATTERNS = [/initial="hidden"/, /whileInView/, /initial=\{\{\s*opacity:\s*0/]

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return files(p)
    return p.endsWith('.tsx') ? [p] : []
  })
}

test('ningún componente de contenido arranca oculto', () => {
  const offenders = [...files('components'), ...files('app')]
    .filter(f => !ALLOWED.has(f))
    .filter(f => PATTERNS.some(re => re.test(fs.readFileSync(f, 'utf8'))))
  assert.deepEqual(offenders, [])
})
