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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              Wir verwenden Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren und zu verbessern.
              Weitere Informationen finden Sie in unserer{' '}
              <a
                href="/datenschutz"
                className="text-blue-600 hover:text-blue-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung
              </a>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ablehnen
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
