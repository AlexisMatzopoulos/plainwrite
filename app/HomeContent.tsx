'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import AIHumanizerSection from '@/components/AIHumanizerSection'
import AIHumanizerLoggedOut from '@/components/AIHumanizerLoggedOut'
import PaymentSuccessModal from '@/components/PaymentSuccessModal'
import PaymentErrorModal from '@/components/PaymentErrorModal'

interface HomeContentProps {
  isLoggedIn: boolean
}

/**
 * HomeContent - Client Component for Home Page (Simplified Centered Design)
 *
 * Handles client-side interactions:
 * - Payment modal display from URL params
 * - Centered, minimal layout with focus on the text editor
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

      {/* Centered, Minimal Layout - Text Box Takes Up Most of Screen */}
      <main className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Optional: Simple centered heading */}
          {!isLoggedIn && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Transform Your Writing
              </h1>
              <p className="text-lg text-gray-600">
                Apply professional writing styles with AI
              </p>
            </div>
          )}

          {/* Main Text Editor - Takes Up Most of Screen */}
          <div className="w-full">
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
