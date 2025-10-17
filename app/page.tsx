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

      <main className="w-full">
        <div
          className="w-full bg-cover bg-top md:bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/images/gradient2.webp')" }}
        >
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <HeroSection isLoggedIn={isLoggedIn} />
              <div className="lg:pl-8">
                {isLoggedIn ? <AIHumanizerSection onBalanceUpdate={handleBalanceUpdate} /> : <AIHumanizerLoggedOut />}
              </div>
            </div>
          </div>
        </div>
        <DetectorsSection />
        <StepsSection />
        <FeaturesSection />
        <UniversitiesSection />
        <TestimonialsSection isLoggedIn={isLoggedIn} />
        {/* {!isLoggedIn && <CTASection />} */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}
