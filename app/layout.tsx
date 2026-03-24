import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Influ Finder | Influencers en Uruguay - Directorio con métricas de influencers',
  description: 'Influ Finder: influencers en Uruguay con métricas de influencers (seguidores, engagement). Directorio de creadores para marcas. Busca por nicho, plataforma y colabora con el influencer ideal.',
  keywords: ['influ finder', 'influ finder uruguay', 'influencers en uruguay', 'influencers', 'métricas de influencer', 'metricas de influencer', 'directorio influencers', 'influencers uruguay', 'creadores uruguay', 'buscar influencer', 'marcas uruguay', 'engagement influencers'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Influ Finder - Influencers en Uruguay | Métricas de influencers',
    description: 'Directorio de influencers en Uruguay con métricas (seguidores, engagement). Encuentra al influencer ideal para tu marca.',
    url: 'https://influ-finder.com',
    siteName: 'Influ Finder',
    locale: 'es_UY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influ Finder - Influencers en Uruguay | Métricas de influencers',
    description: 'Directorio de influencers en Uruguay con métricas. Encuentra al influencer ideal para tu marca.',
  },
  metadataBase: new URL('https://influ-finder.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}

