import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InfluFinder - Directorio de Influencers Uruguay',
  description: 'Encuentra al influencer ideal para tu marca en minutos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

