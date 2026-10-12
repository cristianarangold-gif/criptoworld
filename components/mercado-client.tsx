'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { SparklineChart } from '@/components/sparkline-chart'
import { PriceChange } from '@/components/price-change'
import { formatUsd, formatCompact } from '@/lib/format'
import { Search, ArrowUpDown, X, Clock, BarChart3, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CoinMarket } from '@/lib/coingecko'
import dynamic from 'next/dynamic'

const CoinChart = dynamic(() => import('@/components/coin-chart').then(m => m.CoinChart), { ssr: false, loading: () => <div className="h-64 bg-muted/20 rounded-lg animate-pulse" /> })

export function MercadoClient({ initialData }: { initialData: CoinMarket[] }) {
  const [data, setData] = useState<CoinMarket[]>(initialData ?? [])
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('usd')
  const [sortField, setSortField] = useState<string>('market_cap_rank')
  const [sortAsc, setSortAsc] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/market?currency=${currency}`)
      if (res.ok) {
        const d = await res.json()
        setData(d ?? [])
        setLastUpdate(new Date())
      }
    } catch { /* silent */ }
  }, [currency])

  useEffect(() => { fetchData() }, [fetchData])
  useEffect(() => {
    const iv = setInterval(fetchData, 60000)
    return () => clearInterval(iv)
  }, [fetchData])

  // Check URL for coin param on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search)
      const c = p.get('coin')
      if (c) setSelectedCoin(c)
    }
  }, [])

  const filtered = (data ?? []).filter((c: CoinMarket) => {
    const q = search.toLowerCase()
    return !q || c?.name?.toLowerCase?.()?.includes?.(q) || c?.symbol?.toLowerCase?.()?.includes?.(q)
  }).sort((a: CoinMarket, b: CoinMarket) => {
    const av = (a as any)?.[sortField] ?? 0
    const bv = (b as any)?.[sortField] ?? 0
    return sortAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
  })

  const toggleSort = (field: string) => {
    if (sortField === field) setSortAsc(!sortAsc)
    else { setSortField(field); setSortAsc(field === 'market_cap_rank') }
  }

  const SortIcon = ({ field }: { field: string }) => (
    sortField === field
      ? (sortAsc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)
      : <ArrowUpDown className="h-3 w-3 opacity-40" />
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Mercado de criptomonedas</h1>
        <p className="mt-2 text-muted-foreground">Precios en vivo de las principales criptomonedas. Datos actualizados cada 60 segundos.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar criptomoneda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="usd">USD ($)</option>
          <option value="eur">EUR (€)</option>
        </select>
      </div>

      {lastUpdate && (
        <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Última actualización: {lastUpdate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
      )}

      {/* Coin detail panel */}
      <AnimatePresence>
        {selectedCoin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-bold">
                    {data?.find?.((c: CoinMarket) => c?.id === selectedCoin)?.name ?? selectedCoin}
                  </h3>
                </div>
                <button onClick={() => setSelectedCoin(null)} className="p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <CoinChart coinId={selectedCoin} currency={currency} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No se encontraron criptomonedas{search ? ` para "${search}"` : ''}.</p>
          {(data ?? []).length === 0 && <p className="mt-2 text-sm">Los datos podrían no estar disponibles temporalmente. Reintenta en unos momentos.</p>}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground cursor-pointer" onClick={() => toggleSort('market_cap_rank')}>
                  <span className="inline-flex items-center gap-1"># <SortIcon field="market_cap_rank" /></span>
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Moneda</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground cursor-pointer" onClick={() => toggleSort('current_price')}>
                  <span className="inline-flex items-center gap-1 justify-end">Precio <SortIcon field="current_price" /></span>
                </th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground cursor-pointer hidden sm:table-cell" onClick={() => toggleSort('price_change_percentage_24h')}>
                  <span className="inline-flex items-center gap-1 justify-end">24h <SortIcon field="price_change_percentage_24h" /></span>
                </th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground hidden md:table-cell cursor-pointer" onClick={() => toggleSort('market_cap')}>
                  <span className="inline-flex items-center gap-1 justify-end">Cap. <SortIcon field="market_cap" /></span>
                </th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Volumen 24h</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">7d</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((coin: CoinMarket) => (
                <tr
                  key={coin?.id}
                  onClick={() => setSelectedCoin(coin?.id)}
                  className="border-b border-border/30 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-2 text-muted-foreground">{coin?.market_cap_rank}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Image src={coin?.image ?? ''} alt={coin?.name ?? ''} width={24} height={24} className="rounded-full" unoptimized />
                      <span className="font-medium">{coin?.name}</span>
                      <span className="text-xs text-muted-foreground uppercase">{coin?.symbol}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right font-mono">{formatUsd(coin?.current_price)}</td>
                  <td className="py-3 px-2 text-right hidden sm:table-cell">
                    <PriceChange value={coin?.price_change_percentage_24h} />
                  </td>
                  <td className="py-3 px-2 text-right hidden md:table-cell text-muted-foreground">{formatCompact(coin?.market_cap)}</td>
                  <td className="py-3 px-2 text-right hidden lg:table-cell text-muted-foreground">{formatCompact(coin?.total_volume)}</td>
                  <td className="py-3 px-2 text-right hidden lg:table-cell">
                    <SparklineChart data={coin?.sparkline_in_7d?.price ?? []} width={80} height={28} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
