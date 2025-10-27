import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HomeContent } from './HomeContent'

/**
 * Home Page - Async Server Component (Next.js 15 Pattern)
 *
 * This page follows the official Next.js 15 pattern:
 * - Fetches auth status on the server
 * - Eliminates loading skeleton (auth check is instant server-side)
 * - Passes isLoggedIn as prop to client component
 * - Client component handles UI state and interactivity
 */
export default async function Home() {
  // Server-side auth check (Next.js docs: "Server Components support promises")
  const session = await getServerSession(authOptions)
  const isLoggedIn = !!session?.user

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<div>Wird geladen...</div>}>
        <HomeContent isLoggedIn={isLoggedIn} />
      </Suspense>
      <Footer />
    </div>
  )
}
