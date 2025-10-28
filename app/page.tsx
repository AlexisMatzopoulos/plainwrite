import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HomeContent } from './HomeContent'

/**
 * Home Page - Server Component with Client-Side Auth (Next.js 15 Pattern)
 *
 * This page follows Next.js 15 best practices:
 * - Server component for fast initial render
 * - Client components handle auth state via useSession
 * - No blocking server-side database queries
 * - Progressive enhancement with loading states
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HomeContent />
      <Footer />
    </div>
  )
}
