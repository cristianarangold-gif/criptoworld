import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface LessonSource {
  title: string
  url: string
}

export interface AcademyLesson {
  slug: string
  title: string
  level: 1 | 2 | 3
  readTime: number
  simpleExplanation: string
  detailedExplanation: string
  practicalExamples: string[]
  relatedConcepts: string[]
  advantages: string[]
  risks: string[]
  commonMistakes: string[]
  glossary: Record<string, string>
  // Solo en lecciones revisadas (content/academia/<slug>.md)
  updated?: string
  sources?: LessonSource[]
}

const LESSONS: AcademyLesson[] = [
  // ===== NIVEL 1 — PRINCIPIANTE =====
  {
    slug: 'bitcoin',
    title: '¿Qué es Bitcoin?',
    level: 1,
    readTime: 10,
    simpleExplanation: 'Bitcoin (BTC) es la primera criptomoneda del mundo. Fue creada en 2009 por una persona o grupo anónimo bajo el seudónimo de Satoshi Nakamoto. Funciona como dinero digital que puedes enviar a cualquier persona del mundo sin necesidad de bancos ni intermediarios. Su oferta está limitada a 21 millones de unidades, lo que lo convierte en un activo escaso por diseño.',
    detailedExplanation: `## Cómo funciona Bitcoin

Bitcoin opera sobre una red descentralizada de miles de ordenadores (nodos) que mantienen un registro compartido e inmutable de todas las transacciones: la **blockchain**. Cada bloque contiene un grupo de transacciones verificadas y está enlazado criptográficamente al anterior.

Las transacciones son verificadas por **mineros** que resuelven problemas matemáticos complejos utilizando potencia computacional. A cambio, reciben nuevos bitcoins como recompensa (3,125 BTC por bloque tras el halving de 2024).

## Oferta limitada y halvings

Solo existirán **21 millones de bitcoins**. Cada ~4 años se produce un evento llamado **halving** que reduce a la mitad la recompensa de minería. Esto disminuye la tasa de emisión de nuevos BTC. Se han producido halvings en 2012, 2016, 2020 y 2024.

## Características clave

- **Descentralizado:** ningún gobierno ni empresa lo controla
- **Transparente:** todas las transacciones son públicas en la blockchain
- **Seudónimo:** las identidades se representan como direcciones alfanuméricas
- **Inmutable:** una transacción confirmada no puede revertirse
- **Divisible:** 1 BTC = 100.000.000 satoshis

## Bitcoin como reserva de valor

Muchos inversores institucionales lo consideran "oro digital" por su escasez programada y su resistencia a la censura. Sin embargo, su precio es altamente volátil y puede sufrir caídas del 50% o más en periodos cortos.`,
    practicalExamples: [
      'Enviar BTC a un familiar en otro país sin comisiones bancarias internacionales',
      'Almacenar valor a largo plazo como protección contra la inflación de monedas locales',
      'Realizar pagos en comercios que acepten criptomonedas',
      'Comprar fracciones de Bitcoin (satoshis) con cualquier cantidad de dinero'
    ],
    relatedConcepts: ['blockchain', 'wallet', 'seed-phrase', 'exchange', 'altcoin'],
    advantages: [
      'Oferta limitada a 21 millones (escasez digital)',
      'Descentralizado: no depende de ningún gobierno o entidad',
      'Transferencias internacionales sin intermediarios',
      'Código abierto auditado por miles de desarrolladores',
      'Historial de más de 15 años de funcionamiento continuo'
    ],
    risks: [
      'Alta volatilidad: fluctuaciones del 20-50% en semanas',
      'Regulación incierta en muchos países',
      'Transacciones irreversibles: si envías a una dirección incorrecta, se pierden',
      'Consumo energético elevado del sistema de minería (Proof of Work)',
      'Riesgo de pérdida total si se pierden las claves privadas'
    ],
    commonMistakes: [
      'Invertir más dinero del que puedes permitirte perder',
      'No guardar correctamente la seed phrase de tu wallet',
      'Comprar por FOMO (miedo a quedarse fuera) en máximos históricos',
      'Confundir Bitcoin (BTC) con proyectos fraudulentos que usan su nombre',
      'Dejar grandes cantidades en exchanges sin tu propia custodia'
    ],
    glossary: {
      'Satoshi': 'La unidad más pequeña de Bitcoin (0,00000001 BTC)',
      'Halving': 'Evento que reduce a la mitad la recompensa de minería cada ~4 años',
      'Nodo': 'Ordenador que mantiene una copia de la blockchain de Bitcoin',
      'Minero': 'Participante que verifica transacciones y asegura la red',
      'Whitepaper': 'Documento técnico original de Bitcoin publicado en 2008'
    }
  },
  {
    slug: 'blockchain',
    title: '¿Qué es blockchain?',
    level: 1,
    readTime: 9,
    simpleExplanation: 'Blockchain es una tecnología de registro distribuido que almacena información en bloques enlazados cronológicamente y protegidos por criptografía. Imagina un libro contable digital compartido por miles de ordenadores en el mundo, donde cada anotación es permanente y verificable por cualquiera. Es la base sobre la que funcionan Bitcoin, Ethereum y la mayoría de criptomonedas.',
    detailedExplanation: `## Estructura de una blockchain

Una blockchain es una cadena de **bloques** donde cada bloque contiene:
- Un conjunto de transacciones
- Un **hash** (huella digital criptográfica) único
- El hash del bloque anterior
- Una marca temporal (timestamp)

Esta estructura hace que alterar un bloque requiera cambiar todos los bloques posteriores, lo cual es computacionalmente inviable en redes grandes.

## Mecanismos de consenso

Las blockchain necesitan un método para que todos los participantes se pongan de acuerdo sobre qué transacciones son válidas:

- **Proof of Work (PoW):** los mineros compiten resolviendo problemas matemáticos. Usado por Bitcoin.
- **Proof of Stake (PoS):** los validadores bloquean fondos como garantía. Usado por Ethereum.
- **Delegated PoS, BFT** y otros variantes utilizados por otras redes.

## Tipos de blockchain

- **Públicas:** abiertas a cualquiera (Bitcoin, Ethereum)
- **Privadas:** controladas por una organización (Hyperledger)
- **Híbridas:** combinan elementos de ambas

## Más allá de las criptomonedas

La blockchain tiene aplicaciones en: trazabilidad de cadenas de suministro, registro de propiedad inmobiliaria, identidad digital, votaciones electrónicas, certificación de documentos, y más.`,
    practicalExamples: [
      'Verificar la autenticidad y trazabilidad de productos alimentarios desde el origen hasta el consumidor',
      'Registrar la propiedad de activos digitales (NFTs, tokens) de forma inmutable',
      'Crear contratos inteligentes que se ejecutan automáticamente cuando se cumplen condiciones',
      'Tokenizar activos del mundo real (inmuebles, arte, materias primas)'
    ],
    relatedConcepts: ['bitcoin', 'ethereum', 'smart-contracts', 'layer-1', 'layer-2'],
    advantages: [
      'Inmutabilidad: los datos registrados no pueden alterarse',
      'Transparencia: cualquiera puede auditar las transacciones',
      'Descentralización: no hay punto único de fallo',
      'Seguridad criptográfica robusta',
      'Eliminación de intermediarios en muchos procesos'
    ],
    risks: [
      'Escalabilidad limitada en blockchains públicas (transacciones por segundo)',
      'Consumo energético alto en redes Proof of Work',
      'Irreversibilidad: un error no puede deshacerse fácilmente',
      'Complejidad técnica para usuarios no familiarizados',
      'Riesgo de centralización en redes con pocos validadores'
    ],
    commonMistakes: [
      'Pensar que blockchain y Bitcoin son lo mismo (blockchain es la tecnología, Bitcoin la usa)',
      'Creer que todos los datos en una blockchain son privados (generalmente son públicos)',
      'Asumir que blockchain es la solución para todo tipo de problemas',
      'Confundir inmutabilidad con infalibilidad'
    ],
    glossary: {
      'Hash': 'Función criptográfica que convierte datos en una huella digital única de longitud fija',
      'Bloque': 'Conjunto de transacciones agrupadas y enlazadas al bloque anterior',
      'Consenso': 'Mecanismo por el cual los nodos acuerdan el estado válido de la red',
      'Nodo': 'Ordenador conectado a la red que mantiene una copia de la blockchain',
      'Fork': 'Bifurcación en la blockchain cuando se crean dos versiones diferentes de la cadena'
    }
  },
  {
    slug: 'wallet',
    title: '¿Qué es una wallet?',
    level: 1,
    readTime: 8,
    simpleExplanation: 'Una wallet (monedero) de criptomonedas es una herramienta que almacena tus claves privadas y te permite enviar, recibir y gestionar tus activos digitales. No almacena las criptomonedas en sí (estas viven en la blockchain), sino las claves que demuestran que eres el propietario.',
    detailedExplanation: `## Tipos de wallets

### Hot Wallets (conectadas a Internet)
- **Apps móviles:** MetaMask, Trust Wallet, Phantom
- **Extensiones de navegador:** MetaMask, Rabby
- **Wallets de exchange:** la cuenta en Binance, Coinbase, Kraken

Ventaja: cómodas para uso frecuente. Riesgo: vulnerables a hackeos al estar conectadas.

### Cold Wallets (sin conexión)
- **Hardware wallets:** Ledger, Trezor, Keystone
- **Paper wallets:** claves impresas en papel

Ventaja: máxima seguridad para almacenamiento a largo plazo. Inconveniente: menos prácticas para transacciones frecuentes.

## Clave pública vs clave privada

- **Clave pública:** como tu número de cuenta (dirección). Puedes compartirla para recibir fondos.
- **Clave privada:** como tu PIN o contraseña. **NUNCA** la compartas con nadie. Quien la tenga controla tus fondos.

## Custodial vs Non-custodial

- **Custodial:** un tercero (exchange) guarda tus claves. Más fácil, pero dependes de esa empresa.
- **Non-custodial (autocustodia):** tú controlas las claves. Mayor responsabilidad pero total independencia.

## Seguridad fundamental

1. Guarda tu seed phrase en un lugar seguro y offline
2. Nunca compartas tu clave privada
3. Usa autenticación de dos factores (2FA)
4. Verifica las direcciones antes de enviar fondos`,
    practicalExamples: [
      'Descargar MetaMask en el móvil para interactuar con DeFi en Ethereum',
      'Comprar un Ledger Nano para almacenar grandes cantidades de BTC a largo plazo',
      'Usar la wallet de un exchange para comprar tu primera criptomoneda',
      'Enviar ETH desde tu wallet a otra dirección escaneando un código QR'
    ],
    relatedConcepts: ['seed-phrase', 'exchange', 'bitcoin', 'ethereum', 'defi'],
    advantages: [
      'Autocustodia total de tus activos (non-custodial)',
      'Acceso 24/7 sin horarios bancarios',
      'Compatible con múltiples criptomonedas y redes',
      'Las hardware wallets ofrecen seguridad de nivel bancario'
    ],
    risks: [
      'Pérdida irrecuperable si pierdes la seed phrase y la clave privada',
      'Hot wallets vulnerables a malware y phishing',
      'Transacciones irreversibles si envías a una dirección incorrecta',
      'Responsabilidad total del usuario en la seguridad'
    ],
    commonMistakes: [
      'Guardar la seed phrase en una nota del móvil o email (vulnerable a hackeos)',
      'Compartir la clave privada con supuesto "soporte técnico"',
      'No verificar la dirección completa antes de enviar fondos',
      'Usar una sola wallet para todo sin separar fondos de uso diario y ahorro'
    ],
    glossary: {
      'Clave privada': 'Código secreto que otorga acceso total a tus criptomonedas',
      'Clave pública': 'Dirección que puedes compartir para recibir fondos',
      'Hot wallet': 'Monedero conectado a Internet',
      'Cold wallet': 'Monedero sin conexión a Internet',
      'Hardware wallet': 'Dispositivo físico que almacena claves privadas offline'
    }
  },
  {
    slug: 'seed-phrase',
    title: '¿Qué es una seed phrase?',
    level: 1,
    readTime: 7,
    simpleExplanation: 'Una seed phrase (frase semilla) es un conjunto de 12 o 24 palabras que funciona como la copia de seguridad maestra de tu wallet de criptomonedas. Con estas palabras puedes recuperar todos tus fondos si pierdes el dispositivo o la aplicación. Es la información más sensible que posees en el mundo cripto.',
    detailedExplanation: `## Cómo funciona

Cuando creas una wallet, el software genera una secuencia de 12 o 24 palabras aleatorias tomadas de una lista estándar de 2.048 palabras (BIP-39). Esta frase se usa para derivar matemáticamente todas tus claves privadas y direcciones.

## Por qué es tan importante

La seed phrase es tu **única copia de seguridad**. Si tu teléfono se rompe, tu ordenador falla o la app desaparece, las 12/24 palabras te permiten recuperar todos tus fondos en cualquier wallet compatible.

**Quien posea tu seed phrase controla todos tus fondos.**

## Cómo protegerla

1. **Escríbela en papel** (nunca digital): usa el papel que viene con tu wallet o una placa de metal
2. **Guárdala en un lugar seguro:** caja fuerte, lugar resistente al fuego y agua
3. **No la fotografíes** ni la guardes en el móvil, email, nube o capturas de pantalla
4. **Haz copias** y guárdalas en ubicaciones diferentes
5. **Nunca la compartas** con nadie, ni con "soporte técnico"

## Placas de metal

Existen soluciones de almacenamiento en acero/titanio que resisten fuego, agua y corrosión. Son la opción más segura para almacenamiento a largo plazo.

## ⚠️ Señales de estafa

**NINGÚN servicio, persona o empresa legítima te pedirá tu seed phrase jamás.** Si alguien te la pide, es una estafa sin excepciones.`,
    practicalExamples: [
      'Al crear una wallet MetaMask, anotar las 12 palabras en orden en papel y guardarlas en una caja fuerte',
      'Recuperar tus fondos en un nuevo dispositivo introduciendo las 24 palabras de tu Ledger',
      'Comprar una placa de acero para grabar tu seed phrase de forma permanente'
    ],
    relatedConcepts: ['wallet', 'bitcoin', 'ethereum', 'exchange'],
    advantages: [
      'Permite recuperar todos tus fondos si pierdes el dispositivo',
      'Estándar universal (BIP-39) compatible con la mayoría de wallets',
      'No depende de ninguna empresa o servicio para la recuperación',
      'Una sola frase controla todas las direcciones derivadas'
    ],
    risks: [
      'Pérdida total e irrecuperable de fondos si pierdes la seed phrase',
      'Robo de fondos si alguien accede a tu seed phrase',
      'Vulnerabilidad física: fuego, agua, deterioro del papel',
      'Ataques de phishing que intentan obtener tu frase semilla'
    ],
    commonMistakes: [
      'Guardar la seed phrase en un archivo digital, email o nube',
      'Hacer una captura de pantalla de las palabras',
      'Compartirla con alguien que dice ser "soporte técnico"',
      'No verificar que las palabras están correctas después de anotarlas',
      'Guardar una sola copia en un lugar no seguro'
    ],
    glossary: {
      'BIP-39': 'Estándar que define la lista de 2.048 palabras para generar seed phrases',
      'Derivación': 'Proceso matemático para obtener claves privadas a partir de la seed phrase',
      'Clave privada': 'Código criptográfico generado a partir de la seed phrase',
      'Backup': 'Copia de seguridad de la seed phrase',
      'Entropía': 'Aleatoriedad utilizada para generar la seed phrase de forma segura'
    }
  },
  {
    slug: 'exchange',
    title: '¿Qué es un exchange?',
    level: 1,
    readTime: 8,
    simpleExplanation: 'Un exchange de criptomonedas es una plataforma que permite comprar, vender e intercambiar criptomonedas. Funciona de manera similar a una casa de cambio de divisas, pero para activos digitales. Existen exchanges centralizados (CEX) como Binance o Coinbase, y descentralizados (DEX) como Uniswap.',
    detailedExplanation: `## Exchanges centralizados (CEX)

Los CEX son plataformas operadas por empresas que actúan como intermediarios. Ejemplos: Binance, Coinbase, Kraken, Bybit.

**Ventajas:** facilidad de uso, alta liquidez, soporte al cliente, conversión fiat-cripto directa.
**Desventajas:** custodia de tus fondos por un tercero ("not your keys, not your coins"), posible hackeo, regulación y posible congelación de cuentas.

## Exchanges descentralizados (DEX)

Los DEX operan mediante smart contracts sin intermediarios. Ejemplos: Uniswap, SushiSwap, Jupiter.

**Ventajas:** autocustodia, sin KYC, acceso a tokens nuevos.
**Desventajas:** mayor complejidad, riesgo de tokens fraudulentos, slippage, no admiten fiat directamente.

## Qué considerar al elegir un exchange

1. **Regulación:** ¿opera legalmente en tu país?
2. **Seguridad:** historial de hackeos, medidas de protección
3. **Comisiones:** maker/taker fees, comisiones de retiro
4. **Liquidez:** volumen de trading
5. **Pares disponibles:** ¿tiene las criptomonedas que te interesan?
6. **KYC/AML:** requisitos de verificación de identidad

## Proceso típico de compra

1. Registrarte y verificar tu identidad (KYC)
2. Depositar fondos (transferencia bancaria, tarjeta)
3. Elegir el par de trading (ej: BTC/EUR)
4. Ejecutar la orden de compra
5. Opcionalmente, retirar tus fondos a tu propia wallet`,
    practicalExamples: [
      'Registrarte en Coinbase para comprar tu primer Bitcoin con tarjeta de débito',
      'Usar Uniswap para intercambiar ETH por un token DeFi directamente desde tu wallet',
      'Configurar una orden límite en Binance para comprar BTC cuando baje a un precio específico'
    ],
    relatedConcepts: ['wallet', 'bitcoin', 'ethereum', 'stablecoin', 'defi'],
    advantages: [
      'Acceso sencillo a la compra/venta de criptomonedas',
      'Alta liquidez en los principales exchanges',
      'Variedad de pares de trading y herramientas',
      'Los CEX ofrecen soporte al cliente y protecciones básicas'
    ],
    risks: [
      'Riesgo de hackeo y pérdida de fondos custodiados',
      'Posible quiebra del exchange (caso FTX en 2022)',
      'Regulaciones que pueden limitar el acceso o congelar fondos',
      'En DEX: tokens fraudulentos, pérdida impermanente, slippage alto'
    ],
    commonMistakes: [
      'Dejar grandes sumas en un exchange sin transferirlas a tu propia wallet',
      'No activar la autenticación de dos factores (2FA)',
      'Operar en exchanges sin regulación ni historial verificado',
      'En DEX: interactuar con contratos no auditados'
    ],
    glossary: {
      'CEX': 'Exchange centralizado operado por una empresa',
      'DEX': 'Exchange descentralizado que opera mediante smart contracts',
      'KYC': 'Know Your Customer — proceso de verificación de identidad',
      'Liquidez': 'Facilidad para comprar/vender un activo sin afectar su precio',
      'Slippage': 'Diferencia entre el precio esperado y el precio real de ejecución'
    }
  },
  {
    slug: 'stablecoin',
    title: '¿Qué es una stablecoin?',
    level: 1,
    readTime: 7,
    simpleExplanation: 'Una stablecoin es una criptomoneda diseñada para mantener un valor estable, generalmente vinculado 1:1 al dólar estadounidense (USD). Las más conocidas son USDT (Tether) y USDC (Circle). Sirven como "refugio" dentro del ecosistema cripto cuando no quieres estar expuesto a la volatilidad de activos como Bitcoin o Ethereum.',
    detailedExplanation: `## Tipos de stablecoins

### Respaldadas por fiat
Cada token está respaldado por reservas en dólares, bonos del tesoro u otros activos equivalentes en cuentas bancarias. Ejemplos: USDT, USDC, BUSD.

### Respaldadas por criptomonedas
Colateralizadas con otras criptomonedas, generalmente sobre-colateralizadas para absorber la volatilidad. Ejemplo: DAI (MakerDAO).

### Algorítmicas
Utilizan mecanismos algorítmicos para mantener el peg sin respaldo directo. Han demostrado ser las más arriesgadas (colapso de UST/LUNA en 2022).

## Para qué sirven

1. **Refugio de volatilidad:** mover fondos a USDT/USDC cuando esperas caídas
2. **Transferencias internacionales:** enviar dólares digitales rápida y baratamente
3. **Trading:** par de referencia para operar (BTC/USDT)
4. **DeFi:** aportar liquidez, préstamos, ahorro con rendimiento
5. **Pagos:** transacciones con valor estable

## Riesgos

No todas las stablecoins son iguales. La transparencia de las reservas, la regulación y el emisor son factores críticos. El colapso de UST en mayo de 2022 demostró que "estable" no significa "sin riesgo".`,
    practicalExamples: [
      'Convertir BTC a USDC en un exchange cuando crees que el mercado va a bajar',
      'Enviar 500 USDT a alguien en otro país en minutos y con comisiones mínimas',
      'Depositar USDC en un protocolo DeFi para obtener rendimiento'
    ],
    relatedConcepts: ['usdt', 'usdc', 'defi', 'exchange', 'bitcoin'],
    advantages: [
      'Estabilidad de precio en un mercado volátil',
      'Transferencias rápidas y baratas comparadas con el sistema bancario tradicional',
      'Acceso a dólares digitales desde cualquier país',
      'Base fundamental para la mayoría de operaciones en DeFi'
    ],
    risks: [
      'Riesgo de que el emisor no tenga reservas suficientes',
      'Regulación que puede afectar su funcionamiento',
      'Posible pérdida del peg (desanclaje del valor 1:1)',
      'Las algorítmicas han demostrado ser especialmente arriesgadas'
    ],
    commonMistakes: [
      'Asumir que todas las stablecoins tienen el mismo nivel de seguridad',
      'No investigar las reservas y auditorías del emisor',
      'Usar stablecoins algorítmicas pensando que son igual de seguras que las respaldadas por fiat',
      'Ignorar el riesgo regulatorio que puede afectar a estos activos'
    ],
    glossary: {
      'Peg': 'Vinculación de precio de la stablecoin con un activo de referencia (ej: 1 USDC = 1 USD)',
      'Colateral': 'Activos depositados como garantía para respaldar la stablecoin',
      'Desanclaje (Depeg)': 'Cuando la stablecoin pierde su paridad con el activo de referencia',
      'Sobre-colateralización': 'Depositar más colateral del que se emite en stablecoins'
    }
  },
  {
    slug: 'usdt',
    title: '¿Qué es USDT (Tether)?',
    level: 1,
    readTime: 6,
    simpleExplanation: 'USDT (Tether) es la stablecoin más utilizada del mundo. Cada USDT está diseñado para valer 1 dólar estadounidense, respaldado por reservas que incluyen efectivo, bonos del tesoro y otros activos. Es emitida por la empresa Tether Limited y es la criptomoneda con mayor volumen de trading diario.',
    detailedExplanation: `## Datos clave

- **Emisor:** Tether Limited (iFinex)
- **Año de lanzamiento:** 2014
- **Redes:** Ethereum (ERC-20), Tron (TRC-20), Solana, Avalanche, y más
- **Capitalización:** habitualmente la tercera criptomoneda por market cap

## Reservas y controversias

Tether publica informes trimestrales sobre sus reservas, que incluyen: bonos del tesoro de EE.UU., depósitos bancarios, préstamos garantizados y otros activos. Sin embargo, ha sido objeto de controversia por la falta de auditorías completas por parte de las Big Four y por multas regulatorias.

## Uso principal

USDT se utiliza masivamente para: trading en exchanges (par más líquido), transferencias de valor, y como medio de intercambio en mercados emergentes donde el acceso al dólar físico es limitado.

## TRC-20 vs ERC-20

- **TRC-20 (Tron):** comisiones muy bajas (~0.1 USD), transferencias rápidas
- **ERC-20 (Ethereum):** comisiones variables según congestión de red, mayor integración con DeFi`,
    practicalExamples: [
      'Mantener fondos en USDT en un exchange mientras decides tu próxima operación',
      'Enviar USDT por la red Tron (TRC-20) a bajo costo',
      'Usar USDT como par de trading para comprar altcoins'
    ],
    relatedConcepts: ['stablecoin', 'usdc', 'exchange', 'ethereum', 'defi'],
    advantages: ['Mayor liquidez y aceptación global entre stablecoins', 'Disponible en múltiples blockchains', 'Pares de trading en prácticamente todos los exchanges', 'Transferencias rápidas y económicas en redes como Tron'],
    risks: ['Controversias sobre la transparencia total de sus reservas', 'Riesgo regulatorio en múltiples jurisdicciones', 'Centralización: Tether Limited puede congelar fondos', 'Dependencia de la solvencia de un único emisor'],
    commonMistakes: ['Enviar USDT por la red equivocada (ej: enviar ERC-20 a una dirección TRC-20)', 'Asumir que USDT es 100% equivalente a un dólar en banco', 'No diversificar entre diferentes stablecoins'],
    glossary: { 'ERC-20': 'Estándar de token en la blockchain de Ethereum', 'TRC-20': 'Estándar de token en la blockchain de Tron', 'Tether Limited': 'Empresa emisora de USDT' }
  },
  {
    slug: 'usdc',
    title: '¿Qué es USDC?',
    level: 1,
    readTime: 6,
    simpleExplanation: 'USDC (USD Coin) es una stablecoin emitida por Circle, respaldada 1:1 por reservas en dólares estadounidenses y bonos del tesoro de EE.UU. Es considerada por muchos como la stablecoin más transparente del mercado, con auditorías mensuales publicadas por una firma contable independiente.',
    detailedExplanation: `## Datos clave

- **Emisor:** Circle (antes en colaboración con Coinbase a través del Centre Consortium)
- **Año de lanzamiento:** 2018
- **Redes:** Ethereum, Solana, Avalanche, Base, Polygon, Arbitrum y más
- **Reservas:** efectivo y bonos del tesoro de EE.UU. a corto plazo

## Transparencia y regulación

Circle publica informes mensuales de reservas auditados por Deloitte. Está regulada como transmisor de dinero en EE.UU. y busca obtener licencias adicionales. Esta transparencia la convierte en la stablecoin preferida por muchos institucionales y protocolos DeFi.

## USDC vs USDT

| Aspecto | USDC | USDT |
|---------|------|------|
| Transparencia | Auditorías mensuales (Deloitte) | Informes trimestrales |
| Regulación | Más regulada en EE.UU. | Más controversias regulatorias |
| Market cap | Menor que USDT | Mayor market cap |
| Liquidez | Alta, pero menor que USDT | La más líquida |

## Evento de marzo 2023

USDC perdió brevemente su paridad ($0.87) cuando Circle reveló tener $3.3B en Silicon Valley Bank, que había quebrado. Se recuperó cuando la FDIC garantizó los depósitos. Este evento demostró que incluso las stablecoins más transparentes tienen riesgos.`,
    practicalExamples: ['Usar USDC en protocolos DeFi como Aave para obtener rendimiento', 'Recibir pagos internacionales en USDC con liquidación casi inmediata', 'Mantener ahorros en USDC como alternativa al dólar en países con restricciones cambiarias'],
    relatedConcepts: ['stablecoin', 'usdt', 'defi', 'exchange', 'ethereum'],
    advantages: ['Auditorías mensuales por Deloitte', 'Regulación clara en EE.UU.', 'Respaldo íntegro en efectivo y bonos del tesoro', 'Amplia adopción en DeFi institucional'],
    risks: ['Menor liquidez que USDT en algunos exchanges', 'Riesgo de centralización (Circle puede congelar direcciones)', 'Dependencia del sistema bancario tradicional', 'Posible evento de depeg como en marzo 2023'],
    commonMistakes: ['Pensar que USDC no puede perder su paridad con el dólar', 'No verificar en qué red estás enviando USDC', 'Concentrar todos tus fondos estables en una sola stablecoin'],
    glossary: { 'Circle': 'Empresa fintech emisora de USDC', 'Depeg': 'Pérdida temporal de la paridad 1:1 con el dólar', 'FDIC': 'Federal Deposit Insurance Corporation — aseguradora de depósitos bancarios en EE.UU.' }
  },
  {
    slug: 'ethereum',
    title: '¿Qué es Ethereum?',
    level: 1,
    readTime: 10,
    simpleExplanation: 'Ethereum es una plataforma blockchain descentralizada que va más allá de las transacciones financieras: permite ejecutar programas llamados smart contracts (contratos inteligentes). Su criptomoneda nativa se llama Ether (ETH). Es la base de la mayoría de aplicaciones descentralizadas (dApps), DeFi, NFTs y tokens.',
    detailedExplanation: `## Más que una criptomoneda

Mientras Bitcoin fue diseñado principalmente como dinero digital, Ethereum fue creado en 2015 por Vitalik Buterin como una "computadora mundial" descentralizada capaz de ejecutar cualquier tipo de aplicación.

## Smart contracts

Los contratos inteligentes son programas autoejecutables almacenados en la blockchain. Cuando se cumplen las condiciones predefinidas, el contrato se ejecuta automáticamente sin intermediarios. Esto permite crear: exchanges descentralizados, préstamos, seguros, organizaciones autónomas (DAOs) y mucho más.

## The Merge (2022)

En septiembre de 2022, Ethereum realizó "The Merge", migrando de Proof of Work a **Proof of Stake**. Esto redujo su consumo energético en ~99.95% y cambió fundamentalmente su modelo económico.

## Ecosistema

- **DeFi:** Uniswap, Aave, Lido, MakerDAO
- **Layer 2:** Arbitrum, Optimism, Base, zkSync
- **NFTs:** OpenSea, Blur
- **Stablecoins:** USDT, USDC, DAI

## Modelo económico

Tras The Merge y la implementación de EIP-1559, parte de las comisiones (gas fees) se queman, reduciendo la oferta de ETH. En periodos de alta actividad, ETH puede ser deflacionario.

## Gas fees

Cada operación en Ethereum requiere pagar "gas" en ETH. El coste varía según la congestión de la red. Las soluciones Layer 2 ofrecen comisiones significativamente menores.`,
    practicalExamples: ['Interactuar con Uniswap para intercambiar tokens ERC-20', 'Hacer staking de ETH para obtener rendimiento (~3-4% APY)', 'Desplegar un smart contract para crear tu propio token', 'Usar una Layer 2 como Arbitrum para operar con comisiones bajas'],
    relatedConcepts: ['blockchain', 'smart-contracts', 'gas', 'layer-2', 'defi', 'staking'],
    advantages: ['Ecosistema más grande y maduro de aplicaciones descentralizadas', 'Smart contracts que permiten lógica programable', 'Proof of Stake eficiente energéticamente', 'Enorme comunidad de desarrolladores', 'Base de la mayoría de innovación en cripto'],
    risks: ['Gas fees elevados en periodos de alta congestión', 'Competencia de otras blockchains (Solana, Avalanche)', 'Complejidad para usuarios no técnicos', 'Smart contracts pueden contener bugs o vulnerabilidades', 'Volatilidad del precio de ETH'],
    commonMistakes: ['Confundir Ethereum (la plataforma) con Ether/ETH (la criptomoneda)', 'Interactuar con smart contracts sin entender lo que firmas', 'No estimar el coste de gas antes de una transacción', 'Usar la red principal para operaciones pequeñas pudiendo usar Layer 2'],
    glossary: { 'Smart contract': 'Programa autoejecutable almacenado en la blockchain', 'Gas': 'Unidad de medida del coste computacional en Ethereum', 'EVM': 'Ethereum Virtual Machine — entorno de ejecución de smart contracts', 'ERC-20': 'Estándar para crear tokens fungibles en Ethereum', 'The Merge': 'Migración de Ethereum de Proof of Work a Proof of Stake en 2022' }
  },
  {
    slug: 'altcoin',
    title: '¿Qué es una altcoin?',
    level: 1,
    readTime: 7,
    simpleExplanation: 'El término altcoin (alternative coin) se refiere a cualquier criptomoneda que no sea Bitcoin. Incluye desde proyectos consolidados como Ethereum, Solana o Cardano hasta miles de tokens de menor capitalización. Cada altcoin tiene su propio propósito, tecnología y nivel de riesgo.',
    detailedExplanation: `## Categorías principales

### Plataformas (Layer 1)
Blockchains con su propia infraestructura: Ethereum (ETH), Solana (SOL), Cardano (ADA), Avalanche (AVAX), Polkadot (DOT).

### Tokens DeFi
Proyectos de finanzas descentralizadas: Uniswap (UNI), Aave (AAVE), Lido (LDO), MakerDAO (MKR).

### Stablecoins
Vinculadas al valor del dólar: USDT, USDC, DAI.

### Memecoins
Nacidas de memes o comunidades: Dogecoin (DOGE), Shiba Inu (SHIB), Pepe (PEPE). Altamente especulativas.

### Tokens de utilidad
Usados dentro de ecosistemas específicos: Chainlink (LINK), Filecoin (FIL), The Graph (GRT).

## Cómo evaluar una altcoin

1. **Equipo:** ¿quiénes son los fundadores y desarrolladores?
2. **Tecnología:** ¿qué problema resuelve? ¿es innovador?
3. **Tokenomics:** distribución, emisión, utilidad del token
4. **Comunidad:** actividad en GitHub, redes sociales, desarrolladores activos
5. **Market cap y liquidez:** ¿es fácil comprar/vender?
6. **Competencia:** ¿qué alternativas existen?

## Temporada de altcoins (Alt Season)

Históricamente, tras grandes subidas de Bitcoin, los beneficios suelen rotar hacia altcoins, generando subidas porcentuales mayores. Esto se conoce como "alt season". Sin embargo, las caídas también suelen ser más pronunciadas.`,
    practicalExamples: ['Investigar Solana como alternativa a Ethereum con comisiones más bajas', 'Comprar una pequeña posición en tokens DeFi después de investigar sus fundamentos', 'Evitar memecoins sin fundamentos como inversión principal'],
    relatedConcepts: ['bitcoin', 'ethereum', 'defi', 'tokenomics', 'exchange'],
    advantages: ['Diversificación más allá de Bitcoin', 'Acceso a tecnologías y casos de uso innovadores', 'Potencial de rendimientos porcentuales mayores que BTC', 'Amplio rango de opciones para diferentes estrategias'],
    risks: ['Mayor volatilidad que Bitcoin', 'Muchos proyectos fracasan o resultan ser estafas', 'Menor liquidez: puede ser difícil vender en momentos de pánico', 'Dependencia de equipos pequeños que pueden abandonar el proyecto'],
    commonMistakes: ['Invertir en altcoins solo por el precio bajo ("esta moneda a 0,001$ puede llegar a 1$")', 'No investigar el proyecto antes de invertir', 'Concentrar demasiado capital en altcoins de baja capitalización', 'Seguir recomendaciones de influencers sin verificar la información'],
    glossary: { 'Altcoin': 'Cualquier criptomoneda que no sea Bitcoin', 'Memecoin': 'Criptomoneda nacida de memes o comunidades sin fundamentos técnicos claros', 'Alt Season': 'Periodo de mercado donde las altcoins suben más que Bitcoin', 'Market cap': 'Capitalización de mercado = precio × oferta circulante', 'Tokenomics': 'Modelo económico de un token (emisión, distribución, utilidad)' }
  },
  // ===== NIVEL 2 — INTERMEDIO =====
  {
    slug: 'defi',
    title: 'DeFi: Finanzas Descentralizadas',
    level: 2,
    readTime: 11,
    simpleExplanation: 'DeFi (Decentralized Finance) es un ecosistema de aplicaciones financieras construidas sobre blockchain que replican y amplían los servicios financieros tradicionales (préstamos, ahorro, trading, seguros) pero sin intermediarios como bancos o brokers. Cualquier persona con una wallet y conexión a Internet puede acceder.',
    detailedExplanation: `## Pilares de DeFi

### Exchanges descentralizados (DEX)
Plataformas para intercambiar tokens sin intermediarios. Usan AMMs (Automated Market Makers) en lugar de libros de órdenes. Ejemplos: Uniswap, SushiSwap, Curve, Jupiter.

### Préstamos y empréstitos (Lending/Borrowing)
Protocolo donde puedes prestar tus activos para ganar intereses o pedir prestado usando criptomonedas como colateral. Ejemplos: Aave, Compound, MakerDAO.

### Staking líquido
Hacer staking de ETH manteniendo liquidez mediante un token derivado. Ejemplos: Lido (stETH), Rocket Pool (rETH).

### Yield farming
Estrategia de mover fondos entre protocolos para maximizar rendimientos. Alto riesgo, alto potencial de retorno.

### Stablecoins descentralizadas
DAI de MakerDAO: stablecoin generada por usuarios que depositan colateral.

## Riesgos de DeFi

- **Smart contract risk:** bugs o vulnerabilidades en el código
- **Impermanent loss:** pérdida al proveer liquidez si los precios divergen
- **Liquidación:** tu colateral puede ser liquidado si su valor baja demasiado
- **Rug pulls:** proyectos fraudulentos que desaparecen con los fondos
- **Riesgo regulatorio:** los gobiernos pueden regular o prohibir ciertos protocolos

## TVL (Total Value Locked)

El TVL mide los fondos totales depositados en protocolos DeFi. Es una métrica clave para evaluar la adopción y salud del ecosistema.`,
    practicalExamples: ['Depositar ETH en Aave como colateral y pedir prestado USDC', 'Aportar liquidez al par ETH/USDC en Uniswap y ganar comisiones', 'Hacer staking líquido de ETH en Lido y obtener stETH que puedes usar en otros protocolos'],
    relatedConcepts: ['smart-contracts', 'ethereum', 'staking', 'liquidity-pools', 'gas'],
    advantages: ['Acceso global sin requisitos bancarios', 'Transparencia total: todo el código es auditable', 'Composabilidad: los protocolos se combinan entre sí (money legos)', 'Rendimientos generalmente superiores a la banca tradicional', 'Operación 24/7/365 sin horarios ni festivos'],
    risks: ['Vulnerabilidades en smart contracts (hacks millonarios)', 'Pérdida impermanente en pools de liquidez', 'Liquidación de posiciones apalancadas', 'Regulación incierta', 'Complejidad técnica elevada para principiantes'],
    commonMistakes: ['Buscar el APY más alto sin evaluar los riesgos', 'No diversificar entre protocolos', 'Interactuar con contratos no auditados', 'No entender las condiciones de liquidación antes de pedir préstamos'],
    glossary: { 'TVL': 'Total Value Locked — fondos totales depositados en un protocolo', 'AMM': 'Automated Market Maker — algoritmo que determina precios en DEX', 'Yield': 'Rendimiento o rentabilidad generada', 'Impermanent Loss': 'Pérdida temporal al proveer liquidez cuando los precios divergen', 'Liquidación': 'Venta forzada del colateral cuando su valor baja del mínimo requerido' }
  },
  {
    slug: 'staking',
    title: 'Staking',
    level: 2,
    readTime: 8,
    simpleExplanation: 'El staking consiste en bloquear tus criptomonedas en una red blockchain para ayudar a validar transacciones y mantener la seguridad de la red. A cambio, recibes recompensas en forma de más criptomonedas. Es como un "depósito a plazo" cripto, pero con rendimientos variables y riesgos específicos.',
    detailedExplanation: `## Cómo funciona

En blockchains Proof of Stake (PoS), los validadores necesitan depositar ("stakear") criptomonedas como garantía. Si validan correctamente, reciben recompensas. Si actúan maliciosamente, pueden perder parte de su stake (slashing).

## Formas de hacer staking

### Staking nativo
Ejecutar tu propio nodo validador. Requiere: mínimo de tokens (32 ETH para Ethereum), hardware, conocimientos técnicos, y conexión estable.

### Staking delegado
Delegar tus tokens a un validador existente. Más accesible. Disponible en Solana, Cosmos, Cardano, Polkadot.

### Staking líquido
Stakear a través de protocolos como Lido o Rocket Pool y recibir un token derivado (stETH, rETH) que mantiene liquidez. Puedes usar ese token en DeFi mientras ganas recompensas.

### Staking en exchanges
La opción más sencilla: los exchanges ofrecen staking con un clic. Menor rendimiento y custodia por un tercero.

## Rendimientos típicos (orientativos, varían)

- Ethereum: 3-4% APY
- Solana: 5-7% APY
- Cosmos: 15-20% APY
- Polkadot: 12-15% APY

**Nota:** estos rendimientos son orientativos y fluctúan. No representan garantía de rentabilidad futura.`,
    practicalExamples: ['Stakear ETH en Lido y recibir stETH que puedes usar como colateral en Aave', 'Delegar SOL a un validador de Solana desde la wallet Phantom', 'Usar el servicio de staking de un exchange para empezar sin complicaciones'],
    relatedConcepts: ['ethereum', 'defi', 'liquidity-pools', 'restaking', 'layer-1'],
    advantages: ['Ingresos pasivos en criptomonedas', 'Contribución a la seguridad de la red', 'No requiere hardware especializado (delegado/líquido)', 'Con staking líquido mantienes liquidez mientras ganas recompensas'],
    risks: ['Slashing: pérdida parcial si el validador actúa mal', 'Riesgo de precio: la criptomoneda stakeada puede perder valor', 'Periodo de desbloqueo: los fondos pueden estar bloqueados semanas', 'Smart contract risk en protocolos de staking líquido', 'Los rendimientos no están garantizados y pueden cambiar'],
    commonMistakes: ['Stakear sin entender el periodo de desbloqueo', 'Elegir validadores solo por el APY más alto', 'No considerar la caída de precio del activo stakeado', 'Confundir staking legítimo con esquemas Ponzi disfrazados'],
    glossary: { 'Validador': 'Nodo que verifica transacciones y produce bloques en PoS', 'Slashing': 'Penalización por comportamiento malicioso de un validador', 'APY': 'Annual Percentage Yield — rendimiento anualizado', 'Epoch': 'Periodo de tiempo fijo en el que se distribuyen recompensas', 'Staking líquido': 'Staking que emite un token derivado manteniendo la liquidez' }
  },
  {
    slug: 'liquidity-pools',
    title: 'Liquidity Pools',
    level: 2,
    readTime: 9,
    simpleExplanation: 'Un liquidity pool (fondo de liquidez) es un conjunto de criptomonedas depositadas en un smart contract que permite realizar intercambios (swaps) en exchanges descentralizados. Los usuarios que aportan liquidez reciben comisiones por cada operación realizada. Es el mecanismo que hace posible el trading descentralizado.',
    detailedExplanation: `## Cómo funcionan

En un exchange tradicional, compradores y vendedores colocan órdenes. En un DEX con AMM, los liquidity pools reemplazan el libro de órdenes:

1. Los proveedores de liquidez (LPs) depositan pares de tokens (ej: ETH + USDC) en proporciones iguales
2. Un algoritmo (generalmente x * y = k) determina el precio automáticamente
3. Los traders intercambian tokens directamente contra el pool
4. Los LPs reciben comisiones proporcionales a su aportación

## Impermanent Loss

El principal riesgo para los LPs. Ocurre cuando el precio relativo de los tokens cambia desde el momento del depósito. Si un token sube mucho, habrías ganado más manteniéndolo sin depositar en el pool. La pérdida es "impermanente" porque se revierte si los precios vuelven al punto original.

## Tipos de pools

- **Pools estándar (50/50):** Uniswap V2 style
- **Pools concentrados:** Uniswap V3 — liquidez en rangos de precio específicos (mayor eficiencia, mayor complejidad)
- **Pools estables:** Curve — optimizados para activos de valor similar (USDC/USDT)
- **Pools ponderados:** Balancer — proporciones flexibles`,
    practicalExamples: ['Depositar ETH y USDC en Uniswap V3 en un rango de precio específico', 'Aportar liquidez en un pool USDC/USDT en Curve para bajo riesgo de impermanent loss', 'Depositar en un pool y farmear tokens adicionales de gobernanza como incentivo'],
    relatedConcepts: ['defi', 'smart-contracts', 'staking', 'gas', 'ethereum'],
    advantages: ['Generación de ingresos pasivos por comisiones de trading', 'Permiten el trading descentralizado sin intermediarios', 'Accesibles sin requisitos mínimos significativos', 'Composabilidad con otros protocolos DeFi'],
    risks: ['Impermanent loss cuando los precios divergen', 'Smart contract risk (hacks, exploits)', 'Slippage alto en pools de baja liquidez', 'Complejidad creciente con pools concentrados'],
    commonMistakes: ['No calcular el impermanent loss antes de aportar liquidez', 'Depositar en pools de tokens muy volátiles sin entender los riesgos', 'No monitorear la posición regularmente', 'Ignorar las comisiones de gas al entrar/salir del pool'],
    glossary: { 'LP': 'Liquidity Provider — persona que deposita fondos en un pool', 'AMM': 'Automated Market Maker — algoritmo de pricing', 'Impermanent Loss': 'Pérdida relativa por la divergencia de precios en un pool', 'Slippage': 'Diferencia entre el precio esperado y el ejecutado', 'LP Token': 'Token que representa tu proporción en el pool de liquidez' }
  },
  {
    slug: 'smart-contracts',
    title: 'Smart Contracts',
    level: 2,
    readTime: 8,
    simpleExplanation: 'Un smart contract (contrato inteligente) es un programa almacenado en la blockchain que se ejecuta automáticamente cuando se cumplen condiciones predefinidas. Funciona como un acuerdo digital que no necesita intermediarios: "si ocurre X, entonces haz Y". Son la base de DeFi, NFTs y las aplicaciones descentralizadas.',
    detailedExplanation: `## Cómo funcionan

1. Un desarrollador escribe el código del contrato (generalmente en Solidity para Ethereum)
2. El contrato se despliega en la blockchain (se le asigna una dirección)
3. Cualquiera puede interactuar con él enviando transacciones
4. Cuando se cumplen las condiciones, el contrato ejecuta las acciones programadas
5. El resultado es inmutable y verificable por todos

## Lenguajes de programación

- **Solidity:** el más usado (Ethereum, Polygon, BSC, Arbitrum)
- **Rust:** usado en Solana y Near
- **Move:** usado en Aptos y Sui
- **Vyper:** alternativa a Solidity para Ethereum

## Auditorías de seguridad

Antes de depositar fondos en un protocolo DeFi, es fundamental verificar si sus smart contracts han sido auditados. Firmas como Certik, Trail of Bits, OpenZeppelin o Consensys Diligence revisan el código en busca de vulnerabilidades.

## Limitaciones

Los smart contracts solo pueden acceder a datos dentro de la blockchain. Para obtener datos del mundo exterior (precios, clima, resultados) necesitan **oráculos** como Chainlink.`,
    practicalExamples: ['Un préstamo DeFi que liquida automáticamente tu colateral si cae por debajo del umbral', 'Un DEX que intercambia tokens instantáneamente según la fórmula del AMM', 'Un contrato de vesting que libera tokens de un equipo gradualmente'],
    relatedConcepts: ['ethereum', 'defi', 'gas', 'oraculos', 'layer-1'],
    advantages: ['Eliminación de intermediarios y confianza en terceros', 'Ejecución automática e inmutable', 'Transparencia: cualquiera puede auditar el código', 'Composabilidad entre contratos'],
    risks: ['Bugs en el código pueden provocar pérdidas millonarias', 'Una vez desplegados son difíciles de modificar', 'Ataques de reentrancy, flash loans y otros exploits', 'Complejidad técnica elevada'],
    commonMistakes: ['Interactuar con contratos no auditados', 'No leer lo que firmas al aprobar transacciones', 'Dar aprobaciones ilimitadas de tokens a contratos desconocidos', 'Asumir que "auditoría" significa "sin riesgo"'],
    glossary: { 'Solidity': 'Lenguaje de programación principal para smart contracts en Ethereum', 'Deploy': 'Proceso de publicar un smart contract en la blockchain', 'ABI': 'Application Binary Interface — interfaz para interactuar con un contrato', 'Proxy': 'Patrón que permite actualizar la lógica de un smart contract', 'Exploit': 'Ataque que aprovecha una vulnerabilidad en un smart contract' }
  },
  {
    slug: 'gas',
    title: 'Gas: Comisiones en Blockchain',
    level: 2,
    readTime: 7,
    simpleExplanation: 'Gas es la unidad que mide el coste computacional de ejecutar operaciones en una blockchain como Ethereum. Cada transacción, intercambio de tokens o interacción con un smart contract requiere pagar gas en la criptomoneda nativa de la red. El precio del gas varía según la congestión.',
    detailedExplanation: `## Cómo funciona el gas en Ethereum

El coste total = **Gas units × Gas price (Gwei)**

- **Gas units:** cantidad de trabajo computacional (una transferencia simple: ~21.000 gas; un swap en Uniswap: ~150.000-300.000 gas)
- **Gas price (Gwei):** precio por unidad de gas. 1 Gwei = 0,000000001 ETH

## EIP-1559 (desde agosto 2021)

Ethereum introdujo un nuevo modelo de comisiones:
- **Base fee:** tarifa base que se ajusta automáticamente y se quema
- **Priority fee (tip):** propina opcional al validador para prioridad

## Cómo reducir costes

1. **Operar en horas de baja congestión** (madrugada/fin de semana en horario EE.UU.)
2. **Usar Layer 2:** Arbitrum, Optimism, Base tienen gas 10-100x más barato
3. **Agrupar operaciones:** algunos protocolos permiten batch transactions
4. **Ajustar el gas manualmente** en tu wallet para transacciones no urgentes

## Gas en otras blockchains

- **Solana:** comisiones extremadamente bajas (~$0,001)
- **BNB Chain:** gas moderado, pagado en BNB
- **Polygon PoS:** gas muy bajo, pagado en MATIC
- **Avalanche:** gas moderado, pagado en AVAX`,
    practicalExamples: ['Comprobar el precio del gas en etherscan.io/gastracker antes de hacer un swap', 'Enviar una transacción en Ethereum usando un gas price personalizado para ahorrar', 'Mover operaciones a Arbitrum o Base para pagar céntimos en lugar de dólares'],
    relatedConcepts: ['ethereum', 'smart-contracts', 'layer-2', 'defi', 'layer-1'],
    advantages: ['Protege la red contra spam y ataques de denegación de servicio', 'EIP-1559 quema ETH, contribuyendo a la deflación', 'Incentiva a los validadores a mantener la red', 'Las Layer 2 han reducido drásticamente el coste para usuarios'],
    risks: ['Costes impredecibles en momentos de alta congestión', 'Una transacción puede fallar y aun así consumir gas', 'Gas elevado puede hacer inviables operaciones pequeñas en Ethereum L1', 'Configurar gas demasiado bajo puede dejar la transacción pendiente indefinidamente'],
    commonMistakes: ['No comprobar el precio del gas antes de firmar una transacción', 'Hacer múltiples transacciones pequeñas en mainnet en vez de usar L2', 'Establecer un gas limit demasiado bajo y que la transacción falle', 'No considerar el gas como coste real al calcular la rentabilidad de una operación DeFi'],
    glossary: { 'Gwei': 'Unidad de gas (1 Gwei = 0.000000001 ETH)', 'Base fee': 'Tarifa base que se quema en cada bloque (EIP-1559)', 'Priority fee': 'Propina al validador para priorizar la transacción', 'Gas limit': 'Máximo de gas que estás dispuesto a pagar por una transacción', 'Gas tracker': 'Herramienta que muestra el precio actual del gas en la red' }
  },
  {
    slug: 'layer-1',
    title: 'Layer 1: Blockchains Base',
    level: 2,
    readTime: 8,
    simpleExplanation: 'Layer 1 (L1) se refiere a la blockchain principal o base, como Bitcoin, Ethereum, Solana o Avalanche. Es la capa fundamental que procesa y registra las transacciones directamente en su propia red. Cada L1 tiene su propio mecanismo de consenso, criptomoneda nativa y características técnicas.',
    detailedExplanation: `## Principales Layer 1

### Ethereum (ETH)
El ecosistema más grande. Proof of Stake, EVM-compatible, base de DeFi y NFTs. Desafío principal: escalabilidad.

### Solana (SOL)
Alta velocidad (~400ms por bloque), comisiones mínimas, Proof of History + PoS. Popular para memecoins y DeFi rápido. Ha sufrido paradas de red.

### Avalanche (AVAX)
Arquitectura de subredes personalizables. Compatibilidad EVM. Rápido tiempo de finalidad (~2 segundos).

### Cardano (ADA)
Enfoque académico y peer-reviewed. Lenguaje Haskell. Desarrollo más lento pero riguroso.

### BNB Chain (BNB)
Creada por Binance. EVM-compatible, comisiones bajas, más centralizada que otras.

## El trilema de la blockchain

Vitalik Buterin planteó que es difícil optimizar simultáneamente: **Seguridad**, **Descentralización** y **Escalabilidad**. Cada L1 hace compromisos diferentes entre estos tres pilares.

## Competencia y coexistencia

No hay un "ganador" claro. Diferentes L1 pueden coexistir sirviendo diferentes casos de uso, conectadas por bridges y protocolos de interoperabilidad.`,
    practicalExamples: ['Usar Ethereum para operaciones DeFi de alto valor que requieren máxima seguridad', 'Operar en Solana para transacciones rápidas y baratas', 'Explorar el ecosistema de Avalanche mediante subredes especializadas'],
    relatedConcepts: ['blockchain', 'layer-2', 'ethereum', 'gas', 'bridges'],
    advantages: ['Máxima seguridad y descentralización (en las redes consolidadas)', 'Soberanía total de la red', 'Base para construir cualquier aplicación descentralizada', 'Cada L1 ofrece innovaciones técnicas diferentes'],
    risks: ['Escalabilidad limitada sin soluciones Layer 2', 'Ecosistemas fragmentados entre diferentes L1', 'Riesgo de centralización en L1 con pocos validadores', 'Competencia intensa que puede hacer obsoleta una L1'],
    commonMistakes: ['Enviar tokens a la red equivocada (ej: enviar ETH por BSC a una dirección Ethereum)', 'Asumir que la L1 más rápida es la mejor', 'No considerar la descentralización al evaluar una blockchain', 'Invertir en una L1 solo por su velocidad sin evaluar su ecosistema real'],
    glossary: { 'TPS': 'Transactions Per Second — transacciones por segundo', 'Finalidad': 'Tiempo hasta que una transacción es irreversible', 'EVM': 'Ethereum Virtual Machine — estándar de compatibilidad', 'Trilema': 'Compromiso entre seguridad, descentralización y escalabilidad', 'Subred': 'Blockchain independiente dentro de un ecosistema (Avalanche)' }
  },
  {
    slug: 'layer-2',
    title: 'Layer 2: Escalabilidad',
    level: 2,
    readTime: 9,
    simpleExplanation: 'Las Layer 2 (L2) son soluciones construidas sobre una blockchain Layer 1 (como Ethereum) que procesan transacciones fuera de la cadena principal para aumentar la velocidad y reducir las comisiones, heredando la seguridad de la L1. Ejemplos: Arbitrum, Optimism, Base y zkSync.',
    detailedExplanation: `## Por qué existen las L2

Ethereum puede procesar ~15-30 transacciones por segundo (TPS). Esto es insuficiente para millones de usuarios. Las L2 procesan transacciones fuera de la cadena principal y publican los resultados comprimidos en Ethereum, multiplicando la capacidad sin sacrificar seguridad.

## Tipos de Layer 2

### Optimistic Rollups
Asumen que las transacciones son válidas y permiten disputas durante un periodo de desafío (~7 días). Ejemplos: **Arbitrum, Optimism, Base.**

### ZK-Rollups
Usan pruebas criptográficas (zero-knowledge proofs) para verificar transacciones sin revelar datos. Más rápidos en finalidad. Ejemplos: **zkSync, StarkNet, Scroll.**

### Sidechains
Cadenas independientes con sus propios validadores. Menor seguridad heredada. Ejemplo: Polygon PoS.

## Comparativa

| L2 | Tipo | Gas aprox. | Ecosistema |
|----|------|-----------|------------|
| Arbitrum | Optimistic | ~$0.01-0.10 | Más TVL en L2 |
| Base | Optimistic | ~$0.001-0.01 | Ecosistema Coinbase |
| Optimism | Optimistic | ~$0.01-0.10 | Superchain |
| zkSync | ZK-Rollup | ~$0.01-0.05 | Creciendo |

## Cómo usar una L2

1. Añade la red L2 a tu wallet (MetaMask u otra)
2. Transfiere fondos desde Ethereum usando un bridge oficial
3. Opera en la L2 con comisiones mínimas
4. Cuando quieras, retira fondos de vuelta a L1`,
    practicalExamples: ['Bridgear ETH a Arbitrum para operar en DeFi con comisiones de céntimos', 'Usar Base para intercambiar tokens con transacciones casi gratuitas', 'Desplegar un smart contract en zkSync con costes mínimos'],
    relatedConcepts: ['ethereum', 'gas', 'layer-1', 'bridges', 'rollups', 'zk-rollups'],
    advantages: ['Comisiones 10-100x menores que Ethereum L1', 'Mayor velocidad de transacción', 'Heredan la seguridad de Ethereum', 'Ecosistemas DeFi propios crecientes'],
    risks: ['Periodo de retiro largo en Optimistic Rollups (~7 días)', 'Menor descentralización de los secuenciadores', 'Complejidad adicional con bridges y múltiples redes', 'Tecnología aún en maduración'],
    commonMistakes: ['Confundir L2 con sidechains (diferente modelo de seguridad)', 'No usar bridges oficiales y arriesgar fondos', 'Ignorar las L2 y pagar gas excesivo en Ethereum L1', 'No verificar que la dApp que quieres usar está disponible en tu L2'],
    glossary: { 'Rollup': 'Tecnología que agrupa transacciones y publica resúmenes en L1', 'Secuenciador': 'Nodo que ordena las transacciones en una L2', 'Bridge': 'Protocolo para transferir fondos entre L1 y L2', 'Prueba de fraude': 'Mecanismo de verificación en Optimistic Rollups', 'ZK-Proof': 'Prueba criptográfica que verifica sin revelar los datos' }
  },
  {
    slug: 'bridges',
    title: 'Bridges: Puentes entre Blockchains',
    level: 2,
    readTime: 7,
    simpleExplanation: 'Un bridge (puente) es un protocolo que permite transferir activos y datos entre diferentes blockchains. Por ejemplo, mover ETH de Ethereum a Arbitrum, o enviar USDC de Ethereum a Solana. Son esenciales para la interoperabilidad del ecosistema cripto, pero también representan uno de sus mayores vectores de ataque.',
    detailedExplanation: `## Cómo funcionan

El mecanismo general:
1. Depositas tokens en un smart contract en la cadena de origen
2. El bridge verifica el depósito
3. Se acuñan tokens equivalentes ("wrapped") en la cadena de destino
4. Para volver, quemas los wrapped tokens y se liberan los originales

## Tipos de bridges

- **Bridges oficiales:** operados por las propias L2 (Arbitrum Bridge, Optimism Gateway). Más seguros pero pueden ser lentos.
- **Bridges de terceros:** Stargate, Across, Hop Protocol. Más rápidos, mayor riesgo.
- **Bridges nativos:** integrados en protocolos como LayerZero o Wormhole.

## Seguridad

Los bridges han sido el objetivo de los hackeos más grandes en la historia de DeFi:
- Ronin Bridge: $625M (2022)
- Wormhole: $326M (2022)
- Nomad: $190M (2022)

## Precauciones

1. Usa siempre los bridges oficiales cuando sea posible
2. Empieza con cantidades pequeñas para probar
3. Verifica las direcciones y redes antes de confirmar
4. Investiga el historial de seguridad del bridge`,
    practicalExamples: ['Usar el bridge oficial de Arbitrum para mover ETH desde Ethereum', 'Transferir USDC de Ethereum a Solana usando un bridge de terceros', 'Bridgear fondos a Base desde Coinbase directamente'],
    relatedConcepts: ['layer-2', 'ethereum', 'layer-1', 'smart-contracts', 'defi'],
    advantages: ['Permiten mover fondos entre diferentes ecosistemas', 'Habilitan la interoperabilidad entre blockchains', 'Acceso a oportunidades DeFi en múltiples redes', 'Bridges oficiales de L2 heredan seguridad de Ethereum'],
    risks: ['Historial de hackeos multimillonarios', 'Smart contract risk amplificado', 'Fondos en tránsito pueden quedar bloqueados', 'Wrapped tokens dependen del bridge que los emitió'],
    commonMistakes: ['Usar bridges no verificados por buscar comisiones más bajas', 'No verificar que el token recibido es el correcto en la cadena destino', 'Enviar grandes cantidades sin probar primero con poco', 'No tener en cuenta los tiempos de espera (especialmente en Optimistic Rollups)'],
    glossary: { 'Wrapped token': 'Token que representa un activo de otra blockchain', 'Interoperabilidad': 'Capacidad de diferentes blockchains para comunicarse', 'Lock and mint': 'Mecanismo de bloquear en origen y acuñar en destino', 'Burn and release': 'Quemar en destino y liberar en origen' }
  },
  {
    slug: 'oraculos',
    title: 'Oráculos Blockchain',
    level: 2,
    readTime: 7,
    simpleExplanation: 'Los oráculos son servicios que conectan las blockchains con datos del mundo exterior. Los smart contracts no pueden acceder a información fuera de la blockchain por sí mismos, así que necesitan oráculos para obtener datos como precios de activos, resultados deportivos, datos meteorológicos o cualquier información off-chain.',
    detailedExplanation: `## El problema del oráculo

Las blockchains son sistemas cerrados: un smart contract solo puede acceder a datos que existen dentro de la blockchain. Pero la mayoría de aplicaciones útiles necesitan datos externos: precios de mercado, tipos de cambio, temperatura, resultados de eventos...

Los oráculos resuelven este problema siendo el puente entre el mundo on-chain y off-chain.

## Chainlink: el estándar

Chainlink (LINK) es la red de oráculos más utilizada. Funciona con una red descentralizada de nodos que obtienen datos de múltiples fuentes, los agregan y los publican en la blockchain. Esto minimiza el riesgo de manipulación.

## Tipos de oráculos

- **De precio:** proporcionan precios de activos (fundamental para DeFi)
- **De aleatoriedad:** generan números aleatorios verificables (VRF)
- **De computación:** ejecutan cálculos complejos off-chain
- **Cross-chain:** verifican datos entre diferentes blockchains

## Por qué son críticos

Un oráculo comprometido puede provocar liquidaciones incorrectas, robos o manipulación de mercados DeFi. La descentralización y la redundancia de fuentes son esenciales.`,
    practicalExamples: ['Aave usa oráculos Chainlink para obtener precios y calcular cuándo liquidar posiciones', 'Un protocolo de seguros usa oráculos para verificar automáticamente eventos climáticos', 'Un mercado de predicciones usa oráculos para resolver apuestas basadas en resultados reales'],
    relatedConcepts: ['smart-contracts', 'defi', 'ethereum', 'layer-1', 'tokenomics'],
    advantages: ['Conectan la blockchain con datos del mundo real', 'Habilitan casos de uso complejos en DeFi y más allá', 'Las redes descentralizadas de oráculos minimizan la manipulación', 'VRF permite aleatoriedad verificable en blockchain'],
    risks: ['Un oráculo manipulado puede causar pérdidas masivas', 'Dependencia de fuentes externas de datos', 'Latencia: datos ligeramente retrasados vs tiempo real', 'Coste adicional para mantener feeds de precios actualizados'],
    commonMistakes: ['Usar un solo oráculo centralizado en vez de una red descentralizada', 'No verificar qué oráculo usa un protocolo DeFi antes de depositar', 'Confundir la fiabilidad del oráculo con la fiabilidad del dato fuente'],
    glossary: { 'Price feed': 'Flujo continuo de datos de precio proporcionado por oráculos', 'VRF': 'Verifiable Random Function — generación de aleatoriedad verificable', 'Off-chain': 'Datos o computaciones que existen fuera de la blockchain', 'Nodo oráculo': 'Servidor que obtiene datos externos y los publica en la blockchain', 'Data feed': 'Servicio de datos continuos proporcionado por una red de oráculos' }
  },
  {
    slug: 'tokenomics',
    title: 'Tokenomics',
    level: 2,
    readTime: 9,
    simpleExplanation: 'Tokenomics es el estudio del modelo económico de un token o criptomoneda. Incluye: cómo se crea, distribuye, usa y destruye. Entender la tokenomics de un proyecto es fundamental para evaluar si un token tiene potencial de apreciación o si su diseño favorece la dilución y la caída de precio.',
    detailedExplanation: `## Elementos clave

### Oferta (Supply)
- **Max supply:** oferta máxima que existirá (Bitcoin: 21M, muchos tokens: ilimitada)
- **Circulating supply:** tokens actualmente en circulación
- **Total supply:** tokens creados menos los quemados

### Distribución
¿Cómo se reparten los tokens?
- Equipo y fundadores (generalmente con vesting/bloqueo)
- Inversores (seed, private sale)
- Comunidad (airdrops, rewards)
- Tesorería/DAO
- Minería/Staking

### Mecanismos de emisión
- **Inflacionario:** se crean nuevos tokens continuamente (incentivos de staking)
- **Deflacionario:** se queman tokens (EIP-1559 de Ethereum, burns de BNB)
- **Fijo:** oferta máxima definida (Bitcoin)

### Utilidad del token
¿Para qué sirve? Gobernanza, acceso a servicios, pago de comisiones, staking, colateral...

## Red Flags en tokenomics

- Equipo con >30% de tokens sin vesting largo
- Desbloqueos masivos ("token unlocks") próximos
- Sin utilidad real más allá de especulación
- Emisión infinita sin mecanismo de quema
- Concentración excesiva en pocas wallets

## Herramientas de análisis

- Token Terminal, Messari, DefiLlama para métricas
- Etherscan/Solscan para distribución de holders
- Calendario de unlocks en TokenUnlocks.app`,
    practicalExamples: ['Verificar el calendario de desbloqueo de tokens antes de invertir en un proyecto nuevo', 'Comparar la relación market cap / fully diluted valuation (FDV) para detectar tokens sobre-valorados', 'Analizar si un token tiene presión vendedora por emisión excesiva'],
    relatedConcepts: ['altcoin', 'defi', 'staking', 'smart-contracts', 'ethereum'],
    advantages: ['Permite evaluar el potencial real de un proyecto', 'Identificar tokens con buen diseño económico', 'Anticipar presión vendedora por unlocks o emisión', 'Entender los incentivos de cada participante'],
    risks: ['Tokenomics atractivas no garantizan éxito del proyecto', 'Los equipos pueden cambiar las reglas (si el contrato lo permite)', 'La emisión puede diluir el valor de los holders existentes', 'Datos de distribución pueden ser opacos'],
    commonMistakes: ['Invertir sin leer la tokenomics del proyecto', 'Ignorar los calendarios de desbloqueo de tokens', 'Fijarse solo en el precio unitario sin considerar la oferta total', 'Confundir market cap con fully diluted valuation'],
    glossary: { 'Vesting': 'Periodo de bloqueo gradual de tokens para equipos e inversores', 'Token unlock': 'Momento en que tokens bloqueados se liberan al mercado', 'FDV': 'Fully Diluted Valuation — valoración si todos los tokens estuvieran en circulación', 'Burn': 'Destrucción permanente de tokens para reducir la oferta', 'Gobernanza': 'Derecho a votar en las decisiones de un protocolo' }
  },
  // ===== NIVEL 3 — AVANZADO =====
  {
    slug: 'mev',
    title: 'MEV: Valor Extraíble Máximo',
    level: 3,
    readTime: 10,
    simpleExplanation: 'MEV (Maximal Extractable Value) es el beneficio que validadores, constructores de bloques o bots pueden obtener reordenando, incluyendo o excluyendo transacciones dentro de un bloque. Es un fenómeno inherente a las blockchains que afecta a los usuarios ordinarios a través de front-running, sandwich attacks y otras formas de extracción de valor.',
    detailedExplanation: `## Cómo funciona

Cuando envías una transacción, esta va al mempool (sala de espera). Los bots de MEV analizan las transacciones pendientes y ejecutan estrategias como:

### Front-running
Ver tu orden de compra grande y comprar antes que tú para vender justo después a un precio mayor.

### Sandwich attacks
Colocar una transacción antes y después de la tuya para extraer valor del slippage.

### Arbitraje
Detectar diferencias de precio entre DEX y ejecutar operaciones instantáneas para capturar la diferencia.

### Liquidaciones
Detectar posiciones a punto de ser liquidadas y ejecutar la liquidación para obtener la recompensa.

## Impacto en usuarios

El MEV actúa como un "impuesto invisible" sobre los usuarios de DeFi. Puede aumentar el slippage, empeorar los precios de ejecución y encarecer las transacciones.

## Soluciones

- **Flashbots Protect:** envía transacciones directamente a constructores de bloques, evitando el mempool público
- **MEV-Share:** redistribuye parte del MEV capturado a los usuarios afectados
- **Order flow auctions:** los usuarios subastan sus transacciones para obtener mejor ejecución
- **Diseño de protocolos resistentes:** algunos DEX implementan protecciones anti-MEV`,
    practicalExamples: ['Usar Flashbots Protect RPC en MetaMask para proteger tus swaps del front-running', 'Un bot de arbitraje detecta que ETH cuesta $3.000 en Uniswap y $3.010 en SushiSwap y ejecuta compra-venta instantánea', 'Un sandwich bot detecta tu compra de 10 ETH, compra antes, te vende más caro, y captura la diferencia'],
    relatedConcepts: ['defi', 'smart-contracts', 'gas', 'ethereum', 'layer-2'],
    advantages: ['El arbitraje MEV ayuda a igualar precios entre DEX', 'Las liquidaciones MEV mantienen la solvencia de protocolos de préstamo', 'El ecosistema MEV impulsa la investigación en diseño de protocolos', 'Soluciones como MEV-Share pueden devolver valor a los usuarios'],
    risks: ['Impuesto invisible que empeora la ejecución de trades', 'Centralización de la construcción de bloques', 'Complejidad técnica para protegerse', 'Sandwich attacks y front-running perjudican a traders ordinarios'],
    commonMistakes: ['Hacer swaps grandes sin protección anti-MEV', 'Usar slippage tolerance demasiado alto', 'No conocer herramientas como Flashbots Protect', 'Ignorar el MEV como factor al evaluar costes de trading'],
    glossary: { 'Mempool': 'Cola de transacciones pendientes de ser incluidas en un bloque', 'Front-running': 'Ejecutar una transacción antes que otra para beneficiarse', 'Sandwich attack': 'Colocar transacciones antes y después de la víctima', 'Flashbots': 'Organización que desarrolla infraestructura para MEV transparente', 'Block builder': 'Entidad que construye bloques optimizando la inclusión de transacciones' }
  },
  {
    slug: 'restaking',
    title: 'Restaking',
    level: 3,
    readTime: 8,
    simpleExplanation: 'Restaking es el concepto de reutilizar ETH ya stakeado (o tokens de staking líquido como stETH) para asegurar simultáneamente otros protocolos y redes, obteniendo rendimientos adicionales. EigenLayer es el protocolo pionero de esta categoría, y ha creado un ecosistema completamente nuevo sobre Ethereum.',
    detailedExplanation: `## El concepto

La seguridad de Ethereum se basa en ETH stakeado por validadores (~$50B+). Restaking permite "alquilar" esta seguridad a otros protocolos (AVS — Actively Validated Services) que de otro modo tendrían que construir su propia red de validadores.

## EigenLayer

Protocolo líder en restaking. Los usuarios depositan ETH o tokens de staking líquido (stETH, rETH) en EigenLayer, que redistribuye esta seguridad a múltiples servicios simultáneamente.

### Liquid Restaking Tokens (LRT)
Similares al staking líquido, protocolos como EtherFi (eETH), Renzo (ezETH) o Puffer (pufETH) emiten tokens que representan posiciones de restaking, permitiendo mantener liquidez.

## Rendimiento

Restaking ofrece rendimientos adicionales sobre el staking regular: staking base (~3-4%) + rewards de AVS. Sin embargo, los rendimientos adicionales dependen de la demanda de servicios y no están garantizados.

## Riesgos adicionales

Al hacer restaking aceptas condiciones de slashing adicionales: no solo del protocolo de staking base, sino también de cada AVS al que estés proporcionando seguridad. Más rendimiento = más capas de riesgo.`,
    practicalExamples: ['Depositar stETH en EigenLayer para ganar rewards adicionales de AVS', 'Usar EtherFi para obtener un token de restaking líquido (eETH) que puedes usar en DeFi', 'Un nuevo protocolo alquila seguridad de Ethereum a través de EigenLayer en lugar de construir su propia red'],
    relatedConcepts: ['staking', 'ethereum', 'defi', 'layer-1', 'smart-contracts'],
    advantages: ['Rendimientos adicionales sobre staking regular', 'Mejora la seguridad de protocolos emergentes', 'Tokens de restaking líquido mantienen la liquidez', 'Extiende la seguridad de Ethereum a nuevos servicios'],
    risks: ['Múltiples capas de slashing', 'Smart contract risk compuesto (staking + restaking + LRT)', 'Rendimientos adicionales no garantizados', 'Complejidad elevada para evaluar todos los riesgos'],
    commonMistakes: ['Buscar máximo rendimiento sin entender las capas de riesgo', 'No investigar a qué AVS estás exponiendo tu capital', 'Confundir tokens de restaking líquido entre sí', 'Asumir que restaking es simplemente "más staking"'],
    glossary: { 'AVS': 'Actively Validated Service — protocolo que consume seguridad restakeada', 'LRT': 'Liquid Restaking Token — token que representa una posición de restaking', 'EigenLayer': 'Protocolo pionero de restaking en Ethereum', 'Slashing': 'Penalización por comportamiento malicioso de un validador' }
  },
  {
    slug: 'rollups',
    title: 'Rollups',
    level: 3,
    readTime: 8,
    simpleExplanation: 'Los rollups son la principal tecnología de escalabilidad para Ethereum. Ejecutan transacciones fuera de la cadena principal, las agrupan en lotes y publican un resumen comprimido en Ethereum L1. Esto permite procesar miles de transacciones al coste de una sola transacción en L1, heredando la seguridad de Ethereum.',
    detailedExplanation: `## Tipos principales

### Optimistic Rollups
Asumen que las transacciones son válidas por defecto. Cualquiera puede presentar una "prueba de fraude" durante un periodo de desafío (~7 días) para disputar transacciones inválidas. Si nadie disputa, las transacciones se finalizan.
- **Proyectos:** Arbitrum, Optimism, Base
- **Ventaja:** compatibilidad total con EVM
- **Desventaja:** periodo de retiro largo (~7 días)

### ZK-Rollups
Generan pruebas criptográficas (zero-knowledge proofs) que verifican matemáticamente la validez de todas las transacciones. No requieren periodo de desafío.
- **Proyectos:** zkSync, StarkNet, Scroll, Linea
- **Ventaja:** finalidad más rápida, mayor seguridad teórica
- **Desventaja:** mayor complejidad técnica, compatibilidad EVM variable

## Funcionamiento técnico

1. Los usuarios envían transacciones al secuenciador de la L2
2. El secuenciador las ordena y ejecuta
3. Las transacciones se agrupan en lotes (batches)
4. Los datos comprimidos se publican en Ethereum L1
5. Se genera una prueba (de fraude o ZK) para verificar la validez

## El futuro: rollup-centric roadmap

La hoja de ruta de Ethereum se centra en que la L1 sirva como capa de seguridad y disponibilidad de datos, mientras los rollups manejan la ejecución. Proto-danksharding (EIP-4844) ya redujo drásticamente los costes de publicar datos en L1.`,
    practicalExamples: ['Operar en Arbitrum con comisiones de céntimos heredando la seguridad de Ethereum', 'Bridgear ETH a zkSync para experimentar con ZK-rollups', 'Un protocolo DeFi se despliega en Optimism para ofrecer comisiones bajas a sus usuarios'],
    relatedConcepts: ['layer-2', 'zk-rollups', 'ethereum', 'gas', 'bridges'],
    advantages: ['Escalabilidad masiva manteniendo seguridad de Ethereum', 'Reducción drástica de comisiones', 'Compatibilidad con herramientas existentes de Ethereum', 'Proto-danksharding (EIP-4844) ha reducido aún más los costes'],
    risks: ['Centralización de secuenciadores (punto único de fallo temporal)', 'Periodo de retiro largo en Optimistic Rollups', 'Tecnología ZK aún en maduración', 'Fragmentación de liquidez entre múltiples rollups'],
    commonMistakes: ['No distinguir entre Optimistic y ZK rollups', 'Asumir que todos los rollups tienen el mismo nivel de madurez', 'Ignorar el riesgo de centralización del secuenciador', 'No verificar si un rollup tiene pruebas de fraude activas'],
    glossary: { 'Secuenciador': 'Nodo que ordena y ejecuta transacciones en el rollup', 'Prueba de fraude': 'Mecanismo de disputa en Optimistic Rollups', 'ZK-Proof': 'Prueba criptográfica de validez en ZK-Rollups', 'Batch': 'Lote de transacciones publicado en L1', 'EIP-4844': 'Proto-danksharding — mejora que reduce costes de datos en L1' }
  },
  {
    slug: 'zk-rollups',
    title: 'ZK-Rollups',
    level: 3,
    readTime: 9,
    simpleExplanation: 'Los ZK-Rollups (Zero-Knowledge Rollups) son una tecnología de escalabilidad que usa pruebas criptográficas para verificar la validez de transacciones sin revelar sus detalles. Son considerados por muchos como el futuro de la escalabilidad blockchain por su mayor seguridad teórica y finalidad más rápida comparados con Optimistic Rollups.',
    detailedExplanation: `## Zero-Knowledge Proofs

Una prueba zero-knowledge permite demostrar que algo es verdadero sin revelar la información subyacente. Analogía: demostrar que conoces la contraseña de una caja fuerte sin decir cuál es.

## Tipos de ZK-Proofs

### ZK-SNARKs
- Pruebas pequeñas y rápidas de verificar
- Requieren trusted setup inicial
- Usados por zkSync, Scroll

### ZK-STARKs
- No requieren trusted setup
- Pruebas más grandes pero más transparentes
- Mayor resistencia a ataques cuánticos
- Usados por StarkNet

## Principales proyectos

- **zkSync Era:** EVM-compatible, compilador de Solidity a ZK
- **StarkNet:** lenguaje propio (Cairo), alto rendimiento
- **Scroll:** máxima compatibilidad EVM
- **Polygon zkEVM:** de los creadores de Polygon
- **Linea:** desarrollado por ConsenSys

## Desafíos actuales

- Generar ZK-proofs es computacionalmente intensivo
- Compatibilidad total con EVM (zkEVM) es compleja
- Menor madurez que Optimistic Rollups
- Ecosistemas DeFi más pequeños (pero creciendo rápidamente)

## Por qué importan

Vitalik Buterin ha declarado que a largo plazo los ZK-Rollups ofrecerán mejor seguridad y experiencia de usuario. La finalidad rápida (minutos vs 7 días) es una ventaja fundamental para bridges y retiradas.`,
    practicalExamples: ['Enviar ETH a zkSync Era y operar con comisiones mínimas', 'Desarrollar aplicaciones en StarkNet usando el lenguaje Cairo', 'Verificar la validez de miles de transacciones con una sola prueba ZK en Ethereum'],
    relatedConcepts: ['rollups', 'layer-2', 'ethereum', 'bridges', 'modular-blockchains'],
    advantages: ['Seguridad matemática: validez verificada criptográficamente', 'Finalidad más rápida que Optimistic Rollups', 'Potencial de privacidad (no revelan datos de transacciones)', 'Escalabilidad teórica superior a largo plazo'],
    risks: ['Tecnología compleja aún en maduración', 'Compatibilidad EVM no siempre perfecta', 'Centralización de provers (generadores de pruebas)', 'Ecosistemas más pequeños que Optimistic Rollups'],
    commonMistakes: ['Asumir que ZK-Rollups son automáticamente "mejores" que Optimistic', 'Confundir ZK-SNARKs con ZK-STARKs', 'Esperar privacidad total cuando la mayoría de implementaciones son transparentes', 'No verificar el nivel de descentralización del prover'],
    glossary: { 'ZK-SNARK': 'Succinct Non-interactive Argument of Knowledge', 'ZK-STARK': 'Scalable Transparent Argument of Knowledge', 'Prover': 'Entidad que genera las pruebas criptográficas', 'Verifier': 'Smart contract en L1 que verifica las pruebas', 'Trusted setup': 'Ceremonia inicial requerida por ZK-SNARKs' }
  },
  {
    slug: 'account-abstraction',
    title: 'Account Abstraction',
    level: 3,
    readTime: 8,
    simpleExplanation: 'Account Abstraction (AA) es una mejora que permite que las cuentas de blockchain funcionen como smart contracts programables. En vez de las wallets tradicionales con seed phrases, AA permite crear cuentas con recuperación social, pagos de gas por terceros, transacciones automáticas y experiencia de usuario similar a la web tradicional.',
    detailedExplanation: `## El problema actual

Las wallets tradicionales (EOA — Externally Owned Accounts) tienen limitaciones: requieren seed phrase, el usuario debe pagar gas en la moneda nativa, una clave perdida significa fondos perdidos, y no permiten lógica programable.

## Qué cambia AA

### ERC-4337
El estándar de Account Abstraction para Ethereum. Permite:
- **Recuperación social:** designar guardianes que pueden recuperar la cuenta
- **Pagos de gas patrocinados:** una dApp puede pagar el gas por ti
- **Transacciones batched:** agrupar múltiples operaciones en una
- **Políticas de gasto:** límites diarios, listas blancas de direcciones
- **Autenticación flexible:** biometría, passkeys, 2FA

### Paymasters
Smart contracts que pagan el gas en nombre del usuario. Permiten que nuevos usuarios interactúen con blockchain sin necesitar ETH previamente.

### Bundlers
Nodos que agrupan las operaciones de usuario (UserOperations) y las envían a la blockchain.

## Adopción actual

- **Safe (antes Gnosis Safe):** wallet multisig que es una de las implementaciones más usadas
- **Biconomy, ZeroDev, Pimlico:** infraestructura de AA
- **StarkNet:** AA nativo (todas las cuentas son smart contracts)
- **zkSync Era:** soporte nativo de AA`,
    practicalExamples: ['Una dApp que paga el gas por nuevos usuarios para que no necesiten ETH', 'Configurar tu wallet para que 3 de 5 amigos puedan recuperar tu cuenta', 'Crear una cuenta que solo permita transacciones a direcciones aprobadas'],
    relatedConcepts: ['smart-contracts', 'ethereum', 'gas', 'layer-2', 'zk-rollups'],
    advantages: ['Experiencia de usuario similar a web2 (sin seed phrases obligatorias)', 'Recuperación de cuentas sin riesgo de pérdida total', 'Gas patrocinado por dApps', 'Lógica personalizable: límites, multifirma, automatización'],
    risks: ['Mayor complejidad en el smart contract de la cuenta', 'Potencial mayor coste de gas por operaciones más complejas', 'Estándar ERC-4337 relativamente nuevo', 'Dependencia de bundlers y paymasters centralizados en fase temprana'],
    commonMistakes: ['Confundir Account Abstraction con eliminar la necesidad de claves privadas', 'Pensar que AA elimina todos los riesgos de seguridad', 'No entender que la recuperación social requiere configuración previa'],
    glossary: { 'EOA': 'Externally Owned Account — cuenta tradicional controlada por clave privada', 'ERC-4337': 'Estándar de Account Abstraction para Ethereum', 'UserOperation': 'Transacción abstracta enviada por una cuenta AA', 'Paymaster': 'Contrato que paga el gas en nombre del usuario', 'Bundler': 'Nodo que agrupa UserOperations y las envía a la blockchain' }
  },
  {
    slug: 'rwa',
    title: 'RWA: Activos del Mundo Real Tokenizados',
    level: 3,
    readTime: 8,
    simpleExplanation: 'RWA (Real World Assets) es la tokenización de activos del mundo real en blockchain: inmuebles, bonos del tesoro, materias primas, arte, créditos privados y más. La idea es traer billones de dólares en activos tradicionales a blockchain, haciéndolos más líquidos, accesibles y eficientes.',
    detailedExplanation: `## Qué se está tokenizando

### Bonos del tesoro tokenizados
Empresas como BlackRock (BUIDL fund), Ondo Finance (USDY) y Matrixdock permiten acceder a rendimiento de bonos del tesoro de EE.UU. a través de tokens en blockchain.

### Inmobiliario
Plataformas como RealT permiten comprar fracciones de propiedades inmobiliarias como tokens ERC-20, recibiendo rentas proporcionales.

### Crédito privado
Protocolos como Maple Finance, Centrifuge y Goldfinch conectan prestatarios institucionales con prestamistas DeFi.

### Commodities
Paxos Gold (PAXG) y Tether Gold (XAUT) representan oro físico en blockchain.

## Por qué importa

- El mercado inmobiliario global vale ~$300T
- Los bonos globales ~$130T
- Las acciones globales ~$110T

Tokenizar incluso un porcentaje pequeño representaría un flujo masivo de capital hacia blockchain.

## Marco regulatorio

La tokenización de RWA está atrayendo atención regulatoria significativa. Los proyectos serios trabajan con licencias financieras, custodios regulados y frameworks legales claros. La regulación varía enormemente entre jurisdicciones.`,
    practicalExamples: ['Comprar una fracción tokenizada de un bono del tesoro de EE.UU. a través de Ondo Finance', 'Invertir en una propiedad inmobiliaria tokenizada en RealT desde cualquier país', 'Usar PAXG como exposición al precio del oro en tu wallet cripto'],
    relatedConcepts: ['defi', 'ethereum', 'smart-contracts', 'stablecoin', 'tokenomics'],
    advantages: ['Acceso a activos tradicionalmente exclusivos (inmuebles, bonos)', 'Fraccionamiento: invertir cantidades pequeñas en activos caros', 'Liquidez 24/7 en mercados globales', 'Transparencia y auditabilidad de la blockchain'],
    risks: ['Dependencia del marco regulatorio (puede variar)', 'Riesgo del activo subyacente (el token vale lo que vale el activo real)', 'Riesgo del emisor/custodio del activo', 'Liquidez limitada en mercados secundarios de RWA'],
    commonMistakes: ['Asumir que tokenizar un activo elimina sus riesgos inherentes', 'No verificar la regulación y custodio detrás de un token RWA', 'Confundir tokens RWA con stablecoins', 'Ignorar los riesgos legales de invertir en RWA desde ciertas jurisdicciones'],
    glossary: { 'Tokenización': 'Proceso de representar un activo real como un token en blockchain', 'Custodio': 'Entidad que guarda el activo real que respalda el token', 'Fraccionamiento': 'División de un activo en partes pequeñas accesibles a más inversores', 'BUIDL': 'Fondo de BlackRock tokenizado en Ethereum' }
  },
  {
    slug: 'modular-blockchains',
    title: 'Blockchains Modulares',
    level: 3,
    readTime: 9,
    simpleExplanation: 'Las blockchains modulares separan las funciones principales de una blockchain (ejecución, consenso, disponibilidad de datos y liquidación) en capas especializadas. En vez de que una sola cadena haga todo, cada capa se optimiza por separado. Esto contrasta con las blockchains monolíticas donde una sola cadena maneja todo.',
    detailedExplanation: `## Las cuatro funciones

### Ejecución
Procesar transacciones y actualizar el estado. Ejemplos: Rollups (Arbitrum, zkSync), Ethereum L1.

### Consenso
Acordar el orden y validez de transacciones. Ejemplo: Ethereum PoS.

### Disponibilidad de datos (DA)
Garantizar que los datos de las transacciones están accesibles para verificación. Ejemplos: **Celestia, EigenDA, Avail.**

### Liquidación (Settlement)
Capa final donde se resuelven disputas y se finalizan transacciones. Ejemplo: Ethereum.

## Celestia: pionero en DA

Celestia es una blockchain especializada exclusivamente en disponibilidad de datos. Los rollups publican sus datos en Celestia en vez de en Ethereum L1, reduciendo costes drásticamente.

## Comparación

| Aspecto | Monolítica | Modular |
|---------|-----------|---------|
| Ejemplo | Solana | Ethereum + Rollups + Celestia |
| Diseño | Todo en una cadena | Funciones separadas |
| Escalabilidad | Limitada por una cadena | Cada capa escala independientemente |
| Complejidad | Menor | Mayor |

## La tesis modular

El futuro de blockchain podría ser un ecosistema donde rollups especializados manejan la ejecución, Ethereum proporciona liquidación y seguridad, y capas como Celestia ofrecen disponibilidad de datos barata. Cada pieza se optimiza independientemente.`,
    practicalExamples: ['Un rollup que usa Ethereum para liquidación pero Celestia para disponibilidad de datos', 'Crear una blockchain personalizada (appchain) que solo necesita construir la capa de ejecución', 'Un juego blockchain que usa una capa de DA barata para almacenar estados del juego'],
    relatedConcepts: ['rollups', 'layer-2', 'ethereum', 'layer-1', 'zk-rollups'],
    advantages: ['Cada capa se optimiza independientemente', 'Mayor escalabilidad total del sistema', 'Costes reducidos al usar capas especializadas', 'Flexibilidad para construir blockchains a medida'],
    risks: ['Mayor complejidad arquitectónica', 'Dependencias entre capas (si una falla, afecta a todo)', 'Ecosistema fragmentado', 'Tecnología relativamente nueva'],
    commonMistakes: ['Pensar que modular es automáticamente mejor que monolítico', 'Ignorar los riesgos de dependencias entre capas', 'Confundir disponibilidad de datos con almacenamiento de datos', 'No entender qué capa proporciona la seguridad real'],
    glossary: { 'DA': 'Data Availability — disponibilidad de datos', 'Celestia': 'Blockchain modular especializada en DA', 'Monolítica': 'Blockchain que maneja todas las funciones en una sola cadena', 'Appchain': 'Blockchain de aplicación específica', 'Settlement': 'Capa de liquidación y finalización de transacciones' }
  },
  {
    slug: 'on-chain-analysis',
    title: 'Análisis On-Chain',
    level: 3,
    readTime: 9,
    simpleExplanation: 'El análisis on-chain estudia los datos públicos de las blockchains (transacciones, direcciones, flujos de fondos) para obtener información sobre el comportamiento del mercado. A diferencia del análisis técnico que solo mira precios y volumen, el análisis on-chain examina la actividad real de la red: qué hacen las ballenas, cuánto BTC sale de exchanges, la actividad de mineros y más.',
    detailedExplanation: `## Métricas fundamentales

### Actividad de exchanges
- **Exchange inflows:** BTC/ETH entrando a exchanges (posible presión vendedora)
- **Exchange outflows:** salidas de exchanges (posible acumulación/holding)
- **Exchange reserves:** cantidad total en exchanges (tendencia macro)

### Comportamiento de holders
- **HODL waves:** distribución de BTC por tiempo de posesión
- **Realized price:** precio promedio al que se compró el supply circulante
- **NUPL (Net Unrealized Profit/Loss):** beneficio/pérdida no realizada del mercado

### Actividad de red
- **Active addresses:** direcciones únicas activas por día
- **Transaction count/volume:** número y valor de transacciones
- **NVT Ratio:** Network Value to Transactions — similar al P/E ratio

### Mineros
- **Hash rate:** potencia computacional de la red
- **Miner revenue:** ingresos de los mineros
- **Puell Multiple:** relación entre ingresos diarios de mineros y su media

## Herramientas populares

- **Glassnode:** la más completa para métricas on-chain
- **CryptoQuant:** flujos de exchanges y datos de derivados
- **Dune Analytics:** queries personalizadas sobre datos blockchain
- **Nansen:** tracking de wallets y smart money
- **Arkham Intelligence:** identificación de entidades

## Limitaciones

El análisis on-chain es una herramienta más, no una bola de cristal. Las métricas pueden interpretarse de múltiples formas, y la correlación pasada no garantiza causalidad futura.`,
    practicalExamples: ['Monitorear salidas masivas de BTC de exchanges como señal de acumulación institucional', 'Usar el NUPL para identificar zonas de euforia o capitulación en el mercado', 'Seguir las wallets de grandes fondos en Nansen para ver sus movimientos'],
    relatedConcepts: ['bitcoin', 'ethereum', 'defi', 'tokenomics', 'derivados'],
    advantages: ['Acceso a datos reales y verificables de la blockchain', 'Información no disponible en mercados tradicionales', 'Permite identificar tendencias antes de que se reflejen en el precio', 'Transparencia total del comportamiento de la red'],
    risks: ['Interpretación subjetiva de las métricas', 'Las señales no son predictivas con certeza', 'Datos pueden ser manipulados (wash trading)', 'Requiere experiencia para interpretar correctamente'],
    commonMistakes: ['Tomar una sola métrica como señal definitiva de compra/venta', 'No considerar el contexto macro al interpretar datos on-chain', 'Confundir correlación con causalidad', 'Seguir ciegamente lo que hacen las "ballenas" sin entender sus motivaciones'],
    glossary: { 'Ballena (Whale)': 'Dirección que posee grandes cantidades de criptomonedas', 'HODL': 'Hold On for Dear Life — mantener posiciones a largo plazo', 'NUPL': 'Net Unrealized Profit/Loss del mercado', 'NVT': 'Network Value to Transactions ratio', 'Hash rate': 'Potencia computacional total de la red de minería' }
  },
  {
    slug: 'derivados',
    title: 'Derivados Cripto',
    level: 3,
    readTime: 10,
    simpleExplanation: 'Los derivados cripto son instrumentos financieros cuyo valor deriva del precio de una criptomoneda subyacente. Incluyen futuros, opciones, perpetuos y swaps. Permiten especular sobre el precio sin poseer el activo, hacer cobertura (hedging) de posiciones, y operar con apalancamiento. Son instrumentos complejos de alto riesgo.',
    detailedExplanation: `## Tipos principales

### Futuros (Futures)
Contratos para comprar/vender un activo a un precio y fecha determinados. Los futuros de BTC cotizan en CME (regulado) y en exchanges cripto.

### Perpetuos (Perps)
Futuros sin fecha de vencimiento. El instrumento más popular en trading cripto. Utilizan un mecanismo de "funding rate" para mantener el precio del perpetuo alineado con el spot.

### Opciones (Options)
Contratan el derecho (no la obligación) de comprar (call) o vender (put) a un precio específico. Plataformas: Deribit, Lyra, Aevo.

### Swaps
Intercambios de flujos financieros basados en el rendimiento de activos.

## Apalancamiento

Los derivados permiten operar con apalancamiento: con $1.000 y 10x de leverage controlas una posición de $10.000. Las ganancias se multiplican... pero también las pérdidas. Con 10x, una caída del 10% liquida tu posición completamente.

## Funding rate

En perpetuos, si hay más longs que shorts, los longs pagan a los shorts (funding rate positivo) y viceversa. Esto mantiene el precio del perpetuo cerca del spot.

## ⚠️ Advertencia

Los derivados cripto son instrumentos financieros complejos con alto riesgo de pérdida. El apalancamiento amplifica tanto ganancias como pérdidas. La mayoría de traders minoristas pierden dinero operando con derivados apalancados. Esta información es puramente educativa.`,
    practicalExamples: ['Un minero de Bitcoin usa futuros para fijar el precio de venta de su producción futura (cobertura)', 'Un trader abre un perpetuo corto (short) en ETH apostando a que bajará de precio', 'Un inversor compra una opción put como seguro contra la caída de precio de su posición en BTC'],
    relatedConcepts: ['on-chain-analysis', 'bitcoin', 'ethereum', 'defi', 'tokenomics'],
    advantages: ['Permite cubrir riesgo (hedging) de posiciones spot', 'Posibilidad de beneficio tanto en mercados alcistas como bajistas', 'Mayor eficiencia de capital con apalancamiento controlado', 'Los futuros regulados (CME) ofrecen exposición institucional'],
    risks: ['Apalancamiento amplifica pérdidas: liquidación rápida y total', 'Complejidad elevada requiere formación especializada', 'Volatilidad extrema en el mercado cripto', 'Manipulación de precios y liquidaciones en cascada', 'La mayoría de traders minoristas pierden dinero'],
    commonMistakes: ['Usar apalancamiento alto sin experiencia ni gestión de riesgo', 'No poner stop-loss o no entender las condiciones de liquidación', 'Operar derivados sin entender el funding rate', 'Confundir trading con inversión a largo plazo', 'No considerar las comisiones acumuladas en posiciones de larga duración'],
    glossary: { 'Apalancamiento (Leverage)': 'Multiplicador que permite operar con más capital del depositado', 'Liquidación': 'Cierre forzado de posición cuando las pérdidas alcanzan el margen depositado', 'Funding rate': 'Tasa periódica que equilibra el precio del perpetuo con el spot', 'Long': 'Posición que apuesta a la subida del precio', 'Short': 'Posición que apuesta a la bajada del precio', 'Margen': 'Capital depositado como garantía para la posición apalancada' }
  }
]

