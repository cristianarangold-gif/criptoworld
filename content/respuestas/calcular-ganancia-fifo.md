---
pregunta: "¿Cómo se calcula la ganancia de las criptomonedas? (método FIFO)"
descripcion: "Hacienda aplica el método FIFO: se entiende que vendes primero las criptomonedas que compraste primero. Te lo explicamos con un ejemplo."
categoria: hacienda
corta: "La ganancia es la diferencia entre lo que obtienes al vender (o permutar) y lo que te costaron esas criptos, sumando a cada lado las comisiones. Si compraste la misma cripto varias veces a precios distintos, Hacienda aplica el método FIFO: se considera que vendes primero las unidades que compraste primero, aunque estén en exchanges distintos."
updated: 2026-10-15
sources:
  - title: "Ley 35/2006 del IRPF, texto consolidado (BOE)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764"
  - title: "Buscador de consultas vinculantes de la Dirección General de Tributos"
    url: "https://petete.tributos.hacienda.gob.es/consultas/"
related:
  - title: "Cómo declarar criptomonedas a Hacienda en España"
    href: "/aprende/declarar-criptomonedas-hacienda"
  - title: "Calculadora del IRPF de las ganancias con criptomonedas"
    href: "/herramientas/calculadora-impuestos-criptomonedas"
---
## La fórmula básica

**Ganancia o pérdida = valor de transmisión − valor de adquisición**

- **Valor de transmisión:** lo que recibes al vender, en euros, menos las comisiones de la venta. En una permuta, el valor de mercado de lo que entregas o recibes (el mayor de los dos).
- **Valor de adquisición:** lo que pagaste al comprar, más las comisiones de la compra.

## Por qué FIFO

FIFO significa *first in, first out*: lo primero que entra es lo primero que sale. El artículo 37.2 de la Ley del IRPF lo impone para los valores homogéneos, y la Dirección General de Tributos lo aplica a las criptomonedas desde 2018 (consulta V1604-18). En 2025 lo confirmó: las criptomonedas de un mismo tipo son **bienes homogéneos** por su naturaleza fungible, así que se aplica FIFO aunque las tengas repartidas entre distintos exchanges o wallets (consultas V0525-25 y V1543-25).

No puedes elegir vender «las más caras» para pagar menos, como harías con el método del precio medio. FIFO se aplica **por cada criptomoneda**: el bitcoin y el ether llevan su propia cola.

## Ejemplo

Operaciones con ether:

1. Enero de 2025: compras 1 ETH por 2.000 €.
2. Mayo de 2025: compras 1 ETH por 3.000 €.
3. Marzo de 2026: vendes 1,5 ETH por 5.100 € (3.400 € cada uno).

Por FIFO, los 1,5 ETH vendidos son el de enero completo y medio del de mayo:

- Coste: 2.000 € + (0,5 × 3.000 €) = 3.500 €.
- Ganancia: 5.100 € − 3.500 € = **1.600 €**.
- Te queda 0,5 ETH con un coste de 1.500 €.

Si hubieras calculado con el precio medio (2.500 € por ETH), te saldría una ganancia de 1.350 €. Esa cifra **no es válida** para Hacienda.

## Cómo llevarlo en la práctica

Con pocas operaciones basta una hoja de cálculo con fecha, cantidad, precio y comisión de cada compra y venta. Con muchas, existen programas de cálculo fiscal que importan el historial de los exchanges; revisa siempre el resultado, porque los errores de importación son frecuentes. Una vez tengas la ganancia, puedes estimar el impuesto con la [calculadora del IRPF](/herramientas/calculadora-impuestos-criptomonedas).

> Si tributas en el País Vasco, ten en cuenta que el Tribunal Superior de Justicia del País Vasco cuestionó en enero de 2025 el criterio FIFO para la normativa foral de Bizkaia. En territorio común, la DGT mantiene FIFO.
