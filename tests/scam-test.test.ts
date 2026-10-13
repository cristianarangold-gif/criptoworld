import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SCAM_QUESTIONS, scoreScam } from '../lib/scam-test'

const byWeight = (w: number) => SCAM_QUESTIONS.filter(q => q.peso === w).map(q => q.id)

test('hay 12 preguntas con ids únicos y 5 graves', () => {
  assert.equal(SCAM_QUESTIONS.length, 12)
  assert.equal(new Set(SCAM_QUESTIONS.map(q => q.id)).size, 12)
  assert.equal(byWeight(3).length, 5)
})

test('sin respuestas afirmativas no hay señales', () => {
  assert.deepEqual(scoreScam([]), { level: 'sin-senales', points: 0, signals: [] })
})

test('una señal leve sigue siendo «sin señales»', () => {
  assert.equal(scoreScam([byWeight(1)[0]]).level, 'sin-senales')
})

test('una señal moderada es «precaución»', () => {
  assert.equal(scoreScam([byWeight(2)[0]]).level, 'precaucion')
})

test('una sola señal grave es «grave»', () => {
  const r = scoreScam([byWeight(3)[0]])
  assert.equal(r.level, 'grave')
  assert.equal(r.points, 3)
})

test('5 puntos sin señales graves es «grave»', () => {
  const r = scoreScam([byWeight(2)[0], byWeight(2)[1], byWeight(1)[0]])
  assert.equal(r.points, 5)
  assert.equal(r.level, 'grave')
})

test('las señales salen en el orden de las preguntas y se ignoran ids desconocidos o repetidos', () => {
  const ids = SCAM_QUESTIONS.map(q => q.id)
  const r = scoreScam([ids[5], 'no-existe', ids[1], ids[5]])
  assert.deepEqual(r.signals, [SCAM_QUESTIONS[1].senal, SCAM_QUESTIONS[5].senal])
})
