import { Suspense } from 'react'
import Header from '@/components/Header'
import PricingPageClient from './page.client'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header  />
      <main className="flex-1 bg-white">
        <Suspense fallback={<div>Wird geladen...</div>}>
          <PricingPageClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
