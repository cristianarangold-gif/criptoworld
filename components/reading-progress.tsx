'use client'
import { useEffect, useRef } from 'react'

// Barra fina bajo la cabecera que se llena al avanzar por el artículo. Decorativa.
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      // max - 2: absorbe el redondeo de subpíxeles para llegar al 100 % al final de la página
      const p = max > 2 ? Math.min(1, Math.max(0, window.scrollY / (max - 2))) : 1
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div className="fixed inset-x-0 top-16 z-40 h-0.5" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-primary to-secondary" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
