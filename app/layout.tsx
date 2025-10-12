import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Natural Write: AI Humanizer Free, Bypass AI Detectors',
  description: 'Bypass AI detectors with NaturalWrite – the top AI humanizer tool. Make AI-generated ChatGPT text undetectable and sound 100% human to avoid being flagged.',
  openGraph: {
    title: 'Natural Write: AI Humanizer Free, Bypass AI Detectors',
    description: 'Bypass AI detectors with NaturalWrite – the top AI humanizer tool. Make AI-generated ChatGPT text undetectable and sound 100% human to avoid being flagged.',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 800,
        alt: 'Natural Write - AI Humanizer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natural Write: AI Humanizer Free, Bypass AI Detectors',
    description: 'Bypass AI detectors with NaturalWrite – the top AI humanizer tool. Make AI-generated ChatGPT text undetectable and sound 100% human to avoid being flagged.',
    images: ['/images/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
