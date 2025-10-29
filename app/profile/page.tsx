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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="w-full flex-grow">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Account Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account and subscription</p>
          </div>

          {/* Account Info Section */}
          <div className="mb-6">
            <AccountCard
              userName={userName ?? null}
              userEmail={userEmail}
              wordsBalance={totalBalance}
            />
          </div>

          {/* Subscription Card */}
          <SubscriptionCard profile={profile} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
