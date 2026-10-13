---
title: "Simulador histórico: cuánto valdría hoy tu inversión en criptomonedas"
short: "Qué habría pasado si hubieras invertido en Bitcoin, Ethereum u otras 6 monedas en el pasado, con su peor caída."
description: "Simula con precios reales en euros cuánto valdría una inversión pasada en Bitcoin, Ethereum, BNB, Solana, XRP, Cardano, Dogecoin o Chainlink, de golpe o con DCA mensual, y cuánto llegó a caer por el camino."
calculator: historico
order: 11
updated: 2026-10-14
related:
  - title: "Simulador de DCA: invertir una cantidad fija cada mes"
    href: "/herramientas/simulador-dca"
  - title: "Gestión del riesgo en criptomonedas"
    href: "/aprende/gestion-del-riesgo"
  - title: "DCA en criptomonedas: invertir una cantidad fija cada mes"
    href: "/aprende/estrategia-dca"
sources:
  - title: "Binance: datos de mercado (velas mensuales)"
    url: "https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints"
  - title: "Banco Central Europeo: tipo de cambio de referencia del euro frente al dólar"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.es.html"
---
## Qué simula

Eliges una moneda, un importe y un periodo, y el simulador calcula con **precios reales del pasado** cuánto valdría hoy esa inversión. Puedes invertirlo **todo de golpe** al principio o repartirlo con **una cantidad fija cada mes** (DCA). Además de la ganancia o la pérdida, te muestra la **peor caída desde un máximo**: cuánto llegó a perder la inversión en algún momento del camino. Ese dato es el que más se olvida al mirar rentabilidades pasadas, y el que decide si habrías aguantado sin vender.

## De dónde salen los precios

Usamos el **precio de cierre de cada mes** del par de la moneda frente a USDT en Binance, convertido a euros con el tipo de cambio euro/dólar que publica el Banco Central Europeo el último día hábil de ese mes. Se asume que 1 USDT equivale a 1 dólar. Los datos empiezan en el primer mes disponible para cada moneda en Binance (agosto de 2017 para Bitcoin y Ethereum) y se actualizan una vez al mes.

## Cómo se calcula

- **Todo de golpe:** en el mes inicial compras importe ÷ precio unidades, y cada mes la inversión vale unidades × precio de cierre.
- **DCA mensual:** cada mes, del inicial al final (ambos incluidos), compras importe ÷ precio de ese mes. El total aportado crece mes a mes.
- **Peor caída:** se recorre el valor mes a mes y se busca la mayor bajada desde el máximo anterior, en porcentaje y en euros.

## Ejemplo resuelto

Con los valores por defecto: **1.000 € en Bitcoin, todo de golpe en enero de 2021**, y con los datos hasta **septiembre de 2026**.

- En enero de 2021 el cierre de Bitcoin fue de **27.268,40 €**, así que compras 0,03667 BTC.
- En septiembre de 2026 el cierre fue de **73.644,70 €**: la inversión vale **2.700,73 €**, una ganancia de **1.700,73 €** (**+170,07 %**).
- Pero por el camino llegó a valer **1.930,45 €** (octubre de 2021) y bajó a **568,77 €** (diciembre de 2022): una caída del **−70,54 %**, es decir, **1.361,68 €** menos que en su máximo. En ese momento tus 1.000 € valían poco más de la mitad.

Si en lugar de eso inviertes **100 € al mes** en el mismo periodo, aportas **6.900 €**, que en septiembre de 2026 valen **12.938,88 €** (+87,52 %). La rentabilidad es menor que la de entrar todo en enero de 2021, pero la peor caída también: **−43,95 %**. Prueba otros periodos: si empiezas en noviembre de 2021, cerca del máximo de entonces, el resultado cambia por completo.

Cuando los datos se actualicen, el último mes disponible avanzará y las cifras por defecto cambiarán; las de este ejemplo se refieren a septiembre de 2026.

## Limitaciones

- **Precios mensuales, no diarios.** Las caídas dentro de un mes no se ven, así que la peor caída real fue algo mayor que la que muestra el simulador.
- **Sin comisiones ni impuestos.** Al vender con ganancias, Hacienda se queda entre el 19 % y el 30 % de la ganancia; lo puedes estimar con la [calculadora de impuestos](/herramientas/calculadora-impuestos-criptomonedas).
- **Sesgo de supervivencia.** Solo incluimos monedas que siguen existiendo y cotizando. Muchas de las que eran populares en 2017 o 2021 han perdido casi todo su valor o han desaparecido, y no aparecen aquí.
- **Una rentabilidad pasada no garantiza nada en el futuro.** Este simulador sirve para entender la volatilidad, no para predecir precios ni para elegir en qué invertir.
