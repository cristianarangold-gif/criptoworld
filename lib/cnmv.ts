import registro from '../data/cnmv-registro.json'
import cambios from '../data/cnmv-cambios.json'

// Lista de proveedores de servicios de criptoactivos de la CNMV. La CNMV la publica en PDF; scripts/actualizar-cnmv.ts
// la convierte en data/cnmv-registro.json y anota las altas y bajas en data/cnmv-cambios.json.

export type TipoEntidad = 'espanola' | 'banco' | 'sucursal' | 'pasaporte' | 'desconocido'
export interface ServicioEntidad { servicio: string; desde: string | null }
export interface Entidad { nombre: string; tipo: TipoEntidad; pais: string | null; servicios: ServicioEntidad[] }
export interface Registro { fecha: string; comprobado: string; url: string; entidades: Entidad[] }
export interface Cambio { fecha: string; altas: string[]; bajas: string[] }
export interface Cambios { inicio: string; cambios: Cambio[] }

export const TIPOS: { id: TipoEntidad; label: string }[] = [
  { id: 'espanola', label: 'Empresa española' },
  { id: 'banco', label: 'Banco español' },
  { id: 'sucursal', label: 'Extranjera con sucursal en España' },
  { id: 'pasaporte', label: 'Extranjera con pasaporte europeo' },
]

export const SERVICIOS = [
  'Custodia y administración',
  'Gestión plataforma de negociación',
  'Canje criptos por fondos',
  'Canje criptos por criptos',
  'Ejecución',
  'Colocación',
  'Recepción y transmisión órdenes',
  'Asesoramiento',
  'Gestión de carteras',
  'Servicios de transferencia',
]

export const PAISES = [
  'Alemania', 'Austria', 'Bélgica', 'Bulgaria', 'Chipre', 'Croacia', 'Dinamarca', 'Eslovaquia', 'Eslovenia', 'España',
  'Estonia', 'Finlandia', 'Francia', 'Grecia', 'Hungría', 'Irlanda', 'Islandia', 'Italia', 'Letonia', 'Liechtenstein',
  'Lituania', 'Luxemburgo', 'Malta', 'Noruega', 'Países Bajos', 'Polonia', 'Portugal', 'República Checa', 'Rumanía', 'Suecia',
]

export const normalizeSearch = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()

const PAIS_POR_CLAVE = new Map(PAISES.map(p => [normalizeSearch(p), p]))
const ERRATAS_PAIS: Record<string, string> = { liechtensetein: 'Liechtenstein' }
const SERVICIO_POR_CLAVE: Record<string, string> = {
  'servicio de transferencia': 'Servicios de transferencia',
  'servicios de transferencias': 'Servicios de transferencia',
  'canje de criptos por criptos': 'Canje criptos por criptos',
}

function paisDe(tipo: string): string | null {
  const m = tipo.match(/\((?:Pa[ií]s\s+de\s+origen:\s*)?([^():]*)\)?\s*$/i)
  const clave = normalizeSearch(m?.[1] ?? '')
  if (!clave) return null
  return PAIS_POR_CLAVE.get(clave) ?? ERRATAS_PAIS[clave] ?? clave.toUpperCase()
}

function tipoDe(raw: string): TipoEntidad {
  if (/^ENTIDAD DE CR[EÉ]DITO \(ESPA[NÑ]A\)/i.test(raw)) return 'banco'
  if (/SUCURSAL/i.test(raw)) return 'sucursal'
  if (/^PSC \(ESPA[NÑ]A\)/i.test(raw)) return 'espanola'
  if (/R[EÉ]GIMEN (DE )?LP/i.test(raw)) return 'pasaporte'
  return 'desconocido'
}

const isoDesde = (s: string) => {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null
}

// El PDF da una fila por servicio; el nombre y el tipo solo van en la primera y la fecha se repite por bloques
// (celdas combinadas), así que un servicio sin fecha hereda la del anterior de su misma entidad.
export function parseCnmvRows(rows: string[][]): Entidad[] {
  const out: Entidad[] = []
  let fecha: string | null = null
  for (const raw of rows) {
    const c = raw.length === 7 ? [raw[0], raw[2], raw[4], raw[6]] : raw
    const [nombre, tipo, servicio, desde] = c.map(x => (x ?? '').replace(/\s+/g, ' ').trim())
    if (nombre.startsWith('Denominaci')) continue
    if (nombre) {
      out.push({ nombre, tipo: tipoDe(tipo), pais: paisDe(tipo), servicios: [] })
      fecha = null
    }
    const actual = out[out.length - 1]
    if (!actual || !servicio) continue
    fecha = isoDesde(desde) ?? fecha
    actual.servicios.push({ servicio: SERVICIO_POR_CLAVE[normalizeSearch(servicio)] ?? servicio, desde: fecha })
  }
  return out
}

export function validateCnmv(r: Registro): string[] {
  const errors: string[] = []
  const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)
  if (!isDate(r.fecha) || !isDate(r.comprobado)) errors.push('fecha no válida')
  if (!r.url.startsWith('https://')) errors.push('url no válida')
  if (r.entidades.length < 150) errors.push(`muy pocas entidades (${r.entidades.length}): ¿ha cambiado el formato del PDF?`)
  const vistos = new Set<string>()
  for (const e of r.entidades) {
    if (vistos.has(e.nombre)) errors.push(`entidad duplicada: ${e.nombre}`)
    vistos.add(e.nombre)
    if (!TIPOS.some(t => t.id === e.tipo)) errors.push(`${e.nombre}: tipo de entidad desconocido`)
    if (e.pais !== null && !PAISES.includes(e.pais)) errors.push(`${e.nombre}: país desconocido (${e.pais})`)
    if (!e.servicios.length) errors.push(`${e.nombre}: sin servicios`)
    for (const s of e.servicios) {
      if (!SERVICIOS.includes(s.servicio)) errors.push(`${e.nombre}: servicio desconocido (${s.servicio})`)
      if (s.desde !== null && !isDate(s.desde)) errors.push(`${e.nombre}: fecha no válida (${s.desde})`)
    }
  }
  return errors
}

export function diffEntidades(antes: string[], ahora: string[]): { altas: string[]; bajas: string[] } {
  const a = new Set(antes)
  const b = new Set(ahora)
  return { altas: ahora.filter(n => !a.has(n)), bajas: antes.filter(n => !b.has(n)) }
}

export function summarize(entidades: Entidad[]) {
  const porPais = new Map<string, number>()
  for (const e of entidades) if (e.pais) porPais.set(e.pais, (porPais.get(e.pais) ?? 0) + 1)
  return {
    total: entidades.length,
    espanolas: entidades.filter(e => e.tipo === 'espanola' || e.tipo === 'banco').length,
    paises: [...porPais].map(([pais, n]) => ({ pais, n })).sort((x, y) => y.n - x.n || x.pais.localeCompare(y.pais, 'es')),
  }
}

export const getRegistro = () => registro as Registro
export const getCambios = () => cambios as Cambios
export const entidadNames = () => getRegistro().entidades.map(e => e.nombre)
