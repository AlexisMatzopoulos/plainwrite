import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'EchtSchreib: KI-Humanisierer kostenlos, KI-Detektoren umgehen',
  description: 'Umgehen Sie KI-Detektoren mit EchtSchreib – dem führenden KI-Humanisierer-Tool. Machen Sie KI-generierte ChatGPT-Texte nicht erkennbar und lassen Sie sie zu 100% menschlich klingen.',
  openGraph: {
    title: 'EchtSchreib: KI-Humanisierer kostenlos, KI-Detektoren umgehen',
    description: 'Umgehen Sie KI-Detektoren mit EchtSchreib – dem führenden KI-Humanisierer-Tool. Machen Sie KI-generierte ChatGPT-Texte nicht erkennbar und lassen Sie sie zu 100% menschlich klingen.',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 800,
        alt: 'EchtSchreib - KI-Humanisierer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EchtSchreib: KI-Humanisierer kostenlos, KI-Detektoren umgehen',
    description: 'Umgehen Sie KI-Detektoren mit EchtSchreib – dem führenden KI-Humanisierer-Tool. Machen Sie KI-generierte ChatGPT-Texte nicht erkennbar und lassen Sie sie zu 100% menschlich klingen.',
    images: ['/images/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="font-sans antialiased bg-white min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
