---
titulo: "Ethereum retrasa la prueba de Glamsterdam en Hoodi por un riesgo en el cálculo del gas"
descripcion: "Los desarrolladores aplazan la activación de Glamsterdam en la red de pruebas Hoodi tras un aviso de ChainSecurity sobre contratos ya desplegados."
fecha: 2026-10-23
fuentes:
  - title: "CoinDesk: Ethereum delays Glamsterdam test after security devs flag risk to existing contracts"
    url: "https://www.coindesk.com/tech/2026/10/23/ethereum-delays-glamsterdam-test-after-security-devs-flag-risk-to-existing-contracts"
  - title: "ChainSecurity: análisis sobre el gas en Glamsterdam"
    url: "https://www.chainsecurity.com/blog/glamsterdam-gas/"
relacionados:
  - title: "Gas: qué es y por qué pagas comisiones en Ethereum"
    href: "/academia/gas"
  - title: "Contratos inteligentes: qué son y qué riesgos tienen"
    href: "/academia/smart-contracts"
  - title: "Bifurcación en el glosario"
    href: "/glosario#bifurcación"
---
Los desarrolladores de Ethereum han aplazado, sin fecha nueva, la activación de la actualización Glamsterdam en Hoodi, una de sus redes de pruebas. Estaba prevista para el lunes 26 de octubre de 2026. El motivo es un análisis de la firma de seguridad ChainSecurity, que advierte de que los cambios en el cálculo del gas podrían alterar el comportamiento de contratos inteligentes que ya funcionan. Es una prueba, no la red principal, y no hay constancia de que nadie haya explotado el problema.

## Qué ha pasado

Según CoinDesk, la decisión se tomó en la reunión de desarrolladores «All Core Devs Execution» del jueves 22 de octubre. Se pospone la activación de Glamsterdam en Hoodi, prevista para el 26 de octubre a las 17:42 UTC, y también el aumento del límite de gas de esa red de pruebas hasta los 200 millones. Todavía no se ha anunciado otra fecha. Glamsterdam ya se había activado en otra red de pruebas, Sepolia, el 6 de octubre, y Hoodi era el siguiente ensayo público. CoinDesk indica que la fecha de activación en la red principal no está confirmada.

El aviso procede de un análisis que ChainSecurity publicó el 13 de octubre. Explica que Glamsterdam modifica dos cosas: cuánto cuesta crear datos nuevos en la base de datos de Ethereum (EIP-8037) y cuánto cuestan otros accesos a esos datos (EIP-8038). Con las nuevas reglas, parte del gas se paga desde un depósito separado y puede recuperarse cuando una operación se deshace. ChainSecurity advierte de que, aunque el código de un contrato no cambie, un camino de error que antes se revertía por completo podría ahora terminar, y que un presupuesto de gas que antes bastaba podría quedarse corto.

La firma da cifras concretas: según su análisis, escribir en una posición de almacenamiento nueva y «fría» pasaría de 22.100 unidades de gas en la red actual a 110.020 cuando no se usa ese depósito. ChainSecurity no afirma que algún protocolo en producción sea explotable. CoinDesk añade que los hallazgos no apuntan a una explotación activa. Entre sus recomendaciones, la firma sugiere que los contratos propaguen los fallos para revertir toda la operación y que revisen sus umbrales y presupuestos de gas.

## Qué significa para ti si vives en España

A corto plazo, nada. Hoodi es una red de pruebas donde los tokens no tienen valor, y tus criptomonedas en Ethereum, tu wallet o tu cuenta en un exchange no se ven afectadas por este aplazamiento. No tienes que mover fondos ni actualizar nada.

Lo interesante es lo que enseña: antes de tocar la red principal, los desarrolladores ensayan los cambios y, si alguien encuentra un riesgo, retrasan el calendario. Eso es el proceso funcionando, no un fallo. A medio plazo, si Glamsterdam llega a la red principal, los equipos que mantienen aplicaciones de finanzas descentralizadas tendrán que revisar sus contratos. Si usas alguna, conviene fijarse en si publican avisos sobre ello.

En el plano fiscal no cambia nada: un aplazamiento técnico no altera cómo declaras tus operaciones. Y mantén la cautela de siempre: cada vez que se habla de una actualización, circulan mensajes falsos que piden «actualizar» la cartera o reclamar tokens. Ninguna actualización de la red te lo exige.

## Para entenderlo

- [Gas: qué es y por qué pagas comisiones en Ethereum](/academia/gas): explica la unidad de medida cuyo cálculo cambia Glamsterdam.
- [Contratos inteligentes: qué son y qué riesgos tienen](/academia/smart-contracts): ayuda a entender por qué un cambio de reglas puede afectar a programas que ya están funcionando.
- [Bifurcación en el glosario](/glosario#bifurcación): define qué es un cambio de reglas de una blockchain como este.
