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
          <p className="text-slate-500 mb-4 text-lg">
            EchtSchreib macht aus deinen KI-generierten Inhalten vollständig humanisiertes, nicht erkennbares Schreiben, das jedes KI-Erkennungstool übersteht.
          </p>

          {/* Rating and users stats */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">4.8/5</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 20C1.71667 20 1.47917 19.9042 1.2875 19.7125C1.09583 19.5208 1 19.2833 1 19V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V19C17 19.2833 16.9042 19.5208 16.7125 19.7125C16.5208 19.9042 16.2833 20 16 20H2ZM18.525 20C18.675 19.8833 18.7917 19.7375 18.875 19.5625C18.9583 19.3875 19 19.1917 19 18.975V17C19 16.2667 18.7958 15.5625 18.3875 14.8875C17.9792 14.2125 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4208 19.05 13.6625C19.8 13.9042 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.2542 22.525 15.6625C22.8417 16.0708 23 16.5167 23 17V19C23 19.2833 22.9042 19.5208 22.7125 19.7125C22.5208 19.9042 22.2833 20 22 20H18.525ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM19 8C19 9.1 18.6083 10.0417 17.825 10.825C17.0417 11.6083 16.1 12 15 12C14.8167 12 14.5833 11.9792 14.3 11.9375C14.0167 11.8958 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3958 10.675 14.6375 10.025C14.8792 9.375 15 8.7 15 8C15 7.3 14.8792 6.625 14.6375 5.975C14.3958 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.0625 14.3 4.0375C14.5333 4.0125 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z" />
              </svg>
              <span className="text-sm font-medium text-slate-700">100k+ Nutzer</span>
            </div>
          </div>
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
              Vertraut von <span className="font-semibold text-rose-600">100k+ Autoren</span>
            </div>
          </div>

          {isLoggedIn ? (
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-rose-400 hover:bg-rose-500 text-white text-lg rounded-[14px]"
            >
              Mehr Wörter kaufen
            </Link>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-rose-400 hover:bg-rose-500 text-white text-lg rounded-[14px]"
            >
              Kostenlos starten
            </button>
          )}
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
