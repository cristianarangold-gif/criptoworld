// Genera data/historico-mensual.json: cierre mensual en euros de 8 criptomonedas.
// Cierre mensual del par XXXUSDT en Binance ÷ último tipo EUR/USD del BCE de ese mes (1 USDT ≈ 1 USD).
// Uso: node scripts/actualizar-historico.mjs  (a mano, una vez al mes)
import { writeFileSync } from 'node:fs'

const COINS = {
  btc: 'Bitcoin', eth: 'Ethereum', bnb: 'BNB', sol: 'Solana', trx: 'Tron', avax: 'Avalanche', dot: 'Polkadot', ltc: 'Litecoin',
  xrp: 'XRP', ada: 'Cardano', doge: 'Dogecoin', link: 'Chainlink',
}
const ECB = 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?format=csvdata&startPeriod=2017-01-01'
const klines = s => `https://api.binance.com/api/v3/klines?symbol=${s}USDT&interval=1M&limit=1000`

const get = async url => {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r
}
const month = ms => new Date(ms).toISOString().slice(0, 7)
const round6 = n => Number(n.toPrecision(6))

// Último tipo diario de cada mes: { 'AAAA-MM': usdPorEur }
const csv = (await (await get(ECB)).text()).trim().split('\n')
const head = csv[0].split(',')
const iDate = head.indexOf('TIME_PERIOD'), iVal = head.indexOf('OBS_VALUE')
const fx = {}
for (const line of csv.slice(1)) {
  const c = line.split(',')
  const v = parseFloat(c[iVal])
  if (isFinite(v)) fx[c[iDate].slice(0, 7)] = v // las filas van en orden: gana la última del mes
}

const now = Date.now()
const monedas = {}
for (const [id, nombre] of Object.entries(COINS)) {
  const rows = await (await get(klines(id.toUpperCase()))).json()
  const cierres = rows
    .filter(k => k[6] < now) // solo meses cerrados
    .map(k => {
      const m = month(k[0])
      if (!fx[m]) throw new Error(`Sin tipo del BCE para ${m}`)
      return [m, round6(parseFloat(k[4]) / fx[m])]
    })
  monedas[id] = { nombre, desde: cierres[0][0], cierres }
  console.log(`${id}: ${cierres.length} meses (${cierres[0][0]} → ${cierres.at(-1)[0]})`)
}

const out = {
  actualizado: new Date().toISOString().slice(0, 10),
  fuentes: [
    'Binance, cierres mensuales de los pares XXX/USDT (api.binance.com/api/v3/klines)',
    'Banco Central Europeo, tipo de cambio de referencia EUR/USD (data-api.ecb.europa.eu)',
  ],
  monedas,
}
writeFileSync(new URL('../data/historico-mensual.json', import.meta.url), JSON.stringify(out) + '\n')
