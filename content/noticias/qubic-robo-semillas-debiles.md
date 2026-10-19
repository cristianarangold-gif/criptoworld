---
titulo: "Qubic detiene su cadena tras el robo de unos 1,4 millones de dólares por semillas generadas sin suficiente aleatoriedad"
descripcion: "Un atacante vació más de 1.400 carteras de Qubic creadas en iPhone, iPad o Safari. La red está parada y el fallo, según el proyecto, ya está corregido."
fecha: 2026-10-19
fuentes:
  - title: "Cointelegraph: Qubic freezes chain after attacker drains 1.4K wallets with weak seeds"
    url: "https://cointelegraph.com/news/qubic-freezes-chain-after-attacker-drains-14k-wallets-with-weak-seeds"
  - title: "CriptoNoticias: Usuarios de Qubic sufrieron un robo por un fallo de entropía como el de Coldcard"
    url: "https://www.criptonoticias.com/seguridad-bitcoin/usuarios-qubic-robo-entropia-coldcard/"
relacionados:
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Seed phrase: qué es y cómo guardarla"
    href: "/academia/seed-phrase"
  - title: "Qué hacer con Hacienda si te estafan o te hackean"
    href: "/respuestas/declarar-estafa-o-hackeo"
---
Qubic, una cadena de bloques de capa 1, detuvo su red este fin de semana después de que un atacante vaciara más de 1.400 carteras. Según el propio proyecto, que recoge Cointelegraph, el robo ronda los 1,4 millones de dólares y se debe a que algunas frases semilla se generaron con una aleatoriedad insuficiente, no a un fallo del protocolo.

## Qué ha pasado

Según CriptoNoticias, el ataque se produjo entre las 23:42 UTC del 17 de octubre y la 01:26 UTC del 18 de octubre: en menos de dos horas el atacante movió fondos de 1.404 carteras. En total salieron 2,94 billones de tokens QU (en la escala española, 2,94 × 10¹²), alrededor de un 2 % de los que circulan.

Qubic explica que el problema afecta a las semillas creadas de tres maneras:

- en cualquier navegador de un iPhone o un iPad;
- en Safari en un Mac, hasta el 18 de octubre de 2026;
- en la aplicación de iOS de Qubic, antes de julio de 2025.

La clave del asunto es la entropía, que es la aleatoriedad con la que se genera una semilla. Si ese azar es insuficiente, el abanico de semillas posibles se reduce y un atacante puede probarlas hasta dar con las de otras personas. Cointelegraph cita un cambio en el código de la versión 4.26.4 de la cartera web de Qubic: se sustituyó la función `Math.random()` de JavaScript, que no está pensada para secretos criptográficos, por `crypto.getRandomValues()`, que sí lo está.

La red se detuvo en el bloque (tick) 85.371.949 y, cuando se publicó la noticia, seguía parada sin fecha de reinicio. La parada la acordaron los llamados Computors, los participantes que gobiernan la red. Qubic asegura que el 87,1 % de lo sustraído nunca salió de su cadena y está inmovilizado. El 12,9 % restante llegó al exchange MEXC, cuyo equipo congeló la cuenta receptora en aproximadamente una hora, según el proyecto. Varios exchanges han suspendido además los depósitos y retiradas de QU, según CriptoNoticias.

El equipo central identifica ahora las carteras afectadas y prepara opciones de recuperación que los Computors votarán. Qubic promete un informe técnico completo cuando haya un plan cerrado. Cointelegraph indica que el proyecto no respondió a su petición de comentarios, así que, de momento, casi todos los datos proceden de lo que cuenta Qubic.

Las dos publicaciones comparan el caso con el de Coldcard: en julio, esa marca de carteras físicas reconoció que un error de firmware debilitó semillas y permitió robos. Para ese caso, CriptoNoticias cita una estimación de Galaxy Research de hasta 2.055 bitcoines expuestos. Cointelegraph recuerda también episodios anteriores parecidos, como la extensión de Trust Wallet y la herramienta Libbitcoin Explorer en 2023.

## Qué significa para ti si vives en España

Si no tienes QU, el incidente no te afecta de forma directa. Pero sirve para entender un riesgo que existe en cualquier cartera: el de que la semilla no sea tan aleatoria como crees. Una frase de 12 o 24 palabras solo protege si se generó con una fuente de azar de calidad.

Si sí tienes una cartera de Qubic, Qubic aconseja tratar la semilla como posiblemente comprometida cuando se creó en alguno de los casos citados, y generar una nueva solo con software actualizado. Siguiendo lo que indica el proyecto, nadie de su equipo te contactará primero, te pedirá la semilla ni te ofrecerá recuperar fondos a cambio de dinero: cualquier oferta así es una estafa. Con incidentes de este tipo suelen aparecer falsos «servicios de recuperación».

Si has perdido fondos, Qubic pide denunciar y facilitar el identificador de la cartera, el importe y el enlace de la transacción en su explorador, porque los informes formales ayudan a que los exchanges mantengan congelados los fondos. En España puedes denunciar ante la Policía Nacional o la Guardia Civil. Hacienda tiene sus propias reglas sobre cómo reflejar una pérdida por estafa o robo, y las explicamos en la respuesta enlazada más abajo; no es un trámite automático y conviene conservar pruebas de todo.

Por último, un detalle práctico: las semillas generadas en un navegador son más delicadas que las creadas en una cartera física o una aplicación auditada. No hace falta alarmarse por ello, pero sí saber de dónde viene cada semilla que usas.

## Para entenderlo

- [Seed phrase: qué es y cómo guardarla](/academia/seed-phrase): para comprender qué protege exactamente tu frase de recuperación y por qué la aleatoriedad importa.
- [Seguridad en criptomonedas: cómo proteger tus fondos paso a paso](/aprende/seguridad-cripto): buenas prácticas para elegir y mantener una cartera.
- [Qué hacer con Hacienda si te estafan o te hackean](/respuestas/declarar-estafa-o-hackeo): cómo se trata fiscalmente una pérdida de este tipo.
