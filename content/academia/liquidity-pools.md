---
updated: 2026-10-13
practicalExamples:
  - "Aportar ETH y una stablecoin a partes iguales a un pool y cobrar una parte de las comisiones de cada intercambio"
  - "Aportar liquidez a un pool de dos stablecoins, donde la pérdida impermanente suele ser menor"
  - "Calcular la pérdida impermanente con una calculadora antes de aportar a un pool de tokens volátiles"
advantages:
  - "Permiten intercambiar tokens sin un intermediario que case órdenes"
  - "Quien aporta liquidez cobra una parte de las comisiones"
  - "Cualquiera puede participar desde su wallet"
risks:
  - "Pérdida impermanente cuando los precios de los dos tokens se separan"
  - "Fallos o ataques en el contrato del pool"
  - "Pools de tokens fraudulentos creados para atraer liquidez"
  - "Incentivos temporales que desaparecen y dejan rentabilidades bajas"
sources:
  - title: "ethereum.org: Finanzas descentralizadas (DeFi)"
    url: "https://ethereum.org/es/defi/"
  - title: "Uniswap Docs: cómo funcionan los pools y los creadores de mercado automáticos"
    url: "https://docs.uniswap.org/concepts/overview"
quiz:
  - {"pregunta": "¿Cómo fija el precio un pool de liquidez típico?", "opciones": ["Lo decide un operador", "Con una fórmula basada en las cantidades de los dos tokens", "Copiando el precio de un banco"], "correcta": 1, "explicacion": "En la fórmula más conocida, x · y = k, comprar un token del pool lo encarece para el siguiente comprador."}
  - {"pregunta": "¿Qué es la pérdida impermanente?", "opciones": ["La diferencia frente a haber guardado los dos tokens cuando sus precios se separan", "Una comisión fija", "El robo de un pool"], "correcta": 0, "explicacion": "El pool acaba con más del token que baja y menos del que sube."}
  - {"pregunta": "Si un token se duplica respecto al otro en un pool 50/50, ¿cuánta pérdida impermanente hay aproximadamente?", "opciones": ["0,6 %", "50 %", "5,7 %"], "correcta": 2, "explicacion": "Con un cambio ×2 la pérdida impermanente ronda el 5,7 %, antes de contar las comisiones cobradas."}
  - {"pregunta": "¿Qué tipo de pool suele tener menos pérdida impermanente?", "opciones": ["Uno de dos memecoins", "Uno de un token nuevo y ETH", "Uno de dos stablecoins"], "correcta": 2, "explicacion": "Sus precios apenas se separan, así que la pérdida impermanente es pequeña."}
---
## El problema que resuelven

En un exchange tradicional, cada compra necesita un vendedor dispuesto a vender a ese precio. En una blockchain, casar órdenes de miles de personas en tiempo real sería lento y caro. La solución que popularizó DeFi son los **pools de liquidez**: en lugar de esperar a un vendedor, compras directamente a un depósito de tokens gestionado por un [contrato inteligente](/academia/smart-contracts).

## Cómo funcionan

Un pool contiene dos tokens, por ejemplo ETH y una stablecoin. Cualquiera puede **aportar liquidez** depositando ambos en la proporción que marque el pool. A cambio recibe un token que representa su parte del depósito.

El precio no lo fija nadie: lo calcula una fórmula. La más conocida mantiene constante el producto de las cantidades de los dos tokens (`x · y = k`). Si alguien compra ETH del pool, queda menos ETH y más stablecoin, así que el ETH se encarece para el siguiente comprador. A este mecanismo se le llama **creador de mercado automático** (AMM).

Cada intercambio paga una comisión (por ejemplo, el 0,3 %), que se reparte entre quienes han aportado liquidez en proporción a su parte.

## La pérdida impermanente

Es el concepto clave que hay que entender antes de aportar liquidez. Cuando el precio de uno de los tokens cambia, los arbitrajistas compran o venden en el pool hasta igualarlo con el del mercado. El resultado es que el pool siempre acaba con **más cantidad del token que ha bajado y menos del que ha subido**.

Por eso, al retirar, tu depósito puede valer **menos que si simplemente hubieras guardado los dos tokens** en tu wallet. A esa diferencia se le llama pérdida impermanente, porque desaparece si los precios vuelven a la proporción inicial, pero se vuelve definitiva si retiras con los precios separados.

| Cambio de precio de un token frente al otro | Pérdida impermanente aproximada |
|---|---|
| ×1,25 | 0,6 % |
| ×1,5 | 2,0 % |
| ×2 | 5,7 % |
| ×3 | 13,4 % |
| ×5 | 25,5 % |

(Cálculo para un pool 50/50 con la fórmula `x · y = k`, sin contar las comisiones cobradas.)

Las comisiones pueden compensar esa pérdida… o no. Por eso los pools de dos stablecoins, cuyos precios apenas se separan, tienen poca pérdida impermanente, y los pools de tokens muy volátiles pueden salir caros.

## Liquidez concentrada

Algunos exchanges descentralizados permiten aportar liquidez solo en un **rango de precios**. Así se cobran más comisiones mientras el precio está dentro del rango, pero la posición deja de generar comisiones si el precio sale de él, y la pérdida impermanente es mayor. Exige vigilancia.

## Riesgos adicionales

- **Contratos:** un fallo o un ataque puede vaciar el pool.
- **Tokens trampa:** cualquiera puede crear un pool con un token sin valor. Algunos están diseñados para que se pueda comprar pero no vender.
- **Incentivos que se acaban:** muchas rentabilidades altas vienen de premios temporales en el token del protocolo.
- **Fiscalidad:** aportar y retirar liquidez, y las comisiones cobradas, pueden tener consecuencias fiscales cuyo criterio no está del todo consolidado. Guarda registros y consulta a un asesor.
