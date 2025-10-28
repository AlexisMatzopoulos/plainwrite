'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
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
import PaymentSuccessModal from '@/components/PaymentSuccessModal'
import PaymentErrorModal from '@/components/PaymentErrorModal'

/**
 * HomeContent - Client Component for Home Page (Bypass AI Version - Centered Layout)
 *
 * Handles client-side interactions:
 * - Auth state via useSession hook (client-side, fast)
 * - Payment modal display from URL params
 * - Centered layout with HeroSection as header and text box as main focus
 * - Full marketing sections below
 */
export function HomeContent() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const isLoading = status === 'loading'
  const searchParams = useSearchParams()
  const [showResult, setShowResult] = useState(isLoggedIn)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    plan: '',
    words: 0,
    period: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  // Automatically show result panel when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      setShowResult(true)
    } else {
      setShowResult(false)
    }
  }, [isLoggedIn])

  // Check for payment status in URL params
  useEffect(() => {
    const paymentStatus = searchParams.get('payment')

    if (paymentStatus === 'success') {
      const plan = searchParams.get('plan') || 'pro'
      const words = parseInt(searchParams.get('words') || '0')
      const period = searchParams.get('period') || 'month'

      setPaymentDetails({ plan, words, period })
      setShowSuccessModal(true)

      // Clean URL params
      window.history.replaceState({}, '', window.location.pathname)
    } else if (paymentStatus === 'error') {
      const message = searchParams.get('message') || 'Es gab ein Problem bei der Verarbeitung Ihrer Zahlung.'
      setErrorMessage(decodeURIComponent(message))
      setShowErrorModal(true)

      // Clean URL params
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [searchParams])

  // Show skeleton matching logged-in homepage structure while checking auth
  if (isLoading) {
    return (
      <>
        {/* Payment Modals */}
        <PaymentSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          plan={paymentDetails.plan}
          words={paymentDetails.words}
          billingPeriod={paymentDetails.period}
        />

        <PaymentErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          message={errorMessage}
        />

        {/* Skeleton matching logged-in homepage structure */}
        <main className="w-full bg-white">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-7xl mx-auto py-4">
              <section className="flex flex-col" style={{ height: '80vh' }}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1">
                  {/* Left Panel Skeleton - Your Text */}
                  <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 20px' }}>
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center">
                      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {/* Textarea skeleton */}
                    <div className="px-4 flex-1 relative flex">
                      <div className="w-full h-full bg-gray-100 rounded animate-pulse"></div>
                    </div>
                    {/* Footer with buttons */}
                    <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center">
                      <div className="flex gap-2 w-full sm:w-auto">
                        <div className="h-9 w-28 bg-gray-200 rounded-[10px] animate-pulse"></div>
                        <div className="h-9 w-32 bg-gray-300 rounded-[10px] animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel Skeleton - Result */}
                  <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 20px' }}>
                    {/* Header */}
                    <div className="p-4">
                      <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {/* Textarea skeleton */}
                    <div className="flex-1 flex flex-col" style={{ minHeight: '400px' }}>
                      <div className="px-4 flex-1 relative flex">
                        <div className="w-full h-full bg-gray-100 rounded animate-pulse"></div>
                      </div>
                      {/* Footer */}
                      <div className="mt-auto px-4 py-3 flex justify-between items-center">
                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      {/* Payment Modals */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        plan={paymentDetails.plan}
        words={paymentDetails.words}
        billingPeriod={paymentDetails.period}
      />

      <PaymentErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />

      {/* Centered Layout with HeroSection as Header */}
      <main className="w-full bg-white">
        <div className="container mx-auto px-4">
          {/* Centered Hero Section Header (only show when not logged in) */}
          {!isLoggedIn && (
            <div className="max-w-4xl mx-auto text-center py-6">
              <HeroSection isLoggedIn={isLoggedIn} />
            </div>
          )}

          {/* Main Text Editor - Takes Up Most of Screen */}
          <div className="w-full max-w-7xl mx-auto py-4">
            {isLoggedIn ? (
              <AIHumanizerSection showResult={showResult} setShowResult={setShowResult} />
            ) : (
              <AIHumanizerLoggedOut />
            )}
          </div>
        </div>

        {/* Marketing Sections */}
        <StepsSection />
        <FeaturesSection />
        <DetectorsSection />
        <UniversitiesSection />
        <TestimonialsSection />
        {!isLoggedIn && <CTASection />}
        <FAQSection />
      </main>
    </>
  )
}
