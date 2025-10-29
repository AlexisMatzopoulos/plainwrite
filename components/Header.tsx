'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from './AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/profileStore'

export default function Header() {
  const router = useRouter()
  const { user, loading, signingOut, setSigningOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { profile, userRole, isInitialized } = useProfileStore()
  const supabase = createClient()

  const isLoggedIn = !loading && !signingOut && !!user
  const isLoading = loading || signingOut || (isLoggedIn && !isInitialized)

  const hasUnlimitedAccess = userRole === 'ADMIN' || userRole === 'TESTER'
  const totalBalance = profile ? profile.words_balance + profile.extra_words_balance : 0
  const balanceDisplay = hasUnlimitedAccess ? '∞' : `${totalBalance} Words`

  // Get user metadata from Supabase user object
  const userName = user?.user_metadata?.name || user?.user_metadata?.full_name
  const userImage = user?.user_metadata?.avatar_url || user?.user_metadata?.picture
  const userInitial = userName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'

  const handleSignOut = async () => {
    // Immediately set signing out state to show loading skeleton
    setSigningOut(true)
    await supabase.auth.signOut()
    // Use window.location.href for a full page reload to clear all state
    window.location.href = '/'
  }

  return (
    <header className="relative">
      <div className=" py-2 border-b border-slate-300">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/echtschreb_logo_compressed.png"
                alt="PlainWrite Logo"
                width={40}
                height={40}
              />
              <span className="font-bold hidden md:block" style={{ fontSize: 24, fontWeight: 'normal'}}>
                Plain<span style={{ fontFamily: 'var(--font-strings), sans-serif', fontSize: 36, fontWeight:'lighter' }}>Write</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-8">
            <Link href="mailto:support@plainwrite.com" className="text-sm font-medium text-slate-700 hover:underline">
              Contact
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-700 hover:underline">
              Pricing
            </Link>
          </nav>

          <div className="flex-grow hidden lg:block"></div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </>
                    ) : (
                      <>
                        {profile?.subscription_plan && profile.subscription_plan !== 'basis' && (
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-theme-primary text-white">
                            {profile.subscription_plan.toUpperCase()}
                          </span>
                        )}
                        <span>Balance: {balanceDisplay}</span>
                      </>
                    )}
                  </div>
                  {!hasUnlimitedAccess && (
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-3 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
                    >
                      Buy More Words
                    </Link>
                  )}
                  <Link
                    href="/history"
                    aria-label="View generation history"
                    className="inline-flex items-center justify-center rounded-full hover:bg-accent h-10 w-10"
                  >
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
                      className="!size-10 text-slate-500 border border-slate-300 rounded-full p-1.5"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                      <path d="M12 7v5l4 2"></path>
                    </svg>
                  </Link>
                  <Link href="/profile" aria-label="View profile">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="size-10 rounded-full"
                      />
                    ) : (
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden bg-slate-200">
                        <span className="text-sm font-medium">{userInitial}</span>
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/signin')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signin')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
                >
                  Try for Free
                </button>
              </div>
            )}
          </div>

          {/* Tablet Actions */}
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex lg:hidden items-center justify-center md:justify-end flex-1">
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      {profile?.subscription_plan && profile.subscription_plan !== 'basis' && (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-theme-primary text-white">
                          {profile.subscription_plan.toUpperCase()}
                        </span>
                      )}
                      <div className="text-sm text-center">Balance: {balanceDisplay}</div>
                      {!hasUnlimitedAccess && (
                        <Link
                          href="/pricing"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-md px-3 bg-theme-primary text-white bg-theme-primary-hover"
                        >
                          Buy More Words
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="hidden sm:flex lg:hidden items-center gap-1">
                <Link
                  href="/history"
                  aria-label="View generation history"
                  className="inline-flex items-center justify-center h-10 w-10"
                >
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
                    className="!size-10 text-slate-500 border border-slate-300 rounded-full p-1.5"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M12 7v5l4 2"></path>
                  </svg>
                </Link>
                <Link href="/profile" aria-label="View profile">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="size-10 rounded-full"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden bg-slate-200">
                      <span className="text-sm font-medium">{userInitial}</span>
                    </div>
                  )}
                </Link>
                <button
                  className="inline-flex items-center justify-center h-10 w-10"
                  aria-label="Toggle menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
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
                    className="h-6 w-6"
                  >
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="hidden sm:flex lg:hidden items-center justify-end flex-1 gap-3">
              <button
                onClick={() => router.push('/signin')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signin')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
              >
                Try for Free
              </button>
              <button
                className="inline-flex items-center justify-center h-10 w-10"
                aria-label="Toggle menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
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
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}

          {/* Mobile Actions */}
          {isLoggedIn ? (
            <>
              <div className="flex sm:hidden items-center justify-center flex-1">
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      {profile?.subscription_plan && profile.subscription_plan !== 'basis' && (
                        <span className="px-1.5 py-0.5 rounded-md text-xs font-medium bg-theme-primary text-white">
                          {profile.subscription_plan.substring(0, 3).toUpperCase()}
                        </span>
                      )}
                      <div className="text-sm text-center">Balance: {balanceDisplay}</div>
                      {!hasUnlimitedAccess && (
                        <Link
                          href="/pricing"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-md px-3 bg-theme-primary text-white bg-theme-primary-hover"
                        >
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
                            className="h-4 w-4"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex sm:hidden items-center gap-1">
                <button
                  className="inline-flex items-center justify-center h-10 w-10"
                  aria-label="Toggle menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
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
                    className="h-6 w-6"
                  >
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex sm:hidden items-center justify-center flex-1 gap-2">
                <button
                  onClick={() => router.push('/signin')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-3 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signin')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-3 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
                >
                  Try Free
                </button>
              </div>

              <div className="flex sm:hidden items-center gap-1">
                <button
                  className="inline-flex items-center justify-center h-10 w-10"
                  aria-label="Toggle menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
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
                    className="h-6 w-6"
                  >
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-slate-100 border-b border-slate-300 transition-all duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-6 flex flex-col">
          <nav className="flex flex-col gap-6 text-center">
            {isLoggedIn && (
              <>
                <Link href="/history" className="text-sm font-medium text-slate-700 hover:underline md:hidden">
                  History
                </Link>
                <Link href="/profile" className="text-sm font-medium text-slate-700 hover:underline md:hidden">
                  Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-slate-700 hover:underline md:hidden"
                >
                  Sign Out
                </button>
              </>
            )}
            <Link href="mailto:support@plainwrite.com" className="text-sm font-medium text-slate-700 hover:underline">
              Contact
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-700 hover:underline">
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
