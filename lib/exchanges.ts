import data from '../data/exchanges.json'
import type { CosteCompra } from './coste-compra'
export { comisionPublicada, porcentajeEfectivo } from './coste-compra'

// Comparador de exchanges: datos de la CNMV y de las webs oficiales, cada comisión con su fuente y fecha.
// Sin afiliados ni clasificación: el orden es alfabético. Mantenimiento en docs/mantenimiento-comparador.md.

export const PAGOS = ['sepa', 'bizum', 'tarjeta'] as const
export type Pago = (typeof PAGOS)[number]
export type Comision = { valor: string; fuente: string; comprobado: string }
export const COMISIONES = ['compra_rapida', 'mercado_taker', 'deposito_eur', 'retirada_eur'] as const

export interface Plataforma {
  slug: string
  nombre: string
  web: string
  entidad: string
  tipo: 'espanola' | 'pasaporte'
  pais: string
  desde: string
  servicios: string[]
  comisiones: Record<(typeof COMISIONES)[number], Comision>
  pagos: Pago[]
  retirada_wallet: boolean | null
  staking: boolean | null
  espanol: boolean | null
  informe_fiscal: boolean | null
  destaca: string
  ojo: string
  fuentes: { title: string; url: string }[]
  coste_compra: CosteCompra
}

export interface ExchangesFile {
  revisado: string
  plataformas: Plataforma[]
}

const validDate = (d: string, today: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d)) && d <= today

export function getExchanges(): ExchangesFile {
  const file = data as unknown as ExchangesFile
  return { ...file, plataformas: [...file.plataformas].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')) }
}

const mencionaImporte = (valor: string, n: number, unidad: string) =>
  [String(n), n.toFixed(2)].some(x => valor.includes(`${x.replace('.', ',')} ${unidad}`))

export function validateExchanges(file: ExchangesFile, cnmv: string[], today: string): string[] {
  const errors: string[] = []
  if (!validDate(file.revisado, today)) errors.push(`revisado no válido: ${file.revisado}`)
  const seen = new Set<string>()
  for (const p of file.plataformas) {
    const e = (msg: string) => errors.push(`${p.slug}: ${msg}`)
    if (seen.has(p.slug)) e('slug repetido')
    seen.add(p.slug)
    if (!cnmv.includes(p.entidad)) e(`la entidad «${p.entidad}» no figura en la lista de la CNMV`)
    for (const k of COMISIONES) {
      const c = p.comisiones?.[k]
      if (!c?.valor?.trim() || !c.fuente?.startsWith('https://') || !validDate(c.comprobado ?? '', today))
        e(`comisión ${k}: necesita valor, fuente https:// y fecha de comprobación válida`)
    }
    const unknown = p.pagos.filter(x => !(PAGOS as readonly string[]).includes(x))
    if (unknown.length) e(`método de pago desconocido: ${unknown.join(', ')}`)
    const coste = p.coste_compra
    if (!coste?.nota?.trim()) e('coste_compra: falta nota')
    const f = coste?.formula
    if (f) {
      if (!(f.porcentaje >= 0 && f.porcentaje <= 10)) e('coste_compra: porcentaje fuera de rango')
      if (!(f.porcentaje > 0 || f.fijo > 0)) e('coste_compra: fórmula sin coste')
      // Si cambia la comisión en la revisión trimestral, esto obliga a actualizar también el cálculo.
      const valor = p.comisiones?.compra_rapida?.valor ?? ''
      if (f.porcentaje > 0 && !mencionaImporte(valor, f.porcentaje, '%')) e(`coste_compra: compra_rapida no menciona ${f.porcentaje} %`)
      if (f.minimo > 0 && !mencionaImporte(valor, f.minimo, '€')) e(`coste_compra: compra_rapida no menciona ${f.minimo} €`)
      if (f.fijo > 0 && !mencionaImporte(valor, f.fijo, '€')) e(`coste_compra: compra_rapida no menciona ${f.fijo} €`)
    }
    if (!p.destaca?.trim()) e('falta destaca')
    if (!p.ojo?.trim()) e('falta ojo')
  }
  return errors
}

export const FILTROS = [
  { id: 'bizum', label: 'Bizum' },
  { id: 'tarjeta', label: 'Tarjeta' },
  { id: 'wallet', label: 'Retirada a wallet propia' },
  { id: 'staking', label: 'Staking' },
  { id: 'espanol', label: 'Web y app en español' },
] as const
export type Filtro = (typeof FILTROS)[number]['id']

/** Una plataforma cumple los filtros si cumple todos; un dato sin confirmar (null) no cumple. */
export function matchesFilters(p: Plataforma, filters: string[]): boolean {
  return filters.every(f => {
    if (f === 'bizum' || f === 'tarjeta' || f === 'sepa') return p.pagos.includes(f)
    if (f === 'wallet') return p.retirada_wallet === true
    if (f === 'staking') return p.staking === true
    if (f === 'espanol') return p.espanol === true
    return false
  })
}
