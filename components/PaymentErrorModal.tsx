'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PaymentErrorModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export default function PaymentErrorModal({
  isOpen,
  onClose,
  message = 'There was a problem processing your payment.'
}: PaymentErrorModalProps) {
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setShow(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleRetry = () => {
    handleClose()
    router.push('/pricing')
  }

  if (!isOpen) return null

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

        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          {message}
        </p>

        {/* Error Details */}
        <div className="bg-red-50 rounded-xl p-6 mb-6 border border-red-100">
          <p className="text-sm text-gray-700 mb-3">
            Possible reasons:
          </p>
          <ul className="text-sm text-gray-600 text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Insufficient funds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Card declined</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Technical issue</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-theme-primary text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <button
            onClick={handleClose}
            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Pay Later
          </button>
        </div>

        {/* Support link */}
        <p className="mt-6 text-sm text-gray-500">
          Having issues? Contact us:{' '}
          <a href="mailto:support@plainwrite.com" className="text-theme-primary hover:underline">
            support@plainwrite.com
          </a>
        </p>
      </div>
    </div>
  )
}
