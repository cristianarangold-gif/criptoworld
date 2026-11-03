'use client'
import { useEffect, useState } from 'react'
import { normalizeSearch } from '@/lib/cnmv'

type Option = { id: string; label: string }

const selectClass = 'w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'

// Buscador de la lista de la CNMV: oculta en el cliente las entidades que no cumplen. El HTML del servidor las
// trae todas, así que sin JavaScript (y para Google) se ve la lista completa.
export function CnmvFilter({ paises, tipos, servicios, total }: { paises: string[]; tipos: Option[]; servicios: string[]; total: number }) {
  const [texto, setTexto] = useState('')
  const [pais, setPais] = useState('')
  const [tipo, setTipo] = useState('')
  const [servicio, setServicio] = useState('')
  const [shown, setShown] = useState(total)
  const activo = Boolean(texto.trim() || pais || tipo || servicio)

  useEffect(() => {
    const q = normalizeSearch(texto)
    let n = 0
    document.querySelectorAll<HTMLElement>('[data-entidad]').forEach(el => {
      const match =
        (!q || (el.dataset.q ?? '').includes(q)) &&
        (!pais || el.dataset.pais === pais) &&
        (!tipo || el.dataset.tipo === tipo) &&
        (!servicio || (el.dataset.servicios ?? '').split('|').includes(servicio))
      el.hidden = !match
      if (match) n++
    })
    setShown(n)
  }, [texto, pais, tipo, servicio])

  const limpiar = () => { setTexto(''); setPais(''); setTipo(''); setServicio('') }

  return (
    <div className="rounded-xl border border-border/50 p-4">
      <label className="block text-sm font-semibold text-foreground" htmlFor="cnmv-texto">Busca por empresa o marca</label>
      <input
        id="cnmv-texto"
        type="search"
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Por ejemplo: Coinbase, Bit2Me, Kraken…"
        className={`mt-2 ${selectClass}`}
      />
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <label className="text-xs text-muted-foreground">
          País de origen
          <select value={pais} onChange={e => setPais(e.target.value)} className={`mt-1 ${selectClass}`}>
            <option value="">Todos</option>
            {paises.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="text-xs text-muted-foreground">
          Tipo de entidad
          <select value={tipo} onChange={e => setTipo(e.target.value)} className={`mt-1 ${selectClass}`}>
            <option value="">Todos</option>
            {tipos.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </label>
        <label className="text-xs text-muted-foreground">
          Servicio
          <select value={servicio} onChange={e => setServicio(e.target.value)} className={`mt-1 ${selectClass}`}>
            <option value="">Todos</option>
            {servicios.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
        {activo ? `${shown} de ${total} entidades.` : `${total} entidades.`}
        {activo && (
          <button type="button" onClick={limpiar} className="ml-2 text-primary underline underline-offset-2">Quitar filtros</button>
        )}
      </p>
      {shown === 0 && (
        <p className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
          <strong className="text-foreground">Sin resultados.</strong> Muchas marcas operan con el nombre de otra sociedad: mira en el aviso legal de la
          plataforma qué empresa presta el servicio y búscala aquí. Si tampoco aparece, comprueba el registro oficial de la CNMV antes de enviarle dinero.
        </p>
      )}
    </div>
  )
}
