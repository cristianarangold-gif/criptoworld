import type { LucideIcon } from 'lucide-react'
import { SITE } from '@/lib/site'

export function LegalPage({
  icon: Icon,
  title,
  intro,
  children,
}: {
  icon: LucideIcon
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-8 w-8 text-primary" />
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="mb-8 text-xs text-muted-foreground">Última actualización: {SITE.legalUpdated}</p>
      {intro && <p className="mb-8 text-base text-foreground/90 leading-relaxed">{intro}</p>}
      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground [&_table]:w-full [&_th]:text-left [&_th]:text-foreground [&_th]:py-2 [&_th]:pr-3 [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top [&_tr]:border-b [&_tr]:border-border/40">
        {children}
      </div>
    </div>
  )
}
