import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function PriceChange({ value, className }: { value: number | null | undefined; className?: string }) {
  const v = value ?? 0
  const isPos = v >= 0
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm font-medium', isPos ? 'text-gain' : 'text-loss', className)}>
      {isPos ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      {isPos ? '+' : ''}{v?.toFixed?.(2) ?? '0.00'}%
    </span>
  )
}
