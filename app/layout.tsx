import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://plainwrite.com'),
  title: 'PlainWrite: AI Writing Style Converter - Academic, Creative, Formal, Casual',
  description: 'Transform your text into any desired writing style with PlainWrite. Choose between academic, creative, formal, or casual style for perfectly adapted texts.',
  openGraph: {
    title: 'PlainWrite: AI Writing Style Converter - Academic, Creative, Formal, Casual',
    description: 'Transform your text into any desired writing style with PlainWrite. Choose between academic, creative, formal, or casual style for perfectly adapted texts.',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 800,
        alt: 'PlainWrite - Writing Style Converter',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlainWrite: AI Writing Style Converter - Academic, Creative, Formal, Casual',
    description: 'Transform your text into any desired writing style with PlainWrite. Choose between academic, creative, formal, or casual style for perfectly adapted texts.',
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
