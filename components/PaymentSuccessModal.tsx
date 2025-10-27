'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  words: number
  billingPeriod?: string
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  plan,
  words,
  billingPeriod
}: PaymentSuccessModalProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)

      // Trigger confetti
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)

      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        handleClose()
      }, 4000)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [isOpen])

  const handleClose = () => {
    setShow(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for fade-out animation
  }

  if (!isOpen) return null

  const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1)

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all duration-300 ${
          show ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Animated Checkmark */}
        <div className="mb-6 relative">
          <svg
            className="w-20 h-20 mx-auto"
            viewBox="0 0 100 100"
          >
            <circle
              className="animate-[drawCircle_0.6s_ease-in-out_forwards]"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                strokeDasharray: 283,
                strokeDashoffset: 283,
              }}
            />
            <path
              className="animate-[drawCheck_0.4s_0.3s_ease-in-out_forwards]"
              d="M30 50 L45 65 L70 35"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 60,
                strokeDashoffset: 60,
              }}
            />
          </svg>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your {planDisplay} Plan is now active
        </p>

        {/* Plan Details */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-700 font-semibold">
              {planDisplay}-Plan
            </p>
          </div>
          <p className="text-2xl font-bold text-green-700 mb-2">
            {words.toLocaleString()} Words
          </p>
          <p className="text-sm text-gray-600">
            {billingPeriod === 'year' ? 'per month (billed annually)' : 'per month'}
          </p>
        </div>

        {/* Email confirmation */}
        <p className="text-sm text-gray-500 mb-6">
          A confirmation has been sent to your email
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClose}
          className="w-full bg-theme-primary text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
        >
          Get Started →
        </button>

        {/* Secondary link */}
        <button
          onClick={() => window.open('/profile', '_blank')}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          View Invoice
        </button>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