// Las lecciones revisadas viven en content/academia/<slug>.md: su frontmatter (updated, sources
// y, si hace falta, campos corregidos) y su cuerpo (explicación detallada) sustituyen a los de LESSONS.
const OVERRIDE_DIR = path.join(process.cwd(), 'content', 'academia')
const OVERRIDABLE = ['title', 'simpleExplanation', 'practicalExamples', 'advantages', 'risks', 'commonMistakes', 'glossary'] as const
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v))
let merged: AcademyLesson[] | null = null

function lessons(): AcademyLesson[] {
  if (merged) return merged
  merged = LESSONS.map(base => {
    const lesson: AcademyLesson = { ...base }
    const file = path.join(OVERRIDE_DIR, `${base.slug}.md`)
    if (fs.existsSync(file)) {
      const { data, content } = matter(fs.readFileSync(file, 'utf8'))
      for (const key of OVERRIDABLE) if (data[key] !== undefined) (lesson as any)[key] = data[key]
      lesson.detailedExplanation = content.trim()
      lesson.updated = isoDate(data.updated)
      lesson.sources = data.sources ?? []
    }
    const text = [
      lesson.simpleExplanation, lesson.detailedExplanation, ...lesson.practicalExamples,
      ...lesson.advantages, ...lesson.risks, ...lesson.commonMistakes, ...Object.values(lesson.glossary),
    ].join(' ')
    lesson.readTime = Math.max(2, Math.round(text.split(/\s+/).length / 220))
    return lesson
  })
  return merged
}

