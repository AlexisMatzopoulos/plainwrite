'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function CallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null)

  useEffect(() => {
    const verifyTransaction = async () => {
      const reference = searchParams.get('reference')
      const returnTo = searchParams.get('returnTo')

      if (!reference) {
        setError('Keine Transaktionsreferenz gefunden')
        setVerifying(false)
        return
      }

      try {
        const response = await fetch(`/api/paystack/verify?reference=${reference}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Fehler bei der Verifizierung der Zahlung')
        }

        setSuccess(true)
        setSubscriptionDetails(data)
        setVerifying(false)

        // Redirect to return URL after 3 seconds
        setTimeout(() => {
          if (returnTo) {
            window.location.href = decodeURIComponent(returnTo)
          } else {
            router.push('/')
          }
        }, 3000)
      } catch (err) {
        console.error('Verification error:', err)
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
        setVerifying(false)
      }
    }

    if (status === 'authenticated') {
      verifyTransaction()
    } else if (status === 'unauthenticated') {
      setError('Sie müssen angemeldet sein')
      setVerifying(false)
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

          {success && subscriptionDetails && (
            <>
              <div className="mb-4">
                <svg
                  className="h-12 w-12 mx-auto text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Zahlung erfolgreich!</h2>
              <p className="text-gray-600 mb-4">
                Ihr {subscriptionDetails.subscription.plan}-Abonnement wurde aktiviert.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Plan:</span> {subscriptionDetails.subscription.plan}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Wörter pro Monat:</span>{' '}
                  {subscriptionDetails.subscription.wordsLimit.toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Abrechnung:</span>{' '}
                  {subscriptionDetails.subscription.period === 'month' ? 'Monatlich' : 'Jährlich'}
                </p>
              </div>
              <p className="text-sm text-gray-500">Sie werden in Kürze weitergeleitet...</p>
            </>
          )}

          {error && (
            <>
              <div className="mb-4">
                <svg
                  className="h-12 w-12 mx-auto text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Fehler</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => router.push('/preise')}
                className="inline-flex items-center justify-center px-4 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90"
              >
                Zurück zur Preisübersicht
              </button>
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
