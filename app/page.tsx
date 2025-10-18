'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AIHumanizerSection from '@/components/AIHumanizerSection'
import AIHumanizerLoggedOut from '@/components/AIHumanizerLoggedOut'
import DetectorsSection from '@/components/DetectorsSection'
import StepsSection from '@/components/StepsSection'
import FeaturesSection from '@/components/FeaturesSection'
import UniversitiesSection from '@/components/UniversitiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBalanceUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} refreshKey={refreshKey} />

      <main className="w-full relative overflow-hidden bg-white">
        {/* Abstract gradient background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-green-200 via-green-100 to-transparent rounded-full blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-200 via-green-100 to-transparent rounded-full blur-3xl opacity-60 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-green-100 to-transparent rounded-full blur-2xl opacity-50"></div>
        </div>
        <div className="w-full">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <HeroSection isLoggedIn={isLoggedIn} />
              <div className="lg:pl-8">
                {isLoggedIn ? <AIHumanizerSection onBalanceUpdate={handleBalanceUpdate} /> : <AIHumanizerLoggedOut />}
              </div>
            </div>
          </div>
        </div>
        <UniversitiesSection />
        <StepsSection />
        <FeaturesSection />
        <DetectorsSection />
        <TestimonialsSection isLoggedIn={isLoggedIn} />
        {/* {!isLoggedIn && <CTASection />} */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}
