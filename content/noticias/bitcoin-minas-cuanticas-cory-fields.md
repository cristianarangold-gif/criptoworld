---
titulo: "Un desarrollador de Bitcoin Core propone «minas cuánticas» para disuadir a los ladrones del futuro"
descripcion: "Cory Fields plantea en bitcoin-dev ideas para que robar monedas con un ordenador cuántico salga caro. Son experimentos mentales, no una propuesta formal."
fecha: 2026-11-06
fuentes:
  - title: "bitcoin-dev: mensaje de Cory Fields sobre migración poscuántica (4 de noviembre de 2026)"
    url: "https://groups.google.com/g/bitcoindev/c/ARMwWdWcz9A"
  - title: "CoinDesk: Bitcoin developer proposes 'landmines' to make quantum thieves lose their own BTC"
    url: "https://www.coindesk.com/tech/2026/11/05/bitcoin-developer-proposes-landmines-to-make-quantum-thieves-lose-their-own-btc"
relacionados:
  - title: "Clave pública en el glosario"
    href: "/glosario#clave-publica"
  - title: "Clave privada en el glosario"
    href: "/glosario#clave-privada"
  - title: "Qué es una wallet y cómo elegirla"
    href: "/academia/wallet"
---
Cory Fields, desarrollador de Bitcoin Core que trabaja en el software de Bitcoin en el Digital Currency Initiative del MIT, ha publicado en la lista de correo bitcoin-dev, el 4 de noviembre de 2026, varias ideas para proteger las monedas que podrían quedar expuestas si algún día existe un ordenador cuántico potente. Las llama «minas cuánticas»: mecanismos pensados para que quien intente robar esas monedas pueda acabar perdiendo las suyas. Él mismo las presenta como experimentos mentales sin detalles cerrados, así que no hay nada que cambie hoy en Bitcoin.

## Qué ha pasado

El problema de fondo es conocido. Un ordenador cuántico lo bastante potente podría, en teoría, calcular la clave privada de una dirección a partir de su clave pública. En algunos pagos antiguos de Bitcoin la clave pública quedó visible desde el principio, por lo que esas monedas serían las primeras expuestas. CoinDesk recuerda que entre ellas están las asociadas a Satoshi Nakamoto.

Fields parte de unos supuestos: antes del llamado «qday» (el día en que un ataque cuántico sea viable) existiría un nuevo tipo de salida resistente a la computación cuántica, y después se activarían reglas nuevas de validación. Con ellas, las monedas antiguas solo podrían gastarse si van acompañadas de un colateral, es decir, de otras monedas que quedarían retenidas durante un tiempo de espera. Sobre esa base describe tres mecanismos:

1. **Minas cuánticas.** Antes del qday, el dueño crea una salida mínima y oculta que contiene una prueba de que conoce su clave. Si un ladrón gasta la moneda antigua, el dueño revela esa prueba durante el plazo de espera, recupera lo suyo y se queda con el colateral del atacante. Según CoinDesk, un ejemplo sería que robar 1 BTC obligara a aportar otro 1 BTC bloqueado, por ejemplo, durante 30 días.
2. **Subasta con apuestas previas.** Los usuarios bloquean monedas antes del qday para apostar sobre salidas vulnerables. Si se produce un robo, tras los plazos se abre una subasta y el mejor postor se lleva el colateral del atacante.
3. **Subasta tipo «dollar auction».** Sin apuestas previas, cada gasto de una moneda antigua abre una subasta en la que gana la puja más alta y la segunda pierde la suya, lo que podría llevar al atacante a perderlo todo.

El propio autor avisa de que son ideas «rough», aproximadas y sin probar. No detalla cómo implementarlas mediante un soft fork, aunque cree que sería posible, y reconoce que no está claro qué resultado se busca: disuadir el ataque, incentivar las apuestas o redistribuir monedas. Quedan sin fijar muchos parámetros, como el tamaño del colateral o el destino de las monedas perdidas. Además, según su mensaje, las minas dificultarían saber cuántas monedas son realmente vulnerables. Ni su mensaje ni la cobertura de CoinDesk mencionan un BIP, la propuesta formal de mejora de Bitcoin, ni una implementación en marcha.

Según CoinDesk, la idea tiene un coste: la cadena no distingue a un ladrón cuántico del dueño legítimo, de modo que mover tus propias monedas antiguas bajo esas reglas también exigiría colateral. Y no protegería las monedas cuyas claves se han perdido.

## Qué significa para ti si vives en España

En la práctica, de momento, nada. No es una norma ni hay fecha de activación, y los ordenadores cuánticos capaces de romper las claves de Bitcoin no existen hoy según lo publicado en las fuentes que hemos leído. No tienes que mover fondos ni cambiar de wallet por esta noticia.

Lo que sí conviene saber es que el debate sobre cómo migrar Bitcoin a criptografía resistente a la computación cuántica está ya en la mesa de los desarrolladores. Si en el futuro se aprobara algo parecido, afectaría sobre todo a quien conserva monedas en direcciones antiguas con la clave pública expuesta, que tendría que actuar antes del plazo que se fije. Cuando eso ocurra, lo explicaremos con detalle.

Hasta entonces, una buena práctica que no depende de esta propuesta es entender qué guardas y dónde: conocer la diferencia entre clave pública y privada, y mantener copias de seguridad de tu frase semilla en un lugar seguro.

## Para entenderlo

- [Clave pública en el glosario](/glosario#clave-publica): para saber qué es lo que un ordenador cuántico intentaría explotar y por qué algunas direcciones antiguas la tienen expuesta.
- [Clave privada en el glosario](/glosario#clave-privada): para entender por qué quien la conoce controla las monedas y qué se protegería con estas ideas.
- [Qué es una wallet y cómo elegirla](/academia/wallet): para repasar cómo se guardan las claves y qué hace realmente una cartera.
