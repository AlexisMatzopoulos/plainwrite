'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface HeroSectionProps {
  isLoggedIn?: boolean
}

export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
  const router = useRouter()


  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text mb-6 text-center">
            Writing that feels{' '}
            <span
              style={{
                fontFamily: 'Strings, sans-serif',
                fontWeight: 'lighter',
                fontSize: '3.5rem'
              }}
            >
              formal
            </span>
          </h1>
          <p className="text-slate-500 mb-6 text-lg text-center max-w-3xl mx-auto">
            Transform your text instantly. Our writing engine ensures your get your message across, the right way.
          </p>

          <div className="flex flex-col gap-3 max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-3 justify-center">
              <svg className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">Instantly refine your writing style and tone</span>
            </div>
            <div className="flex items-start gap-3 justify-center">
              <svg className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">Make your content flow naturally and read smoothly</span>
            </div>
            <div className="flex items-start gap-3 justify-center">
              <svg className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">Perfect for emails, articles, social posts, and more</span>
            </div>
          </div>
          {/* Badges commented out for now
          <div className="flex gap-8 justify-center mb-4">
            <div className="flex">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="/svg/left_wreath.svg"
                    alt=""
                    width={30}
                    height={70}
                  />
                </div>

                <div className="flex items-center justify-center px-2">
                  <div className="text-center">
                    <div style={{ fontWeight: 700, fontSize: '28px', lineHeight: '100%', color: '#FFCE00' }}>Trained on</div>
                    <div style={{ fontWeight: 500, fontSize: '16px', color: '#FFCE00' }}>700,000+ documents</div>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center justify-center" style={{ transform: 'scaleX(-1)' }}>
                  <Image
                    src="/svg/left_wreath.svg"
                    alt=""
                    width={30}
                    height={70}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="/svg/left_wreath.svg"
                    alt=""
                    width={30}
                    height={70}
                  />
                </div>

                <div className="flex items-center justify-center px-2">
                  <div className="text-center">
                    <div style={{ fontWeight: 700, fontSize: '28px', lineHeight: '100%', color: '#FFCE00' }}>Trusted by</div>
                    <div style={{ fontWeight: 500, fontSize: '16px', color: '#FFCE00' }}>300,000+ professionals</div>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center justify-center" style={{ transform: 'scaleX(-1)' }}>
                  <Image
                    src="/svg/left_wreath.svg"
                    alt=""
                    width={30}
                    height={70}
                  />
                </div>
              </div>
            </div>
          </div>
          */}

        </div>

        {/* Bottom section with CTA - centered */}
        <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col items-center">
          {/* Trusted users section */}
          {/* <div className="flex items-center gap-3 mb-6">
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
              Vertraut von <span className="font-semibold text-theme-primary">100k+ Autoren</span>
            </div>
          </div> */}

          {isLoggedIn ? (
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-theme-primary bg-theme-primary-hover text-white text-lg rounded-[14px]"
            >
              Buy More Words
            </Link>
          ) : (
            <button
              onClick={() => router.push('/signin')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-theme-primary bg-theme-primary-hover text-white text-lg rounded-[14px]"
            >
              Try For Free
            </button>
          )}
          {!isLoggedIn && (
            <div className="text-sm mt-2 text-center" style={{ color: 'rgb(100, 116, 139)' }}>
              No credit card required
            </div>
          )}

          {/* University carousel */}
          {/* <div className="mt-8">
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
          </div> */}
        </div>
        </div>
      </div>
    </section>
  )
}
