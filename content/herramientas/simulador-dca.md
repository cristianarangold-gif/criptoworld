---
title: "Simulador de DCA: invertir una cantidad fija cada mes"
short: "Cuántas unidades acumulas, a qué precio medio y cómo se compara con invertir todo de golpe."
description: "Simula una estrategia de DCA en criptomonedas: aportaciones periódicas fijas, unidades acumuladas, precio medio de compra y comparación con invertir todo de una vez."
calculator: dca
order: 2
updated: 2026-10-13
related:
  - title: "DCA en criptomonedas: invertir una cantidad fija cada mes"
    href: "/aprende/estrategia-dca"
  - title: "Gestión del riesgo en criptomonedas"
    href: "/aprende/gestion-del-riesgo"
---
## Qué simula

El **DCA** (*Dollar-Cost Averaging*) consiste en invertir la misma cantidad cada cierto tiempo, sin intentar adivinar el mejor momento. Este simulador calcula cuántas unidades acumularías y a qué precio medio, y lo compara con haber invertido todo el dinero en la primera compra.

## Cómo se calcula

En cada aportación compras **aportación ÷ precio de ese momento** unidades. Al final:

- **Precio medio de compra** = total invertido ÷ unidades acumuladas
- **Valor final** = unidades acumuladas × precio en la última compra

Para no pedirte el precio de cada mes, el simulador supone que el precio evoluciona **en línea recta** entre la primera y la última compra. Es una simplificación: en la realidad el precio sube y baja, y es justo en esas oscilaciones donde el DCA muestra su efecto. Si quieres ver un ejemplo con subidas y bajadas, lo tienes con números en la [guía de DCA](/aprende/estrategia-dca).

## Ejemplo resuelto

Con los valores por defecto: **100 € al mes durante 12 meses**, con un precio que pasa de **50.000 €** en la primera compra a **60.000 €** en la última.

- Total invertido: **1.200 €**.
- Unidades acumuladas: **0,02188963**.
- Precio medio de compra: **54.820,48 €**, entre el inicial y el final.
- Valor al precio final: **1.313,38 €**, una ganancia de **113,38 €**.
- Si hubieras invertido los 1.200 € en la primera compra: **1.440 €**.

En un mercado que solo sube, invertir todo al principio gana al DCA, porque cada compra periódica es más cara que la anterior. Prueba ahora a poner un precio final más bajo que el inicial: verás que el DCA pierde menos que la inversión de golpe. Esa es su función: **reducir el riesgo de entrar todo en un mal momento**, no maximizar la ganancia.

## Limitaciones

- **Precio en línea recta**, como se ha explicado.
- **Sin comisiones.** En aportaciones pequeñas, una comisión fija puede pesar mucho; revísalo con la [calculadora de comisiones](/herramientas/calculadora-comisiones).
- **Sin impuestos.** Cada aportación es un lote distinto para Hacienda, que aplica el método FIFO al vender.
