import Link from 'next/link'
import type { ReactNode } from 'react'

// Renderizador Markdown mínimo y seguro (sin HTML crudo) para guías y lecciones.
// Soporta: ## / ###, párrafos, listas (- y 1.), tablas, citas (>) como recuadro,
// **negrita**, `código` y [enlaces](url).

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function headings(md: string): { id: string; text: string }[] {
  return md
    .split('\n')
    .filter(l => l.startsWith('## '))
    .map(l => ({ id: slugifyHeading(l.slice(3)), text: l.slice(3).trim() }))
}

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${keyBase}-${i++}`
    if (tok.startsWith('**')) {
      out.push(<strong key={key} className="text-foreground font-semibold">{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith('`')) {
      out.push(<code key={key} className="rounded bg-muted px-1 py-0.5 text-[0.9em]">{tok.slice(1, -1)}</code>)
    } else {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/)!
      out.push(
        href.startsWith('/') ? (
          <Link key={key} href={href} className="text-primary underline underline-offset-2">{label}</Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{label}</a>
        ),
      )
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const cells = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())

export function Markdown({ source }: { source: string }) {
  const lines = source.split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const k = `b${i}`
    if (!line.trim()) { i++; continue }

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim()
      blocks.push(<h2 key={k} id={slugifyHeading(text)} className="font-display text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">{text}</h2>)
      i++; continue
    }
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={k} className="font-display text-lg font-semibold text-foreground mt-6 mb-2">{inline(line.slice(4), k)}</h3>)
      i++; continue
    }
    if (line.startsWith('|')) {
      const rows: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++])
      const [head, , ...body] = rows
      blocks.push(
        <div key={k} className="my-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {cells(head).map((c, j) => <th key={j} className="py-2 pr-4 text-left font-semibold text-foreground">{inline(c, `${k}h${j}`)}</th>)}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-b border-border/40">
                  {cells(r).map((c, j) => <td key={j} className="py-2 pr-4 align-top text-muted-foreground">{inline(c, `${k}r${ri}c${j}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }
    if (line.startsWith('> ')) {
      const parts: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) parts.push(lines[i++].slice(2))
      blocks.push(
        <div key={k} className="my-6 rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/90">
          {inline(parts.join(' '), k)}
        </div>,
      )
      continue
    }
    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line)
      const items: string[] = []
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) items.push(lines[i++].replace(/^(- |\d+\. )/, ''))
      const cls = `my-4 space-y-2 pl-6 text-muted-foreground leading-relaxed ${ordered ? 'list-decimal' : 'list-disc'}`
      const lis = items.map((it, j) => <li key={j}>{inline(it, `${k}l${j}`)}</li>)
      blocks.push(ordered ? <ol key={k} className={cls}>{lis}</ol> : <ul key={k} className={cls}>{lis}</ul>)
      continue
    }
    const para: string[] = []
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |\||> |- |\d+\. )/.test(lines[i])) para.push(lines[i++])
    blocks.push(<p key={k} className="my-4 text-muted-foreground leading-relaxed">{inline(para.join(' '), k)}</p>)
  }
  return <div className="text-[15px]">{blocks}</div>
}
