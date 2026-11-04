'use client'
import { useState } from 'react'
import { comisionPublicada, porcentajeEfectivo, type FormulaCompra } from '@/lib/coste-compra'

export type FilaCoste = { slug: string; nombre: string; formula: FormulaCompra | null; nota: string; fuente: string; comprobado: string }

const euros = (n: number) => `${n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
const pct = (n: number) => `${n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`

// Tabla de la comisión publicada para el importe que elige el lector. El servidor la pinta con 100 €.
export function CosteCompra({ filas }: { filas: FilaCoste[] }) {
  const [texto, setTexto] = useState('100')
  const importe = Number(texto.replace(',', '.'))
  const valido = Number.isFinite(importe) && importe >= 1 && importe <= 1_000_000

  return (
    <div className="mt-4">
      <label className="block text-sm font-semibold text-foreground" htmlFor="coste-importe">Importe de la compra, en euros</label>
      <input
        id="coste-importe"
        type="text"
        inputMode="decimal"
        value={texto}
        onChange={e => setTexto(e.target.value)}
        aria-invalid={!valido}
        className="mt-2 w-40 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      {!valido && <p className="mt-2 text-sm text-primary" role="alert">Escribe un importe entre 1 € y 1.000.000 €.</p>}
      <ul className="mt-4 divide-y divide-border/50 rounded-xl border border-border/50" aria-live="polite">
        {filas.map(f => {
          const coste = valido ? comisionPublicada(f.formula, importe) : null
          return (
            <li key={f.slug} className="grid gap-2 p-4 sm:grid-cols-[9rem_9rem_1fr]">
              <p className="font-semibold text-foreground">{f.nombre}</p>
              <p className="tabular-nums">
                {!f.formula ? (
                  <span className="text-sm text-muted-foreground">No calculable</span>
                ) : coste === null ? (
                  '—'
                ) : (
                  <>
                    <strong className="text-foreground">{euros(coste)}</strong>
                    <span className="block text-xs text-muted-foreground">{pct(porcentajeEfectivo(f.formula, importe))} del importe</span>
                  </>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {f.nota}{' '}
                <a href={f.fuente} target="_blank" rel="noopener noreferrer" className="text-xs underline underline-offset-2 hover:text-primary">
                  (fuente, {f.comprobado})
                </a>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
