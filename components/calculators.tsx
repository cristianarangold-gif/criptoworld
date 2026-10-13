'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// Calculadoras de /herramientas. Todo se calcula en el navegador; nada se envía al servidor.
// Los importes van en euros y aceptan coma o punto como separador decimal.

const num = (v: string) => {
  const n = parseFloat(v.replace(/\s/g, '').replace(',', '.'))
  return isFinite(n) ? n : NaN
}

function fmt(n: number, dec = 2) {
  if (!isFinite(n)) return '—'
  // useGrouping 'always': en es-ES, sin esto 1200 no lleva punto de miles y 12000 sí.
  return n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: 'always' } as unknown as Intl.NumberFormatOptions)
}
const eur = (n: number, dec = 2) => (isFinite(n) ? `${fmt(n, dec)} €` : '—')
const pct = (n: number, dec = 2) => (isFinite(n) ? `${n > 0 ? '+' : ''}${fmt(n, dec)} %` : '—')
const signedEur = (n: number) => (isFinite(n) ? `${n > 0 ? '+' : ''}${fmt(n)} €` : '—')

function Field({ label, value, onChange, suffix, hint }: {
  label: string; value: string; onChange: (v: string) => void; suffix?: string; hint?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm text-muted-foreground mb-1">{label}</span>
      <span className="relative block">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-lg bg-muted/50 border border-border/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 pr-16"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>}
      </span>
      {hint && <span className="block mt-1 text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-4 items-center py-2 border-b border-border/30 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn('text-sm font-semibold text-right', highlight && 'text-primary')}>{value}</span>
    </div>
  )
}

function Results({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 glass-card rounded-lg p-4" aria-live="polite">{children}</div>
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}

// ── Rentabilidad de una inversión ──────────────────────────────────────────
function Rentabilidad() {
  const [inv, setInv] = useState('1000')
  const [buy, setBuy] = useState('50000')
  const [sell, setSell] = useState('60000')
  const [fee, setFee] = useState('0,5')
  const [drop, setDrop] = useState('50')
  const I = num(inv), B = num(buy), S = num(sell), F = num(fee) / 100, D = num(drop) / 100
  const units = (I * (1 - F)) / B
  const gross = units * S
  const net = gross * (1 - F)
  const profit = net - I
  const roi = (profit / I) * 100
  const recover = (1 / (1 - D) - 1) * 100
  return (
    <div>
      <Grid>
        <Field label="Dinero invertido" value={inv} onChange={setInv} suffix="€" />
        <Field label="Comisión por operación" value={fee} onChange={setFee} suffix="%" hint="Se aplica al comprar y al vender" />
        <Field label="Precio de compra" value={buy} onChange={setBuy} suffix="€" />
        <Field label="Precio de venta" value={sell} onChange={setSell} suffix="€" />
      </Grid>
      <Results>
        <Row label="Unidades compradas (tras comisión)" value={fmt(units, 8)} />
        <Row label="Valor al vender, antes de comisión" value={eur(gross)} />
        <Row label="Recibes tras la comisión de venta" value={eur(net)} />
        <Row label="Ganancia o pérdida" value={signedEur(profit)} highlight />
        <Row label="Rentabilidad" value={pct(roi)} highlight />
        <Row label="Variación del precio" value={pct((S / B - 1) * 100)} />
      </Results>
      <div className="mt-6">
        <Field label="Si el precio cae un…" value={drop} onChange={setDrop} suffix="%" />
        <Results>
          <Row label="…necesita subir después para recuperarte" value={D >= 1 ? 'Imposible (pérdida total)' : pct(recover)} highlight />
        </Results>
      </div>
    </div>
  )
}

// ── Simulador DCA ──────────────────────────────────────────────────────────
function Dca() {
  const [monthly, setMonthly] = useState('100')
  const [months, setMonths] = useState('12')
  const [start, setStart] = useState('50000')
  const [end, setEnd] = useState('60000')
  const M = num(monthly), N = Math.round(num(months)), P0 = num(start), P1 = num(end)
  let units = 0
  const valid = M > 0 && N >= 1 && N <= 600 && P0 > 0 && P1 > 0
  if (valid) {
    for (let i = 0; i < N; i++) {
      const price = N === 1 ? P0 : P0 + ((P1 - P0) * i) / (N - 1)
      units += M / price
    }
  }
  const invested = M * N
  const avg = invested / units
  const value = units * P1
  const lumpUnits = invested / P0
  return (
    <div>
      <Grid>
        <Field label="Aportación periódica" value={monthly} onChange={setMonthly} suffix="€" />
        <Field label="Número de aportaciones" value={months} onChange={setMonths} suffix="meses" />
        <Field label="Precio en la primera compra" value={start} onChange={setStart} suffix="€" />
        <Field label="Precio en la última compra" value={end} onChange={setEnd} suffix="€" />
      </Grid>
      <p className="mt-2 text-xs text-muted-foreground">Supone que el precio evoluciona en línea recta entre el primero y el último. La realidad nunca es así: úsalo para entender el mecanismo, no para predecir.</p>
      <Results>
        <Row label="Total invertido" value={eur(invested)} />
        <Row label="Unidades acumuladas" value={valid ? fmt(units, 8) : '—'} />
        <Row label="Precio medio de compra" value={valid ? eur(avg) : '—'} highlight />
        <Row label="Valor al precio final" value={valid ? eur(value) : '—'} />
        <Row label="Ganancia o pérdida" value={valid ? signedEur(value - invested) : '—'} highlight />
        <Row label="Si hubieras invertido todo en la primera compra" value={valid ? eur(lumpUnits * P1) : '—'} />
      </Results>
    </div>
  )
}

// ── Staking ────────────────────────────────────────────────────────────────
function Staking() {
  const [tokens, setTokens] = useState('10')
  const [price, setPrice] = useState('3000')
  const [apy, setApy] = useState('3')
  const [years, setYears] = useState('2')
  const [priceChange, setPriceChange] = useState('-30')
  const T = num(tokens), P = num(price), R = num(apy) / 100, Y = num(years), C = num(priceChange) / 100
  const finalTokens = T * Math.pow(1 + R, Y)
  const reward = finalTokens - T
  const finalPrice = P * (1 + C)
  const startValue = T * P
  const endValue = finalTokens * finalPrice
  return (
    <div>
      <Grid>
        <Field label="Tokens en staking" value={tokens} onChange={setTokens} />
        <Field label="Precio actual del token" value={price} onChange={setPrice} suffix="€" />
        <Field label="Rentabilidad anual (APY)" value={apy} onChange={setApy} suffix="%" hint="Variable y no garantizada" />
        <Field label="Periodo" value={years} onChange={setYears} suffix="años" />
        <Field label="Variación del precio en el periodo" value={priceChange} onChange={setPriceChange} suffix="%" hint="Prueba con valores negativos" />
      </Grid>
      <Results>
        <Row label="Tokens al final (recompensas reinvertidas)" value={fmt(finalTokens, 6)} />
        <Row label="Recompensas obtenidas" value={`${fmt(reward, 6)} tokens`} />
        <Row label="Valor inicial" value={eur(startValue)} />
        <Row label="Valor final con el nuevo precio" value={eur(endValue)} highlight />
        <Row label="Resultado en euros" value={signedEur(endValue - startValue)} highlight />
      </Results>
    </div>
  )
}

// ── Comisiones ─────────────────────────────────────────────────────────────
function Comisiones() {
  const [amount, setAmount] = useState('1000')
  const [fee, setFee] = useState('0,5')
  const [spread, setSpread] = useState('1')
  const [withdraw, setWithdraw] = useState('2')
  const A = num(amount), F = num(fee) / 100, S = num(spread) / 100, W = num(withdraw)
  const buyCost = A * (F + S / 2)
  const sellCost = (A - buyCost) * (F + S / 2)
  const total = buyCost + sellCost + (isFinite(W) ? W : 0)
  const share = (total / A) * 100
  const breakeven = (A / (A - total) - 1) * 100
  return (
    <div>
      <Grid>
        <Field label="Importe de la operación" value={amount} onChange={setAmount} suffix="€" />
        <Field label="Comisión explícita por operación" value={fee} onChange={setFee} suffix="%" />
        <Field label="Diferencial (spread) entre compra y venta" value={spread} onChange={setSpread} suffix="%" hint="Diferencia entre el precio de compra y el de venta que te ofrecen" />
        <Field label="Comisión fija de retirada" value={withdraw} onChange={setWithdraw} suffix="€" />
      </Grid>
      <Results>
        <Row label="Coste al comprar" value={eur(buyCost)} />
        <Row label="Coste al vender" value={eur(sellCost)} />
        <Row label="Coste total (compra, venta y retirada)" value={eur(total)} highlight />
        <Row label="Porcentaje sobre lo invertido" value={pct(share).replace('+', '')} highlight />
        <Row label="Subida mínima del precio para no perder" value={pct(breakeven)} />
      </Results>
    </div>
  )
}

// ── Capitalización ─────────────────────────────────────────────────────────
function Capitalizacion() {
  const [price, setPrice] = useState('0,50')
  const [circ, setCirc] = useState('400000000')
  const [max, setMax] = useState('1000000000')
  const [target, setTarget] = useState('5')
  const P = num(price), C = num(circ), X = num(max), T = num(target)
  const mcap = P * C
  return (
    <div>
      <Grid>
        <Field label="Precio por token" value={price} onChange={setPrice} suffix="€" />
        <Field label="Tokens en circulación" value={circ} onChange={setCirc} />
        <Field label="Oferta máxima" value={max} onChange={setMax} hint="Déjalo igual que la circulación si no hay más por emitir" />
        <Field label="Precio objetivo" value={target} onChange={setTarget} suffix="€" />
      </Grid>
      <Results>
        <Row label="Capitalización actual" value={eur(mcap, 0)} highlight />
        <Row label="Valoración totalmente diluida (FDV)" value={eur(P * X, 0)} />
        <Row label="Porcentaje de la oferta en circulación" value={`${fmt((C / X) * 100, 1)} %`} />
        <Row label="Capitalización necesaria al precio objetivo" value={eur(T * C, 0)} highlight />
        <Row label="…y si ya circulara toda la oferta" value={eur(T * X, 0)} />
        <Row label="Multiplicador necesario" value={`×${fmt(T / P)}`} />
      </Results>
    </div>
  )
}

// ── Satoshis ───────────────────────────────────────────────────────────────
function Satoshis() {
  const [btc, setBtc] = useState('0,001')
  const [euros, setEuros] = useState('50')
  const [price, setPrice] = useState('60000')
  const B = num(btc), E = num(euros), P = num(price)
  return (
    <div>
      <Grid>
        <Field label="Cantidad en BTC" value={btc} onChange={setBtc} suffix="BTC" />
        <Field label="Precio de 1 BTC" value={price} onChange={setPrice} suffix="€" hint="Consulta el precio actual en Mercado" />
      </Grid>
      <Results>
        <Row label="Satoshis" value={fmt(B * 1e8, 0)} highlight />
        <Row label="Valor en euros" value={eur(B * P)} />
      </Results>
      <div className="mt-6">
        <Field label="¿Cuántos satoshis compro con…?" value={euros} onChange={setEuros} suffix="€" />
        <Results>
          <Row label="Satoshis (sin comisiones)" value={fmt((E / P) * 1e8, 0)} highlight />
          <Row label="Equivale a" value={`${fmt(E / P, 8)} BTC`} />
        </Results>
      </div>
    </div>
  )
}

// ── Gas de Ethereum ────────────────────────────────────────────────────────
const GAS_PRESETS = [
  { label: 'Envío de ETH', gas: 21000 },
  { label: 'Envío de un token ERC-20', gas: 65000 },
  { label: 'Intercambio en un DEX', gas: 150000 },
]

function Gas() {
  const [gas, setGas] = useState('21000')
  const [gwei, setGwei] = useState('5')
  const [ethPrice, setEthPrice] = useState('3000')
  const G = num(gas), W = num(gwei), P = num(ethPrice)
  const eth = (G * W) / 1e9
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {GAS_PRESETS.map(p => (
          <button
            key={p.gas}
            type="button"
            onClick={() => setGas(String(p.gas))}
            className={cn('rounded-full border px-3 py-1 text-xs transition-colors', num(gas) === p.gas ? 'border-primary text-primary' : 'border-border/50 text-muted-foreground hover:text-foreground')}
          >
            {p.label}
          </button>
        ))}
      </div>
      <Grid>
        <Field label="Gas consumido" value={gas} onChange={setGas} suffix="unidades" hint="Aproximado: depende del contrato" />
        <Field label="Precio del gas" value={gwei} onChange={setGwei} suffix="gwei" hint="Tu wallet lo muestra al confirmar" />
        <Field label="Precio de 1 ETH" value={ethPrice} onChange={setEthPrice} suffix="€" />
      </Grid>
      <Results>
        <Row label="Comisión en ETH" value={`${fmt(eth, 8)} ETH`} />
        <Row label="Comisión en gwei" value={fmt(G * W, 0)} />
        <Row label="Comisión en euros" value={eur(eth * P, 4)} highlight />
      </Results>
    </div>
  )
}

// ── Interés compuesto ──────────────────────────────────────────────────────
function InteresCompuesto() {
  const [initial, setInitial] = useState('1000')
  const [monthly, setMonthly] = useState('100')
  const [rate, setRate] = useState('5')
  const [years, setYears] = useState('10')
  const P = num(initial), M = num(monthly), r = num(rate) / 100 / 12, n = Math.round(num(years) * 12)
  let value = P
  if (n > 0 && n <= 1200) for (let i = 0; i < n; i++) value = value * (1 + r) + M
  const contributed = P + M * n
  return (
    <div>
      <Grid>
        <Field label="Capital inicial" value={initial} onChange={setInitial} suffix="€" />
        <Field label="Aportación mensual" value={monthly} onChange={setMonthly} suffix="€" />
        <Field label="Rentabilidad anual supuesta" value={rate} onChange={setRate} suffix="%" />
        <Field label="Plazo" value={years} onChange={setYears} suffix="años" />
      </Grid>
      <Results>
        <Row label="Total aportado" value={eur(contributed)} />
        <Row label="Valor final" value={eur(value)} highlight />
        <Row label="De ello, rendimientos" value={signedEur(value - contributed)} highlight />
      </Results>
    </div>
  )
}

// ── IRPF de las ganancias (escala del ahorro) ──────────────────────────────
export const SAVINGS_BRACKETS = [
  { upTo: 6000, rate: 19 },
  { upTo: 50000, rate: 21 },
  { upTo: 200000, rate: 23 },
  { upTo: 300000, rate: 27 },
  { upTo: Infinity, rate: 30 },
]

function Impuestos() {
  const [gain, setGain] = useState('10000')
  const [other, setOther] = useState('0')
  const G = num(gain), O = num(other)
  const base = Math.max(0, (isFinite(G) ? G : 0) + (isFinite(O) ? O : 0))
  let prev = 0
  const rows = SAVINGS_BRACKETS.map(b => {
    const part = Math.max(0, Math.min(base, b.upTo) - prev)
    const row = { from: prev, to: b.upTo, rate: b.rate, part, tax: (part * b.rate) / 100 }
    prev = b.upTo
    return row
  }).filter(r => r.part > 0)
  const tax = rows.reduce((s, r) => s + r.tax, 0)
  return (
    <div>
      <Grid>
        <Field label="Ganancias netas por criptomonedas en el año" value={gain} onChange={setGain} suffix="€" hint="Ganancias menos pérdidas del mismo año" />
        <Field label="Otras rentas del ahorro del año" value={other} onChange={setOther} suffix="€" hint="Intereses, dividendos, venta de fondos o acciones…" />
      </Grid>
      <Results>
        {rows.map(r => (
          <Row
            key={r.from}
            label={`${fmt(r.part, 0)} € al ${r.rate} %`}
            value={eur(r.tax)}
          />
        ))}
        <Row label="Base del ahorro" value={eur(base)} />
        <Row label="Cuota estimada" value={eur(tax)} highlight />
        <Row label="Tipo medio" value={base > 0 ? `${fmt((tax / base) * 100)} %` : '—'} highlight />
      </Results>
      <p className="mt-2 text-xs text-muted-foreground">Escala estatal y autonómica conjunta del territorio común desde 2025. No incluye compensación de pérdidas de años anteriores ni el régimen foral del País Vasco y Navarra. Es una estimación.</p>
    </div>
  )
}

export const CALCULATORS: Record<string, () => React.JSX.Element> = {
  rentabilidad: Rentabilidad,
  dca: Dca,
  staking: Staking,
  comisiones: Comisiones,
  capitalizacion: Capitalizacion,
  satoshis: Satoshis,
  gas: Gas,
  'interes-compuesto': InteresCompuesto,
  impuestos: Impuestos,
}

export function Calculator({ id }: { id: string }) {
  const C = CALCULATORS[id]
  return C ? <C /> : null
}
