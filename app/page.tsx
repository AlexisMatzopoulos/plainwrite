'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AIHumanizerSection from '@/components/AIHumanizerSection'
import AIHumanizerLoggedOut from '@/components/AIHumanizerLoggedOut'
import AIHumanizerSkeleton from '@/components/AIHumanizerSkeleton'
import DetectorsSection from '@/components/DetectorsSection'
import StepsSection from '@/components/StepsSection'
import FeaturesSection from '@/components/FeaturesSection'
import UniversitiesSection from '@/components/UniversitiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const isLoading = status === 'loading'
  const [refreshKey, setRefreshKey] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Automatically show result panel when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      setShowResult(true)
    } else {
      setShowResult(false)
    }
  }, [isLoggedIn])

  const handleBalanceUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} refreshKey={refreshKey} />

      <main className="w-full relative overflow-hidden bg-white">
        <div className="w-full" /* style={{ backgroundColor: '#ffe699' }} */>
          <div className="container mx-auto px-4 py-16 relative z-10">
            {isLoading ? (
              // Show skeleton during auth loading - full width
              <div className="w-full">
                <AIHumanizerSkeleton />
              </div>
            ) : (
              <div className={`grid grid-cols-1 gap-8 items-stretch transition-all duration-500 ${showResult ? '' : 'lg:grid-cols-2'}`}>
                {(!isLoggedIn || !showResult) && (
                  <div className={`h-full transition-all duration-500 ${showResult ? 'opacity-0 -translate-x-full absolute' : 'opacity-100 translate-x-0'}`}>
                    <HeroSection isLoggedIn={isLoggedIn} />
                  </div>
                )}
                <div className={`h-full ${showResult ? '' : 'lg:pl-8'}`}>
                  {isLoggedIn ? <AIHumanizerSection onBalanceUpdate={handleBalanceUpdate} showResult={showResult} setShowResult={setShowResult} /> : <AIHumanizerLoggedOut />}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <StepsSection /> */}
        {!isLoading && <FeaturesSection />}
        {/* <DetectorsSection /> */}
        {/* <FAQSection /> */}
      </main>

      <Footer />
    </div>
  )
}
