'use client'

declare global {
  interface Window {
    googlefc?: { callbackQueue?: unknown[]; showRevocationMessage?: () => void }
  }
}

// Reabre el mensaje de consentimiento de Google (CMP de AdSense) para cambiar la elección.
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  function open() {
    const fc = (window.googlefc = window.googlefc || {})
    fc.callbackQueue = fc.callbackQueue || []
    fc.callbackQueue.push(() => window.googlefc?.showRevocationMessage?.())
  }
  return (
    <button type="button" onClick={open} className={className}>
      Configurar cookies
    </button>
  )
}
