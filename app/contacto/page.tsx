import { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { LegalPage } from '@/components/legal-page'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cómo contactar con CriptoMundo para avisar de errores, proponer temas o ejercer tus derechos de privacidad.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoPage() {
  return (
    <LegalPage
      icon={Mail}
      title="Contacto"
      intro="CriptoMundo lo lleva una sola persona, así que la forma más directa de hablar conmigo es el email. Leo todos los mensajes y suelo responder en un plazo de 2 a 5 días laborables."
    >
      <section>
        <h2>Email</h2>
        <p>
          <a href={`mailto:${SITE.email}`} className="text-lg font-semibold">{SITE.email}</a>
        </p>
      </section>

      <section>
        <h2>Para qué puedes escribirme</h2>
        <ul>
          <li><strong>Errores o datos desactualizados.</strong> Si un artículo tiene un dato incorrecto o una norma ha cambiado, indícame la página y, si puedes, la fuente. Lo reviso y corrijo cuanto antes.</li>
          <li><strong>Temas que quieres que explique.</strong> Las dudas de los lectores son la mejor guía para decidir qué escribir.</li>
          <li><strong>Privacidad.</strong> Para acceder, corregir o borrar tus datos o tu cuenta (más detalles en la <Link href="/privacidad">Política de privacidad</Link>).</li>
          <li><strong>Colaboraciones.</strong> Cualquier contenido patrocinado se identificaría claramente como tal.</li>
        </ul>
      </section>

      <section>
        <h2>Lo que no puedo hacer</h2>
        <ul>
          <li><strong>Darte asesoramiento de inversión personalizado.</strong> No soy asesor financiero ni estoy registrado en la CNMV, así que no puedo decirte qué comprar, cuándo vender ni cuánto invertir.</li>
          <li><strong>Recuperar fondos perdidos o robados.</strong> Si has sufrido una estafa, denúnciala ante la Policía Nacional o la Guardia Civil y consulta las advertencias de la <a href="https://www.cnmv.es" target="_blank" rel="noopener noreferrer">CNMV</a>. Desconfía de quien te prometa recuperar tu dinero a cambio de un pago: es una estafa habitual.</li>
        </ul>
        <p className="mt-3">
          CriptoMundo nunca te pedirá por email tu frase semilla, tus claves privadas ni contraseñas. Si alguien lo
          hace en nuestro nombre, es un intento de fraude.
        </p>
      </section>

      <section>
        <h2>Titular</h2>
        <p>
          {SITE.owner} · NIF {SITE.ownerId} · {SITE.country}. Más información en el <Link href="/aviso-legal">Aviso legal</Link>.
        </p>
      </section>
    </LegalPage>
  )
}
