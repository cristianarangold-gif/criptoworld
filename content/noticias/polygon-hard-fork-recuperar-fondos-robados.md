---
titulo: "Binance y Polymarket proponen un hard fork de Polygon para recuperar 70 millones de POL robados"
descripcion: "La propuesta mueve unos 70,49 millones de POL de cinco direcciones bloqueadas a carteras de recuperación. Aún necesita votación de la gobernanza de Polygon."
fecha: 2026-11-05
fuentes:
  - title: "Foro de Polygon: PIP de recuperación de fondos en direcciones bloqueadas tras los incidentes de Polymarket y Binance"
    url: "https://forum.polygon.technology/t/pip-proposal-recovery-of-funds-held-in-blocked-addresses-following-the-polymarket-and-binance-incidents/22497"
  - title: "Cointelegraph: Binance, Polymarket seek Polygon hard fork to recover $6.8M in stolen crypto"
    url: "https://cointelegraph.com/news/polygon-hard-fork-binance-polymarket-6-8m-hack-recovery"
relacionados:
  - title: "Binance sufre un hackeo estimado en 6.300 millones de dólares"
    href: "/noticias/binance-hackeo-6300-millones"
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Qué es una blockchain"
    href: "/academia/blockchain"
---
Binance y Polymarket han presentado el 4 de noviembre de 2026 en el foro de gobernanza de Polygon una propuesta para recuperar, mediante un hard fork, unos 70,49 millones de POL que los atacantes robaron en los incidentes del 29 de octubre. Los fondos están bloqueados por los validadores, pero no se pueden devolver sin cambiar las reglas de la red. La propuesta se presenta hoy, 5 de noviembre, en la llamada de gobernanza de Polygon y todavía no está aprobada.

## Qué ha pasado

Según el texto de la propuesta, el 29 de octubre de 2026 se produjeron dos incidentes distintos en la red Polygon. En el de Polymarket, el atacante movió POL a varias direcciones. En el de Binance, una de sus carteras calientes envió 46,6 millones de POL y unos 6,2 millones de USDT a una dirección controlada por el atacante. Tether congeló esos USDT, así que lo que queda en riesgo es el POL nativo.

Los productores de bloques de Polygon añadieron las direcciones de los atacantes a una lista de bloqueo, a petición de las víctimas, de modo que no pueden mover los fondos. Según el texto, son cuatro direcciones ligadas a Polymarket, con unos 23,9 millones de POL, y una ligada a Binance, con unos 46,6 millones. El texto valora el total en unos 6,5 millones de dólares al precio del 29 de octubre; Cointelegraph habla de unos 6,8 millones.

El problema, explica la propuesta, es que el bloqueo solo impide el movimiento; no devuelve nada a sus dueños. Además lo califica de frágil: cada productor lee su lista solo al arrancar, las entradas no caducan y el filtro no cubre todos los casos posibles. Por eso proponen un hard fork, es decir, un cambio de reglas que obliga a todos los nodos a actualizarse. En un bloque concreto, antes de ejecutar ninguna transacción, el saldo de esas cinco direcciones pasaría a cero y se abonaría a carteras de recuperación de Polymarket y de Binance. El suministro total de POL no cambiaría.

Quedan sin decidir el nombre del fork, el bloque de activación y la versión del cliente. Antes habría que aprobarlo por gobernanza y ensayarlo en la red de pruebas Amoy; el texto estima que dos semanas es un plazo razonable. Los propios autores subrayan que sería una medida extrema y puntual, que no debería servir de precedente salvo que se den las mismas condiciones. En el hilo del foro, la única respuesta hasta ahora es de apoyo.

Binance ya había reconocido su incidente de seguridad, que tratamos en [nuestra noticia anterior](/noticias/binance-hackeo-6300-millones).

## Qué significa para ti si vives en España

Si tienes POL o usas aplicaciones sobre Polygon, esta propuesta no toca tus saldos: afecta solo a las cinco direcciones señaladas. Lo que sí podría pasar es que, si el fork sale adelante, los nodos y servicios que no se actualicen sigan una cadena distinta, así que conviene fijarse en los avisos de tu wallet o de tu exchange cuando se fije una fecha. No hace falta que muevas nada por tu cuenta.

La propuesta abre un debate de fondo: una blockchain presume de que nadie puede mover tus fondos sin tu clave, y aquí se plantea una excepción para devolver dinero robado. Los autores la justifican por el reconocimiento público de los hackeos, el rastro en la cadena y la ausencia de reclamaciones contrarias, pero conviene saber que existe esa discusión.

En lo práctico, la lección sigue siendo la de siempre: este tipo de recuperación es excepcional y no se puede esperar si te roban a ti. Si eres víctima de un robo o una estafa en España, el trámite fiscal y la denuncia están explicados en nuestra respuesta sobre cómo declarar una estafa o un hackeo.

## Para entenderlo

- [Qué es una blockchain](/academia/blockchain): para entender por qué cambiar las reglas de una red exige que casi todos los nodos se actualicen.
- [Fork en el glosario](/glosario#fork): define en pocas palabras qué es una bifurcación de una cadena.
- [Seguridad en criptomonedas](/aprende/seguridad-cripto): hábitos para proteger tus fondos, porque ninguna red te garantiza recuperarlos.
