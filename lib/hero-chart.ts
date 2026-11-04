import data from '../data/historico-mensual.json'

// Gráfico de la portada: historia real de bitcoin en euros, con cierres mensuales de data/historico-mensual.json.

export type Cierre = [string, number]
export interface Hito { mes: string; titulo: string; href: string }
export interface HitoEnGrafico extends Hito { x: number; y: number }

// En orden cronológico: la numeración del gráfico remite a la lista de debajo.
export const HITOS: Hito[] = [
  { mes: '2020-05', titulo: 'Tercer halving de Bitcoin', href: '/academia/bitcoin' },
  { mes: '2022-05', titulo: 'La stablecoin UST pierde su paridad', href: '/academia/stablecoin' },
  { mes: '2022-11', titulo: 'Quiebra del exchange FTX', href: '/academia/wallet' },
  { mes: '2024-04', titulo: 'Cuarto halving de Bitcoin', href: '/academia/bitcoin' },
  { mes: '2024-12', titulo: 'MiCA se aplica por completo en la UE', href: '/aprende/mica-regulacion-cripto-espana' },
]

const r2 = (n: number) => Math.round(n * 100) / 100

// Mayor caída desde un máximo anterior, en porcentaje entero.
export function peorCaida(cierres: Cierre[]): { pct: number; desde: string; hasta: string } {
  let [maxMes, max] = cierres[0]
  let peor = { pct: 0, desde: maxMes, hasta: maxMes }
  for (const [mes, valor] of cierres) {
    if (valor > max) [maxMes, max] = [mes, valor]
    const pct = Math.round(((max - valor) / max) * 100)
    if (pct > peor.pct) peor = { pct, desde: maxMes, hasta: mes }
  }
  return peor
}

// x e y van de 0 a 100 (y = 0 arriba), para usarlos en el SVG y en los marcadores en porcentaje.
export function buildChart(cierres: Cierre[], techo: number, hitos: Hito[]) {
  const x = (i: number) => r2((i / (cierres.length - 1)) * 100)
  const y = (v: number) => r2(100 - (v / techo) * 100)
  return {
    linea: cierres.map(([, v], i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' '),
    hitos: hitos.map((h): HitoEnGrafico => {
      const i = cierres.findIndex(([mes]) => mes === h.mes)
      if (i < 0) throw new Error(`El hito ${h.mes} no está en la serie`)
      return { ...h, x: x(i), y: y(cierres[i][1]) }
    }),
  }
}

export function getBitcoinChart() {
  const cierres = data.monedas.btc.cierres as Cierre[]
  const maximo = Math.max(...cierres.map(([, v]) => v))
  const techo = Math.ceil(maximo / 25000) * 25000
  const ejeY = Array.from({ length: techo / 25000 + 1 }, (_, i) => i * 25000)
  const anios = [...new Set(cierres.map(([m]) => m.slice(0, 4)))].filter(a => Number(a) % 2 === 0)
  const ejeX = anios.map(a => ({ anio: a, x: r2((cierres.findIndex(([m]) => m === `${a}-01`) / (cierres.length - 1)) * 100) }))
  return {
    ...buildChart(cierres, techo, HITOS),
    techo, ejeY, ejeX, maximo,
    desde: cierres[0][0],
    hasta: cierres[cierres.length - 1][0],
    peor: peorCaida(cierres),
  }
}
