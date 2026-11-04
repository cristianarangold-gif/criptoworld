import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildChart, peorCaida, HITOS, getBitcoinChart, type Cierre } from '../lib/hero-chart'
import { knownPaths } from '../lib/known-paths'
import { newsExcerpt, getAllNews } from '../lib/news'

const serie: Cierre[] = [['2020-01', 100], ['2020-02', 200], ['2020-03', 50], ['2020-04', 150]]

test('peorCaida mide la mayor caída desde un máximo anterior', () => {
  assert.deepEqual(peorCaida(serie), { pct: 75, desde: '2020-02', hasta: '2020-03' })
})

test('peorCaida ignora un máximo nuevo posterior al mínimo', () => {
  assert.deepEqual(peorCaida([['2020-01', 100], ['2020-02', 80], ['2020-03', 300], ['2020-04', 270]]), { pct: 20, desde: '2020-01', hasta: '2020-02' })
})

test('buildChart coloca la serie en el espacio del gráfico, con 0 abajo', () => {
  const c = buildChart(serie, 200, [{ mes: '2020-03', titulo: 'X', href: '/x' }])
  assert.ok(c.linea.startsWith('M0,50 L33.33,0 L66.67,75 L100,25'), c.linea)
  assert.deepEqual(c.hitos, [{ mes: '2020-03', titulo: 'X', href: '/x', x: 66.67, y: 75 }])
})

test('buildChart falla si un hito no está en la serie', () => {
  assert.throws(() => buildChart(serie, 200, [{ mes: '2030-01', titulo: 'X', href: '/x' }]), /2030-01/)
})

test('los hitos publicados existen en la serie real y enlazan a páginas que existen', () => {
  const chart = getBitcoinChart()
  assert.equal(chart.hitos.length, HITOS.length)
  const known = knownPaths()
  for (const h of HITOS) assert.ok(known.has(h.href), h.href)
  assert.ok(chart.ejeY.at(-1)! >= chart.maximo)
  const meses = HITOS.map(h => h.mes)
  assert.deepEqual(meses, [...meses].sort())
})

const body = 'Intro.\n\n## Qué ha pasado\n\nHechos.\n\n## Qué significa para ti si vives en España\n\nSi usas [un exchange](/x), **revisa** tu *cuenta*. Otra frase que también es importante para ti. Y una tercera.\n\nSegundo párrafo.\n\n## Para entenderlo\n\nMás.'

test('newsExcerpt da el párrafo de España en texto plano', () => {
  assert.equal(newsExcerpt(body), 'Si usas un exchange, revisa tu cuenta. Otra frase que también es importante para ti. Y una tercera.')
})

test('newsExcerpt corta por una frase completa si puede', () => {
  assert.equal(newsExcerpt(body, 50), 'Si usas un exchange, revisa tu cuenta.')
})

test('newsExcerpt corta por palabra si la frase es demasiado larga', () => {
  const r = newsExcerpt('## Qué significa para ti si vives en España\n\nUna frase muy larga sin puntos que sigue y sigue', 20)
  assert.equal(r, 'Una frase muy larga…')
})

test('newsExcerpt devuelve vacío sin esa sección, y todas las noticias tienen extracto', () => {
  assert.equal(newsExcerpt('Sin secciones'), '')
  for (const n of getAllNews()) assert.ok(newsExcerpt(n.body).length > 40, n.slug)
})
