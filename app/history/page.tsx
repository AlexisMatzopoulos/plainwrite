'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HistoryList } from './HistoryList'

interface HistoryEntry {
  id: string
  createdAt: Date
  original_text: string
  humanized_text: string
  words_count: number
  style_used: string | null
}

/**
 * History Page - Optimized Client Component
 *
 * Loads immediately with:
 * - Header and Footer (instant)
 * - Title and search bar (instant)
 * - Loading skeleton for history data (while fetching)
 *
 * Only the actual history entries wait for data fetch
 */
export default function HistoryPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [history, setHistory] = useState<HistoryEntry[] | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Auth check - redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  // Fetch initial history data
  useEffect(() => {
    if (!loading && user) {
      fetchHistory()
    }
  }, [user, loading])

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/history?limit=10&offset=0')
      const data = await response.json()

      if (response.ok) {
        setHistory(data.history)
        setTotalCount(data.total)
      } else {
        console.error('Error fetching history:', data.error)
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render if not authenticated (will redirect)
  if (!loading && !user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-full flex-1 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">History</h1>
            <p className="text-gray-500 mt-1">View and manage your text transformations</p>
          </div>

          {/* Search Bar - Always visible */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading || isLoading}
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent bg-white text-sm disabled:bg-gray-50 disabled:cursor-wait"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* History List or Skeleton */}
          {loading || isLoading || !history ? (
            <HistoryItemsSkeleton />
          ) : (
            <HistoryList
              initialHistory={history}
              totalCount={totalCount}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

/**
 * HistoryItemsSkeleton - Loading state for history entries only
 */
function HistoryItemsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Content boxes */}
            <div className="space-y-4">
              {/* Original Text Box */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Result Text Box */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
