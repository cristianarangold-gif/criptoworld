import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Suscripción confirmada',
  robots: { index: false, follow: true },
}

export default function ConfirmadoPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
      <h1 className="mt-4 font-display text-3xl font-bold">¡Listo! Ya estás suscrito</h1>
      <p className="mt-3 text-muted-foreground">
        Recibirás el resumen semanal cada lunes. Si algún día prefieres no recibirlo, cada email tiene un enlace para darte de baja.
      </p>
      <p className="mt-6">
        <Link href="/resumen-semanal" className="text-primary underline underline-offset-2">Lee el último resumen</Link>
      </p>
    </div>
  )
}
