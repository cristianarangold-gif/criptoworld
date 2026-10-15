import data from '../data/historico-mensual.json'

// Cierres mensuales en euros (Binance XXX/USDT ÷ tipo EUR/USD del BCE). Se regenera con
// scripts/actualizar-historico.mjs.

export interface HistoryFile {
  actualizado: string
  fuentes: string[]
  monedas: Record<string, { nombre: string; desde: string; cierres: [string, number][] }>
}

export const HISTORY = data as unknown as HistoryFile

export function getHistory(id: string): { month: string; price: number }[] {
  return (HISTORY.monedas[id]?.cierres ?? []).map(([month, price]) => ({ month, price }))
}

export function pickInitialCoin(ids: string[], requested?: string): string {
  const r = requested?.toLowerCase()
  return r && ids.includes(r) ? r : 'btc'
}
