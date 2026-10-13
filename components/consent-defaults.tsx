import Script from 'next/script'

// Modo de consentimiento v2 de Google. En el EEE, Reino Unido y Suiza todo empieza denegado
// hasta que el visitante elige en el mensaje de consentimiento de Google (CMP de AdSense),
// que actualiza estos valores. Fuera de esas regiones no se exige consentimiento previo.
const CONSENT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO',
  'GB', 'CH',
]

const DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
}

const GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
}

export function ConsentDefaults() {
  return (
    <Script id="consent-defaults" strategy="beforeInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', ${JSON.stringify({ ...DENIED, region: CONSENT_REGIONS, wait_for_update: 500 })});
gtag('consent', 'default', ${JSON.stringify(GRANTED)});
gtag('set', 'ads_data_redaction', true);`}
    </Script>
  )
}
