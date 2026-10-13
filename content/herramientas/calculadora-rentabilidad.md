---
title: "Calculadora de rentabilidad de criptomonedas"
short: "Ganancia real de una compra y una venta, descontando comisiones, y cuánto hay que subir para recuperar una caída."
description: "Calcula cuánto ganas o pierdes al comprar y vender una criptomoneda, con las comisiones de compra y venta incluidas, y cuánto tendría que subir el precio para recuperar una caída."
calculator: rentabilidad
order: 1
updated: 2026-10-13
related:
  - title: "Cómo declarar criptomonedas a Hacienda"
    href: "/aprende/declarar-criptomonedas-hacienda"
  - title: "Gestión del riesgo en criptomonedas"
    href: "/aprende/gestion-del-riesgo"
---
## Qué calcula

Muchas apps muestran la rentabilidad como la simple variación del precio. Pero entre lo que pagas y lo que recibes hay **dos comisiones**, una al comprar y otra al vender, y a veces un diferencial de precio. Esta calculadora las descuenta para darte el resultado real en euros.

## Cómo se calcula

1. **Unidades compradas** = (dinero invertido × (1 − comisión)) ÷ precio de compra
2. **Valor al vender** = unidades × precio de venta
3. **Lo que recibes** = valor al vender × (1 − comisión)
4. **Ganancia** = lo que recibes − dinero invertido
5. **Rentabilidad** = ganancia ÷ dinero invertido × 100

## Ejemplo resuelto

Con los valores que trae la calculadora: inviertes **1.000 €** en bitcoin cuando cotiza a **50.000 €**, con una comisión del **0,5 %** en cada operación, y vendes a **60.000 €**.

- La comisión de compra es 5 €, así que compras con 995 €: **0,0199 BTC**.
- Al vender, esos BTC valen 0,0199 × 60.000 = **1.194 €**.
- Tras la comisión de venta (5,97 €) recibes **1.188,03 €**.
- Ganancia: **188,03 €**, una rentabilidad del **18,80 %**, aunque el precio haya subido un 20 %.

Las comisiones se han comido más de un punto de rentabilidad. Con comisiones más altas o con muchas operaciones, la diferencia crece rápidamente.

## La asimetría de las pérdidas

La segunda parte de la calculadora muestra algo que conviene tener grabado: **recuperar una caída exige una subida mayor que la caída**.

| Si cae… | Necesita subir… |
|---|---|
| 10 % | 11,1 % |
| 25 % | 33,3 % |
| 50 % | 100 % |
| 75 % | 300 % |
| 90 % | 900 % |

Por eso las caídas fuertes, habituales en criptomonedas, son tan difíciles de remontar, y por eso limitar cuánto inviertes importa tanto. Lo explicamos en la [guía de gestión del riesgo](/aprende/gestion-del-riesgo).

## Limitaciones

- **No incluye impuestos.** Si la ganancia es positiva, tributa en la base del ahorro del IRPF; puedes estimarlo con la [calculadora de impuestos](/herramientas/calculadora-impuestos-criptomonedas).
- **Una sola compra y una sola venta.** Si compraste en varias veces, Hacienda aplica el método FIFO, que puede dar una ganancia distinta a la de tu precio medio.
- **No incluye el diferencial** que algunas plataformas aplican al precio; si quieres tenerlo en cuenta, usa la [calculadora de comisiones](/herramientas/calculadora-comisiones).
