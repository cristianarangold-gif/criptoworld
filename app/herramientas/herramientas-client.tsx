'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, Coins, BarChart3, Repeat, Percent, DollarSign, PieChart, ArrowLeftRight, Activity, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tool = {
  id: string
  name: string
  desc: string
  icon: any
}

const TOOLS: Tool[] = [
  { id: 'inversion', name: 'Calculadora de inversión', desc: 'Calcula ganancias/pérdidas de una inversión', icon: TrendingUp },
  { id: 'dca', name: 'Simulador DCA', desc: 'Estrategia Dollar-Cost Averaging', icon: Repeat },
  { id: 'staking', name: 'Calculadora de staking', desc: 'Rendimientos de staking con APY', icon: Layers },
  { id: 'rentabilidad', name: 'Rentabilidad', desc: 'ROI y rentabilidad porcentual', icon: BarChart3 },
  { id: 'comisiones', name: 'Comisiones', desc: 'Calcula comisiones de exchange', icon: Percent },
  { id: 'conversor', name: 'Conversor EUR/USD', desc: 'Conversión entre EUR y USD', icon: ArrowLeftRight },
  { id: 'marketcap', name: 'Market Cap', desc: 'Capitalización de mercado hipotética', icon: PieChart },
  { id: 'btc-sat', name: 'BTC ↔ Satoshis', desc: 'Convertir entre BTC y satoshis', icon: Coins },
  { id: 'eth-gwei', name: 'ETH ↔ Gwei', desc: 'Convertir entre ETH y gwei', icon: Activity },
  { id: 'porcentaje', name: 'Cambio porcentual', desc: 'Variación % entre dos precios', icon: Percent },
  { id: 'interes', name: 'Interés compuesto', desc: 'Crecimiento con interés compuesto', icon: DollarSign },
]

function NumInput({ label, value, onChange, suffix, placeholder, min }: { label: string; value: string; onChange: (v: string) => void; suffix?: string; placeholder?: string; min?: string }) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          className="w-full rounded-lg bg-muted/50 border border-border/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 pr-12"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  )
}

function Result({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn('text-sm font-semibold', highlight ? 'text-primary' : '')}>{value}</span>
    </div>
  )
}

function fmt(n: number, dec = 2) {
  if (isNaN(n) || !isFinite(n)) return '—'
  return n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec })
}

function InversionCalc() {
  const [inv, setInv] = useState('1000')
  const [buy, setBuy] = useState('30000')
  const [sell, setSell] = useState('45000')
  const amount = +inv; const b = +buy; const s = +sell
  const coins = b > 0 ? amount / b : 0
  const finalVal = coins * s
  const profit = finalVal - amount
  const roi = amount > 0 ? (profit / amount) * 100 : 0
  return (
    <div className="space-y-3">
      <NumInput label="Inversión inicial" value={inv} onChange={setInv} suffix="USD" />
      <NumInput label="Precio de compra" value={buy} onChange={setBuy} suffix="USD" />
      <NumInput label="Precio de venta" value={sell} onChange={setSell} suffix="USD" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Cantidad de monedas" value={fmt(coins, 6)} />
        <Result label="Valor final" value={`$${fmt(finalVal)}`} />
        <Result label="Ganancia/Pérdida" value={`${profit >= 0 ? '+' : ''}$${fmt(profit)}`} highlight />
        <Result label="ROI" value={`${roi >= 0 ? '+' : ''}${fmt(roi)}%`} highlight />
      </div>
    </div>
  )
}

function DcaCalc() {
  const [monthly, setMonthly] = useState('100')
  const [months, setMonths] = useState('12')
  const [start, setStart] = useState('30000')
  const [end, setEnd] = useState('50000')
  const m = +monthly; const n = +months; const s = +start; const e = +end
  const totalInv = m * n
  const avgPrice = n > 0 && s > 0 && e > 0 ? (s + e) / 2 : 0
  const totalCoins = avgPrice > 0 ? totalInv / avgPrice : 0
  const finalVal = totalCoins * e
  const profit = finalVal - totalInv
  return (
    <div className="space-y-3">
      <NumInput label="Inversión mensual" value={monthly} onChange={setMonthly} suffix="USD" />
      <NumInput label="Número de meses" value={months} onChange={setMonths} suffix="meses" />
      <NumInput label="Precio inicial" value={start} onChange={setStart} suffix="USD" />
      <NumInput label="Precio final" value={end} onChange={setEnd} suffix="USD" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Total invertido" value={`$${fmt(totalInv)}`} />
        <Result label="Precio promedio" value={`$${fmt(avgPrice)}`} />
        <Result label="Monedas acumuladas" value={fmt(totalCoins, 6)} />
        <Result label="Valor final" value={`$${fmt(finalVal)}`} />
        <Result label="Ganancia/Pérdida" value={`${profit >= 0 ? '+' : ''}$${fmt(profit)}`} highlight />
      </div>
    </div>
  )
}

