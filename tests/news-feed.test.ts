import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSources, parseFeed, selectCandidates, toMarkdown } from '../lib/news-feed'

const RSS = `<?xml version="1.0"?><rss><channel>
<item><title><![CDATA[Bitcoin &amp; ETFs: nuevo récord]]></title><link>https://medio.com/a</link><pubDate>Wed, 14 Oct 2026 20:00:00 GMT</pubDate></item>
<item><title>Sin fecha</title><link>https://medio.com/b</link></item>
<item><title>Vieja</title><link>https://medio.com/c</link><pubDate>Mon, 05 Oct 2026 10:00:00 GMT</pubDate></item>
</channel></rss>`
const ATOM = `<feed xmlns="http://www.w3.org/2005/Atom">
<entry><title>ESMA publica directrices MiCA</title><link rel="alternate" href="https://esma.europa.eu/x"/><updated>2026-10-14T08:00:00Z</updated></entry>
</feed>`
const now = new Date('2026-10-15T04:30:00Z')

test('parseSources lee nombre, url y tipo, e ignora comentarios', () => {
  assert.deepEqual(parseSources('# comentario\n\nCoinDesk | https://c.com/rss | medio\nESMA | https://e.eu/rss | oficial\n'), [
    { name: 'CoinDesk', url: 'https://c.com/rss', official: false },
    { name: 'ESMA', url: 'https://e.eu/rss', official: true },
  ])
})

test('parseFeed lee RSS con CDATA y entidades', () => {
  const items = parseFeed(RSS, { name: 'Medio', official: false })
  assert.equal(items.length, 3)
  assert.equal(items[0].title, 'Bitcoin & ETFs: nuevo récord')
  assert.equal(items[0].published?.toISOString(), '2026-10-14T20:00:00.000Z')
  assert.equal(items[1].published, null)
})

test('parseFeed lee Atom con solo updated', () => {
  const [e] = parseFeed(ATOM, { name: 'ESMA', official: true })
  assert.equal(e.url, 'https://esma.europa.eu/x')
  assert.equal(e.published?.toISOString(), '2026-10-14T08:00:00.000Z')
  assert.equal(e.official, true)
})

test('selectCandidates filtra por ventana, quita duplicados y pone primero las oficiales', () => {
  const medio = parseFeed(RSS, { name: 'Medio', official: false })
  const ofi = parseFeed(ATOM, { name: 'ESMA', official: true })
  const out = selectCandidates([...medio, ...medio, ...ofi], now)
  assert.deepEqual(out.map(i => i.url), ['https://esma.europa.eu/x', 'https://medio.com/a'])
})

test('selectCandidates respeta el límite', () => {
  const many = Array.from({ length: 20 }, (_, i) => ({ title: `t${i}`, url: `https://m.com/${i}`, published: new Date(now.getTime() - i * 60000), source: 'M', official: false }))
  assert.equal(selectCandidates(many, now).length, 15)
})

test('toMarkdown: vacío sin candidatas; lista con fuente, fecha y fallos', () => {
  assert.equal(toMarkdown([], []), '')
  assert.equal(toMarkdown([], ['X: 500']), '')
  const md = toMarkdown(selectCandidates(parseFeed(ATOM, { name: 'ESMA', official: true }), now), ['CoinDesk: timeout'])
  assert.match(md, /\[ESMA publica directrices MiCA\]\(https:\/\/esma\.europa\.eu\/x\)/)
  assert.match(md, /oficial/)
  assert.match(md, /CoinDesk: timeout/)
})

test('una fuente con filtro solo deja pasar títulos con alguna palabra clave', () => {
  const [src] = parseSources('Comisión | https://ec.eu/rss | oficial | crypto, MiCA, euro digital')
  assert.deepEqual(src.keywords, ['crypto', 'mica', 'euro digital'])
  const xml = `<rss><item><title>Speech on farming</title><link>https://ec.eu/1</link></item><item><title>New MiCA guidance on stablecoins</title><link>https://ec.eu/2</link></item><item><title>Crypto-asset rules</title><link>https://ec.eu/3</link></item></rss>`
  assert.deepEqual(parseFeed(xml, src).map(i => i.url), ['https://ec.eu/2', 'https://ec.eu/3'])
})
