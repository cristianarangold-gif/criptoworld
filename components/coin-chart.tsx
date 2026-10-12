'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function CoinChart({ coinId, currency }: { coinId: string; currency: string }) {
  const [days, setDays] = useState(7)
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`/api/market/${coinId}?days=${days}&currency=${currency}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        const prices = d?.prices ?? []
        setChartData(prices.map((p: [number, number]) => ({
          date: new Date(p?.[0] ?? 0).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
          price: p?.[1] ?? 0,
        })))
        setLoading(false)
      })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [coinId, days, currency])

  const ranges = [{ label: '7d', value: 7 }, { label: '30d', value: 30 }, { label: '90d', value: 90 }]

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {ranges.map(r => (
          <button
            key={r.value}
            onClick={() => setDays(r.value)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              days === r.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="h-64 bg-muted/20 rounded-lg animate-pulse" />
      ) : chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Sin datos disponibles</div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 25, left: 10 }}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v?.toFixed?.(2) ?? '0'}`}
                domain={['auto', 'auto']}
                width={60}
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(218,42%,9%)', border: '1px solid hsl(220,20%,18%)', borderRadius: '8px', fontSize: 11 }}
                labelStyle={{ color: 'hsl(215,15%,55%)' }}
                formatter={(value: any) => [`$${Number(value)?.toFixed?.(2) ?? '0'}`, 'Precio']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(33,93%,54%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(33,93%,54%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
