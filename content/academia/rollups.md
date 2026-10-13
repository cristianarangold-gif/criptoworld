---
updated: 2026-10-13
advantages:
  - "Multiplican la capacidad de Ethereum sin hacer más cara su verificación"
  - "Comisiones mucho más bajas, sobre todo desde la llegada de los blobs en 2024"
  - "Compatibles con las herramientas y contratos de Ethereum"
  - "Bien construidos, permiten recuperar los fondos aunque el operador falle"
sources:
  - title: "ethereum.org: Optimistic rollups"
    url: "https://ethereum.org/es/developers/docs/scaling/optimistic-rollups/"
  - title: "ethereum.org: Zero-knowledge rollups"
    url: "https://ethereum.org/es/developers/docs/scaling/zk-rollups/"
  - title: "EIP-4844: transacciones con blobs (Dencun)"
    url: "https://eips.ethereum.org/EIPS/eip-4844"
  - title: "L2BEAT: análisis de riesgos de las redes de capa 2"
    url: "https://l2beat.com/scaling/summary"
---
## Qué es un rollup

Un **rollup** es una [red de capa 2](/academia/layer-2) que ejecuta transacciones fuera de Ethereum, las agrupa ("enrolla") en lotes y publica en Ethereum:

- **Los datos** de esas transacciones, comprimidos, para que cualquiera pueda reconstruir el estado del rollup.
- **Un compromiso** con el resultado (el nuevo estado).
- Según el tipo, **una prueba** de que el resultado es correcto, o un plazo para demostrar que no lo es.

Como Ethereum guarda los datos y verifica (o permite impugnar) el resultado, un rollup bien construido permite a los usuarios recuperar sus fondos aunque el operador del rollup desaparezca o actúe de mala fe.

## Las piezas

- **Secuenciador:** recibe las transacciones de los usuarios, las ordena y las ejecuta. Hoy, en la mayoría de rollups, lo opera una sola entidad.
- **Contratos en Ethereum:** guardan los fondos depositados y los compromisos de estado.
- **Pruebas:** de fraude o de validez, según la familia.

## Dos familias

### Optimistic rollups

Publican los resultados **asumiendo que son correctos**. Durante un plazo (habitualmente unos 7 días), cualquiera puede presentar una **prueba de fraude** si detecta un error. Si nadie lo hace, el resultado se considera definitivo. Por eso retirar fondos a Ethereum por el puente oficial tarda alrededor de una semana, aunque hay servicios que adelantan los fondos a cambio de una comisión.

### ZK-rollups

Publican, junto con cada lote, una **prueba criptográfica de validez** que Ethereum verifica. No hace falta esperar un plazo de impugnación: si la prueba es válida, el resultado es correcto. Lo explicamos en [ZK-rollups](/academia/zk-rollups).

## Los blobs: por qué se abarataron tanto

Publicar datos en Ethereum era lo que más encarecía usar un rollup. La actualización **Dencun** (marzo de 2024) introdujo los *blobs* (EIP-4844): un espacio temporal y más barato pensado precisamente para esos datos. Las comisiones en muchos rollups cayeron a céntimos. Actualizaciones posteriores han seguido ampliando ese espacio.

## La madurez importa

No todos los rollups son igual de seguros. Las preguntas clave son:

- ¿Las **pruebas** (de fraude o de validez) están activas y cualquiera puede presentarlas?
- ¿Quién puede **actualizar los contratos**, y con cuánto aviso?
- ¿Hay una **salida forzosa** si el secuenciador censura o se detiene?

L2BEAT clasifica los rollups en etapas según estas cuestiones. Un rollup en una etapa temprana depende en gran medida de la confianza en su equipo.

## Para el usuario

Usar un rollup se parece mucho a usar Ethereum, pero más barato. Las precauciones básicas son entrar y salir por el puente oficial, comprobar la red en la wallet y no dejar cantidades grandes en redes poco maduras.
