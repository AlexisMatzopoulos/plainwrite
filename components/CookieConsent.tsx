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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Cookie-Einstellungen</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Wir verwenden Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren und zu verbessern.
              Weitere Informationen finden Sie in unserer{' '}
              <a
                href="/datenschutz"
                className="text-theme-primary hover:underline font-medium"
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
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Ablehnen
            </button>
            <button
              onClick={acceptCookies}
              className="px-5 py-2.5 text-sm font-medium text-black bg-theme-primary rounded-xl hover:bg-theme-primary-hover transition-colors"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
