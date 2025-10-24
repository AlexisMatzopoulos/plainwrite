"use client"

import { useState, useEffect } from 'react'
import { analytics } from '@/lib/analytics'

const CONSENT_KEY = 'echtschreib_analytics_consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_KEY)

    if (consent === null) {
      // No choice made yet, show banner
      setShowBanner(true)
    } else if (consent === 'accepted') {
      // User previously accepted, opt in
      analytics.optIn()
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    analytics.optIn()
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    analytics.optOut()
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 animate-fade-in">
      <div className="px-6 py-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Cookie Settings</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies and similar technologies to analyze and improve the use of our website.
              For more information, see our{' '}
              <a
                href="/privacy-policy"
                className="text-theme-primary hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={rejectCookies}
              className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 px-5 py-2.5 text-sm font-medium text-black bg-theme-primary rounded-xl hover:bg-theme-primary-hover transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
