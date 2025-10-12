'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userStyle, setUserStyle] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

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
        setUserStyle(data.profile.userStyle || '')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStyle = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userStyle: userStyle || null,
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Style preference saved successfully!' })
        await fetchProfile()
      } else {
        setMessage({ type: 'error', text: 'Failed to save style preference' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={false} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  const totalBalance = profile.words_balance + profile.extra_words_balance
  const userInitial = session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

          {/* Profile Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

            <div className="flex items-center gap-4 mb-6">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl font-medium text-green-600">{userInitial}</span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium">{session.user?.name || 'User'}</h3>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account ID</p>
                  <p className="font-mono text-sm">{profile.id.substring(0, 8)}...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Word Balance Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Word Balance</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Balance</p>
                <p className="text-3xl font-bold text-green-600">{totalBalance.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">words available</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Main Balance</p>
                <p className="text-2xl font-bold text-blue-600">{profile.words_balance.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">words</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Bonus Balance</p>
                <p className="text-2xl font-bold text-purple-600">{profile.extra_words_balance.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">words</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Words per request limit</p>
                  <p className="font-medium">{profile.words_per_request.toLocaleString()} words</p>
                </div>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Get More Words
                </a>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Subscription</h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-lg font-medium">
                  {profile.subscription_plan ? profile.subscription_plan.toUpperCase() : 'Free'}
                </p>
                {profile.subscription_status && (
                  <p className="text-sm text-gray-500 mt-1">
                    Status: <span className="capitalize">{profile.subscription_status}</span>
                  </p>
                )}
              </div>

              {!profile.subscription_plan && (
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Upgrade Plan
                </a>
              )}
            </div>
          </div>

          {/* Writing Style Preference */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Writing Style Preference</h2>

            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleUpdateStyle}>
              <div className="mb-4">
                <label htmlFor="userStyle" className="block text-sm font-medium text-gray-700 mb-2">
                  Default Style
                </label>
                <select
                  id="userStyle"
                  value={userStyle}
                  onChange={(e) => setUserStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Standard (Default)</option>
                  <option value="academic">Academic</option>
                  <option value="casual">Casual</option>
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                  <option value="technical">Technical</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  This style will be used by default when humanizing text
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Preference'}
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Account Actions</h2>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
