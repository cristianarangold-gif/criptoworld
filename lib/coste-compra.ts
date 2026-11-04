// Comisión publicada de la compra sencilla: máximo entre el porcentaje y el mínimo, más la parte fija.
// `formula: null` significa que la plataforma no publica lo necesario para calcularla: nunca se estima.
// Va aparte de exchanges.ts para que el componente de cliente no cargue todos los datos del comparador.
export type FormulaCompra = { porcentaje: number; minimo: number; fijo: number }
export type CosteCompra = { formula: FormulaCompra | null; nota: string }

const sinRedondear = (f: FormulaCompra, importe: number) => Math.max((importe * f.porcentaje) / 100, f.minimo) + f.fijo

export function comisionPublicada(formula: FormulaCompra | null, importe: number): number | null {
  return formula ? Math.round(sinRedondear(formula, importe) * 100) / 100 : null
}

export function porcentajeEfectivo(formula: FormulaCompra, importe: number): number {
  return Math.round((sinRedondear(formula, importe) / importe) * 10000) / 100
}
