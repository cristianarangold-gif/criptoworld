# CriptoMundo: comparador de exchanges — diseño

Fecha: 2026-10-15. Aprobado en conversación por el propietario (Cristian Arango).

## 1. Objetivo
Responder a la pregunta con más intención de compra del sitio: «¿dónde compro criptomonedas de forma segura en España?». El comparador es **neutral**:
- sin clasificación ni «mejor exchange»;
- sin enlaces de afiliado ni orden pagado;
- cada dato procede de la web oficial de la plataforma o del registro de la CNMV, con su fuente y la fecha en que se comprobó.

## 2. Decisiones del propietario
- **Sin afiliados, por ahora.** La página dice «No cobramos de ninguna plataforma». Si algún día se añaden, se avisará en la página y en la política del sitio.
- **12 plataformas:** Bit2Me, Criptan, Coinbase, Kraken, Bitvavo, Bitpanda, OKX, Bybit EU, Crypto.com, Revolut, Trade Republic y eToro.

## 3. Datos
### `data/exchanges.json`
`{ revisado: 'AAAA-MM-DD', plataformas: Plataforma[] }`

Cada plataforma (`Plataforma`):
- `slug`, `nombre`, `web` (URL oficial para España);
- `entidad`: denominación exacta en la lista de la CNMV;
- `tipo`: `'espanola'` o `'pasaporte'`, y `pais` (país de origen si es pasaporte);
- `desde`: fecha a partir de la cual puede prestar servicios MiCA, según la CNMV;
- `servicios`: servicios MiCA según la CNMV (texto tal cual);
- `comisiones`: `{ compra_rapida, mercado_taker, deposito_eur, retirada_eur }`. Cada una es `{ valor: string, fuente: url, comprobado: 'AAAA-MM-DD' }`; `valor` puede ser «No publicada con claridad».
- `pagos`: subconjunto de `['sepa', 'bizum', 'tarjeta']`;
- `retirada_wallet`, `staking`, `espanol` (app y soporte en español) e `informe_fiscal`: cada uno `boolean | null` (`null` = no se ha podido comprobar);
- `destaca`: 1–2 frases sobre lo que la distingue;
- `ojo`: 1–2 frases sobre lo que hay que vigilar;
- `fuentes`: lista de `{ title, url }`.

### `data/cnmv-psc.json`
Instantánea de la «Relación de proveedores de servicios de criptoactivos» de la CNMV:
- `{ fecha: '2026-10-15', url, entidades: string[] }`;
- 185 entidades, extraídas del PDF oficial.

### Validación (`npm test`, bloquea el despliegue)
- Exactamente 12 plataformas, con slugs únicos.
- Cada `entidad` figura en la instantánea de la CNMV.
- Cada comisión tiene `valor` no vacío, una `fuente` `https://` y `comprobado` como fecha válida no futura.
- `pagos` solo contiene valores conocidos.
- `destaca` y `ojo` no están vacíos.
- `revisado` es una fecha válida.

## 4. Página `/comparador-exchanges`
- **H1** «Comparador de exchanges autorizados en España».
- **Introducción:**
  - qué compara;
  - aviso destacado «No cobramos de ninguna plataforma. No hay clasificación: el orden es alfabético»;
  - fecha «Datos revisados el…».
- **Método:**
  - por qué estas 12 (las más usadas en España con autorización MiCA vigente según la CNMV);
  - de dónde sale cada dato;
  - que las comisiones cambian y hay que comprobarlas en la web oficial antes de operar.
- **Filtros** (componente cliente, sin ocultar contenido en el HTML inicial): Bizum, tarjeta, retirada a wallet propia, staking, soporte en español. Sin JavaScript se ven todas.
- **Tabla en escritorio y tarjetas en móvil**, con:
  - nombre, tipo (española o pasaporte y país) y desde cuándo puede operar;
  - compra rápida, mercado avanzado y métodos de pago;
  - retirada a wallet, staking y español.
- **Detalle desplegable** (`<details>`) por plataforma:
  - entidad legal y servicios MiCA;
  - todas las comisiones, con su fuente y la fecha de comprobación;
  - «Destaca» y «Ojo con».
- **Sección «Cómo elegir según tu caso»** (texto propio):
  - compras periódicas pequeñas;
  - mucho trading;
  - guardar en una wallet propia;
  - prefieres tu banco.
- **Enlaces:**
  - la [calculadora de comisiones](/herramientas/calculadora-comisiones);
  - la guía de la CNMV;
  - las respuestas (MiCA y FIFO);
  - el test de estafas.
- **JSON-LD:** `ItemList` con las 12 plataformas (nombre y URL oficial) y `BreadcrumbList`.
- **Extensión:** la página tiene más de 1.200 palabras de texto propio fuera de la tabla.

## 5. Enlaces desde el resto del sitio
- Ruta «Empieza aquí»: etapa 2, después de la guía de la CNMV. Requiere un tipo de paso nuevo o tratar la página como herramienta; se decide en el plan.
- La guía «Cómo comprobar si un exchange está autorizado».
- La respuesta «¿Qué exchanges pueden operar en España con MiCA?».
- La sección «Cómo comprarla en España con seguridad» de las 12 fichas.
- Pie de página, buscador y sitemap.

## 6. Mantenimiento
- Revisión **cada 3 meses**: comisiones, métodos de pago y la lista de la CNMV.
- Se ofrece al propietario un recordatorio programado.
- Un cambio regulatorio (por ejemplo, una plataforma que pierde su autorización) se corrige en cuanto se conoce.

## 7. Comprobaciones en local
- La página carga y los filtros funcionan con ratón y teclado.
- Sin JavaScript se ven las 12 plataformas.
- No hay scroll horizontal a 375 px.
- No hay enlaces internos rotos.
- El JSON-LD es válido.
