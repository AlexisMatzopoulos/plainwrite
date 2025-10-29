'use client'

import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useProfileStore } from '@/store/profileStore'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AccountCard } from './AccountCard'
import { SubscriptionCard } from './SubscriptionCard'

/**
 * Profile Page - Client Component
 *
 * Reads profile data from Zustand store (already loaded by ProfileInitializer)
 * - No loading states needed - data is already in memory
 * - Instant navigation from other pages
 * - Updates automatically via optimistic updates in the store
 * - Uses Supabase Auth for session management
 */
export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { profile } = useProfileStore()

  // Client-side redirect for unauthenticated users only
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  // Calculate total balance
  const totalBalance = profile
    ? profile.words_balance + profile.extra_words_balance
    : 0

  // Get user metadata
  const userName = user?.user_metadata?.name || user?.user_metadata?.full_name
  const userEmail = user?.email ?? ''

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-full flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Account and Balance Cards - 2 Column Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AccountCard
              userName={userName ?? null}
              userEmail={userEmail}
              wordsBalance={totalBalance}
            />
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
              <p className="text-gray-500">No payment history found.</p>
            </div>
          </div>

          {/* Subscription Card */}
          <SubscriptionCard profile={profile} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
