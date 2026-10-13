---
title: "Calculadora de comisiones de exchange"
short: "Coste total de comprar, vender y retirar: comisión explícita, diferencial y retirada."
description: "Calcula cuánto te cuesta realmente comprar y vender criptomonedas en una plataforma: comisión por operación, diferencial (spread) y comisión de retirada, y cuánto tiene que subir el precio para no perder."
calculator: comisiones
order: 4
updated: 2026-10-13
related:
  - title: "Qué es un exchange y cómo elegirlo"
    href: "/academia/exchange"
  - title: "Cómo comprobar si un exchange está autorizado"
    href: "/aprende/exchange-autorizado-cnmv"
---
## Las tres formas de cobrarte

Las plataformas de criptomonedas cobran de varias maneras, y no todas se ven a simple vista:

1. **Comisión explícita:** un porcentaje de cada compra o venta. Aparece en la tabla de tarifas.
2. **Diferencial (*spread*):** la diferencia entre el precio al que te venden y el precio al que te compran. Muchas apps que anuncian "0 comisiones" cobran así: te venden un poco más caro y te compran un poco más barato que el precio de mercado.
3. **Comisión de retirada:** un importe fijo por sacar tus criptos a tu propia wallet, a veces mayor que el coste real de la red.

## Cómo se calcula

- **Coste de compra** = importe × (comisión + diferencial ÷ 2)
- **Coste de venta** = (importe − coste de compra) × (comisión + diferencial ÷ 2)
- **Coste total** = compra + venta + retirada
- **Subida mínima para no perder** = importe ÷ (importe − coste total) − 1

Se reparte la mitad del diferencial en cada lado porque el precio de mercado queda, aproximadamente, en el centro entre el precio de compra y el de venta.

## Ejemplo resuelto

Con los valores por defecto: una operación de **1.000 €**, una comisión del **0,5 %**, un diferencial del **1 %** y una retirada de **2 €**.

- Al comprar pagas 0,5 % + 0,5 % = **10 €**.
- Al vender pagas lo mismo sobre los 990 € restantes: **9,90 €**.
- Con la retirada, el coste total es **21,90 €**, un **2,19 %** de lo invertido.
- Para no perder dinero, el precio tiene que subir al menos un **2,24 %**.

Si haces una operación de este tipo cada mes, ese 2 % se repite doce veces al año. Por eso las comisiones importan tanto en estrategias periódicas como el [DCA](/herramientas/simulador-dca).

## Cómo pagar menos

- **Compara el precio final**, no solo la tabla de comisiones: compra 100 € en dos plataformas y mira cuántas unidades recibes en cada una.
- **Usa la modalidad de negociación** (con libro de órdenes) en lugar de la compra simple, si la plataforma la ofrece: suele tener diferenciales mucho menores.
- **Evita las compras con tarjeta** cuando la transferencia sea más barata.
- **Agrupa las retiradas** en lugar de retirar pequeñas cantidades.

Recuerda que las comisiones de compra y venta se suman al coste y se restan del importe de venta en tu [declaración de la Renta](/aprende/declarar-criptomonedas-hacienda): guárdalas.
