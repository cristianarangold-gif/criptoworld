'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Plus, Trash2, Wallet, Calculator, TrendingUp, TrendingDown, Loader2, DollarSign, Coins, Calendar } from 'lucide-react'
import { formatUsd } from '@/lib/format'
import dynamic from 'next/dynamic'

const PortfolioChart = dynamic(() => import('@/components/portfolio-chart').then(m => m.PortfolioChart), { ssr: false, loading: () => <div className="h-48 bg-muted/20 rounded-lg animate-pulse" /> })

interface Position {
  id: string
  coinId: string
  coinName: string
  coinSymbol: string
  amount: number
  buyPrice: number
  investedUsd: number
  buyDate: string
  currentPrice?: number
  currentValue?: number
  pnl?: number
  pnlPercent?: number
}

const COINS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
]

export function AreaPersonalClient({ userName }: { userName: string }) {
  const [tab, setTab] = useState<'cartera' | 'simulador'>('cartera')
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // Form state
  const [coinId, setCoinId] = useState('bitcoin')
  const [investedUsd, setInvestedUsd] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [buyDate, setBuyDate] = useState('')

  // Simulator state
  const [simCoin, setSimCoin] = useState('bitcoin')
  const [simAmount, setSimAmount] = useState('')
  const [simDate, setSimDate] = useState('')
  const [simResult, setSimResult] = useState<any>(null)
  const [simLoading, setSimLoading] = useState(false)
  const [simError, setSimError] = useState('')

  const fetchPositions = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio')
      if (!res.ok) return
      const data = await res.json()
      // Fetch current prices
      const ids = [...new Set((data ?? []).map((p: any) => p?.coinId))]
      if (ids.length > 0) {
        const priceRes = await fetch(`/api/market?currency=usd`)
        const market = priceRes.ok ? await priceRes.json() : []
        const priceMap: Record<string, number> = {}
        ;(market ?? []).forEach((c: any) => { if (c?.id) priceMap[c.id] = c?.current_price ?? 0 })
        const enriched = (data ?? []).map((p: any) => {
          const cp = priceMap[p?.coinId] ?? 0
          const cv = (p?.amount ?? 0) * cp
          const pnl = cv - (p?.investedUsd ?? 0)
          const pnlPct = (p?.investedUsd ?? 0) > 0 ? (pnl / p.investedUsd) * 100 : 0
          return { ...p, currentPrice: cp, currentValue: cv, pnl, pnlPercent: pnlPct }
        })
        setPositions(enriched)
      } else {
        setPositions(data ?? [])
      }
    } catch { /* silent */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchPositions() }, [fetchPositions])

  const addPosition = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      const coin = COINS.find(c => c.id === coinId)
      const invested = parseFloat(investedUsd)
      const price = parseFloat(buyPrice)
      const amount = invested / price
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coinId, coinName: coin?.name ?? coinId, coinSymbol: coin?.symbol ?? '',
          amount, buyPrice: price, investedUsd: invested, buyDate,
        }),
      })
      if (res.ok) {
        setShowForm(false)
        setInvestedUsd(''); setBuyPrice(''); setBuyDate('')
        fetchPositions()
      }
    } catch { /* silent */ }
    setFormLoading(false)
  }

  const deletePosition = async (id: string) => {
    try {
      await fetch('/api/portfolio', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchPositions()
    } catch { /* silent */ }
  }

  const simulate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSimError('')
    setSimResult(null)
    setSimLoading(true)
    try {
      const res = await fetch('/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coinId: simCoin, amount: simAmount, date: simDate }),
      })
      const data = await res.json()
      if (!res.ok) setSimError(data?.error ?? 'Error en la simulación')
      else setSimResult(data)
    } catch { setSimError('Error de conexión') }
    setSimLoading(false)
  }

  const totalInvested = positions.reduce((s, p) => s + (p?.investedUsd ?? 0), 0)
  const totalValue = positions.reduce((s, p) => s + (p?.currentValue ?? 0), 0)
  const totalPnl = totalValue - totalInvested
  const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Hola, {userName}</h1>
        <p className="mt-1 text-muted-foreground">Gestiona tu cartera virtual y simula inversiones.</p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 mb-6">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Aviso:</strong> Las simulaciones y la cartera virtual son herramientas educativas. No constituyen asesoramiento financiero.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('cartera')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === 'cartera' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Wallet className="h-4 w-4" />
          Cartera virtual
        </button>
        <button
          onClick={() => setTab('simulador')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === 'simulador' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Calculator className="h-4 w-4" />
          Simulador
        </button>
      </div>

      {tab === 'cartera' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Summary cards */}
          {positions.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Total invertido</p>
                <p className="font-mono text-lg font-bold mt-1">{formatUsd(totalInvested)}</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Valor actual</p>
                <p className="font-mono text-lg font-bold mt-1">{formatUsd(totalValue)}</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">P&L (USD)</p>
                <p className={`font-mono text-lg font-bold mt-1 ${totalPnl >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {totalPnl >= 0 ? '+' : ''}{formatUsd(totalPnl)}
                </p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">P&L (%)</p>
                <p className={`font-mono text-lg font-bold mt-1 flex items-center gap-1 ${totalPnlPct >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {totalPnlPct >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {totalPnlPct >= 0 ? '+' : ''}{totalPnlPct?.toFixed?.(2) ?? '0.00'}%
                </p>
              </div>
            </div>
          )}

          {/* Chart */}
          {positions.length > 0 && (
            <div className="glass-card rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3">Distribución de la cartera</h3>
              <PortfolioChart positions={positions} />
            </div>
          )}

          {/* Add button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Añadir posición
          </button>

          {/* Add form */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={addPosition}
              className="glass-card rounded-xl p-5 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div>
                <label className="text-xs text-muted-foreground">Moneda</label>
                <select value={coinId} onChange={e => setCoinId(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  {COINS.map(c => <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" />Importe invertido (USD)</label>
                <input type="number" step="0.01" min="0.01" required value={investedUsd} onChange={e => setInvestedUsd(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="1000" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground flex items-center gap-1"><Coins className="h-3 w-3" />Precio de entrada (USD)</label>
                <input type="number" step="0.000001" min="0.000001" required value={buyPrice} onChange={e => setBuyPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="65000" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Fecha de compra</label>
                <input type="date" required value={buyDate} onChange={e => setBuyDate(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2 lg:col-span-4 flex gap-2">
                <button type="submit" disabled={formLoading} className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Guardar
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                  Cancelar
                </button>
              </div>
            </motion.form>
          )}

          {/* Positions list */}
          {loading ? (
            <div className="py-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
          ) : positions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Aún no tienes posiciones en tu cartera.</p>
              <p className="text-sm mt-1">Añade tu primera inversión virtual para empezar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {positions.map((p: Position) => (
                <div key={p.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{p.coinName}</span>
                      <span className="text-xs text-muted-foreground uppercase">{p.coinSymbol}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Invertido: {formatUsd(p.investedUsd)}</span>
                      <span>Cantidad: {p.amount?.toFixed?.(6) ?? '0'}</span>
                      <span>Precio entrada: {formatUsd(p.buyPrice)}</span>
                      <span>Fecha: {new Date(p.buyDate).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold">{formatUsd(p.currentValue ?? 0)}</p>
                      <p className={`text-xs font-mono ${(p.pnl ?? 0) >= 0 ? 'text-gain' : 'text-loss'}`}>
                        {(p.pnl ?? 0) >= 0 ? '+' : ''}{formatUsd(p.pnl ?? 0)} ({(p.pnlPercent ?? 0) >= 0 ? '+' : ''}{p.pnlPercent?.toFixed?.(2) ?? '0'}%)
                      </p>
                    </div>
                    <button onClick={() => deletePosition(p.id)} className="p-2 text-muted-foreground hover:text-loss transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {tab === 'simulador' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="glass-card rounded-xl p-6 max-w-xl">
            <h2 className="font-display text-lg font-bold mb-1">Simulador de inversión</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Elige una criptomoneda, un importe y una fecha pasada para ver cuánto habrías ganado o perdido hoy.
            </p>
            <form onSubmit={simulate} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Criptomoneda</label>
                <select value={simCoin} onChange={e => setSimCoin(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  {COINS.map(c => <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Importe invertido (USD)</label>
                <input type="number" step="0.01" min="1" required value={simAmount} onChange={e => setSimAmount(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="1000" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Fecha de inversión</label>
                <input type="date" required value={simDate} onChange={e => setSimDate(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <button type="submit" disabled={simLoading} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
                {simLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calculator className="h-4 w-4" />}
                Simular
              </button>
            </form>

            {simError && <p className="mt-4 text-sm text-loss">{simError}</p>}

            {simResult && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold">Resultado de la simulación</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Invertido</p>
                    <p className="font-mono font-bold">{formatUsd(simResult?.invested)}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Valor hoy</p>
                    <p className="font-mono font-bold">{formatUsd(simResult?.currentValue)}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Precio histórico</p>
                    <p className="font-mono font-bold">{formatUsd(simResult?.historicalPrice)}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Precio actual</p>
                    <p className="font-mono font-bold">{formatUsd(simResult?.currentPrice)}</p>
                  </div>
                  <div className="col-span-2 glass-card rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Beneficio / Pérdida</p>
                    <p className={`font-mono text-xl font-bold ${(simResult?.pnl ?? 0) >= 0 ? 'text-gain' : 'text-loss'}`}>
                      {(simResult?.pnl ?? 0) >= 0 ? '+' : ''}{formatUsd(simResult?.pnl)} ({(simResult?.pnlPercent ?? 0) >= 0 ? '+' : ''}{simResult?.pnlPercent?.toFixed?.(2) ?? '0'}%)
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 mt-3">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    Esta simulación es únicamente educativa. Los resultados pasados no garantizan rendimientos futuros.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
