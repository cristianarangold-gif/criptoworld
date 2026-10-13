---
updated: 2026-10-13
practicalExamples:
  - "Consultar el coste estimado de una operación en tu wallet antes de confirmarla"
  - "Hacer operaciones pequeñas en una red de capa 2 en lugar de en la red principal de Ethereum"
  - "Esperar a un momento de menos actividad para una operación que no es urgente"
advantages:
  - "Evita que alguien sature la red con operaciones gratuitas"
  - "Remunera a quienes validan las transacciones"
  - "Desde 2021, parte de cada comisión se quema, lo que reduce la emisión neta de ETH"
  - "Las redes de capa 2 han abaratado mucho las operaciones"
sources:
  - title: "ethereum.org: Gas y comisiones"
    url: "https://ethereum.org/es/developers/docs/gas/"
  - title: "EIP-1559: mercado de comisiones con tarifa base quemada"
    url: "https://eips.ethereum.org/EIPS/eip-1559"
  - title: "EIP-4844: transacciones con blobs (Dencun)"
    url: "https://eips.ethereum.org/EIPS/eip-4844"
---
## Qué es el gas

Cada operación en Ethereum, desde enviar ETH hasta interactuar con un [contrato inteligente](/academia/smart-contracts), exige un trabajo de cálculo a los nodos de la red. El **gas** es la unidad con la que se mide ese trabajo. Una transferencia simple de ETH consume 21.000 unidades de gas; una operación compleja en [DeFi](/academia/defi) puede consumir varios cientos de miles.

La comisión que pagas es:

> **comisión = gas consumido × precio por unidad de gas**

El precio por unidad se expresa en **gwei**, una fracción minúscula de ETH (1 gwei = 0,000000001 ETH). Puedes pasarlo a euros con la [calculadora de gas](/herramientas/calculadora-gas-ethereum).

## Cómo se forma el precio: EIP-1559

Desde agosto de 2021, la comisión de cada transacción tiene dos partes:

- **Tarifa base:** la fija el protocolo según la demanda. Si los bloques van llenos, sube; si van vacíos, baja. **Se quema**: esos ETH se destruyen.
- **Propina** (*priority fee*): lo que añades para que los validadores incluyan antes tu transacción. Va para el validador.

Además, fijas un **límite de gas**: el máximo que aceptas consumir. Si la operación se queda sin gas a medias, falla, pero el gas usado hasta ese momento se cobra igualmente. Las wallets calculan el límite automáticamente, y casi nunca conviene tocarlo.

## ¿Ethereum es deflacionario?

La quema de la tarifa base hace que, en épocas de mucha actividad, se destruyan más ETH de los que se emiten como recompensa a los validadores, y la oferta baje. Pero no siempre es así. Desde la actualización **Dencun** de marzo de 2024, las redes de capa 2 publican sus datos en un espacio más barato (los *blobs*), lo que abarató enormemente sus comisiones y redujo la cantidad de ETH quemada. Desde entonces ha habido periodos largos en los que la oferta de ETH ha **crecido**. Así que la respuesta correcta es: depende de la actividad de la red.

## Por qué a veces es tan caro

El espacio en cada bloque es limitado. Cuando mucha gente quiere hacer operaciones a la vez (una gran caída del mercado, el lanzamiento de un token popular), sube la tarifa base y la comisión puede multiplicarse en minutos.

## Cómo pagar menos

- **Usa una [red de capa 2](/academia/layer-2)** para operaciones pequeñas: el coste suele ser de céntimos.
- **Espera** si la operación no es urgente: la actividad varía según la hora y el día.
- **Agrupa** operaciones en lugar de hacer muchas pequeñas.
- **Ten en cuenta el gas en tu cálculo de rentabilidad:** en DeFi, entrar y salir de una posición puede costar más de lo que esa posición genera.

## Y en otras redes

Cada blockchain tiene su sistema de comisiones. En Bitcoin se paga por el tamaño de la transacción en bytes, no por gas. En otras redes compatibles con Ethereum el concepto es el mismo, pero el token y los precios cambian. Asegúrate siempre de tener un poco del **token nativo** de la red que usas, porque es el que se necesita para pagar la comisión.
