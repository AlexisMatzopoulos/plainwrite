import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CallbackContent } from './CallbackContent'

/**
 * Subscribe Callback Page - Server Component Wrapper (Next.js 15 Pattern)
 *
 * This page follows the official Next.js 15 pattern:
 * - Server Component can import async Header component
 * - Client component (CallbackContent) handles payment verification
 */
export default function CallbackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <CallbackContent />
      </Suspense>
      <Footer />
    </div>
  )
}
