'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

// Formulario del boletín: casilla de privacidad sin marcar, campo oculto contra bots y doble confirmación
// por email (la hace Brevo). Solo se muestra si el boletín está configurado (ver newsletterEnabled).
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [web, setWeb] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, consent, web }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setState('ok')
        setMessage('Te hemos enviado un email: pulsa el enlace para confirmar la suscripción. Si no lo ves, mira en la carpeta de spam.')
      } else {
        setState('error')
        setMessage(data.error || 'No hemos podido completar la suscripción. Inténtalo de nuevo más tarde.')
      }
    } catch {
      setState('error')
      setMessage('No hemos podido completar la suscripción. Inténtalo de nuevo más tarde.')
    }
  }

  return (
    <div className={compact ? '' : 'rounded-xl border border-primary/30 bg-primary/5 p-5'}>
      <p className="flex items-center gap-2 font-display font-bold text-foreground">
        <Mail className="h-4 w-4 text-primary" />
        Recibe el resumen semanal por email
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Cada lunes, lo más importante de la semana en cinco minutos. Gratis y sin publicidad; te das de baja con un clic.</p>
      {state === 'ok' ? (
        <p className="mt-3 text-sm text-foreground" role="status">{message}</p>
      ) : (
        <form onSubmit={submit} className="mt-3 space-y-3" noValidate>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="nl-email">Tu email</label>
            <input
              id="nl-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {state === 'sending' ? 'Enviando…' : 'Suscribirme'}
            </button>
          </div>
          {/* Campo trampa para bots: oculto a las personas y a los lectores de pantalla. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Web<input tabIndex={-1} autoComplete="off" value={web} onChange={e => setWeb(e.target.value)} name="web" /></label>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5" />
            <span>
              He leído y acepto la <Link href="/privacidad" className="text-primary underline underline-offset-2">política de privacidad</Link>. Usaremos tu email solo para enviarte el boletín (con Brevo, en la UE).
            </span>
          </label>
          {state === 'error' && <p className="text-sm text-red-500" role="alert">{message}</p>}
        </form>
      )}
    </div>
  )
}
