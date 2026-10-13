---
updated: 2026-10-13
practicalExamples:
  - "Configurar en tu wallet un RPC con protección contra el front-running antes de hacer un intercambio grande"
  - "Ajustar una tolerancia de deslizamiento (slippage) baja para limitar cuánto pueden aprovecharse de tu operación"
  - "Un bot de arbitraje compra un token en un exchange descentralizado y lo vende más caro en otro en la misma transacción"
sources:
  - title: "ethereum.org: Valor máximo extraíble (MEV)"
    url: "https://ethereum.org/es/developers/docs/mev/"
  - title: "Flashbots: documentación de Flashbots Protect"
    url: "https://docs.flashbots.net/flashbots-protect/overview"
---
## Qué es el MEV

Cuando envías una transacción en Ethereum, no se ejecuta al instante: espera en una zona pública (el *mempool*) hasta que alguien la incluye en un bloque. Quien construye el bloque decide **qué transacciones entran y en qué orden**. El **MEV** (*maximal extractable value*, valor máximo extraíble) es el beneficio que se puede obtener precisamente gracias a ese poder de ordenar, incluir o excluir transacciones.

Hoy el MEV lo capturan sobre todo **buscadores** (*searchers*), bots que vigilan las transacciones pendientes y envían las suyas propias para aprovecharlas, pagando a los constructores de bloques por colocarlas en el lugar adecuado.

## Tipos de MEV

### Arbitraje

Si un token cuesta menos en un exchange descentralizado que en otro, un bot compra en uno y vende en el otro en la misma transacción. Es un MEV "útil": iguala precios entre mercados.

### Liquidaciones

Cuando una posición de préstamo en [DeFi](/academia/defi) queda por debajo de su garantía mínima, los bots compiten por liquidarla y cobrar la recompensa. También es útil: mantiene solventes a los protocolos.

### Ataques sándwich

Es el que más perjudica al usuario corriente:

1. Un bot ve en el *mempool* que vas a comprar una gran cantidad de un token.
2. Compra justo **antes** que tú, lo que sube el precio.
3. Tu compra se ejecuta a ese precio peor, y lo sube aún más.
4. El bot vende justo **después**, con beneficio.

Tú no ves nada raro: simplemente obtienes menos tokens de los que esperabas. Por eso se dice que el MEV es un **impuesto invisible**.

## Cómo protegerte

- **Usa un RPC privado o con protección**, que envía tu transacción directamente a constructores de bloques sin pasar por el *mempool* público. Algunas wallets ya lo ofrecen por defecto.
- **Ajusta la tolerancia de deslizamiento** (*slippage*). Es la diferencia máxima de precio que aceptas. Si es alta, das margen a los ataques sándwich.
- **Divide las operaciones grandes** o usa agregadores que ofrecen protección.
- **Opera en pools con mucha liquidez**, donde mover el precio cuesta más.

## El problema de fondo: la centralización

El MEV genera tanto dinero que incentiva la especialización: hoy unos pocos constructores de bloques profesionales producen la mayoría de los bloques de Ethereum. Eso plantea riesgos de centralización y de **censura** de transacciones. La comunidad de Ethereum investiga cambios en el protocolo para separar mejor los papeles y repartir el valor del MEV de forma más justa, pero es un problema abierto.

## En resumen

El MEV no es un fallo puntual, sino una consecuencia de que las transacciones sean públicas antes de ejecutarse. Para un usuario normal, la recomendación práctica es sencilla: protección contra front-running en la wallet, *slippage* bajo y cuidado con las operaciones grandes en pools pequeños.
