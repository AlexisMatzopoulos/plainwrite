'use client'

import { useState } from 'react'
import PricingCard from './PricingCard'
import Link from 'next/link'

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('year')

  const pricingData = {
    month: [
      {
        name: 'Basic',
        wordsPerMonth: '5,000 words per month',
        price: 'R79.99',
        features: [
          '500 words per request',
          'Bypass all AI detectors (incl. Turnitin & GPTZero)',
          'Basic Humanization Engine',
          'Plagiarism-free',
          'Error-free rewriting',
          'Undetectable results',
          'Unlimited AI detection',
          '20 languages supported',
        ],
      },
      {
        name: 'Pro',
        wordsPerMonth: '15,000 words per month',
        price: 'R239.99',
        isPopular: true,
        features: [
          '1,500 words per request',
          'My Writing Style',
          'Bypass all AI detectors (incl. Turnitin & GPTZero)',
          'Advanced Humanization Engine',
          'Plagiarism-free',
          'Error-free rewriting',
          'Undetectable results',
          'Unlimited AI detection',
          '50+ languages supported',
          'Advanced Turnitin Bypass Engine',
          'Human-like results',
          'Unlimited grammar checks',
          'Fast mode',
        ],
      },
      {
        name: 'Ultra',
        wordsPerMonth: '30,000 words per month',
        price: 'R479.99',
        features: [
          '3,000 words per request',
          'My Writing Style',
          'Bypass all AI detectors (incl. Turnitin & GPTZero)',
          'Advanced Humanization Engine',
          'Plagiarism-free',
          'Error-free rewriting',
          'Undetectable results',
          'Unlimited AI detection',
          '50+ languages supported',
          'Advanced Turnitin Bypass Engine',
          'Human-like results',
          'Unlimited grammar checks',
          'Fast mode',
          'Ultra-human writing output',
          'Priority support',
        ],
      },
    ],
    year: [
      {
        name: 'Basic',
        wordsPerMonth: '5,000 words per month',
        originalPrice: 'R79.99',
        price: 'R39.99',
        features: [
          '500 words per request',
          'Bypass all AI detectors (incl. Turnitin & GPTZero)',
          'Basic Humanization Engine',
          'Plagiarism-free',
          'Error-free rewriting',
          'Undetectable results',
          'Unlimited AI detection',
          '20 languages supported',
        ],
      },
      {
        name: 'Pro',
        wordsPerMonth: '15,000 words per month',
        originalPrice: 'R239.99',
        price: 'R119.99',
        isPopular: true,
        features: [
          '1,500 words per request',
          'My Writing Style',
          'Bypass all AI detectors (incl. Turnitin & GPTZero)',
          'Advanced Humanization Engine',
          'Plagiarism-free',
          'Error-free rewriting',
          'Undetectable results',
          'Unlimited AI detection',
          '50+ languages supported',
          'Advanced Turnitin Bypass Engine',
          'Human-like results',
          'Unlimited grammar checks',
          'Fast mode',
        ],
      },
      {
        name: 'Ultra',
        wordsPerMonth: '30,000 words per month',
        originalPrice: 'R479.99',
        price: 'R239.99',
        features: [
          '3,000 words per request',
          'My Writing Style',
          'Bypass all AI detectors (incl. Turnitin & GPTZero)',
          'Advanced Humanization Engine',
          'Plagiarism-free',
          'Error-free rewriting',
          'Undetectable results',
          'Unlimited AI detection',
          '50+ languages supported',
          'Advanced Turnitin Bypass Engine',
          'Human-like results',
          'Unlimited grammar checks',
          'Fast mode',
          'Ultra-human writing output',
          'Priority support',
        ],
      },
    ],
  }

  const currentPricing = pricingData[billingPeriod]

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: "url('/images/gradient.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="lg:container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-[#0F172A] mb-6">
            Flexible pricing plans for you
          </h1>

          {/* Billing Toggle */}
          <div className="w-fit mx-auto">
            <div className="h-13 items-center justify-center rounded-[14px] p-1 text-muted-foreground grid w-[360px] grid-cols-2 bg-white">
              <button
                onClick={() => setBillingPeriod('month')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium transition-all ${
                  billingPeriod === 'month'
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'hover:bg-slate-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('year')}
                className={`justify-center whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium transition-all flex items-center gap-1 ${
                  billingPeriod === 'year'
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'hover:bg-slate-100'
                }`}
              >
                Annual
                <span className="text-xs text-foreground bg-yellow-200 font-medium rounded-md px-2 py-1 uppercase text-black">
                  Save 50%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentPricing.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              wordsPerMonth={plan.wordsPerMonth}
              originalPrice={plan.originalPrice}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              billingPeriod={billingPeriod}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-950 font-semibold mb-2">
            Need more?{' '}
            <a href="mailto:hello.naturalwrite@gmail.com" className="text-emerald-500 underline">
              Contact Us
            </a>
          </p>
          <p className="text-sm text-slate-500">
            By clicking the Subscribe button, you agree to our{' '}
            <Link href="/terms-of-service" className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
