'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useProfileStore } from '@/store/profileStore'
import type { Profile, UserRole } from '@/store/profileStore'

interface HeaderClientProps {
  isLoggedIn: boolean
  serverProfile: Profile | null
  serverUserRole: UserRole
  userEmail: string | null
  userName: string | null
  userImage: string | null
}

export default function HeaderClient({
  isLoggedIn,
  serverProfile,
  serverUserRole,
  userEmail,
  userName,
  userImage,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { profile, userRole, setProfile, setUserRole } = useProfileStore()

  // Initialize Zustand store with server-fetched data on mount
  useEffect(() => {
    if (serverProfile && !profile) {
      setProfile(serverProfile)
      setUserRole(serverUserRole)
    }
  }, [serverProfile, serverUserRole, profile, setProfile, setUserRole])

  // Use store data if available (for optimistic updates), otherwise use server data
  const currentProfile = profile || serverProfile
  const currentUserRole = profile ? userRole : serverUserRole

  const hasUnlimitedAccess = currentUserRole === 'ADMIN' || currentUserRole === 'TESTER'
  const totalBalance = currentProfile ? currentProfile.words_balance + currentProfile.extra_words_balance : 0
  const balanceDisplay = hasUnlimitedAccess ? '∞' : `${totalBalance} Wörter`
  const userInitial = userName?.charAt(0).toUpperCase() || userEmail?.charAt(0).toUpperCase() || 'U'

  return (
    <header className="relative">
      <div className=" py-2 border-b border-slate-300">
        <div className="lg:container mx-auto px-4 flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/echtschreb_logo_compressed.png"
                alt="EchtSchreib Logo"
                width={40}
                height={40}
              />
              <span className="font-bold hidden md:block" style={{ fontSize: 24, fontWeight: 'normal'}}>
                Echt<span style={{ fontFamily: 'Strings, sans-serif', fontSize: 36, fontWeight:'lighter' }}>Schreib</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-8">
            <Link href="mailto:echtschreib@gmail.com" className="text-sm font-medium text-slate-700 hover:underline">
              Kontakt
            </Link>
            <Link href="/preise" className="text-sm font-medium text-slate-700 hover:underline">
              Preise
            </Link>
          </nav>

          <div className="flex-grow hidden lg:block"></div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    {currentProfile?.subscription_plan && currentProfile.subscription_plan !== 'basis' && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-theme-primary text-white">
                        {currentProfile.subscription_plan.toUpperCase()}
                      </span>
                    )}
                    <span>Guthaben: {balanceDisplay}</span>
                  </div>
                  {!hasUnlimitedAccess && (
                    <Link
                      href="/preise"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-3 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
                    >
                      Mehr Wörter kaufen
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
                  onClick={() => signIn('google')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Anmelden
                </button>
                <button
                  onClick={() => signIn('google')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
                >
                  Kostenlos testen
                </button>
              </div>
            )}
          </div>

          {/* Tablet Actions */}
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex lg:hidden items-center justify-center md:justify-end flex-1">
                <div className="flex items-center justify-center gap-3">
                  {currentProfile?.subscription_plan && currentProfile.subscription_plan !== 'basis' && (
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-theme-primary text-white">
                      {currentProfile.subscription_plan.toUpperCase()}
                    </span>
                  )}
                  <div className="text-sm text-center">Guthaben: {balanceDisplay}</div>
                  {!hasUnlimitedAccess && (
                    <Link
                      href="/preise"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-md px-3 bg-theme-primary text-white bg-theme-primary-hover"
                    >
                      Mehr Wörter kaufen
                    </Link>
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
                onClick={() => signIn('google')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Anmelden
              </button>
              <button
                onClick={() => signIn('google')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-4 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
              >
                Kostenlos testen
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
                  {currentProfile?.subscription_plan && currentProfile.subscription_plan !== 'basis' && (
                    <span className="px-1.5 py-0.5 rounded-md text-xs font-medium bg-theme-primary text-white">
                      {currentProfile.subscription_plan.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                  <div className="text-sm text-center">Guthaben: {balanceDisplay}</div>
                  {!hasUnlimitedAccess && (
                    <Link
                      href="/preise"
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
                  onClick={() => signIn('google')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-3 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Anmelden
                </button>
                <button
                  onClick={() => signIn('google')}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 px-3 bg-theme-primary text-white bg-theme-primary-hover rounded-lg"
                >
                  Kostenlos testen
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
                  Verlauf
                </Link>
                <Link href="/profile" className="text-sm font-medium text-slate-700 hover:underline md:hidden">
                  Konto
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-slate-700 hover:underline md:hidden"
                >
                  Abmelden
                </button>
              </>
            )}
            <Link href="mailto:echtschreib@gmail.com" className="text-sm font-medium text-slate-700 hover:underline">
              Kontakt
            </Link>
            <Link href="/preise" className="text-sm font-medium text-slate-700 hover:underline">
              Preise
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
