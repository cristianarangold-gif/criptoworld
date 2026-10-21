---
titulo: "Una autoridad de certificación india usó claves tan débiles que se rompieron en menos de un segundo: qué implica para los bots y las API de exchanges"
descripcion: "Ocho claves de eMudhra eran números diminutos, como el 4. Navegadores y Mozilla ya las han bloqueado, pero algunos programas podrían seguir confiando en ellas."
fecha: 2026-10-21
fuentes:
  - title: "Mozilla Security Blog: Protecting Firefox users following the compromise of eMudhra intermediate certificates"
    url: "https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/"
  - title: "Scott Helme: Eight bits of trust, eMudhra's CA keys cracked in milliseconds"
    url: "https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/"
  - title: "CoinDesk: A company that vouches for websites had secret keys so weak that 8 of them were cracked"
    url: "https://www.coindesk.com/tech/2026/10/21/a-company-that-vouches-for-websites-had-secret-keys-so-weak-that-8-of-them-were-cracked"
relacionados:
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Clave privada: qué es y por qué no debe adivinarse"
    href: "/glosario#clave-privada"
  - title: "Estafas cripto: cómo reconocerlas antes de caer"
    href: "/aprende/estafas-cripto"
---
Mozilla ha hecho público que las claves privadas de ocho certificados intermedios de eMudhra, una autoridad de certificación india, estaban comprometidas. Según el análisis del investigador Scott Helme, eran tan simples que se podían recuperar en menos de un segundo. Navegadores como Chrome y Firefox ya las bloquean, pero el caso es un recordatorio de que otros programas, como los que usan algunos bots de trading, podrían seguir confiando en ellas.

## Qué ha pasado

Una autoridad de certificación es una empresa en la que confían los navegadores y los sistemas operativos para garantizar que, cuando entras en una web, hablas de verdad con esa web. Para ello firma certificados con sus claves privadas. Si esas claves se filtran o son adivinables, cualquiera podría fabricar certificados falsos que parecen legítimos.

El 17 de octubre de 2026, un investigador avisó a Apple, Google, Microsoft, Mozilla y a la propia eMudhra de que las claves privadas de ocho certificados intermedios de esta entidad estaban comprometidas. Según Scott Helme, que analizó el caso de forma independiente, seis de esos certificados servían para webs y dos para firmar código. Mozilla confirma que recibió el aviso ese mismo día y que bloqueó los certificados en Firefox en menos de tres horas. Chrome los bloqueó la misma tarde, según Helme. Mozilla publicó el aviso el 20 de octubre y lanzó actualizaciones de Firefox y de su librería de certificados (NSS) para quienes tuvieran ajustes personalizados.

El fallo es casi increíble. Estas claves, de tipo elíptico P-384, debían ser números aleatorios enormes. Helme encontró que en realidad eran valores minúsculos, como el 4, el 56 o el 115, y que las recuperó a partir de los certificados públicos en menos de un segundo. Los certificados se crearon en abril de 2025, así que, según su análisis, las claves llevan unos 17 meses al alcance de cualquiera y no hay forma de saber si alguien las aprovechó. Según CoinDesk, que cita a The Register, eMudhra ha emitido más de 60 millones de certificados. Helme añade que, según la propia eMudhra, la causa fue un error en el guion de su ceremonia de generación de claves.

Chrome y Firefox exigen además pruebas adicionales de transparencia de certificados, por lo que, según Helme, es poco probable que ahí se aceptaran certificados falsos. El problema está en otro sitio: en sus pruebas, herramientas como curl, Python, Node, Go o Java, con su configuración por defecto, aceptaron un certificado falso de la API de Stripe, porque confían en una lista de entidades guardada en el disco y no comprueban revocaciones. Helme recomienda actualizar los paquetes que incluyen esa lista, y menciona que ya hay correcciones para Go, el paquete certifi de Python y Rust.

CoinDesk señala que los bots de trading, los scripts conectados a exchanges y los servidores de carteras escritos en esos lenguajes podrían verse afectados si un atacante estuviera en la misma red. El medio no informa de ataques a usuarios de criptomonedas hasta ahora.

## Qué significa para ti si vives en España

Si usas un exchange desde su web o su app oficial en un navegador actualizado, no tienes que hacer nada: Chrome, Firefox y Safari ya no se fían de estos certificados. Mozilla indica que los usuarios con configuración estándar de Firefox estaban protegidos automáticamente.

El riesgo se concentra en quien ejecuta software propio o de terceros que se conecta a una API de un exchange: bots, hojas de cálculo con scripts, herramientas de contabilidad de operaciones o nodos autoalojados. Si es tu caso, conviene actualizar el sistema operativo y las librerías de certificados, y reconstruir contenedores si los usas. Un ataque así exigiría que alguien controlara tu conexión, por ejemplo en una wifi pública, de modo que evitar redes abiertas para operar sigue siendo una buena práctica.

Tampoco debería cambiar nada en tu declaración: no hay pérdida de fondos conocida asociada a este caso. Si en el futuro te robaran criptomonedas por una vía como esta, hay una respuesta específica sobre cómo tratarlo ante Hacienda, enlazada más abajo. Recuerda también que ninguna actualización de seguridad te va a pedir nunca tu frase semilla ni tus claves: si alguien lo hace, es una estafa.

## Para entenderlo

- [Seguridad en criptomonedas: cómo proteger tus fondos paso a paso](/aprende/seguridad-cripto): buenas prácticas generales de protección de cuentas, dispositivos y conexiones.
- [Clave privada](/glosario#clave-privada): para entender por qué una clave debe ser un número aleatorio y difícil de adivinar, en este caso tanto como en una cartera.
- [Estafas cripto](/aprende/estafas-cripto): cómo identificar los engaños más habituales, incluidos los que se aprovechan de noticias de seguridad como esta.
