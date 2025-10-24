'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileSkeleton from '@/components/ProfileSkeleton'
import Link from 'next/link'

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
  paystack_customer_code: string | null
  paystack_subscription_code: string | null
  paystack_authorization_code: string | null
  paystack_plan_code: string | null
  billing_period: string | null
}

interface PaymentHistory {
  id: string
  amount: number
  date: string
  description: string
}

// Subscription Card Component
function SubscriptionCard({ profile }: { profile: Profile }) {
  const [managingSubscription, setManagingSubscription] = useState(false)
  const [cancellingSubscription, setCancellingSubscription] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const subscriptionPlanDisplay = profile.subscription_plan
    ? profile.subscription_plan.charAt(0).toUpperCase() + profile.subscription_plan.slice(1) + '-Plan'
    : 'Basis-Plan'

  const wordsPerMonth = profile.words_limit || 5000

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'non-renewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'attention':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'non-renewing':
        return 'Expiring'
      case 'attention':
        return 'Payment Issue'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Inactive'
    }
  }

  const handleUpdatePaymentMethod = async () => {
    setManagingSubscription(true)
    try {
      const response = await fetch('/api/paystack/manage-subscription')
      const data = await response.json()

      if (response.ok && data.link) {
        window.location.href = data.link
      } else {
        alert('Error opening subscription management')
      }
    } catch (error) {
      console.error('Error managing subscription:', error)
      alert('Error opening subscription management')
    } finally {
      setManagingSubscription(false)
    }
  }

  const handleCancelSubscription = async () => {
    setCancellingSubscription(true)
    try {
      // For Paystack, we need to send email token
      // We'll use the subscription code as token (you may need to adjust this)
      const response = await fetch('/api/paystack/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: profile.paystack_subscription_code,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Your subscription will end at the end of the billing period.')
        window.location.reload()
      } else {
        alert(data.error || 'Error cancelling subscription')
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('Error cancelling subscription')
    } finally {
      setCancellingSubscription(false)
      setShowCancelConfirm(false)
    }
  }

  return (
    <div className="border text-card-foreground bg-white rounded-[16px] shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold">Subscription</h2>
          </div>
          {profile.subscription_status && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.subscription_status)}`}>
              {getStatusText(profile.subscription_status)}
            </span>
          )}
        </div>
      </div>
      <div className="p-6 pt-0">
        <p className="text-3xl font-bold">{subscriptionPlanDisplay}</p>
        <p className="text-sm text-gray-500 mb-2">{wordsPerMonth.toLocaleString()} Words per month</p>
        {profile.billing_period && (
          <p className="text-sm text-gray-600">
            Billing: {profile.billing_period === 'month' ? 'Monthly' : 'Annually'}
          </p>
        )}
        {profile.subscription_valid_until && (
          <p className="text-sm text-gray-600 mb-4">
            Next billing: {new Date(profile.subscription_valid_until).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </p>
        )}
        {!profile.subscription_valid_until && profile.billing_period && (
          <div className="mb-4"></div>
        )}

        {profile.subscription_status === 'attention' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800 font-medium">
              ⚠️ There was a problem with your last payment.
            </p>
            <p className="text-sm text-red-700 mt-1">
              Please update your payment method to continue the service.
            </p>
          </div>
        )}

        <div className="flex gap-2 flex-col md:flex-row">
          {profile.paystack_subscription_code && profile.subscription_status === 'active' && (
            <>
              <button
                onClick={handleUpdatePaymentMethod}
                disabled={managingSubscription}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-6 bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20 rounded-[10px] text-[16px] w-full md:w-auto"
              >
                {managingSubscription ? 'Loading...' : 'Update Payment Method'}
              </button>
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-6 bg-red-50 text-red-600 hover:bg-red-100 rounded-[10px] text-[16px] w-full md:w-auto"
              >
                Cancel Subscription
              </button>
            </>
          )}

          {profile.subscription_status === 'attention' && (
            <button
              onClick={handleUpdatePaymentMethod}
              disabled={managingSubscription}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-6 bg-theme-primary text-white hover:opacity-90 rounded-[10px] text-[16px] w-full md:w-auto"
            >
              {managingSubscription ? 'Loading...' : 'Update Payment Method'}
            </button>
          )}

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-6 bg-theme-primary text-white hover:opacity-90 rounded-[10px] text-[16px] w-full md:w-auto"
          >
            {profile.subscription_plan ? 'Upgrade Subscription' : 'Get Subscription'}
          </Link>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-2">Cancel Subscription?</h3>
              <p className="text-gray-600 mb-4">
                Your subscription will remain active until the end of the current billing period. You can
                continue using your services until then.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancellingSubscription}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {cancellingSubscription ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProfilePageClient() {
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
      <div className="w-full flex-grow">
        <ProfileSkeleton />
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
    <div className="w-full flex-grow">
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
                    <h1 className="text-2xl font-semibold">Account</h1>
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
                    Sign Out
                  </button>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="text-lg font-medium">{session.user?.name || 'User'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
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
                  <h2 className="text-xl font-semibold">Balance</h2>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-3xl font-bold">{totalBalance.toLocaleString()} Words</p>
                <p className="text-sm text-gray-500 mb-4">&nbsp;</p>
                <a
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full md:w-auto px-8 py-6 bg-theme-primary text-white hover:opacity-90 rounded-[10px] text-base"
                  href="/pricing"
                >
                  Get More Words
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
                <h2 className="text-xl font-semibold">Purchase History</h2>
              </div>
            </div>
            <div className="p-6 pt-0">
              {paymentHistory.length === 0 ? (
                <p className="text-gray-500">No payment history found.</p>
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
          <SubscriptionCard profile={profile} />
        </div>
      </div>
  )
}
