// Imprime el slug y las fechas de la semana anterior (día de hoy en Madrid) para la rutina del resumen semanal.
// Uso: npx tsx scripts/semana-anterior.ts
import { previousWeek } from '../lib/digests'

const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' })
console.log(JSON.stringify(previousWeek(today)))
