---
updated: 2026-10-13
practicalExamples:
  - "Usar el puente oficial de una red de capa 2 para mover ETH desde Ethereum"
  - "Retirar desde una plataforma autorizada directamente a la red que necesitas, evitando el puente"
  - "Hacer una transferencia de prueba pequeña antes de mover una cantidad importante"
sources:
  - title: "ethereum.org: Puentes (bridges)"
    url: "https://ethereum.org/es/bridges/"
  - title: "ethereum.org: Puentes, documentación técnica"
    url: "https://ethereum.org/es/developers/docs/bridges/"
  - title: "L2BEAT: análisis de riesgos de puentes y redes de capa 2"
    url: "https://l2beat.com/scaling/summary"
quiz:
  - {"pregunta": "¿Cómo funcionan la mayoría de puentes?", "opciones": ["Envían físicamente las monedas", "Bloquean los tokens en el origen y emiten una versión equivalente en el destino", "Cambian los tokens por euros"], "correcta": 1, "explicacion": "Es el modelo de bloquear y emitir."}
  - {"pregunta": "¿De qué depende el valor de un token envuelto (wrapped)?", "opciones": ["De nada", "Del precio del gas", "De la garantía que queda en el puente"], "correcta": 2, "explicacion": "Si alguien vacía el depósito del puente, los tokens envueltos pierden su respaldo."}
  - {"pregunta": "¿Por qué los puentes son objetivo frecuente de ataques?", "opciones": ["Porque concentran grandes cantidades de dinero en un solo contrato", "Porque son lentos", "Porque son nuevos"], "correcta": 0, "explicacion": "Varios de los mayores robos de la historia cripto fueron ataques a puentes."}
  - {"pregunta": "¿Cuál es la opción más prudente para mover fondos a otra red?", "opciones": ["El puente oficial o retirar directamente a esa red desde una plataforma autorizada", "El puente más barato que encuentres", "Un puente que te recomiende alguien por Telegram"], "correcta": 0, "explicacion": "Prioriza seguridad sobre unos céntimos de ahorro y haz una prueba con poco."}
---
## Por qué hacen falta

Cada blockchain es un sistema cerrado: Bitcoin no sabe lo que pasa en Ethereum, y Ethereum no sabe lo que pasa en Solana. Un **puente** (*bridge*) es un sistema que permite trasladar el valor de un token de una red a otra.

## Cómo funcionan, en la mayoría de casos

El modelo más común es **bloquear y emitir**:

1. Depositas tus tokens en un contrato del puente en la red de origen, donde quedan bloqueados.
2. El puente emite en la red de destino una representación equivalente, a menudo llamada versión "envuelta" (*wrapped*).
3. Para volver, se quema la versión envuelta y se liberan los tokens originales.

Esto significa que **el token que recibes vale lo que vale la garantía que queda en el puente**. Si alguien consigue vaciar ese depósito, los tokens envueltos de la red de destino pierden su respaldo.

## Tipos de puentes según quién verifica

| Tipo | Quién confirma que el depósito existe | Riesgo principal |
|---|---|---|
| Puente oficial de un rollup | El propio protocolo, apoyado en Ethereum | Bajo, pero puede ser lento (hasta unos 7 días en optimistic rollups) |
| Puente con comité de validadores | Un grupo de firmantes | Que roben o comprometan las claves del comité |
| Puente centralizado | Una empresa | Que la empresa falle o actúe de mala fe |
| Proveedores de liquidez | Intermediarios que adelantan los fondos | Riesgo del contrato y del intermediario |

## Los puentes, objetivo favorito de los atacantes

Los puentes concentran grandes cantidades de dinero en un solo contrato, lo que los convierte en un objetivo muy apetecible. Varios de los mayores robos de la historia de las criptomonedas han sido ataques a puentes, con pérdidas de cientos de millones de dólares en cada caso, a menudo por claves de firmantes comprometidas o por errores en la verificación.

## Buenas prácticas

- **Prefiere el puente oficial** de la red de destino, aunque sea más lento.
- **Evita puentes desconocidos** que prometen comisiones mínimas: no compensa el riesgo.
- **Valora no usar puentes:** muchas plataformas [autorizadas](/aprende/exchange-autorizado-cnmv) permiten retirar directamente a varias redes.
- **Comprueba el token que recibes.** En una misma red puede haber varias versiones de un token con el mismo nombre, emitidas por puentes distintos.
- **Haz una prueba** con una cantidad pequeña antes de mover algo importante.
- **Escribe tú la dirección de la web del puente.** Hay muchas copias falsas que roban fondos.

Relacionado: [redes de capa 2](/academia/layer-2) y [seguridad en criptomonedas](/aprende/seguridad-cripto).
