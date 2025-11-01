'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
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
 * - Auth state via Supabase Auth (client-side, fast)
 * - Payment modal display from URL params
 * - Centered layout with HeroSection as header and text box as main focus
 * - Full marketing sections below
 */
export function HomeContent() {
  const { user, loading } = useAuth()
  const isLoggedIn = !loading && !!user
  const isLoading = loading
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
  const [hasAuthCookies, setHasAuthCookies] = useState(false)

  // Detect if user likely has a session by checking for auth cookies
  // This helps show the correct skeleton during loading
  useEffect(() => {
    setHasAuthCookies(document.cookie.includes('sb-'))
  }, [])

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
      const message = searchParams.get('message') || 'There was a problem processing your payment.'
      setErrorMessage(decodeURIComponent(message))
      setShowErrorModal(true)

      // Clean URL params
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [searchParams])

  // Show skeleton matching expected auth state while checking auth
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

        {/* Show different skeleton based on whether user has auth cookies */}
        {hasAuthCookies ? (
          // Logged-in skeleton (two panels)
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
        ) : (
          // Logged-out skeleton (hero + single panel)
          <main className="w-full bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-6">
              <section className="flex flex-col">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-full">
                    {/* Title skeleton */}
                    <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>

                    {/* Subtitle skeleton */}
                    <div className="h-6 w-full max-w-3xl bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>

                    {/* Features skeleton */}
                    <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mb-8 justify-center">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mt-0.5 flex-shrink-0"></div>
                        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mt-0.5 flex-shrink-0"></div>
                        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mt-0.5 flex-shrink-0"></div>
                        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button skeleton */}
                  <div className="flex flex-col items-center mt-8">
                    <div className="h-14 w-48 bg-gray-300 rounded-[14px] animate-pulse mb-2"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </section>
            </div>

            {/* Text Input Panel skeleton */}
            <div className="w-full max-w-7xl mx-auto py-4">
              <section className="flex flex-col" style={{ height: '80vh' }}>
                <div className="grid grid-cols-1 gap-6 flex-1">
                  <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 20px' }}>
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center">
                      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Style buttons skeleton */}
                    <div className="px-4 pb-3">
                      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="flex gap-2 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                          <div key={i} className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                      </div>
                    </div>

                    {/* Textarea skeleton */}
                    <div className="px-4 flex-1 relative flex">
                      <div className="w-full h-full bg-gray-100 rounded animate-pulse"></div>
                    </div>

                    {/* Footer with button */}
                    <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center">
                      <div className="h-9 w-32 bg-gray-300 rounded-[10px] animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          </main>
        )}
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
        {/* <StepsSection />
        <FeaturesSection />
        <DetectorsSection />
        <UniversitiesSection />
        <TestimonialsSection />
        {!isLoggedIn && <CTASection />}
        <FAQSection /> */}
      </main>
    </>
  )
}
