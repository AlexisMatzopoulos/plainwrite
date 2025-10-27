'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import HeroSection from '@/components/HeroSection'
import AIHumanizerSection from '@/components/AIHumanizerSection'
import AIHumanizerLoggedOut from '@/components/AIHumanizerLoggedOut'
import PaymentSuccessModal from '@/components/PaymentSuccessModal'
import PaymentErrorModal from '@/components/PaymentErrorModal'

interface HomeContentProps {
  isLoggedIn: boolean
}

/**
 * HomeContent - Client Component for Home Page (Centered Design)
 *
 * Handles client-side interactions:
 * - Payment modal display from URL params
 * - Centered layout with HeroSection as header and text box as main focus
 */
export function HomeContent({ isLoggedIn }: HomeContentProps) {
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
      </main>
    </>
  )
}
