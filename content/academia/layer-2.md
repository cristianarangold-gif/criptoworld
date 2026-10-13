---
updated: 2026-10-13
practicalExamples:
  - "Mover ETH a una red de capa 2 a través de su puente oficial para hacer operaciones con comisiones de céntimos"
  - "Comprobar en L2BEAT el nivel de madurez (stage) de una red de capa 2 antes de usarla"
  - "Retirar fondos de un optimistic rollup sabiendo que el puente oficial puede tardar unos 7 días"
advantages:
  - "Comisiones mucho más bajas que en la red principal de Ethereum"
  - "Confirmaciones más rápidas"
  - "Los rollups maduros se apoyan en Ethereum para garantizar que no te pueden robar los fondos"
  - "Compatibles con las wallets y aplicaciones de Ethereum"
risks:
  - "Muchas aún dependen de un único secuenciador y de mecanismos de emergencia controlados por pocos"
  - "Retiradas lentas por el puente oficial en los optimistic rollups"
  - "Riesgos de los puentes al mover fondos entre redes"
  - "Liquidez repartida entre muchas redes distintas"
commonMistakes:
  - "Confundir una red de capa 2 con una sidechain, que tiene su propia seguridad"
  - "Usar puentes no oficiales para ahorrar unos céntimos"
  - "Dar por hecho que todas las capas 2 son igual de seguras"
  - "No tener ETH en la capa 2 para pagar comisiones"
sources:
  - title: "ethereum.org: Capa 2"
    url: "https://ethereum.org/es/layer-2/"
  - title: "ethereum.org: Optimistic rollups"
    url: "https://ethereum.org/es/developers/docs/scaling/optimistic-rollups/"
  - title: "L2BEAT: análisis de riesgos de las redes de capa 2"
    url: "https://l2beat.com/scaling/summary"
  - title: "EIP-4844: transacciones con blobs (Dencun)"
    url: "https://eips.ethereum.org/EIPS/eip-4844"
quiz:
  - {"pregunta": "¿Qué hace una red de capa 2?", "opciones": ["Procesa transacciones fuera de la red principal y publica en ella un resumen", "Sustituye a Ethereum", "Es una wallet"], "correcta": 0, "explicacion": "Ethereum actúa como juez: la información publicada permite demostrar trampas."}
  - {"pregunta": "¿Cuánto tarda, aproximadamente, retirar a Ethereum por el puente oficial de un optimistic rollup?", "opciones": ["Unos 7 días", "Unos segundos", "Un año"], "correcta": 0, "explicacion": "Es el plazo durante el que se pueden presentar pruebas de fraude."}
  - {"pregunta": "¿Heredan todas las capas 2 la seguridad de Ethereum por igual?", "opciones": ["Sí, todas", "Ninguna", "No: muchas aún dependen de su propio secuenciador y de mecanismos controlados por su equipo"], "correcta": 2, "explicacion": "L2BEAT las clasifica por etapas según cuánto dependen de sus operadores."}
  - {"pregunta": "¿En qué se diferencia una sidechain de un rollup bien construido?", "opciones": ["La sidechain tiene sus propios validadores y Ethereum no garantiza tus fondos", "No hay diferencia", "La sidechain es siempre más segura"], "correcta": 0, "explicacion": "En un rollup maduro Ethereum garantiza que puedes recuperar tus fondos."}
---
## El problema

La red principal de Ethereum procesa un número limitado de operaciones por bloque. Cuando mucha gente quiere usarla, las comisiones suben y hacer una operación pequeña deja de compensar. Aumentar la capacidad de la propia cadena haría más caro verificarla y, con ello, la centralizaría.

## La solución: procesar fuera, asegurar dentro

Una **red de capa 2** (*layer 2*) ejecuta las transacciones fuera de Ethereum y publica en Ethereum un resumen comprimido junto con los datos necesarios para reconstruir su estado. La idea es que **Ethereum actúe como juez**: si alguien intenta hacer trampa, la información publicada permite demostrarlo y recuperar los fondos.

La forma dominante de capa 2 son los [rollups](/academia/rollups), que "enrollan" cientos de transacciones en una sola publicación. Hay dos familias:

| | Optimistic rollups | ZK-rollups |
|---|---|---|
| Cómo demuestran que todo es correcto | Asumen que lo es y dejan un plazo para presentar una **prueba de fraude** | Publican una **prueba criptográfica** de validez con cada lote |
| Retirada a Ethereum por el puente oficial | Tras el plazo de impugnación, unos 7 días | Más rápida, en cuanto se verifica la prueba |
| Más detalle | [Rollups](/academia/rollups) | [ZK-rollups](/academia/zk-rollups) |

Desde la actualización **Dencun** de marzo de 2024, los rollups publican sus datos en un espacio específico y más barato (los *blobs*), lo que redujo drásticamente sus comisiones.

## No todas son igual de seguras

Que una red se presente como "capa 2" no significa que herede toda la seguridad de Ethereum. Muchas siguen en fase de maduración:

- Dependen de un **secuenciador** único, operado por el propio equipo, que ordena las transacciones y podría censurarlas o detenerse.
- Tienen **contratos actualizables** o comités que pueden cambiar las reglas en caso de emergencia.
- Algunas aún no tienen las pruebas de fraude plenamente activas.

El proyecto independiente **L2BEAT** clasifica las redes de capa 2 por etapas (*stages*) según cuánto dependen de sus operadores. Es una buena consulta antes de dejar fondos importantes en una de ellas.

## Capa 2 frente a sidechain

Una **sidechain** es una blockchain independiente conectada a Ethereum por un puente, pero con sus **propios validadores** y su propia seguridad. Si sus validadores actúan de mala fe, Ethereum no puede impedirlo. En un rollup bien construido, en cambio, Ethereum garantiza que puedes recuperar tus fondos. Muchos proyectos usan "capa 2" de forma comercial para cosas que técnicamente son sidechains.

## Cómo usarlas con cabeza

1. **Entra y sal por el puente oficial** de la red, o desde una plataforma [autorizada](/aprende/exchange-autorizado-cnmv) que permita retirar directamente a esa red.
2. **Comprueba la red** en tu wallet antes de recibir o enviar fondos.
3. **Ten un poco de ETH** en la capa 2 para pagar las comisiones.
4. **No dejes grandes cantidades** en redes poco maduras.

Mover fondos entre redes implica usar [puentes](/academia/bridges), que tienen sus propios riesgos.
