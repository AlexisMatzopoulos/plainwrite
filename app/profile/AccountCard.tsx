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
    <>
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
              <p className="text-lg font-medium">{userName || 'User'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg font-medium">{userEmail}</p>
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
          <p className="text-3xl font-bold">{wordsBalance.toLocaleString()} Words</p>
          <p className="text-sm text-gray-500 mb-4">&nbsp;</p>
          <a
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full md:w-auto px-8 py-6 bg-theme-primary text-white hover:opacity-90 rounded-[10px] text-base"
            href="/pricing"
          >
            Get More Words
          </a>
        </div>
      </div>
    </>
  )
}
