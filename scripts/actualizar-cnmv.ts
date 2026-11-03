// Actualiza la lista de la CNMV a partir de las filas que da scripts/cnmv_pdf_a_filas.py.
// Uso: npx tsx scripts/actualizar-cnmv.ts filas.json [AAAA-MM-DD de hoy]
// Si los datos no pasan la validación no escribe nada y termina con error.
import fs from 'node:fs'
import path from 'node:path'
import { parseCnmvRows, validateCnmv, diffEntidades, type Cambios, type Registro } from '../lib/cnmv'

const URL_PDF = 'https://cnmv.es/Docportal/Proveedores-Servicios-Criptoactivos/Listado_ProveedoresCriptoactivos.pdf'
const dataFile = (name: string) => path.join(process.cwd(), 'data', name)
const readJson = <T,>(file: string) => (fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as T) : null)
const writeJson = (file: string, value: unknown) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n')

const [filasPath, hoyArg] = process.argv.slice(2)
if (!filasPath) throw new Error('Falta el archivo de filas')
const hoy = hoyArg ?? new Date().toISOString().slice(0, 10)
const { fecha, filas } = JSON.parse(fs.readFileSync(filasPath, 'utf8')) as { fecha: string; filas: string[][] }

const nuevo: Registro = { fecha, comprobado: hoy, url: URL_PDF, entidades: parseCnmvRows(filas) }
const errores = validateCnmv(nuevo)
if (errores.length) {
  console.error(`Datos no válidos, no se escribe nada:\n- ${errores.join('\n- ')}`)
  process.exit(1)
}

const anterior = readJson<Registro>(dataFile('cnmv-registro.json'))
const cambios = readJson<Cambios>(dataFile('cnmv-cambios.json')) ?? { inicio: fecha, cambios: [] }
if (anterior) {
  const { altas, bajas } = diffEntidades(anterior.entidades.map(e => e.nombre), nuevo.entidades.map(e => e.nombre))
  if (altas.length || bajas.length) cambios.cambios.unshift({ fecha, altas, bajas })
  console.log(`Altas: ${altas.join(', ') || 'ninguna'}\nBajas: ${bajas.join(', ') || 'ninguna'}`)
}
writeJson(dataFile('cnmv-registro.json'), nuevo)
writeJson(dataFile('cnmv-cambios.json'), cambios)
console.log(`Lista del ${fecha}: ${nuevo.entidades.length} entidades.`)
