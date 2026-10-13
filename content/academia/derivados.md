---
updated: 2026-10-13
practicalExamples:
  - "Un minero usa futuros para fijar hoy el precio al que venderá su producción futura (cobertura)"
  - "Un inversor compra una opción de venta (put) como seguro ante una caída de su posición en BTC"
  - "Comprobar en la web de la CNMV si un bróker que ofrece CFD sobre criptomonedas está autorizado y figura en las advertencias"
advantages:
  - "Permiten cubrirse frente a caídas de precio"
  - "Existen mercados regulados de futuros sobre Bitcoin y Ether"
  - "Facilitan estrategias que no son posibles solo comprando y vendiendo"
risks:
  - "El apalancamiento multiplica las pérdidas y puede liquidar la posición en minutos"
  - "La mayoría de los inversores minoristas pierden dinero con productos apalancados"
  - "Muchas plataformas que los ofrecen a residentes en la UE no están autorizadas"
  - "Liquidaciones en cascada en momentos de volatilidad extrema"
  - "Costes que se acumulan (financiación, comisiones) al mantener posiciones"
sources:
  - title: "CNMV: Advertencias sobre entidades no autorizadas"
    url: "https://www.cnmv.es/Portal/BusquedaAdvertencias.aspx?lang=es"
  - title: "ESMA: Investor corner"
    url: "https://www.esma.europa.eu/investor-corner"
  - title: "ESMA: medidas de intervención sobre CFD para inversores minoristas (2018)"
    url: "https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors"
---
## Qué es un derivado

Un **derivado** es un contrato cuyo valor depende del precio de otro activo, el **subyacente**. Con un derivado sobre Bitcoin no compras bitcoins: apuestas sobre su precio, o te cubres frente a sus movimientos.

## Los tipos principales

### Futuros

Un acuerdo para comprar o vender un activo a un precio fijado hoy en una fecha futura. Existen futuros sobre Bitcoin y Ether en mercados regulados tradicionales, además de en plataformas cripto.

### Perpetuos

Un tipo de futuro **sin fecha de vencimiento**, muy popular en las plataformas cripto. Para que su precio no se aleje del precio real, se usa una **tasa de financiación** (*funding rate*): cada pocas horas, quienes apuestan en la dirección mayoritaria pagan a los de la contraria. Mantener una posición abierta durante mucho tiempo puede costar bastante.

### Opciones

Dan el **derecho**, pero no la obligación, de comprar (*call*) o vender (*put*) a un precio fijado. Se paga una prima por ese derecho. Comprar una opción limita la pérdida a la prima; venderlas puede implicar pérdidas muy grandes.

### CFD

Los **contratos por diferencias** pagan la diferencia de precio entre la apertura y el cierre de la posición. Son el producto que suelen ofrecer los brókers a minoristas.

## El apalancamiento, explicado con números

El apalancamiento permite abrir una posición mayor que el dinero que depositas. Con 1.000 € y apalancamiento 10×, controlas una posición de 10.000 €:

| Movimiento del precio | Resultado sin apalancar | Resultado con 10× |
|---|---|---|
| +5 % | +50 € | +500 € |
| −5 % | −50 € | −500 € |
| −10 % | −100 € | −1.000 € (liquidado) |

Con 10×, una caída del 10 %, algo habitual en cripto en un solo día, borra todo tu depósito. Y la liquidación suele producirse **antes** de llegar a ese punto, porque la plataforma exige un margen mínimo.

## Qué dice la regulación en Europa

Los derivados sobre criptomonedas son **instrumentos financieros**: no los regula MiCA, sino la normativa de valores (MiFID II). En consecuencia:

- Quien los ofrezca a residentes en España necesita **autorización** como empresa de servicios de inversión.
- Para los CFD sobre criptomonedas, las medidas que ESMA aprobó en 2018, y que después asumieron los supervisores nacionales como la CNMV, limitan el apalancamiento de los clientes minoristas a **2:1** y obligan a advertir del porcentaje de clientes que pierden dinero.
- En España, la CNMV ha endurecido además las condiciones de comercialización y publicidad de los CFD.

Muchas plataformas cripto ofrecen apalancamiento de 50× o 100× a residentes europeos **sin estar autorizadas** para ello. Si te lo ofrecen, desconfía y consulta las [advertencias de la CNMV](https://www.cnmv.es/Portal/BusquedaAdvertencias.aspx?lang=es).

## Para quién tienen sentido

Los derivados tienen usos legítimos, sobre todo la **cobertura**: proteger una posición frente a caídas. Pero para especular, la evidencia es clara: la mayoría de los minoristas que operan con productos apalancados pierde dinero. Si estás empezando, esta lección es para entender cómo funcionan, no para usarlos. Revisa antes la guía de [gestión del riesgo](/aprende/gestion-del-riesgo).
