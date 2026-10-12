'use client'

export function SparklineChart({ data, width = 120, height = 40, color }: { data: number[]; width?: number; height?: number; color?: string }) {
  const safeData = data ?? []
  if (safeData.length < 2) return <div style={{ width, height }} className="bg-muted/30 rounded" />
  const min = Math.min(...safeData)
  const max = Math.max(...safeData)
  const range = max - min || 1
  const lineColor = color ?? (safeData[safeData.length - 1] >= safeData[0] ? 'hsl(160,84%,39%)' : 'hsl(0,84%,60%)')
  const points = safeData.map((v: number, i: number) => {
    const x = (i / (safeData.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline fill="none" stroke={lineColor} strokeWidth="1.5" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
