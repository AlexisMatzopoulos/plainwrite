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
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-pink-300 via-rose-200 to-transparent rounded-full blur-3xl opacity-40 -translate-y-1/4"></div>
          <div className="absolute top-0 right-1/3 w-[350px] h-[350px] bg-gradient-to-bl from-purple-300 via-fuchsia-200 to-transparent rounded-full blur-3xl opacity-35 -translate-y-1/3"></div>
          <div className="absolute top-1/5 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-300 via-yellow-200 to-transparent rounded-full blur-3xl opacity-35 translate-x-1/4"></div>
          <div className="absolute top-2/5 left-0 w-[350px] h-[350px] bg-gradient-to-r from-rose-300 via-pink-200 to-transparent rounded-full blur-3xl opacity-30 -translate-x-1/4"></div>
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-pink-400 via-rose-300 to-transparent rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-3/5 left-1/3 w-[350px] h-[350px] bg-gradient-to-tl from-orange-300 via-amber-200 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-[65%] right-1/2 w-[380px] h-[380px] bg-gradient-to-br from-rose-300 via-pink-200 to-transparent rounded-full blur-3xl opacity-35"></div>
          <div className="absolute top-[70%] left-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-300 via-fuchsia-200 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-[75%] right-1/3 w-[350px] h-[350px] bg-gradient-to-bl from-amber-300 via-yellow-200 to-transparent rounded-full blur-3xl opacity-35"></div>
          <div className="absolute top-[80%] left-0 w-[400px] h-[400px] bg-gradient-to-r from-pink-400 via-rose-200 to-transparent rounded-full blur-3xl opacity-30 -translate-x-1/4"></div>
          <div className="absolute top-[85%] right-0 w-[380px] h-[380px] bg-gradient-to-l from-orange-300 via-amber-200 to-transparent rounded-full blur-3xl opacity-35 translate-x-1/4"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-bl from-purple-300 via-fuchsia-200 to-transparent rounded-full blur-3xl opacity-35"></div>
          <div className="absolute bottom-1/5 left-1/3 w-[350px] h-[350px] bg-gradient-to-tr from-rose-300 via-pink-200 to-transparent rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-1/6 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-pink-400 via-rose-300 to-transparent rounded-full blur-3xl opacity-35"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-amber-300 via-yellow-200 to-transparent rounded-full blur-3xl opacity-40 -translate-y-1/4"></div>
          <div className="absolute bottom-1/5 right-0 w-[350px] h-[350px] bg-gradient-to-tl from-pink-400 via-rose-200 to-transparent rounded-full blur-3xl opacity-35 translate-x-1/4"></div>
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
