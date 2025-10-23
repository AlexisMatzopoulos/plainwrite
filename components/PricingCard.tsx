'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface PricingCardProps {
  name: string
  wordsPerMonth: string
  originalPrice?: string
  price: string
  features: string[]
  isPopular?: boolean
  billingPeriod: 'month' | 'year'
}

export default function PricingCard({
  name,
  wordsPerMonth,
  originalPrice,
  price,
  features,
  isPopular = false,
  billingPeriod,
}: PricingCardProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!session) {
      // Redirect to sign in
      router.push('/signin')
      return
    }

    setLoading(true)

    try {
      // Convert plan name to tier
      const planTier = name.toLowerCase() as 'basis' | 'pro' | 'ultra'

      // Get current page URL to return to after payment
      const callbackUrl = `${window.location.origin}/subscribe/callback?returnTo=${encodeURIComponent(window.location.href)}`

      // Initialize Paystack transaction
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planTier,
          billingPeriod,
          callbackUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment')
      }

      // Redirect to Paystack checkout
      window.location.href = data.authorization_url
    } catch (error) {
      console.error('Error initializing subscription:', error)
      alert('Failed to start subscription process. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className={`border text-card-foreground relative bg-white transition-all duration-200 rounded-[16px] shadow-lg min-w-[340px] ${
        isPopular ? 'border-theme-primary hover:border-theme-primary' : 'hover:border-theme-primary'
      }`}
    >
      {isPopular && (
        <div className="absolute top-6 right-4">
          <span className="bg-yellow-200 text-foreground px-3 py-1 rounded-md text-xs font-medium uppercase">
            AM BELIEBTESTEN
          </span>
        </div>
      )}

      <div className="flex flex-col space-y-1.5 p-12 pb-6">
        <div className="tracking-tight text-3xl font-semibold text-[#0F172A]">{name}</div>
        <div className="text-sm text-theme-primary">{wordsPerMonth}</div>

        <div className="mt-2 space-y-1 flex items-end gap-4">
          <div className="flex items-baseline lg:items-baseline md:items-center gap-4 flex-row lg:flex-row md:flex-col w-full flex-grow">
            {originalPrice && (
              <div className="text-sm text-muted-foreground">
                <span className="line-through">{originalPrice}</span>
              </div>
            )}
            <span className="text-4xl font-bold text-[#0F172A]">{price}</span>
            <span className="text-sm text-muted-foreground self-center">
              {billingPeriod === 'year' ? (
                <div>
                  Pro Monat
                  <br />
                  Jährlich abgerechnet
                </div>
              ) : (
                <div>Pro Monat</div>
              )}
            </span>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 w-full rounded-[14px] py-8 text-white text-lg bg-theme-primary bg-theme-primary-hover border"
          >
            {loading ? 'Wird geladen...' : 'Abonnieren'}
          </button>
          <hr className="mt-6 border-t border-slate-300" />
        </div>
      </div>

      <div className="p-8 pt-0 pb-8">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-theme-primary mt-0.5 shrink-0"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <span className="text-sm text-[#4B5563]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
