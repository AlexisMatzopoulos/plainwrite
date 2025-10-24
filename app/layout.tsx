import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://echtschreib.de'),
  title: 'EchtSchreib: AI Writing Style Converter - Academic, Creative, Formal, Casual',
  description: 'Transform your text into any desired writing style with EchtSchreib. Choose between academic, creative, formal, or casual style for perfectly adapted texts.',
  openGraph: {
    title: 'EchtSchreib: AI Writing Style Converter - Academic, Creative, Formal, Casual',
    description: 'Transform your text into any desired writing style with EchtSchreib. Choose between academic, creative, formal, or casual style for perfectly adapted texts.',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 800,
        alt: 'EchtSchreib - Writing Style Converter',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EchtSchreib: AI Writing Style Converter - Academic, Creative, Formal, Casual',
    description: 'Transform your text into any desired writing style with EchtSchreib. Choose between academic, creative, formal, or casual style for perfectly adapted texts.',
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