function StakingCalc() {
  const [amount, setAmount] = useState('1000')
  const [apy, setApy] = useState('5')
  const [years, setYears] = useState('1')
  const a = +amount; const r = +apy / 100; const y = +years
  const finalCompound = a * Math.pow(1 + r, y)
  const rewards = finalCompound - a
  const monthlyReward = y > 0 ? rewards / (y * 12) : 0
  return (
    <div className="space-y-3">
      <NumInput label="Cantidad en staking" value={amount} onChange={setAmount} suffix="USD" />
      <NumInput label="APY (rendimiento anual)" value={apy} onChange={setApy} suffix="%" />
      <NumInput label="Periodo" value={years} onChange={setYears} suffix="años" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Valor final" value={`$${fmt(finalCompound)}`} />
        <Result label="Recompensas totales" value={`$${fmt(rewards)}`} highlight />
        <Result label="Recompensa mensual (prom.)" value={`$${fmt(monthlyReward)}`} />
      </div>
    </div>
  )
}

function RentabilidadCalc() {
  const [buy, setBuy] = useState('100')
  const [sell, setSell] = useState('150')
  const b = +buy; const s = +sell
  const profit = s - b
  const roi = b > 0 ? (profit / b) * 100 : 0
  const multiple = b > 0 ? s / b : 0
  return (
    <div className="space-y-3">
      <NumInput label="Precio de compra" value={buy} onChange={setBuy} suffix="USD" />
      <NumInput label="Precio actual/venta" value={sell} onChange={setSell} suffix="USD" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Ganancia/Pérdida" value={`${profit >= 0 ? '+' : ''}$${fmt(profit)}`} />
        <Result label="ROI" value={`${roi >= 0 ? '+' : ''}${fmt(roi)}%`} highlight />
        <Result label="Múltiplo" value={`${fmt(multiple)}x`} />
      </div>
    </div>
  )
}

function ComisionesCalc() {
  const [amount, setAmount] = useState('1000')
  const [fee, setFee] = useState('0.1')
  const a = +amount; const f = +fee
  const commission = a * (f / 100)
  const net = a - commission
  const roundTrip = commission * 2
  return (
    <div className="space-y-3">
      <NumInput label="Monto de la operación" value={amount} onChange={setAmount} suffix="USD" />
      <NumInput label="Comisión del exchange" value={fee} onChange={setFee} suffix="%" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Comisión (una operación)" value={`$${fmt(commission)}`} />
        <Result label="Comisión ida y vuelta" value={`$${fmt(roundTrip)}`} highlight />
        <Result label="Monto neto recibido" value={`$${fmt(net)}`} />
      </div>
    </div>
  )
}

function ConversorCalc() {
  const [eur, setEur] = useState('100')
  const [rate, setRate] = useState('1.08')
  const e = +eur; const r = +rate
  const usd = e * r
  return (
    <div className="space-y-3">
      <NumInput label="Cantidad en EUR" value={eur} onChange={setEur} suffix="EUR" />
      <NumInput label="Tipo de cambio EUR/USD" value={rate} onChange={setRate} suffix="" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Equivalente en USD" value={`$${fmt(usd)}`} highlight />
        <Result label="Equivalente en EUR" value={`€${fmt(r > 0 ? +eur : 0)}`} />
      </div>
      <p className="text-xs text-muted-foreground">Introduce el tipo de cambio actual. Consulta fuentes oficiales para obtener el valor más reciente.</p>
    </div>
  )
}

function MarketCapCalc() {
  const [price, setPrice] = useState('50000')
  const [supply, setSupply] = useState('21000000')
  const [targetCap, setTargetCap] = useState('2000000000000')
  const p = +price; const s = +supply; const tc = +targetCap
  const currentCap = p * s
  const targetPrice = s > 0 ? tc / s : 0
  const multiple = p > 0 ? targetPrice / p : 0
  return (
    <div className="space-y-3">
      <NumInput label="Precio actual" value={price} onChange={setPrice} suffix="USD" />
      <NumInput label="Suministro circulante" value={supply} onChange={setSupply} />
      <NumInput label="Market cap objetivo" value={targetCap} onChange={setTargetCap} suffix="USD" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Market cap actual" value={`$${fmt(currentCap, 0)}`} />
        <Result label="Precio para alcanzar objetivo" value={`$${fmt(targetPrice)}`} highlight />
        <Result label="Múltiplo necesario" value={`${fmt(multiple)}x`} />
      </div>
    </div>
  )
}

function BtcSatCalc() {
  const [btc, setBtc] = useState('0.001')
  const b = +btc
  const sats = b * 100_000_000
  return (
    <div className="space-y-3">
      <NumInput label="Cantidad en BTC" value={btc} onChange={setBtc} suffix="BTC" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Satoshis" value={fmt(sats, 0)} highlight />
        <Result label="mBTC (milliBTC)" value={fmt(b * 1000, 5)} />
        <Result label="μBTC (microBTC)" value={fmt(b * 1_000_000, 2)} />
      </div>
      <p className="text-xs text-muted-foreground">1 BTC = 100,000,000 satoshis (sats). El satoshi es la unidad más pequeña de Bitcoin.</p>
    </div>
  )
}

