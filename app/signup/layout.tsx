import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear cuenta',
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
