import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateQuiz, scoreQuiz, type QuizQuestion } from '../lib/quiz'
import { getAllLessons } from '../lib/academia-data'

const q = (correcta = 0, opciones = ['a', 'b', 'c']): QuizQuestion => ({ pregunta: '¿?', opciones, correcta, explicacion: 'Porque sí.' })

test('validateQuiz acepta un quiz correcto', () => {
  assert.deepEqual(validateQuiz([q(), q(1), q(2)]), [])
})

test('validateQuiz detecta índice fuera de rango, pocas opciones y demasiadas preguntas', () => {
  assert.ok(validateQuiz([q(3), q(), q()]).some(e => e.includes('correcta')))
  assert.ok(validateQuiz([q(0, ['a', 'b']), q(), q()]).some(e => e.includes('opciones')))
  assert.ok(validateQuiz([q(), q(), q(), q(), q(), q()]).some(e => e.includes('preguntas')))
  assert.ok(validateQuiz([{ ...q(), explicacion: ' ' }, q(), q()]).some(e => e.includes('explicación')))
})

test('scoreQuiz aprueba con el 60 % o más', () => {
  const quiz = [q(0), q(1), q(2)]
  assert.deepEqual(scoreQuiz([0, 1, 0], quiz), { correct: 2, total: 3, passed: true })
  assert.deepEqual(scoreQuiz([0, 0, 0], quiz), { correct: 1, total: 3, passed: false })
})

test('las 29 lecciones tienen un quiz válido', () => {
  const problems = getAllLessons().flatMap(l => (l.quiz ? validateQuiz(l.quiz) : ['sin quiz']).map(e => `${l.slug}: ${e}`))
  assert.deepEqual(problems, [])
})
