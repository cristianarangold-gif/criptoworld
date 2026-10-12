'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#F7931A', '#627EEA', '#10B981', '#60B5FF', '#FF9149', '#A19AD3', '#FF90BB', '#72BF78']

export function PortfolioChart({ positions }: { positions: any[] }) {
  const data = (positions ?? []).reduce((acc: any[], p: any) => {
    const existing = acc.find((a: any) => a?.name === p?.coinName)
    if (existing) existing.value += (p?.currentValue ?? 0)
    else acc.push({ name: p?.coinName ?? 'Unknown', value: p?.currentValue ?? 0 })
    return acc
  }, [])

  if (data.length === 0) return null

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={40}
            paddingAngle={2}
          >
            {data.map((_: any, i: number) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(218,42%,9%)', border: '1px solid hsl(220,20%,18%)', borderRadius: '8px', fontSize: 11 }}
            formatter={(value: any) => [`$${Number(value)?.toFixed?.(2) ?? '0'}`, 'Valor']}
          />
          <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
