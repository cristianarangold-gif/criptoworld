import { Metadata } from 'next'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { LegalPage } from '@/components/legal-page'
import { CookieSettingsButton } from '@/components/cookie-settings-button'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Qué cookies usa CriptoMundo, para qué sirven, cuánto duran y cómo cambiar tu elección.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPage
      icon={Cookie}
      title="Política de cookies"
      intro="Las cookies son pequeños archivos que una web guarda en tu navegador. Aquí explicamos cuáles usa CriptoMundo, quién las pone y cómo puedes aceptarlas, rechazarlas o cambiar de opinión, conforme al artículo 22.2 de la LSSI y a la guía sobre cookies de la Agencia Española de Protección de Datos."
    >
      <section>
        <h2>1. Cómo das o retiras tu consentimiento</h2>
        <p>
          La primera vez que entras, un mensaje de consentimiento (gestionado por Google, plataforma certificada
          para el Espacio Económico Europeo) te permite aceptar todas las cookies, rechazarlas o elegir por
          finalidad. Las cookies técnicas funcionan siempre porque sin ellas la web no puede funcionar; el resto
          solo se activan si las aceptas.
        </p>
        <p className="mt-3">Puedes cambiar tu elección cuando quieras:</p>
        <CookieSettingsButton className="mt-3 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors" />
      </section>

      <section>
        <h2>2. Cookies técnicas (siempre activas)</h2>
        <table>
          <thead>
            <tr><th>Cookie</th><th>Titular</th><th>Para qué sirve</th><th>Duración</th></tr>
          </thead>
          <tbody>
            <tr><td>authjs.session-token</td><td>CriptoMundo</td><td>Mantener tu sesión iniciada en el área personal</td><td>30 días</td></tr>
            <tr><td>authjs.csrf-token</td><td>CriptoMundo</td><td>Proteger el inicio de sesión frente a ataques CSRF</td><td>Sesión</td></tr>
            <tr><td>authjs.callback-url, authjs.state</td><td>CriptoMundo</td><td>Volver a la página correcta tras iniciar sesión</td><td>Sesión</td></tr>
            <tr><td>FCCDCF, FCNEC</td><td>Google</td><td>Guardar tu elección de consentimiento</td><td>Hasta 13 meses</td></tr>
          </tbody>
        </table>
        <p className="mt-3">Las cookies authjs solo se crean si inicias sesión.</p>
      </section>

      <section>
        <h2>3. Cookies de análisis (solo si las aceptas)</h2>
        <table>
          <thead>
            <tr><th>Cookie</th><th>Titular</th><th>Para qué sirve</th><th>Duración</th></tr>
          </thead>
          <tbody>
            <tr><td>_ga</td><td>Google Analytics</td><td>Distinguir visitantes de forma anónima</td><td>2 años</td></tr>
            <tr><td>_ga_*</td><td>Google Analytics</td><td>Mantener el estado de la visita</td><td>2 años</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>4. Cookies publicitarias (solo si las aceptas)</h2>
        <table>
          <thead>
            <tr><th>Cookie</th><th>Titular</th><th>Para qué sirve</th><th>Duración</th></tr>
          </thead>
          <tbody>
            <tr><td>__gads, __gpi, __eoi</td><td>Google AdSense</td><td>Mostrar anuncios, limitar cuántas veces ves el mismo y medir su rendimiento</td><td>Hasta 13 meses</td></tr>
            <tr><td>IDE, DSID</td><td>Google (doubleclick.net)</td><td>Personalizar anuncios según tus intereses</td><td>Hasta 13 meses</td></tr>
          </tbody>
        </table>
        <p className="mt-3">
          Si rechazas las cookies publicitarias, Google puede seguir mostrando anuncios no personalizados, que no
          usan cookies para perfilarte. Google publica la lista completa de sus cookies en{' '}
          <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/cookies</a>.
        </p>
      </section>

      <section>
        <h2>5. Cómo borrarlas desde tu navegador</h2>
        <p>También puedes borrar o bloquear las cookies desde la configuración de tu navegador:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p className="mt-3">Si bloqueas las cookies técnicas, no podrás iniciar sesión en el área personal.</p>
      </section>

      <section>
        <h2>6. Más información</h2>
        <p>
          Lo que hacemos con los datos personales está en la <Link href="/privacidad">Política de privacidad</Link>.
          Para cualquier duda, escribe a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