export function getAllLessons(): AcademyLesson[] {
  return lessons()
}

export function getLessonBySlug(slug: string): AcademyLesson | undefined {
  return lessons().find(l => l.slug === slug)
}

export function getLessonsByLevel(level: 1 | 2 | 3): AcademyLesson[] {
  return lessons().filter(l => l.level === level)
}

export function getLessonNavigation(slug: string): { prev: AcademyLesson | null; next: AcademyLesson | null } {
  const all = lessons()
  const idx = all.findIndex(l => l.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export function getLevelLabel(level: 1 | 2 | 3): string {
  const labels: Record<number, string> = { 1: 'Principiante', 2: 'Intermedio', 3: 'Avanzado' }
  return labels[level] ?? ''
}

export function getLevelColor(level: 1 | 2 | 3): string {
  const colors: Record<number, string> = { 1: 'text-green-400', 2: 'text-yellow-400', 3: 'text-red-400' }
  return colors[level] ?? ''
}

export function getLevelBg(level: 1 | 2 | 3): string {
  const bgs: Record<number, string> = { 1: 'bg-green-500/10 border-green-500/20', 2: 'bg-yellow-500/10 border-yellow-500/20', 3: 'bg-red-500/10 border-red-500/20' }
  return bgs[level] ?? ''
}

export const LEVEL_INFO = [
  { level: 1 as const, emoji: '🟢', title: 'Principiante', description: 'Conceptos fundamentales para empezar desde cero en el mundo cripto.', color: 'green' },
  { level: 2 as const, emoji: '🟡', title: 'Intermedio', description: 'Protocolos, tecnologías y mecánicas del ecosistema DeFi y blockchain.', color: 'yellow' },
  { level: 3 as const, emoji: '🔴', title: 'Avanzado', description: 'Conceptos técnicos y financieros para usuarios experimentados.', color: 'red' },
]
