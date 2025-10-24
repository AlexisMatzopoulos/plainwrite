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
        originalPrice: undefined,
        price: '€5.99',
        features: [
          '500 words per request',
          'Plagiarism-free',
          'Error-free rephrasing',
          '20 supported languages',
        ],
      },
      {
        name: 'Pro',
        wordsPerMonth: '15,000 words per month',
        originalPrice: undefined,
        price: '€19.99',
        isPopular: true,
        features: [
          '1,500 words per request',
          'My writing style',
          'Plagiarism-free',
          'Error-free rephrasing',
          'Over 50 supported languages',
          'Unlimited grammar checks',
          'Fast mode',
        ],
      },
      {
        name: 'Ultra',
        wordsPerMonth: '30,000 words per month',
        originalPrice: undefined,
        price: '€39.99',
        features: [
          '3,000 words per request',
          'My writing style',
          'Plagiarism-free',
          'Error-free rephrasing',
          'Over 50 supported languages',
          'Unlimited grammar checks',
          'Fast mode',
          'Priority support',
        ],
      },
    ],
    year: [
      {
        name: 'Basic',
        wordsPerMonth: '5,000 words per month',
        originalPrice: '€5.99',
        price: '€2.99',
        features: [
          '500 words per request',
          'Plagiarism-free',
          'Error-free rephrasing',
          '20 supported languages',
        ],
      },
      {
        name: 'Pro',
        wordsPerMonth: '15,000 words per month',
        originalPrice: '€19.99',
        price: '€9.99',
        isPopular: true,
        features: [
          '1,500 words per request',
          'My writing style',
          'Plagiarism-free',
          'Error-free rephrasing',
          'Over 50 supported languages',
          'Unlimited grammar checks',
          'Fast mode',
        ],
      },
      {
        name: 'Ultra',
        wordsPerMonth: '30,000 words per month',
        originalPrice: '€39.99',
        price: '€19.99',
        features: [
          '3,000 words per request',
          'My writing style',
          'Plagiarism-free',
          'Error-free rephrasing',
          'Over 50 supported languages',
          'Unlimited grammar checks',
          'Fast mode',
          'Priority support',
        ],
      },
    ],
  }

  const currentPricing = pricingData[billingPeriod]

  return (
    <div
      className="w-full bg-white"
    >
      <div className="lg:container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-[#0F172A] mb-6">
            Flexible pricing plans for you
          </h1>

          {/* Billing Toggle */}
          <div className="w-fit mx-auto">
            <div className="h-13 items-center justify-center rounded-[14px] p-1 text-muted-foreground grid w-[360px] grid-cols-2 bg-slate-100 border-2 border-slate-200">
              <button
                onClick={() => setBillingPeriod('month')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium transition-all ${
                  billingPeriod === 'month'
                    ? 'bg-theme-primary text-white shadow-sm'
                    : 'hover:bg-slate-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('year')}
                className={`justify-center whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium transition-all flex items-center gap-1 ${
                  billingPeriod === 'year'
                    ? 'bg-theme-primary text-white shadow-sm'
                    : 'hover:bg-slate-100'
                }`}
              >
                Yearly
                <span className="text-xs text-foreground bg-yellow-200 font-medium rounded-md px-2 py-1 uppercase text-black">
                  Save 50%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentPricing.map((plan) => (
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
            <a href="mailto:echtschreib@gmail.com" className="text-emerald-500 underline">
              Contact us
            </a>
          </p>
          <p className="text-sm text-slate-500">
            By clicking the Subscribe button, you agree to our{' '}
            <Link href="/terms-of-service" className="underline">
              Terms of Service
            </Link>
            ,{' '}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            , and{' '}
            <Link href="/refund-policy" className="underline">
              Refund Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
