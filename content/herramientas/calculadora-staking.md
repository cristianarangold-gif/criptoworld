---
title: "Calculadora de staking: recompensas y resultado en euros"
short: "Recompensas de staking en tokens y, sobre todo, qué pasa con tu dinero si el precio del token cambia."
description: "Calcula las recompensas de staking con reinversión y el resultado final en euros teniendo en cuenta la variación del precio del token."
calculator: staking
order: 3
updated: 2026-10-13
related:
  - title: "Qué es el staking"
    href: "/academia/staking"
  - title: "Cómo declarar criptomonedas a Hacienda"
    href: "/aprende/declarar-criptomonedas-hacienda"
---
## Qué calcula

Las plataformas anuncian el staking con una cifra: "gana un 3 % anual". Lo que no suelen subrayar es que ese 3 % se cobra **en el propio token**. Esta calculadora muestra las dos cosas a la vez: cuántos tokens ganas y cuánto vale todo en euros si el precio del token cambia.

## Cómo se calcula

- **Tokens al final** = tokens iniciales × (1 + APY) ^ años, suponiendo que reinviertes las recompensas.
- **Valor final** = tokens al final × precio final del token.
- **Precio final** = precio actual × (1 + variación del precio).

El **APY** (*annual percentage yield*) ya incluye el efecto de reinvertir las recompensas. Si una plataforma te da el **APR**, que no lo incluye, el resultado será algo menor que el de esta calculadora.

## Ejemplo resuelto

Con los valores por defecto: tienes **10 tokens** que valen **3.000 €** cada uno (30.000 € en total), con un **3 %** anual durante **2 años**, y el precio del token **cae un 30 %** en ese tiempo.

- Tokens al final: 10 × 1,03² = **10,609** tokens (has ganado 0,609 tokens).
- Precio final: 3.000 € × 0,70 = **2.100 €**.
- Valor final: 10,609 × 2.100 € = **22.278,90 €**.
- Resultado: **−7.721,10 €**, aunque el staking te haya dado un 6 % más de tokens.

Prueba a poner la variación del precio en 0 % y luego en +30 %: verás que **lo que decide el resultado es el precio del token**, no la rentabilidad del staking.

## Limitaciones

- **La rentabilidad no es fija:** cambia con el número de participantes y las condiciones de la red.
- **No incluye riesgos** como el slashing, el bloqueo de fondos o el fallo de la plataforma.
- **No incluye impuestos.** Según el criterio de Hacienda, las recompensas tributan como rendimientos del capital mobiliario al recibirlas, valoradas en euros.
