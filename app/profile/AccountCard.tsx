'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

interface AccountCardProps {
  userName: string | null
  userEmail: string | null
  wordsBalance: number
}

export function AccountCard({ userName, userEmail, wordsBalance }: AccountCardProps) {
  const router = useRouter()
  const supabase = createClient()
  const { setSigningOut } = useAuth()

  const handleSignOut = async () => {
    // Immediately set signing out state to show loading skeleton
    setSigningOut(true)
    await supabase.auth.signOut()
    // Use window.location.href for a full page reload to clear all state
    window.location.href = '/'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" x2="9" y1="12" y2="12"></line>
          </svg>
          Sign Out
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Name</label>
              <p className="text-base text-gray-900">{userName || 'User'}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Email</label>
              <p className="text-base text-gray-900">{userEmail}</p>
            </div>
          </div>

          {/* Balance Info */}
          <div className="md:border-l md:border-gray-200 md:pl-8">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Word Balance</label>
            <p className="text-4xl font-bold text-gray-900 mb-4">{wordsBalance.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-6">words remaining</p>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-theme-primary hover:opacity-90 rounded-lg transition-opacity"
            >
              Get More Words
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
