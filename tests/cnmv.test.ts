import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseCnmvRows, validateCnmv, diffEntidades, normalizeSearch, summarize, getRegistro, getCambios, entidadNames, type Entidad, type Registro } from '../lib/cnmv'

const PSC_DE = 'PSC EN RÉGIMEN DE LP (País de origen: ALEMANIA)'

test('parseCnmvRows une las filas de cada entidad y hereda la fecha de los servicios', () => {
  const r = parseCnmvRows([
    ['Denominación', 'Tipos de entidad', 'Servicios MiCA que presta', 'Fecha a partir de la cual puede prestar servicios MiCA'],
    ['BITGO EUROPE GMBH', PSC_DE, 'Custodia y administración', '13/05/2025'],
    ['', '', 'Servicio de transferencia', ''],
    ['', '', 'Canje criptos por fondos', '21/09/2025'],
    ['', '', 'Ejecución', ''],
  ])
  assert.deepEqual(r, [{
    nombre: 'BITGO EUROPE GMBH',
    tipo: 'pasaporte',
    pais: 'Alemania',
    servicios: [
      { servicio: 'Custodia y administración', desde: '2025-05-13' },
      { servicio: 'Servicios de transferencia', desde: '2025-05-13' },
      { servicio: 'Canje criptos por fondos', desde: '2025-09-21' },
      { servicio: 'Ejecución', desde: '2025-09-21' },
    ],
  }])
})

test('parseCnmvRows acepta las filas de 7 columnas que da el PDF en algunas páginas', () => {
  const r = parseCnmvRows([['ACME SA', '', 'PSC (ESPAÑA)', '', 'Asesoramiento', '', '01/02/2026']])
  assert.deepEqual(r, [{ nombre: 'ACME SA', tipo: 'espanola', pais: 'España', servicios: [{ servicio: 'Asesoramiento', desde: '2026-02-01' }] }])
})

test('parseCnmvRows clasifica cada tipo y corrige las erratas de país del PDF', () => {
  const pais = (tipo: string) => parseCnmvRows([['X', tipo, 'Ejecución', '01/01/2026']])[0]
  assert.deepEqual([pais('ENTIDAD DE CRÉDITO (ESPAÑA)').tipo, pais('ENTIDAD DE CRÉDITO (ESPAÑA)').pais], ['banco', 'España'])
  const sucursal = pais('PSC QUE PRESTA SERVICIOS EN ESPAÑA A TRAVÉS DE SUCURSAL (País de origen: ALEMANIA)')
  assert.deepEqual([sucursal.tipo, sucursal.pais], ['sucursal', 'Alemania'])
  assert.equal(pais('PSC EN RÉGIMEN DE LP (País de origen: LIECHTENSETEIN)').pais, 'Liechtenstein')
  assert.equal(pais('PSC EN RÉGIMEN DE LP (País de origen: MALTA').pais, 'Malta')
  assert.equal(pais('PSC EN RÉGIMEN LP (País de origen: PAISES BAJOS)').pais, 'Países Bajos')
  assert.equal(pais('PSC EN RÉGIMEN DE LP (LITUANIA)').pais, 'Lituania')
  assert.equal(pais('PSC EN RÉGIMEN DE LP (País de origen:').pais, null)
})

test('parseCnmvRows deja sin fecha lo que el PDF no fecha y normaliza los servicios', () => {
  const [e] = parseCnmvRows([
    ['SYGNUM EUROPE AG', 'PSC EN RÉGIMEN DE LP (País de origen: LIECHTENSTEIN)', 'Custodia y administración', ''],
    ['', '', 'Canje de criptos por criptos', ''],
    ['', '', 'Servicios de transferencias', ''],
  ])
  assert.deepEqual(e.servicios, [
    { servicio: 'Custodia y administración', desde: null },
    { servicio: 'Canje criptos por criptos', desde: null },
    { servicio: 'Servicios de transferencia', desde: null },
  ])
})

const entidad = (nombre: string, patch: Partial<Entidad> = {}): Entidad => ({
  nombre, tipo: 'pasaporte', pais: 'Malta', servicios: [{ servicio: 'Ejecución', desde: '2026-01-01' }], ...patch,
})
const registro = (entidades: Entidad[]): Registro => ({ fecha: '2026-10-20', comprobado: '2026-11-03', url: 'https://cnmv.es/x.pdf', entidades })

test('validateCnmv detecta datos que no se deben publicar', () => {
  const muchas = Array.from({ length: 150 }, (_, i) => entidad(`E${i}`))
  assert.deepEqual(validateCnmv(registro(muchas)), [])
  const cases: [Registro, RegExp][] = [
    [registro(muchas.slice(0, 20)), /pocas/],
    [registro([...muchas, entidad('E0')]), /duplicada/],
    [registro([...muchas, entidad('T', { tipo: 'desconocido' })]), /tipo/],
    [registro([...muchas, entidad('P', { pais: 'Atlantis' })]), /país/],
    [registro([...muchas, entidad('S', { servicios: [{ servicio: 'Magia', desde: null }] })]), /servicio/],
    [registro([...muchas, entidad('V', { servicios: [] })]), /sin servicios/],
    [{ ...registro(muchas), fecha: 'ayer' }, /fecha/],
    [{ ...registro(muchas), url: 'http://x' }, /url/],
  ]
  for (const [r, re] of cases) assert.ok(validateCnmv(r).some(e => re.test(e)), String(re))
})

test('diffEntidades da las altas y las bajas por nombre', () => {
  assert.deepEqual(diffEntidades(['A', 'B'], ['B', 'C', 'D']), { altas: ['C', 'D'], bajas: ['A'] })
  assert.deepEqual(diffEntidades(['A'], ['A']), { altas: [], bajas: [] })
})

test('normalizeSearch ignora mayúsculas y acentos', () => {
  assert.equal(normalizeSearch('  Países  BAJOS '), 'paises bajos')
})

test('summarize cuenta el total, las españolas y los países', () => {
  const s = summarize([entidad('A'), entidad('B'), entidad('C', { pais: 'Chipre' }), entidad('D', { tipo: 'banco', pais: 'España' }), entidad('E', { pais: null })])
  assert.equal(s.total, 5)
  assert.equal(s.espanolas, 1)
  assert.deepEqual(s.paises[0], { pais: 'Malta', n: 2 })
  assert.equal(s.paises.some(p => p.pais === null), false)
})

test('los datos publicados son válidos e incluyen las plataformas conocidas', () => {
  const r = getRegistro()
  assert.deepEqual(validateCnmv(r), [])
  const names = entidadNames()
  for (const n of ['BITCOINFORME, S.L. (BIT2ME)', 'COINBASE LUXEMBOURG S.A.']) assert.ok(names.includes(n), n)
  assert.equal(getCambios().inicio, r.fecha)
})
