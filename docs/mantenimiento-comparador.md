# Mantenimiento del comparador de exchanges y del calendario

El comparador (`/comparador-exchanges`) solo es útil si sus datos están al día. Hay dos fuentes que revisar.

## 1. Lista de la CNMV (`data/cnmv-registro.json`)

Es una copia de la «Relación de proveedores de servicios de criptoactivos» que publica la CNMV en PDF. Alimenta el buscador `/empresas-autorizadas-mica`, y `npm test` comprueba que la entidad de cada plataforma del comparador aparece en ella: si una plataforma pierde su autorización y la copia se actualiza, el despliegue se bloquea hasta corregir el comparador.

Se actualiza **cada mes**. Lo hace la tarea programada `criptomundo-lista-cnmv`, que abre un PR. A mano:

```bash
mkdir -p /tmp/cnmv && cd /tmp/cnmv
curl -sL -A "Mozilla/5.0" -o lista.pdf https://cnmv.es/Docportal/Proveedores-Servicios-Criptoactivos/Listado_ProveedoresCriptoactivos.pdf
python3 -m venv venv && venv/bin/pip install pdfplumber
venv/bin/python -I "$OLDPWD/scripts/cnmv_pdf_a_filas.py" lista.pdf > filas.json
cd "$OLDPWD" && npx tsx scripts/actualizar-cnmv.ts /tmp/cnmv/filas.json && npm test
```

`actualizar-cnmv.ts` no escribe nada si los datos no pasan la validación (pocas entidades, tipo, país o servicio desconocidos). Un país o servicio nuevo legítimo se añade a las listas de `lib/cnmv.ts`. Las altas y bajas se anotan en `data/cnmv-cambios.json`, y salen en la página: antes de fusionar, revisa que no sean un cambio de nombre o un error del PDF (si lo son, edita la entrada para no publicar como baja lo que no lo es).

## 2. Comisiones y servicios (`data/exchanges.json`)

Cada **3 meses** (y siempre que una noticia afecte a una plataforma):

- abre la página de tarifas de cada plataforma (la URL está en `fuente`) y comprueba las cuatro comisiones;
- revisa métodos de pago, retirada a wallet propia, staking, español e informe fiscal;
- actualiza `comprobado` en cada comisión revisada y `revisado` en la raíz del archivo;
- si un dato ya no se puede confirmar, usa «No publicada con claridad» o `null`, nunca una estimación.
- actualiza `coste_compra` si cambia la compra rápida: `formula` guarda porcentaje, mínimo y parte fija (`null` si la plataforma no publica lo necesario) y `nota` explica lo que no incluye. `npm test` falla si la fórmula no coincide con el texto de `compra_rapida`.

Si una plataforma deja de estar autorizada en España, se retira del comparador o se marca de forma visible, y se revisan las fichas de criptomonedas que la mencionen.

## 3. Calendario cripto y fiscal (`data/calendario.json`)

- **Cada enero:** añade las fechas fiscales del año siguiente (modelo 721, campaña de la Renta, segundo plazo del 5 de noviembre, valoración a 31 de diciembre, modelos 172/173).
- **Cuando la AEAT publique el calendario de la Renta** (normalmente en marzo): confirma las fechas marcadas como `aproximada` y cambia `aproximada` a `false`.
- **Cada revisión trimestral:** recalcula los halvings con la altura de bloque actual (Bitcoin: bloque 1.050.000, 10 min por bloque; Litecoin: bloque 3.360.000, 2,5 min por bloque) y revisa si alguna actualización de Ethereum tiene ya fecha oficial.
- `npm test` exige al menos una fecha futura en cada categoría: si falla, es que toca añadir fechas.
- Actualiza `revisado` al terminar.
