// Quizzes de las lecciones: se escriben en el frontmatter de content/academia/<slug>.md (campo `quiz`).

export type QuizQuestion = {
  pregunta: string
  opciones: string[]
  correcta: number
  explicacion: string
}

export const PASS_RATIO = 0.6

export function validateQuiz(quiz: QuizQuestion[]): string[] {
  const errors: string[] = []
  if (!Array.isArray(quiz) || quiz.length < 3 || quiz.length > 5) errors.push(`debe tener entre 3 y 5 preguntas (tiene ${quiz?.length ?? 0})`)
  ;(quiz ?? []).forEach((q, i) => {
    const n = `pregunta ${i + 1}`
    if (!q?.pregunta?.trim()) errors.push(`${n}: falta el enunciado`)
    if (!Array.isArray(q?.opciones) || q.opciones.length < 3 || q.opciones.length > 4) errors.push(`${n}: debe tener 3 o 4 opciones`)
    if (!Number.isInteger(q?.correcta) || q.correcta < 0 || q.correcta >= (q?.opciones?.length ?? 0)) errors.push(`${n}: índice de la respuesta correcta fuera de rango`)
    if (!q?.explicacion?.trim()) errors.push(`${n}: falta la explicación`)
  })
  return errors
}

export function scoreQuiz(answers: number[], quiz: QuizQuestion[]): { correct: number; total: number; passed: boolean } {
  const correct = quiz.reduce((n, q, i) => n + (answers[i] === q.correcta ? 1 : 0), 0)
  return { correct, total: quiz.length, passed: quiz.length > 0 && correct / quiz.length >= PASS_RATIO }
}
