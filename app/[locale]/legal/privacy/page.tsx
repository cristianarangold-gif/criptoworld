import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict?.legal?.privacy ?? 'Privacy Policy' };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEs = locale === 'es';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
        </h1>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <p>{isEs ? 'Última actualización: Septiembre 2026' : 'Last updated: September 2026'}</p>
        <h2>{isEs ? '1. Información que Recopilamos' : '1. Information We Collect'}</h2>
        <p>{isEs ? 'Recopilamos información mínima necesaria para el funcionamiento del servicio: dirección de email para la newsletter (con consentimiento), datos de uso anónimos y cookies técnicas necesarias.' : 'We collect minimum information necessary for service operation: email address for newsletter (with consent), anonymous usage data, and necessary technical cookies.'}</p>
        <h2>{isEs ? '2. Uso de la Información' : '2. Use of Information'}</h2>
        <p>{isEs ? 'Utilizamos tu información únicamente para proporcionar y mejorar nuestros servicios. No vendemos ni compartimos tus datos personales con terceros.' : 'We use your information solely to provide and improve our services. We do not sell or share your personal data with third parties.'}</p>
        <h2>{isEs ? '3. Cookies' : '3. Cookies'}</h2>
        <p>{isEs ? 'Utilizamos cookies esenciales para el funcionamiento del sitio. Consulta nuestra Política de Cookies para más información.' : 'We use essential cookies for site operation. See our Cookie Policy for more information.'}</p>
        <h2>{isEs ? '4. Tus Derechos' : '4. Your Rights'}</h2>
        <p>{isEs ? 'Tienes derecho a acceder, rectificar o eliminar tus datos personales. Para ejercer estos derechos, contáctanos a través de los canales indicados en esta página.' : 'You have the right to access, rectify, or delete your personal data. To exercise these rights, contact us through the channels indicated on this page.'}</p>
      </div>
    </div>
  );
}
