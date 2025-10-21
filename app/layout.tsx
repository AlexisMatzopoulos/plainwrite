import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://echtschreib.de'),
  title: 'EchtSchreib: KI-Schreibstil-Umwandler - Akademisch, Kreativ, Formal, Casual',
  description: 'Wandle deinen Text in jeden gewünschten Schreibstil um mit EchtSchreib. Wähle zwischen akademischem, kreativem, formellem oder lockerem Stil für perfekt angepasste Texte.',
  openGraph: {
    title: 'EchtSchreib: KI-Schreibstil-Umwandler - Akademisch, Kreativ, Formal, Casual',
    description: 'Wandle deinen Text in jeden gewünschten Schreibstil um mit EchtSchreib. Wähle zwischen akademischem, kreativem, formellem oder lockerem Stil für perfekt angepasste Texte.',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 800,
        alt: 'EchtSchreib - Schreibstil-Umwandler',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EchtSchreib: KI-Schreibstil-Umwandler - Akademisch, Kreativ, Formal, Casual',
    description: 'Wandle deinen Text in jeden gewünschten Schreibstil um mit EchtSchreib. Wähle zwischen akademischem, kreativem, formellem oder lockerem Stil für perfekt angepasste Texte.',
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
