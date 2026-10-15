import { test } from 'node:test'
import assert from 'node:assert/strict'
import cnmv from '../data/cnmv-psc.json'

test('la instantánea de la CNMV tiene la lista completa y una fecha válida', () => {
  assert.ok(cnmv.entidades.length >= 150, String(cnmv.entidades.length))
  assert.equal(new Set(cnmv.entidades).size, cnmv.entidades.length)
  assert.match(cnmv.fecha, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(cnmv.url.startsWith('https://'))
  for (const e of ['BITCOINFORME, S.L. (BIT2ME)', 'COINBASE LUXEMBOURG S.A.']) assert.ok(cnmv.entidades.includes(e), e)
})
