'use client'
import { useEffect } from 'react'

// Un único listener para toda la web: mueve el halo de cualquier elemento con la clase .glow-card
// (variables CSS --x/--y). Solo actúa con ratón; en pantallas táctiles no hace nada.
export function GlowTracker() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('.glow-card') as HTMLElement | null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - r.left}px`)
      card.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
