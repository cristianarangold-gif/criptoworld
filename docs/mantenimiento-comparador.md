# Mantenimiento del comparador de exchanges

El comparador (`/comparador-exchanges`) solo es útil si sus datos están al día. Hay dos fuentes que revisar.

## 1. Lista de la CNMV (`data/cnmv-psc.json`)

Es una copia de la «Relación de proveedores de servicios de criptoactivos» que publica la CNMV en PDF. `npm test` comprueba que la entidad de cada plataforma del comparador aparece en esa copia; si una plataforma pierde su autorización y la copia se actualiza, el despliegue se bloquea hasta corregir el comparador.

Para refrescarla:

1. Descarga el PDF: `https://cnmv.es/Docportal/Proveedores-Servicios-Criptoactivos/Listado_ProveedoresCriptoactivos.pdf`.
2. Extrae el texto (por ejemplo, con `pypdf`, fuera del repositorio).
3. Extrae las denominaciones: cada entidad es el texto anterior a su tipo («PSC…», «ENTIDAD DE CRÉDITO…»); las denominaciones largas ocupan dos líneas y hay que unirlas.
4. Sustituye `entidades` y `fecha` en `data/cnmv-psc.json`, y ejecuta `npm test`.

La copia del 15 de octubre de 2026 tiene 191 entidades. Algunas denominaciones muy largas pueden haber quedado recortadas; no afecta a las 12 del comparador.

## 2. Comisiones y servicios (`data/exchanges.json`)

Cada **3 meses** (y siempre que una noticia afecte a una plataforma):

- abre la página de tarifas de cada plataforma (la URL está en `fuente`) y comprueba las cuatro comisiones;
- revisa métodos de pago, retirada a wallet propia, staking, español e informe fiscal;
- actualiza `comprobado` en cada comisión revisada y `revisado` en la raíz del archivo;
- si un dato ya no se puede confirmar, usa «No publicada con claridad» o `null`, nunca una estimación.

Si una plataforma deja de estar autorizada en España, se retira del comparador o se marca de forma visible, y se revisan las fichas de criptomonedas que la mencionen.
