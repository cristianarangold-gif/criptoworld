---
titulo: "LNbits pide a todos sus usuarios detener sus servidores tras una oleada de ataques"
descripcion: "LNbits pidió parar todos los servidores Lightning tras varios ataques. Un operador perdió 2,29 millones de satoshis y el parche tardará 24-48 horas."
fecha: 2026-11-09
fuentes:
  - title: "Bitcoin.com News: Lightning Network security scare forces LNbits servers offline"
    url: "https://news.bitcoin.com/security/lightning-network-security-scare-forces-lnbits-servers-offline/"
  - title: "CriptoNoticias: LNbits pide a todos sus usuarios detener sus servidores tras una «oleada de ataques»"
    url: "https://www.criptonoticias.com/seguridad-bitcoin/lnbits-pide-a-todos-sus-usuarios-detener-sus/"
  - title: "The Defiant: LNbits urges all server operators to shut down after attacks"
    url: "https://thedefiant.io/news/security/lnbits-urges-all-server-operators-to-shut-down-after-attacks"
relacionados:
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Autocustodia en el glosario"
    href: "/glosario#autocustodia"
  - title: "Qué es una wallet y qué tipos hay"
    href: "/academia/wallet"
---
LNbits, un software de código abierto para gestionar cuentas y monederos sobre la red Lightning de Bitcoin, pidió el domingo 8 de noviembre de 2026 a todos sus usuarios que detuvieran sus servidores «inmediatamente» tras lo que describió como una oleada de ataques. El proyecto también apagó las instancias de su servicio alojado, my.lnbits.com, y dice tener varios parches de seguridad pendientes. Aún no ha detallado qué fallo se explotó.

## Qué ha pasado

LNbits es un programa que cualquiera puede instalar en su propio servidor para crear monederos y cuentas Lightning, por ejemplo para cobrar propinas o pagos pequeños. Además, el proyecto ofrece un servicio ya montado en my.lnbits.com.

Según Bitcoin.com News, la secuencia fue esta, en horas UTC:

- Hacia las 12:33, LNbits pidió a quienes usaban su extensión Paywall (la que permite cobrar por acceder a contenido) que la desactivaran mientras investigaba una posible vulnerabilidad. Ni CriptoNoticias ni Bitcoin.com aclaran si ese fallo está relacionado con los ataques posteriores.
- Hacia las 13:56, el proyecto publicó en su cuenta de X el aviso general: todos los usuarios debían parar sus servidores de inmediato.
- Después, desactivó las instancias de su servicio alojado. El equipo indicó que se reanudaría en unas 24 horas.

El único caso concreto de pérdidas que citan los medios es el de Kevin Ravensberg, que gestiona una instancia de LNbits (lnbits.btip.nl) sobre la que funciona BitTipBot, un bot de Telegram para dar propinas por Lightning. Según su relato, recogido por CriptoNoticias, unas cuentas recién creadas aprovecharon un fallo y retiraron 2.285.545 satoshis (0,02285545 BTC, alrededor de 1.700 dólares según el medio) entre las 9:22 y las 14:00 UTC, antes de que pudiera detener el servidor. Ravensberg ha dicho que compensará a los usuarios del bot, aunque no podrán acceder a sus fondos hasta que se corrijan las vulnerabilidades. CriptoNoticias señala que LNbits no ha comunicado pérdidas en su propio servicio.

Sobre los plazos, The Defiant y otros medios atribuyen a Ben Arc, colaborador del proyecto, que los parches deberían estar disponibles en un plazo de 24 a 48 horas. Como LNbits es software que cada operador aloja por su cuenta, no existe un interruptor central que proteja todas las instalaciones: cada uno tiene que actuar en la suya.

Nota sobre las fuentes: el aviso original está en X y no se ha podido abrir, así que los datos proceden de lo publicado por los medios citados, que coinciden en lo esencial. Los detalles técnicos del ataque, el número de instancias afectadas y el importe total robado no se conocen por ahora.

## Qué significa para ti si vives en España

Si solo tienes bitcoin en una wallet normal o en un exchange, esta noticia no te obliga a hacer nada: LNbits no es una wallet que use la mayoría de la gente directamente, sino una pieza que otros montan para ofrecer servicios.

Donde sí puede afectarte es de forma indirecta. Muchos servicios pequeños de Lightning (bots de propinas, tiendas, cobros por contenido, monederos «de cortesía» en comunidades) funcionan sobre LNbits. En ellos, normalmente, el dinero lo controla quien administra el servidor y no tú: es un modelo de custodia, en el que tienes un saldo apuntado en su sistema pero no las claves. Si el operador sufre un ataque, tu saldo depende de que él pueda y quiera responder, como ha prometido Ravensberg con su bot.

Algunas ideas prácticas, sin que sean una recomendación de inversión:

- Si usas algún servicio de este tipo, comprueba en sus canales oficiales si funciona sobre LNbits y si está parado o ya parcheado.
- Si administras tu propia instancia, el proyecto pide pararla y esperar los parches, y vigilar sus anuncios oficiales antes de reactivarla.
- Como regla general, no dejes en saldos de custodia de terceros más de lo que estarías dispuesto a perder.

En cuanto a Hacienda, si hubieras perdido fondos por un ataque, tienes una guía sobre cómo tratar fiscalmente una estafa o un hackeo en nuestra sección de respuestas.

## Para entenderlo

- [Seguridad en criptomonedas](/aprende/seguridad-cripto): te explica cómo reducir riesgos y por qué conviene limitar lo que dejas en servicios de terceros.
- [Autocustodia](/glosario#autocustodia): aclara la diferencia entre tener tú las claves y dejar tus fondos en manos de un operador.
- [Qué es una wallet](/academia/wallet): repasa los tipos de monedero y quién controla el dinero en cada uno.
