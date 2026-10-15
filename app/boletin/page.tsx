import { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { NewsletterForm } from '@/components/newsletter-form'
import { newsletterEnabled } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Boletín semanal de CriptoMundo',
  description: 'Recibe cada lunes por email el resumen de la semana en criptomonedas, explicado para quien vive en España. Gratis, sin publicidad y con baja en un clic.',
  alternates: { canonical: '/boletin' },
}

export default function BoletinPage() {
  const enabled = newsletterEnabled()
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <Mail className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Boletín semanal</h1>
      </div>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          Cada lunes por la mañana te enviamos el <Link href="/resumen-semanal" className="text-primary underline underline-offset-2">resumen semanal</Link>:
          las noticias de la semana anterior, lo que significan si vives en España, cómo se movió el mercado, las fechas
          que se acercan (de Hacienda, de la normativa y de las redes) y algo para aprender.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong className="text-foreground">Un email a la semana</strong>, revisado antes de enviarse.</li>
          <li><strong className="text-foreground">Sin publicidad</strong> y sin recomendaciones de inversión.</li>
          <li><strong className="text-foreground">Solo guardamos tu email</strong>, con Brevo (empresa francesa, servidores en la UE). Más detalles en la <Link href="/privacidad" className="text-primary underline underline-offset-2">política de privacidad</Link>.</li>
          <li><strong className="text-foreground">Te das de baja con un clic</strong> desde cualquier email.</li>
        </ul>
      </div>
      <div className="mt-8">
        {enabled ? (
          <NewsletterForm />
        ) : (
          <p className="rounded-xl border border-border/50 p-5 text-sm text-muted-foreground">
            La suscripción por email estará disponible muy pronto. Mientras tanto, puedes leer el resumen cada lunes en la web o
            seguirlo con un lector de RSS desde <a href="/feed.xml" className="text-primary underline underline-offset-2">nuestro feed</a>.
          </p>
        )}
      </div>
    </div>
  )
}
