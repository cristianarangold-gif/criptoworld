import { Metadata } from 'next'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { LegalPage } from '@/components/legal-page'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Qué datos personales trata CriptoMundo, para qué, durante cuánto tiempo y cómo ejercer tus derechos.',
  alternates: { canonical: '/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <LegalPage
      icon={Lock}
      title="Política de privacidad"
      intro="Esta política explica qué datos personales se tratan cuando visitas CriptoMundo o creas una cuenta, con qué finalidad y qué derechos tienes. Se aplica el Reglamento General de Protección de Datos (RGPD, Reglamento UE 2016/679) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)."
    >
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li><strong>Titular:</strong> {SITE.owner}</li>
          <li><strong>NIF:</strong> {SITE.ownerId}</li>
          <li><strong>País:</strong> {SITE.country}</li>
          <li><strong>Email de contacto:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
        </ul>
      </section>

      <section>
        <h2>2. Qué datos tratamos y para qué</h2>
        <table>
          <thead>
            <tr><th>Situación</th><th>Datos</th><th>Finalidad y base legal</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Navegas por la web</td>
              <td>Dirección IP, tipo de navegador y dispositivo, páginas visitadas</td>
              <td>Servir la web y mantener su seguridad (interés legítimo, art. 6.1.f RGPD).</td>
            </tr>
            <tr>
              <td>Aceptas las cookies de medición</td>
              <td>Identificadores de Google Analytics y datos de uso agregados</td>
              <td>Saber qué contenidos se leen para mejorarlos (consentimiento, art. 6.1.a RGPD).</td>
            </tr>
            <tr>
              <td>Aceptas las cookies publicitarias</td>
              <td>Identificadores publicitarios de Google AdSense</td>
              <td>Mostrar anuncios, personalizados o no según lo que elijas (consentimiento, art. 6.1.a RGPD).</td>
            </tr>
            <tr>
              <td>Creas una cuenta</td>
              <td>Email, nombre (opcional) y contraseña guardada cifrada; si entras con Google, tu nombre, email e imagen de perfil de Google</td>
              <td>Darte acceso a tu área personal (ejecución del servicio que solicitas, art. 6.1.b RGPD).</td>
            </tr>
            <tr>
              <td>Usas el área personal</td>
              <td>Posiciones de tu cartera virtual y progreso en la Academia</td>
              <td>Guardar tu cartera simulada y tu avance (ejecución del servicio, art. 6.1.b RGPD).</td>
            </tr>
            <tr>
              <td>Te suscribes al boletín</td>
              <td>Tu email, la fecha y la página desde la que te suscribiste; si abres los emails o pulsas sus enlaces, Brevo registra esas aperturas y clics</td>
              <td>Enviarte el resumen semanal por email (consentimiento, art. 6.1.a RGPD). Confirmas la suscripción desde un email antes de recibir nada y puedes darte de baja en cualquier momento con el enlace de cada envío.</td>
            </tr>
            <tr>
              <td>Nos escribes un email</td>
              <td>Tu dirección de email y lo que nos cuentes</td>
              <td>Responderte (consentimiento e interés legítimo, art. 6.1.a y 6.1.f RGPD).</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4">
          La cartera virtual es una simulación: no pedimos ni guardamos datos bancarios, claves de exchanges ni
          direcciones de wallets reales. No tomamos decisiones automatizadas ni elaboramos perfiles con efectos
          jurídicos sobre ti.
        </p>
      </section>

      <section>
        <h2>3. Cuánto tiempo los conservamos</h2>
        <ul>
          <li><strong>Datos de cuenta y área personal:</strong> mientras mantengas la cuenta. Si la borras o nos lo pides, los eliminamos.</li>
          <li><strong>Boletín:</strong> hasta que te des de baja. Después, Brevo conserva tu email en su lista de bajas solo para no volver a escribirte.</li>
          <li><strong>Emails:</strong> el tiempo necesario para atender tu consulta y, como máximo, un año después.</li>
          <li><strong>Cookies:</strong> el plazo que se indica en la <Link href="/cookies">Política de cookies</Link>.</li>
        </ul>
      </section>

      <section>
        <h2>4. Con quién se comparten (encargados del tratamiento)</h2>
        <p>No vendemos tus datos. Solo los tratan los proveedores necesarios para que la web funcione:</p>
        <ul>
          <li><strong>Vercel Inc.</strong> (alojamiento de la web, EE. UU.).</li>
          <li><strong>Neon Inc.</strong> (base de datos de cuentas, servidores en Frankfurt, Alemania).</li>
          <li><strong>Sendinblue SAS (Brevo)</strong> (envío del boletín, Francia; según Brevo, sus servidores están en la Unión Europea).</li>
          <li><strong>Google Ireland Ltd. / Google LLC</strong> (inicio de sesión con Google, Google Analytics y Google AdSense).</li>
        </ul>
        <p className="mt-3">
          Algunos de estos proveedores pueden tratar datos en Estados Unidos. Esas transferencias se amparan en el
          Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework) o en las cláusulas contractuales tipo
          aprobadas por la Comisión Europea. Los precios de mercado se obtienen de CoinGecko desde nuestro servidor,
          sin enviarle datos tuyos.
        </p>
      </section>

      <section>
        <h2>5. Publicidad de Google</h2>
        <p>
          Esta web muestra anuncios de Google AdSense. Google y sus socios pueden usar cookies para mostrar anuncios
          basados en tus visitas a esta y otras webs. Puedes desactivar la publicidad personalizada en{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">la configuración de anuncios de Google</a>{' '}
          y consultar cómo usa Google los datos en{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.
        </p>
      </section>

      <section>
        <h2>6. Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
          portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Te responderemos en el plazo de un mes. Si
          consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos</a>.
        </p>
      </section>

      <section>
        <h2>7. Menores de edad</h2>
        <p>
          CriptoMundo no está dirigido a menores de 14 años y no creamos cuentas a sabiendas para ellos. Si eres
          padre, madre o tutor y crees que un menor nos ha facilitado datos, escríbenos y los eliminaremos.
        </p>
      </section>

      <section>
        <h2>8. Cambios en esta política</h2>
        <p>
          Si cambiamos cómo tratamos los datos, actualizaremos esta página y su fecha. Si el cambio es importante y
          tienes cuenta, te avisaremos por email.
        </p>
      </section>
    </LegalPage>
  )
}
