'use client'

import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import PricingSection from '@/components/PricingSection'
import Footer from '@/components/Footer'

export default function PricingPage() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-1">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