function EthGweiCalc() {
  const [eth, setEth] = useState('0.01')
  const e = +eth
  const gwei = e * 1_000_000_000
  const wei = e * 1e18
  return (
    <div className="space-y-3">
      <NumInput label="Cantidad en ETH" value={eth} onChange={setEth} suffix="ETH" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Gwei" value={fmt(gwei, 0)} highlight />
        <Result label="Finney" value={fmt(e * 1000, 5)} />
        <Result label="Wei" value={wei > 1e15 ? wei.toExponential(2) : fmt(wei, 0)} />
      </div>
      <p className="text-xs text-muted-foreground">1 ETH = 1,000,000,000 Gwei. Gwei es la unidad usada para medir el coste del gas en Ethereum.</p>
    </div>
  )
}

function PorcentajeCalc() {
  const [before, setBefore] = useState('30000')
  const [after, setAfter] = useState('45000')
  const b = +before; const a = +after
  const change = b > 0 ? ((a - b) / b) * 100 : 0
  const diff = a - b
  return (
    <div className="space-y-3">
      <NumInput label="Precio anterior" value={before} onChange={setBefore} suffix="USD" />
      <NumInput label="Precio actual" value={after} onChange={setAfter} suffix="USD" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Cambio porcentual" value={`${change >= 0 ? '+' : ''}${fmt(change)}%`} highlight />
        <Result label="Diferencia absoluta" value={`${diff >= 0 ? '+' : ''}$${fmt(diff)}`} />
        <Result label="Múltiplo" value={`${fmt(b > 0 ? a / b : 0)}x`} />
      </div>
    </div>
  )
}

function InteresCalc() {
  const [principal, setPrincipal] = useState('1000')
  const [rate, setRate] = useState('10')
  const [years, setYears] = useState('5')
  const [compound, setCompound] = useState('12')
  const p = +principal; const r = +rate / 100; const y = +years; const n = +compound
  const final_ = n > 0 ? p * Math.pow(1 + r / n, n * y) : p * Math.pow(1 + r, y)
  const interest = final_ - p
  const effectiveRate = n > 0 ? (Math.pow(1 + r / n, n) - 1) * 100 : r * 100
  return (
    <div className="space-y-3">
      <NumInput label="Capital inicial" value={principal} onChange={setPrincipal} suffix="USD" />
      <NumInput label="Tasa de interés anual" value={rate} onChange={setRate} suffix="%" />
      <NumInput label="Periodo" value={years} onChange={setYears} suffix="años" />
      <NumInput label="Frecuencia de capitalización" value={compound} onChange={setCompound} suffix="/año" />
      <div className="mt-4 glass-card rounded-lg p-4 space-y-0">
        <Result label="Valor final" value={`$${fmt(final_)}`} highlight />
        <Result label="Intereses ganados" value={`$${fmt(interest)}`} />
        <Result label="Tasa efectiva anual" value={`${fmt(effectiveRate)}%`} />
      </div>
    </div>
  )
}

const CALCULATORS: Record<string, () => React.JSX.Element> = {
  inversion: InversionCalc,
  dca: DcaCalc,
  staking: StakingCalc,
  rentabilidad: RentabilidadCalc,
  comisiones: ComisionesCalc,
  conversor: ConversorCalc,
  marketcap: MarketCapCalc,
  'btc-sat': BtcSatCalc,
  'eth-gwei': EthGweiCalc,
  porcentaje: PorcentajeCalc,
  interes: InteresCalc,
}

export function HerramientasClient() {
  const [active, setActive] = useState('inversion')
  const ActiveCalc = CALCULATORS[active]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Herramientas Cripto</h1>
        </div>
        <p className="text-muted-foreground">Calculadoras gratuitas para inversores de criptomonedas. Todas las operaciones se realizan localmente en tu navegador.</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <nav className="glass-card rounded-xl p-2 space-y-0.5">
            {TOOLS.map(tool => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => setActive(tool.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    active === tool.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div>
                    <div className="leading-tight">{tool.name}</div>
                    <div className="text-xs opacity-70 leading-tight mt-0.5">{tool.desc}</div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Calculator area */}
        <div>
          <div className="glass-card rounded-xl p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              {(() => { const t = TOOLS.find(t => t.id === active); const I = t?.icon || Calculator; return <I className="h-5 w-5 text-primary" /> })()}
              {TOOLS.find(t => t.id === active)?.name}
            </h2>
            <ActiveCalc />
          </div>

          {/* Mobile tool selector */}
          <div className="lg:hidden mt-4">
            <select
              value={active}
              onChange={e => setActive(e.target.value)}
              className="w-full rounded-lg bg-muted/50 border border-border/50 px-3 py-2.5 text-sm"
            >
              {TOOLS.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
        <p><strong>Aviso:</strong> Estas herramientas son orientativas y no constituyen asesoramiento financiero. Los resultados son estimaciones basadas en los datos introducidos. Verifica siempre los cálculos y consulta con un profesional antes de tomar decisiones de inversión.</p>
      </div>
    </div>
  )
}
