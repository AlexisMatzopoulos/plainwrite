'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'

interface HeroSectionProps {
  isLoggedIn?: boolean
}

const adjectives = ['natürlich', 'authentisch', 'echt']

export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
  const [currentAdjectiveIndex, setCurrentAdjectiveIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const currentAdjective = adjectives[currentAdjectiveIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentAdjective.length) {
          setDisplayedText(currentAdjective.slice(0, displayedText.length + 1))
          setTypingSpeed(150)
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentAdjective.slice(0, displayedText.length - 1))
          setTypingSpeed(75)
        } else {
          // Finished deleting, move to next adjective
          setIsDeleting(false)
          setCurrentAdjectiveIndex((prev) => (prev + 1) % adjectives.length)
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentAdjectiveIndex, typingSpeed])

  return (
    <section className="min-h-[80vh] flex flex-col">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h1 className="text-5xl font-bold text-theme-text mb-6">
            Schreiben, das{' '}
            <span
              style={{
                fontFamily: 'Strings, sans-serif',
                fontWeight: 'lighter',
                fontSize: '3.5rem'
              }}
            >
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
            {' '}wirkt
          </h1>
          <p className="text-slate-500 mb-6 text-lg">
            EchtSchreib macht aus deinen KI-generierten Inhalten vollständig humanisiertes, nicht erkennbares Schreiben, das jedes KI-Erkennungstool übersteht.
          </p>

          {/* Key features summary */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">Trainiert mit über 1,2 Millionen akademischen Texten und Essays</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">Getestet gegen Turnitin, Compilatio, Ouriginal und weitere Detektoren</span>
            </div>
          </div>

        </div>

        {/* Bottom section with trusted users, CTA, and credit card text */}
        <div className="temp">
          {/* Trusted users section */}


          {isLoggedIn ? (
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-theme-primary bg-theme-primary-hover text-white text-lg rounded-[14px]"
            >
              Mehr Wörter kaufen
            </Link>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-theme-primary bg-theme-primary-hover text-white text-lg rounded-[14px]"
            >
              Kostenlos starten
            </button>
          )}
          {!isLoggedIn && (
            <div className="text-sm mt-2" style={{ color: 'rgb(100, 116, 139)' }}>
              Keine Kreditkarte erforderlich
            </div>
          )}

          {/* University carousel */}
          <div className="mt-8">
            <div className="relative w-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
              <style jsx>{`
                @keyframes scroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-33.333%);
                  }
                }
                .animate-scroll {
                  animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="flex animate-scroll">
                {[
                  ...Array(3).fill([
                    { name: 'LMU', image: '/images/LMU.png' },
                    { name: 'Humboldt', image: '/images/humboldt.png' },
                    { name: 'TUM', image: '/images/TUM.jpg' },
                    { name: 'Heidelberg', image: '/images/heidelberg university.jpg' },
                    { name: 'ETH Zürich', image: '/images/eth_zurich.png' },
                  ]).flat()
                ].map((university, index) => (
                  <div key={`${university.name}-${index}`} className="flex items-center text-slate-700 flex-shrink-0 mx-8">
                    <div className="w-48 h-24 flex items-center justify-center">
                      <Image
                        src={university.image}
                        alt={university.name}
                        width={200}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
