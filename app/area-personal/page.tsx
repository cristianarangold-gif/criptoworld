import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { AreaPersonalClient } from '@/components/area-personal-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi área personal',
  description: 'Gestiona tu cartera virtual de criptomonedas y usa el simulador de inversión.',
}

export default async function AreaPersonalPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  return <AreaPersonalClient userName={session.user.name ?? 'Inversor'} />
}
