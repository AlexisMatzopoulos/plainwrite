import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PricingContent } from './PricingContent'

/**
 * Pricing Page - Server Component Wrapper (Next.js 15 Pattern)
 *
 * This page follows the official Next.js 15 pattern:
 * - Server Component can import async Header component
 * - Client component (PricingContent) handles URL params and modals
 */
export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-white">
        <Suspense fallback={<div>Wird geladen...</div>}>
          <PricingContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
