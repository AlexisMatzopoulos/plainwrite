'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [history, setHistory] = useState<HistoryEntry[] | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Auth check - redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  // Fetch initial history data
  useEffect(() => {
    if (status === 'authenticated') {
      fetchHistory()
    }
  }, [status])

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

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="w-full flex-1">
          <HistorySkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (status !== 'authenticated') {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-full flex-1">
        {isLoading || !history ? (
          <HistorySkeleton />
        ) : (
          <HistoryList
            initialHistory={history}
            totalCount={totalCount}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

/**
 * HistorySkeleton - Loading state that matches the HistoryList structure
 */
function HistorySkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Title Section - Always visible */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-theme-text">History</h1>
        <p className="text-slate-500 text-lg">Find all your humanized texts here</p>
      </div>

      {/* Search Bar Skeleton */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="w-full h-12 bg-gray-200 rounded-[14px] animate-pulse"></div>
        </div>
      </div>

      {/* History List Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[16px] shadow-lg overflow-hidden"
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
                <div className="border border-slate-200 rounded-[10px] p-4 bg-slate-50">
                  <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Humanized Text Box */}
                <div className="border rounded-[10px] p-4" style={{ borderColor: 'rgba(var(--color-primary-rgb), 0.3)', backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)' }}>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
