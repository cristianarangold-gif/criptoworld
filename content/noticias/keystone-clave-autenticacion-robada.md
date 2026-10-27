---
titulo: "Keystone destruirá 18.835 hardware wallets tras el robo de la clave con la que se comprueba que un dispositivo es genuino"
descripcion: "El atacante de Keystone también robó la clave que verifica que una wallet es genuina. La empresa pide comprobar los aparatos recibidos tras el 20 de octubre."
fecha: 2026-10-27
fuentes:
  - title: "Cointelegraph: Keystone breach deepens, hackers stole key used to verify wallets as genuine"
    url: "https://cointelegraph.com/news/keystone-breach-deepens-hackers-stole-key-used-to-verify-wallets-as-genuine"
  - title: "crypto.news: Keystone to destroy 18,835 hardware wallets after authentication key breach"
    url: "https://crypto.news/keystone-to-destroy-18835-hardware-wallets-after-authentication-key-breach/"
  - title: "The Defiant: Keystone to destroy 18,835 wallets after device-authentication key theft"
    url: "https://thedefiant.io/news/security/keystone-to-destroy-18-835-wallets-after-device-authentication-key-theft"
relacionados:
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Hardware wallet en el glosario"
    href: "/glosario#hardware-wallet"
  - title: "Phishing en el glosario"
    href: "/glosario#phishing"
---
Keystone, el fabricante de hardware wallets que ya había reconocido una brecha en su tienda online, ha ampliado lo que se llevó el atacante: además de datos de compradores, obtuvo la clave que se usa para comprobar que un dispositivo es auténtico. La empresa lo comunicó el lunes 26 de octubre de 2026 y destruirá 18.835 dispositivos que tenía en inventario. Pide a quien recibiera un aparato después del 20 de octubre que lo verifique con su soporte antes de usarlo.

## Qué ha pasado

Según Keystone, recogida por Cointelegraph, crypto.news y The Defiant, el atacante entró en su web el 20 de octubre aprovechando un fallo en una herramienta de monitorización de terceros. Keystone dice que bloqueó el acceso ese mismo día, corrigió la vulnerabilidad y abrió una investigación forense. La comunicación original está en una publicación de la empresa en X que no hemos podido leer directamente, así que lo que sigue se apoya en cómo la recogen esos tres medios, que coinciden en lo esencial.

Lo nuevo es la llamada clave WebAuth. Es la que usa la página de autenticación de Keystone para decidir si un dispositivo es genuino. Según crypto.news, se graba en el aparato durante la fabricación y no se puede borrar ni reescribir. Con esa clave en su poder, un atacante podría fabricar wallets falsificadas que superen la comprobación que hacen los clientes. Keystone insiste en que esa clave no interviene en generar frases de recuperación, derivar claves privadas ni firmar transacciones.

Las cifras que da la empresa, según crypto.news:

- 18.835 dispositivos en inventario llevan la clave comprometida y se destruirán.
- 25.964 registros de compras de 2024 a 2026 quedaron expuestos, con nombres, datos de contacto, direcciones de envío y detalles del pedido.
- 12.873 registros de compras sin terminar contenían datos personales.

Keystone atribuye la exposición de datos a que una herramienta automática de borrado falló y no se detectó a tiempo; la política era conservar los datos 180 días y ahora será de 90. Los envíos de dispositivos con la clave antigua están suspendidos y se venden en preventa hasta que haya unidades con una clave nueva. La empresa añade que ha presentado avisos en la UE, el Reino Unido y otras jurisdicciones.

Sobre qué dispositivos son de fiar, la empresa distingue entre los entregados antes del 20 de octubre, que considera seguros si superan la comprobación, y los recibidos después con la clave antigua. De estos últimos dice que no puede garantizar su autenticidad y pide contactar con su soporte para una verificación adicional.

## Qué significa para ti si vives en España

Si compraste tu Keystone antes del 20 de octubre, según la empresa tu dispositivo sigue siendo de fiar y no tienes que mover tus criptomonedas. Si lo recibiste después de esa fecha, o estás esperando un pedido, conviene escribir al soporte desde la página oficial de Keystone, que escribes tú en el navegador, nunca desde un enlace de un mensaje, y no usarlo mientras no te confirmen.

El otro riesgo son las estafas. Keystone avisa de que quien te pida devolver el aparato por un supuesto «retiro del mercado», o te ofrezca ayuda para migrar tus fondos o verificar tus activos, es un estafador. La empresa dice que no necesitas mover tus criptomonedas por este incidente. Con tu nombre, dirección y pedido filtrados, una llamada o un SMS falso puede sonar muy creíble. Ningún soporte legítimo necesita jamás tu frase de recuperación.

Si crees que tus datos están entre los filtrados, la dirección postal es un dato personal: puedes ejercer tus derechos de acceso y supresión frente a la empresa y reclamar ante la Agencia Española de Protección de Datos. Esto no cambia nada en tu declaración de la Renta.

Una lección general: una hardware wallet se compra siempre al fabricante o a un distribuidor oficial, y la comprobación de autenticidad es una capa más, no una garantía absoluta.

## Para entenderlo

- [Seguridad en criptomonedas: cómo proteger tus fondos paso a paso](/aprende/seguridad-cripto): para repasar cómo se protege una frase de recuperación y qué señales delatan una estafa.
- [Hardware wallet](/glosario#hardware-wallet): para entender qué hace este dispositivo y por qué una clave de autenticación no es lo mismo que tus claves privadas.
- [Phishing](/glosario#phishing): para ver cómo se usan datos reales de una compra para engañar a la víctima.
