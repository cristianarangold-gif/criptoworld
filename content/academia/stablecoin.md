---
updated: 2026-10-13
simpleExplanation: "Una stablecoin es una criptomoneda diseñada para mantener un valor estable, normalmente vinculado 1:1 a una moneda como el dólar o el euro. Las más conocidas son USDT (Tether) y USDC (Circle), y en euros, EURC. Sirven para moverse dentro del mundo cripto sin estar expuesto a la volatilidad de activos como Bitcoin, pero su estabilidad depende de que su emisor sea solvente y transparente."
practicalExamples:
  - "Cambiar parte de tus criptos a una stablecoin para reducir la exposición a la volatilidad (ojo: la permuta tributa)"
  - "Enviar el equivalente a 500 dólares a otro país en minutos pagando solo la comisión de la red"
  - "Usar una stablecoin como moneda de referencia para operar en un exchange"
commonMistakes:
  - "Pensar que todas las stablecoins son igual de seguras"
  - "No mirar quién es el emisor, qué reservas tiene y si está autorizado bajo MiCA"
  - "Confundir las stablecoins algorítmicas con las respaldadas por reservas"
  - "Creer que cambiar cripto por una stablecoin no tributa: es una permuta y se declara"
sources:
  - title: "Reglamento (UE) 2023/1114 (MiCA), títulos III y IV sobre stablecoins, EUR-Lex"
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1114"
  - title: "ethereum.org: Stablecoins"
    url: "https://ethereum.org/es/stablecoins/"
  - title: "CNMV: Nueva regulación de criptoactivos, Reglamento MiCA"
    url: "https://www.cnmv.es/portal/mica/regulacion-criptoactivos"
---
## Por qué existen

Los precios de las criptomonedas cambian mucho en poco tiempo. Eso hace difícil usarlas para pagar o para guardar valor durante unos días. Las stablecoins intentan ofrecer lo mejor de ambos mundos: un valor estable, como el de una moneda tradicional, con la rapidez y la disponibilidad de una criptomoneda.

## Los tres tipos

### Respaldadas por reservas en moneda tradicional

Una empresa emite un token por cada dólar o euro que guarda en reservas (efectivo, depósitos y deuda pública a corto plazo). Si quieres, puedes devolverle el token y recibir la moneda. Es el modelo de **USDT**, **USDC** y **EURC**. Su seguridad depende de que las reservas existan, sean líquidas y estén bien custodiadas.

### Respaldadas por otras criptomonedas

Se emiten a cambio de depositar criptomonedas como garantía, normalmente por un valor mayor que lo emitido (**sobrecolateralización**), para aguantar caídas del precio de esa garantía. **DAI** es el ejemplo más conocido. Son más descentralizadas, pero más complejas.

### Algorítmicas

Intentan mantener el precio solo mediante reglas automáticas que crean o destruyen tokens, sin reservas suficientes detrás. La historia les ha ido mal: en mayo de 2022, **UST** perdió su paridad con el dólar en pocos días y arrastró al colapso a su token hermano LUNA, con pérdidas de decenas de miles de millones de dólares.

## Qué cambia con MiCA

En la Unión Europea, el reglamento MiCA regula las stablecoins desde el **30 de junio de 2024**. Distingue entre:

- **Fichas de dinero electrónico** (*e-money tokens*): vinculadas a una sola moneda oficial, como USDC o EURC. Su emisor debe ser un banco o una entidad de dinero electrónico autorizada, y el titular tiene derecho a canjearlas por su valor nominal en cualquier momento.
- **Fichas referenciadas a activos**: vinculadas a una cesta de monedas, materias primas u otros activos. Su emisor necesita una autorización específica.

En ambos casos el emisor debe mantener reservas, publicar información y someterse a supervisión. Por eso las plataformas autorizadas en la UE solo pueden ofrecer stablecoins cuyo emisor cumple MiCA: es lo que ha pasado con [USDT](/academia/usdt), que ha desaparecido de muchas plataformas europeas, mientras que [USDC](/academia/usdc) y EURC siguen disponibles.

## Usos habituales

1. **Aparcar fondos sin salir del ecosistema cripto**, por ejemplo tras vender otra criptomoneda.
2. **Transferencias internacionales** rápidas, sobre todo en países con restricciones al acceso a dólares.
3. **Moneda de referencia** en exchanges.
4. **DeFi**: préstamos, [pools de liquidez](/academia/liquidity-pools) y otros protocolos.

## Lo que hay que tener claro

- **Estable no significa sin riesgo.** Una stablecoin puede perder su paridad si hay dudas sobre sus reservas, como le pasó brevemente a USDC en marzo de 2023.
- **No es un depósito bancario.** No está cubierta por el Fondo de Garantía de Depósitos.
- **Los emisores pueden congelar tokens** en direcciones concretas, por ejemplo por orden judicial.
- **Cambiar cripto por una stablecoin tributa** como cualquier otra permuta; lo explicamos en [cómo declarar criptomonedas a Hacienda](/aprende/declarar-criptomonedas-hacienda).
