// Test «¿Es una estafa?»: 12 preguntas de sí o no basadas en la guía de estafas.
// Peso 3 = señal grave, 2 = moderada, 1 = leve. Todo se evalúa en el navegador.

export interface ScamQuestion {
  id: string
  pregunta: string
  peso: 1 | 2 | 3
  senal: string
}

export type ScamLevel = 'grave' | 'precaucion' | 'sin-senales'

export const SCAM_QUESTIONS: ScamQuestion[] = [
  {
    id: 'contacto',
    pregunta: '¿Te contactaron sin que tú lo pidieras (llamada, WhatsApp, redes sociales, email)?',
    peso: 2,
    senal: 'Contacto no solicitado: las entidades serias no captan clientes llamando o escribiendo en frío.',
  },
  {
    id: 'garantizada',
    pregunta: '¿Te prometen una rentabilidad garantizada o fija (por ejemplo, un 2 % diario o un 30 % al mes)?',
    peso: 3,
    senal: 'Rentabilidad garantizada: nadie puede garantizar ganancias con criptomonedas.',
  },
  {
    id: 'prisa',
    pregunta: '¿Te meten prisa para invertir ya («la oferta acaba hoy», «quedan pocas plazas»)?',
    peso: 2,
    senal: 'Presión para decidir rápido: la prisa sirve para que no lo compruebes.',
  },
  {
    id: 'acceso-remoto',
    pregunta: '¿Te han pedido instalar un programa de acceso remoto (AnyDesk, TeamViewer o similar)?',
    peso: 3,
    senal: 'Acceso remoto: con él pueden ver tus claves y mover tu dinero desde tu propio dispositivo.',
  },
  {
    id: 'semilla',
    pregunta: '¿Te han pedido tu frase semilla, tu clave privada o tus contraseñas?',
    peso: 3,
    senal: 'Petición de la frase semilla o de claves: quien la tiene controla tus fondos. Nadie legítimo la pide.',
  },
  {
    id: 'pago-retirar',
    pregunta: '¿Te piden pagar algo (impuestos, comisiones, «desbloqueo») para poder retirar tu dinero?',
    peso: 3,
    senal: 'Pago por adelantado para retirar: es el último paso típico de una estafa; el dinero no llegará.',
  },
  {
    id: 'no-autorizada',
    pregunta: '¿La entidad no aparece como autorizada en la CNMV o en el registro de ESMA, o figura en sus advertencias?',
    peso: 2,
    senal: 'Entidad sin autorización: desde julio de 2026 un proveedor cripto necesita licencia MiCA para operar en España.',
  },
  {
    id: 'famoso',
    pregunta: '¿Llegaste a la oferta por un anuncio o una noticia con un famoso que la recomienda?',
    peso: 2,
    senal: 'Famoso en un anuncio: suelen ser montajes; los famosos no recomiendan plataformas de inversión.',
  },
  {
    id: 'relacion',
    pregunta: '¿Te lo recomienda alguien a quien conociste hace poco por internet (amistad o relación sentimental)?',
    peso: 2,
    senal: 'Relación reciente por internet: es el guion de las estafas románticas o de «engorde del cerdo».',
  },
  {
    id: 'referidos',
    pregunta: '¿Ganas comisiones o bonos por traer a otras personas?',
    peso: 1,
    senal: 'Comisiones por captar a otros: es el rasgo de los esquemas piramidales y Ponzi.',
  },
  {
    id: 'web-opaca',
    pregunta: '¿La web da pocos datos de la empresa (sin razón social, dirección ni registro verificable)?',
    peso: 1,
    senal: 'Web sin datos verificables: una empresa autorizada dice quién es y dónde está registrada.',
  },
  {
    id: 'recuperar',
    pregunta: '¿Te ofrecen recuperar dinero que perdiste en otra inversión o estafa?',
    peso: 3,
    senal: 'Oferta de recuperar dinero perdido: es una segunda estafa dirigida a quien ya fue estafado.',
  },
]

export function scoreScam(yes: string[]): { level: ScamLevel; points: number; signals: string[] } {
  const chosen = SCAM_QUESTIONS.filter(q => yes.includes(q.id))
  const points = chosen.reduce((n, q) => n + q.peso, 0)
  const level: ScamLevel =
    chosen.some(q => q.peso === 3) || points >= 5 ? 'grave' : points >= 2 ? 'precaucion' : 'sin-senales'
  return { level, points, signals: chosen.map(q => q.senal) }
}
