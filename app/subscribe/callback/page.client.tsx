'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { analytics } from '@/lib/analytics'

function CallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [verifying, setVerifying] = useState(true)

  useEffect(() => {
    const verifyTransaction = async () => {
      const reference = searchParams.get('reference')
      const returnTo = searchParams.get('returnTo') || '/'

      if (!reference) {
        // Redirect with error
        router.push(`${returnTo}?payment=error&message=${encodeURIComponent('Keine Transaktionsreferenz gefunden')}`)
        return
      }

      try {
        const response = await fetch(`/api/paystack/verify?reference=${reference}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Fehler bei der Verifizierung der Zahlung')
        }

        // Success! Redirect with success params
        const plan = data.subscription?.plan || 'pro'
        const words = data.subscription?.wordsLimit || 0
        const period = data.subscription?.period || 'month'

        // Track successful payment
        analytics.track('payment_completed', {
          plan,
          words_limit: words,
          billing_period: period,
        })
        analytics.track('subscription_started', {
          plan,
          words_limit: words,
          billing_period: period,
        })

        const successUrl = `${decodeURIComponent(returnTo)}?payment=success&plan=${plan}&words=${words}&period=${period}`
        router.push(successUrl)
      } catch (err) {
        console.error('Verification error:', err)
        const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten'
        router.push(`${returnTo}?payment=error&message=${encodeURIComponent(errorMessage)}`)
      }
    }

    if (status === 'authenticated') {
      verifyTransaction()
    } else if (status === 'unauthenticated') {
      router.push('/?payment=error&message=' + encodeURIComponent('Sie müssen angemeldet sein'))
    }
  }, [searchParams, router, status])

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {verifying && (
          <>
            <div className="mb-4">
              <svg
                className="animate-spin h-12 w-12 mx-auto text-theme-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Zahlung wird verifiziert...</h2>
            <p className="text-gray-600">Bitte warten Sie einen Moment</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function CallbackPageClient() {
  return (
    <Suspense fallback={<div>Wird geladen...</div>}>
      <CallbackContent />
    </Suspense>
  )
}
