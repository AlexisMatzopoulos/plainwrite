'use client'

import { useState } from 'react'
import PricingCard from './PricingCard'
import Link from 'next/link'

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('year')

  const pricingData = {
    month: [
      {
        name: 'Basis',
        wordsPerMonth: '5.000 Wörter pro Monat',
        originalPrice: undefined,
        price: '€5.99',
        features: [
          '500 Wörter pro Anfrage',
          'Umgeht alle KI-Detektoren (inkl. Turnitin & GPTZero)',
          'Basis-Humanisierungs-Engine',
          'Plagiatsfrei',
          'Fehlerfreie Umformulierung',
          'Nicht nachweisbare Ergebnisse',
          'Unbegrenzte KI-Erkennung',
          '20 unterstützte Sprachen',
        ],
      },
      {
        name: 'Pro',
        wordsPerMonth: '15.000 Wörter pro Monat',
        originalPrice: undefined,
        price: '€19.99',
        isPopular: true,
        features: [
          '1.500 Wörter pro Anfrage',
          'Mein Schreibstil',
          'Umgeht alle KI-Detektoren (inkl. Turnitin & GPTZero)',
          'Erweiterte Humanisierungs-Engine',
          'Plagiatsfrei',
          'Fehlerfreie Umformulierung',
          'Nicht nachweisbare Ergebnisse',
          'Unbegrenzte KI-Erkennung',
          'Über 50 unterstützte Sprachen',
          'Erweiterte Turnitin-Bypass-Engine',
          'Menschenähnliche Ergebnisse',
          'Unbegrenzte Grammatikprüfungen',
          'Schnellmodus',
        ],
      },
      {
        name: 'Ultra',
        wordsPerMonth: '30.000 Wörter pro Monat',
        originalPrice: undefined,
        price: '€39.99',
        features: [
          '3.000 Wörter pro Anfrage',
          'Mein Schreibstil',
          'Umgeht alle KI-Detektoren (inkl. Turnitin & GPTZero)',
          'Erweiterte Humanisierungs-Engine',
          'Plagiatsfrei',
          'Fehlerfreie Umformulierung',
          'Nicht nachweisbare Ergebnisse',
          'Unbegrenzte KI-Erkennung',
          'Über 50 unterstützte Sprachen',
          'Erweiterte Turnitin-Bypass-Engine',
          'Menschenähnliche Ergebnisse',
          'Unbegrenzte Grammatikprüfungen',
          'Schnellmodus',
          'Ultra-menschliche Schreibausgabe',
          'Prioritätssupport',
        ],
      },
    ],
    year: [
      {
        name: 'Basis',
        wordsPerMonth: '5.000 Wörter pro Monat',
        originalPrice: '€5.99',
        price: '€2.99',
        features: [
          '500 Wörter pro Anfrage',
          'Umgeht alle KI-Detektoren (inkl. Turnitin & GPTZero)',
          'Basis-Humanisierungs-Engine',
          'Plagiatsfrei',
          'Fehlerfreie Umformulierung',
          'Nicht nachweisbare Ergebnisse',
          'Unbegrenzte KI-Erkennung',
          '20 unterstützte Sprachen',
        ],
      },
      {
        name: 'Pro',
        wordsPerMonth: '15.000 Wörter pro Monat',
        originalPrice: '€19.99',
        price: '€9.99',
        isPopular: true,
        features: [
          '1.500 Wörter pro Anfrage',
          'Mein Schreibstil',
          'Umgeht alle KI-Detektoren (inkl. Turnitin & GPTZero)',
          'Erweiterte Humanisierungs-Engine',
          'Plagiatsfrei',
          'Fehlerfreie Umformulierung',
          'Nicht nachweisbare Ergebnisse',
          'Unbegrenzte KI-Erkennung',
          'Über 50 unterstützte Sprachen',
          'Erweiterte Turnitin-Bypass-Engine',
          'Menschenähnliche Ergebnisse',
          'Unbegrenzte Grammatikprüfungen',
          'Schnellmodus',
        ],
      },
      {
        name: 'Ultra',
        wordsPerMonth: '30.000 Wörter pro Monat',
        originalPrice: '€39.99',
        price: '€19.99',
        features: [
          '3.000 Wörter pro Anfrage',
          'Mein Schreibstil',
          'Umgeht alle KI-Detektoren (inkl. Turnitin & GPTZero)',
          'Erweiterte Humanisierungs-Engine',
          'Plagiatsfrei',
          'Fehlerfreie Umformulierung',
          'Nicht nachweisbare Ergebnisse',
          'Unbegrenzte KI-Erkennung',
          'Über 50 unterstützte Sprachen',
          'Erweiterte Turnitin-Bypass-Engine',
          'Menschenähnliche Ergebnisse',
          'Unbegrenzte Grammatikprüfungen',
          'Schnellmodus',
          'Ultra-menschliche Schreibausgabe',
          'Prioritätssupport',
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
            Flexible Preispläne für dich
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
                Monatlich
              </button>
              <button
                onClick={() => setBillingPeriod('year')}
                className={`justify-center whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium transition-all flex items-center gap-1 ${
                  billingPeriod === 'year'
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'hover:bg-slate-100'
                }`}
              >
                Jährlich
                <span className="text-xs text-foreground bg-yellow-200 font-medium rounded-md px-2 py-1 uppercase text-black">
                  50% sparen
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
            Benötigst du mehr?{' '}
            <a href="mailto:echtschreib@gmail.com" className="text-emerald-500 underline">
              Kontaktiere uns
            </a>
          </p>
          <p className="text-sm text-slate-500">
            Durch Klicken auf die Schaltfläche Abonnieren stimmst du unseren{' '}
            <Link href="/terms-of-service" className="underline">
              Nutzungsbedingungen
            </Link>{' '}
            und{' '}
            <Link href="/privacy-policy" className="underline">
              Datenschutzrichtlinien
            </Link>
            {' '}zu.
          </p>
        </div>
      </div>
    </div>
  )
}
