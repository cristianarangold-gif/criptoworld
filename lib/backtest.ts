// Simulación con precios históricos mensuales: todo de golpe o DCA mensual, valorado al cierre de cada mes.

export type PricePoint = { month: string; price: number }

export interface BacktestOptions {
  mode: 'lump' | 'dca'
  amount: number
  from: string
  to: string
}

export interface BacktestResult {
  invested: number
  value: number
  profit: number
  roi: number
  /** Mayor caída del valor de la inversión desde un máximo previo (pct y eur son ≤ 0). */
  maxDrawdown: { pct: number; eur: number }
  series: { month: string; invested: number; value: number }[]
}

export function backtest(prices: PricePoint[], opts: BacktestOptions): BacktestResult | { error: string } {
  const { mode, amount, from, to } = opts
  if (to < from) return { error: 'El mes final es anterior al inicial' }
  const i0 = prices.findIndex(p => p.month === from)
  const i1 = prices.findIndex(p => p.month === to)
  if (i0 < 0 || i1 < 0) return { error: 'No hay datos de esta moneda para ese periodo' }

  let units = 0
  let invested = 0
  let peak = 0
  let maxDrawdown = { pct: 0, eur: 0 }
  const series: BacktestResult['series'] = []
  for (const { month, price } of prices.slice(i0, i1 + 1)) {
    if (mode === 'dca' || month === from) {
      units += amount / price
      invested += amount
    }
    const value = units * price
    peak = Math.max(peak, value)
    const pct = (value / peak - 1) * 100
    if (pct < maxDrawdown.pct) maxDrawdown = { pct, eur: value - peak }
    series.push({ month, invested, value })
  }

  const value = series[series.length - 1].value
  const profit = value - invested
  return { invested, value, profit, roi: (profit / invested) * 100, maxDrawdown, series }
}
