'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import HeroSection from '@/components/HeroSection'
import AIHumanizerSection from '@/components/AIHumanizerSection'
import AIHumanizerLoggedOut from '@/components/AIHumanizerLoggedOut'
import FeaturesSection from '@/components/FeaturesSection'
import PaymentSuccessModal from '@/components/PaymentSuccessModal'
import PaymentErrorModal from '@/components/PaymentErrorModal'

interface HomeContentProps {
  isLoggedIn: boolean
}

/**
 * HomeContent - Client Component for Home Page
 *
 * Handles client-side interactions:
 * - Payment modal display from URL params
 * - Show/hide result panel state
 * - UI transitions and animations
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

      <main className="w-full relative overflow-hidden bg-white">
        <div className="w-full">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className={`grid grid-cols-1 gap-8 items-stretch transition-all duration-500 ${showResult ? '' : 'lg:grid-cols-2'}`}>
              {(!isLoggedIn || !showResult) && (
                <div className={`h-full transition-all duration-500 ${showResult ? 'opacity-0 -translate-x-full absolute' : 'opacity-100 translate-x-0'}`}>
                  <HeroSection isLoggedIn={isLoggedIn} />
                </div>
              )}
              <div className={`h-full ${showResult ? '' : 'lg:pl-8'}`}>
                {isLoggedIn ? (
                  <AIHumanizerSection showResult={showResult} setShowResult={setShowResult} />
                ) : (
                  <AIHumanizerLoggedOut />
                )}
              </div>
            </div>
          </div>
        </div>
        <FeaturesSection />
      </main>
    </>
  )
}
