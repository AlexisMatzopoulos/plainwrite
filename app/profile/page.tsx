'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfileSkeleton from '@/components/ProfileSkeleton'

interface Profile {
  id: string
  createdAt: string
  words_balance: number
  extra_words_balance: number
  words_limit: number
  words_per_request: number
  subscription_plan: string | null
  subscription_status: string | null
  userStyle: string | null
  subscription_canceled: boolean
  subscription_paused: boolean
  subscription_valid_until: string | null
}

interface PaymentHistory {
  id: string
  amount: number
  date: string
  description: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      const data = await response.json()

      if (response.ok) {
        setProfile(data.profile)
        // TODO: Fetch payment history from API
        setPaymentHistory([])
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-0px)]">
        <Header isLoggedIn={!!session} />
        <div className="w-full" style={{
          backgroundImage: 'url(/images/gradient.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}>
          <ProfileSkeleton />
        </div>
        <Footer />
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  const totalBalance = profile.words_balance + profile.extra_words_balance
  const subscriptionPlanDisplay = profile.subscription_plan
    ? profile.subscription_plan.charAt(0).toUpperCase() + profile.subscription_plan.slice(1) + '-Plan'
    : 'Basis-Plan'

  const wordsPerMonth = profile.words_limit || 5000

  return (
    <div className="flex flex-col min-h-[calc(100vh-0px)]">
      <Header isLoggedIn={true} />
      <div className="w-full" style={{
        backgroundImage: 'url(/images/gradient.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Account and Balance Cards - 2 Column Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Account Card */}
            <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <h1 className="text-2xl font-semibold">Konto</h1>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out w-4 h-4">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" x2="9" y1="12" y2="12"></line>
                    </svg>
                    Abmelden
                  </button>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="text-lg font-medium">{session.user?.name || 'Benutzer'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">E-Mail</label>
                    <p className="text-lg font-medium">{session.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  <h2 className="text-xl font-semibold">Guthaben</h2>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-3xl font-bold">{totalBalance.toLocaleString()} Wörter</p>
                <p className="text-sm text-gray-500 mb-4">&nbsp;</p>
                <a
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full md:w-auto px-8 py-6 bg-green-500 text-white hover:bg-green-600 rounded-[10px] text-base"
                  href="/pricing"
                >
                  Mehr Wörter erhalten
                </a>
              </div>
            </div>
          </div>

          {/* Purchase History Card */}
          <div className="border text-card-foreground mb-8 bg-white rounded-[16px] shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h2 className="text-xl font-semibold">Kaufhistorie</h2>
              </div>
            </div>
            <div className="p-6 pt-0">
              {paymentHistory.length === 0 ? (
                <p className="text-gray-500">Keine Zahlungshistorie gefunden.</p>
              ) : (
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                      <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subscription Card */}
          <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  <h2 className="text-xl font-semibold">Abonnement</h2>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-3xl font-bold">{subscriptionPlanDisplay}</p>
              <p className="text-sm text-gray-500 mb-4">{wordsPerMonth.toLocaleString()} Wörter pro Monat.</p>
              <div className="flex gap-2 flex-col md:flex-row">
                {profile.subscription_plan && (
                  <a
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-6 bg-green-100 text-green-700 hover:bg-green-200 rounded-[10px] text-[16px] w-full md:w-auto"
                    href="/manage-subscription"
                  >
                    Abonnement verwalten
                  </a>
                )}
                <a
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-6 bg-green-500 text-green-50 hover:bg-green-600 rounded-[10px] text-[16px] w-full md:w-auto"
                  href="/pricing"
                >
                  {profile.subscription_plan ? 'Abonnement upgraden' : 'Abonnement erhalten'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
