#!/usr/bin/env python3
"""Convierte el PDF de la CNMV en filas JSON para scripts/actualizar-cnmv.ts.

Uso: python cnmv_pdf_a_filas.py lista.pdf > filas.json  (necesita pdfplumber; ver docs/mantenimiento-comparador.md)
"""
import json
import sys

import pdfplumber


def main(path):
    filas = []
    with pdfplumber.open(path) as pdf:
        creado = (pdf.metadata or {}).get("CreationDate", "")
        for pagina in pdf.pages:
            for tabla in pagina.extract_tables():
                filas.extend([(c or "").replace("\n", " ").strip() for c in fila] for fila in tabla)
    # CreationDate tiene la forma D:20261020115540+02'00'
    fecha = f"{creado[2:6]}-{creado[6:8]}-{creado[8:10]}" if creado.startswith("D:") else ""
    json.dump({"fecha": fecha, "filas": filas}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main(sys.argv[1])
