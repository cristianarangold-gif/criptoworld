---
title: "Calculadora de gas de Ethereum en euros"
short: "Cuánto cuesta en euros una transacción en Ethereum según el gas, el gwei y el precio de ETH."
description: "Calcula el coste en euros de una transacción en Ethereum a partir del gas consumido, el precio del gas en gwei y el precio de ETH, con ejemplos de envío, token e intercambio."
calculator: gas
order: 7
updated: 2026-10-13
related:
  - title: "Gas: qué son las comisiones en Ethereum"
    href: "/academia/gas"
  - title: "Redes de capa 2"
    href: "/academia/layer-2"
sources:
  - title: "ethereum.org: Gas y comisiones"
    url: "https://ethereum.org/es/developers/docs/gas/"
---
## Qué calcula

Cada operación en Ethereum consume una cantidad de **gas**, y cada unidad de gas tiene un precio que se mide en **gwei** (1 gwei = 0,000000001 ETH). Esta calculadora convierte ese coste a euros para que sepas, antes de confirmar, si una operación compensa.

## La fórmula

> **Comisión en ETH = gas consumido × precio del gas (gwei) ÷ 1.000.000.000**

Y la comisión en euros es la comisión en ETH multiplicada por el precio de ETH.

## Cuánto gas consume cada operación

| Operación | Gas aproximado |
|---|---|
| Enviar ETH | 21.000 (exacto) |
| Enviar un token ERC-20 | unos 45.000–65.000 |
| Intercambio en un exchange descentralizado | unos 100.000–200.000 o más |

Salvo el envío de ETH, son valores orientativos: dependen del contrato. Tu wallet muestra la estimación real antes de confirmar.

## Ejemplo resuelto

Con los valores por defecto: un **envío de ETH** (21.000 de gas) con el gas a **5 gwei** y ETH a **3.000 €**.

- Gas total: 21.000 × 5 = 105.000 gwei = **0,000105 ETH**.
- En euros: 0,000105 × 3.000 = **0,315 €**.

Si pulsas "Intercambio en un DEX" (150.000 de gas) con el mismo precio, el coste sube a **2,25 €**. Y en un momento de congestión, con el gas a 50 gwei, ese mismo intercambio costaría **22,50 €**. Por eso, para importes pequeños, conviene usar una [red de capa 2](/academia/layer-2), donde la misma operación suele costar céntimos.

## Dónde ver el precio del gas

Tu wallet muestra el precio del gas al preparar una transacción, y los exploradores de bloques publican el precio actual. Varía mucho a lo largo del día según la actividad de la red.

## Limitaciones

- Desde 2021 la comisión se divide en una **tarifa base**, que se quema, y una **propina**. Aquí se usa el precio total por unidad de gas.
- Si una transacción **falla**, se cobra el gas consumido hasta ese momento.
- La calculadora es para la red principal de Ethereum. En las redes de capa 2, el coste incluye además la publicación de datos en Ethereum, y se calcula de otra forma.
