'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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
    <section className="h-full flex flex-col">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
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
        </div>

        {/* Bottom section with trusted users, CTA, and credit card text */}
        <div className="pb-8">
          {/* Trusted users section */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src={`/images/students/student${i}.${i === 2 ? 'png' : 'jpg'}`}
                    alt={`Student ${i}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-700">
              Vertraut von <span className="font-semibold text-green-600">100k+ Autoren</span>
            </div>
          </div>

          <Link
            href={isLoggedIn ? '/pricing' : '/api/auth/signin'}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-green-500 hover:bg-green-600 text-white text-lg rounded-[14px]"
          >
            {isLoggedIn ? 'Mehr Wörter kaufen' : 'Kostenlos starten'}
          </Link>
          {!isLoggedIn && (
            <div className="text-sm mt-2" style={{ color: 'rgb(100, 116, 139)' }}>
              Keine Kreditkarte erforderlich
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
