import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toRss } from '../lib/feed'

const channel = { title: 'CriptoMundo', url: 'https://criptoworld.org', description: 'Noticias & resúmenes' }

test('toRss genera RSS 2.0 con escape y fechas RFC 822', () => {
  const xml = toRss([{ title: 'MiCA & DAC8 <novedades>', url: 'https://criptoworld.org/noticias/a', date: '2026-10-15', description: 'Qué "cambia"' }], channel)
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'))
  assert.match(xml, /<rss version="2.0"/)
  assert.match(xml, /<title>MiCA &amp; DAC8 &lt;novedades&gt;<\/title>/)
  assert.match(xml, /<description>Qué &quot;cambia&quot;<\/description>/)
  assert.match(xml, /<description>Noticias &amp; resúmenes<\/description>/)
  assert.match(xml, /<pubDate>Thu, 15 Oct 2026 08:00:00 GMT<\/pubDate>/)
  assert.match(xml, /<guid isPermaLink="true">https:\/\/criptoworld.org\/noticias\/a<\/guid>/)
})

test('toRss incluye como mucho 20 elementos, del más reciente al más antiguo', () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ title: `t${i}`, url: `https://criptoworld.org/n/${i}`, date: `2026-10-${String(i + 1).padStart(2, '0')}`, description: 'd' }))
  const xml = toRss(items, channel)
  assert.equal((xml.match(/<item>/g) || []).length, 20)
  assert.ok(xml.indexOf('t24') < xml.indexOf('t23'))
  assert.ok(!xml.includes('<title>t4</title>'))
})
