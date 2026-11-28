---
titulo: "K33 pide «vigilancia sin pánico»: los avances de la IA en matemáticas no rompen la criptografía de Bitcoin"
descripcion: "Un informe de K33 recuerda que no hay ninguna vulnerabilidad demostrada en las firmas de Bitcoin tras los avances de la IA en matemáticas."
fecha: 2026-11-28
fuentes:
  - title: "K33 Research: AI breakthroughs reignite cryptographic fears (26 de noviembre de 2026)"
    url: "https://k33.com/research/articles/ai-breakthroughs-reignite-cryptographic-fears"
  - title: "Decrypt: Could AI Break Bitcoin? Not Yet, Research Firm K33 Says (27 de noviembre de 2026)"
    url: "https://decrypt.co/384218/could-ai-break-bitcoin-not-yet-research-firm-k33-says"
relacionados:
  - title: "Clave privada en el glosario"
    href: "/glosario#clave-privada"
  - title: "Clave pública en el glosario"
    href: "/glosario#clave-publica"
  - title: "Qué es Bitcoin y cómo funciona"
    href: "/academia/bitcoin"
---
La firma de análisis K33 ha publicado esta semana un informe para templar los ánimos ante el temor de que la inteligencia artificial pueda romper la criptografía que protege Bitcoin. Su conclusión, según recoge Decrypt el 27 de noviembre de 2026, es que las defensas de la red siguen tan sólidas como el primer día y que no se ha demostrado ningún ataque. Eso sí, pide seguir los avances con atención.

## Qué ha pasado

Según Decrypt, el origen del nerviosismo está en los últimos avances de la IA en matemáticas. El medio cuenta que Levent Alpöge, matemático de Anthropic, publicó la semana anterior una prueba preliminar de la hipótesis de Riemann con ayuda del modelo Claude, y que esa demostración ha superado una verificación computacional independiente, aunque la revisión académica sigue abierta. Nosotros no hemos podido comprobar esa prueba por nuestra cuenta: la citamos tal y como la cuenta Decrypt.

El informe de K33, fechado el 26 de noviembre, plantea el asunto como parte de su resumen semanal del mercado. Según Decrypt, K33 reconoce que estos avances han reavivado los miedos sobre los supuestos matemáticos que sostienen Bitcoin y la criptografía moderna, y subraya que conviene no confundir un progreso teórico con un ataque práctico. De la propia nota de K33 destacamos esta frase: «as things stand, Bitcoin's defenses remain as sound as they were at launch, with no demonstrated compromise», es decir, que las defensas de Bitcoin siguen siendo tan sólidas como al principio y no hay ningún ataque demostrado.

Los argumentos que Decrypt atribuye al informe son tres:

1. **Las firmas de Bitcoin dependen de la criptografía de curva elíptica.** Su seguridad se apoya en que es fácil calcular una clave pública a partir de la privada, pero no al revés.
2. **La prueba de Riemann no ofrece un método para atacar esa criptografía.** Un resultado en teoría de números no se traduce, por sí solo, en una herramienta para obtener claves privadas.
3. **El problema «P contra NP» sigue sin resolverse, y resolverlo no cambiaría el panorama de forma automática.** Según K33, demostrar que P = NP no garantizaría un algoritmo utilizable ni lo bastante rápido para recuperar una clave privada en un plazo práctico, y demostrar que P ≠ NP tampoco garantizaría la seguridad, porque podrían aparecer algoritmos de ataque más rápidos.

La postura que resume Decrypt es «vigilancia sin pánico»: seguir de cerca el progreso de la IA y reforzar la criptografía de las redes, sin dar por hecho que hoy exista una vulnerabilidad.

El informe menciona también el movimiento en Ethereum. Según K33, la Ethereum Foundation ha duplicado su equipo de seguridad del protocolo y recomienda la función hash Keccak-256 para su transición hacia criptografía resistente a ordenadores cuánticos, con el objetivo de que validadores, wallets y compromisos de blobs estén preparados en 2029. K33 señala que no hay una decisión final ni una fecha de activación en la red principal. Ya contamos ese anuncio en una noticia anterior.

## Qué significa para ti si vives en España

En la práctica, hoy no cambia nada. Ni K33 ni Decrypt describen ningún fallo en Bitcoin, ninguna actualización urgente ni ninguna acción que los usuarios deban tomar. No tienes que mover tus monedas, cambiar de wallet ni vender por esta noticia.

Lo que sí te puede servir es entender qué protege tus fondos. Tus bitcoin dependen de que nadie, salvo tú, conozca tu clave privada, y la IA no cambia eso por sí sola: los robos de criptomonedas que vemos cada semana suelen venir de estafas, malware, webs falsas o claves mal guardadas, no de que alguien haya roto las matemáticas de la red. Así que las medidas de siempre siguen siendo las que importan: guardar tu frase semilla sin fotografiarla ni subirla a ningún servicio, desconfiar de enlaces y mensajes que te pidan tus claves, y usar un monedero de confianza.

A efectos fiscales no hay ningún efecto: un debate técnico sobre criptografía no modifica cómo tributan tus criptomonedas en la declaración de la Renta.

Si dentro de unos meses los desarrolladores de Bitcoin aprueban cambios de criptografía, lo explicaremos aquí con calma y diciendo con claridad qué tendrías que hacer, si es que hay que hacer algo.

## Para entenderlo

- [Clave privada](/glosario#clave-privada) y [clave pública](/glosario#clave-publica): léelas para ver por qué una se puede compartir y la otra no, que es justo la asimetría en la que se apoya la seguridad de las firmas de Bitcoin.
- [Qué es Bitcoin y cómo funciona](/academia/bitcoin): para situar las firmas dentro del conjunto de la red y entender qué parte del sistema protege cada pieza.
