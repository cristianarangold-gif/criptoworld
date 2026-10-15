export function formatUsd(value: number | null | undefined): string {
  const v = value ?? 0
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  if (v >= 1) return `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${v.toFixed(6)}`
}

export function formatCompact(value: number | null | undefined): string {
  const v = value ?? 0
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  return `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

export function formatEur(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'
  const dec = Math.abs(value) >= 1 ? 2 : 6
  return `${value.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: 'always' } as unknown as Intl.NumberFormatOptions)} €`
}

// Cifras grandes en español: un billón son 10^12.
export function formatBig(value: number, unit = ''): string {
  const nf = (n: number, d: number) =>
    n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' } as unknown as Intl.NumberFormatOptions)
  const u = unit ? ` ${unit}` : ''
  if (value >= 1e12) return `${nf(value / 1e12, 2)} billones${u}`
  if (value >= 1e9) return `${nf(value / 1e9, 1)} mil millones${u}`
  if (value >= 1e6) return `${nf(value / 1e6, 1)} millones${u}`
  return `${nf(value, 0)}${u}`
}
