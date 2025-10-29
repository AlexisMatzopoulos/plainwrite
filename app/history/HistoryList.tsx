'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface HistoryEntry {
  id: string
  createdAt: Date
  original_text: string
  humanized_text: string
  words_count: number
  style_used: string | null
}

interface HistoryListProps {
  initialHistory: HistoryEntry[]
  totalCount: number
  searchTerm: string
}

/**
 * HistoryList - Client Component for History Page
 *
 * Handles client-side interactions:
 * - Search filtering
 * - Pagination
 * - Copy to clipboard
 * - Delete entries
 * - Expand/collapse text
 */
export function HistoryList({ initialHistory, totalCount, searchTerm }: HistoryListProps) {
  const router = useRouter()
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(totalCount)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 10

  const handleDelete = async (id: string) => {
    if (!confirm('Do you really want to delete this entry?')) {
      return
    }

    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove from local state
        setHistory(history.filter(entry => entry.id !== id))
        setTotal(prev => prev - 1)
        // Refresh the page to get updated server data
        router.refresh()
      } else {
        alert('Error deleting entry')
      }
    } catch (error) {
      console.error('Error deleting history entry:', error)
      alert('Error deleting entry')
    }
  }

  const handleCopy = async (text: string, id: string, type: 'original' | 'humanized') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(`${id}-${type}`)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Error copying text:', err)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const fetchHistoryPage = async (page: number) => {
    setLoading(true)
    try {
      const offset = (page - 1) * itemsPerPage
      const response = await fetch(`/api/history?limit=${itemsPerPage}&offset=${offset}`)
      const data = await response.json()

      if (response.ok) {
        setHistory(data.history)
        setTotal(data.total)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredHistory = history.filter(entry => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      entry.original_text.toLowerCase().includes(searchLower) ||
      entry.humanized_text.toLowerCase().includes(searchLower)
    )
  })

  const totalPages = Math.ceil(total / itemsPerPage)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <>
      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {searchTerm ? 'No results found' : 'No history yet'}
          </h3>
          <p className="text-gray-500 text-sm">
            {searchTerm
              ? 'Try adjusting your search'
              : 'Your text transformations will appear here'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(entry.createdAt)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{entry.words_count} words</span>
                      {entry.style_used && entry.style_used !== 'default' && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                            {entry.style_used}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  {/* Original Text */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Input</h4>
                      <button
                        onClick={() => handleCopy(entry.original_text, entry.id, 'original')}
                        className="text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-200 transition-colors"
                        aria-label="Copy"
                      >
                        {copiedId === `${entry.id}-original` ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {expandedId === entry.id
                        ? entry.original_text
                        : truncateText(entry.original_text)}
                    </p>
                  </div>

                  {/* Result Text */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Output</h4>
                      <button
                        onClick={() => handleCopy(entry.humanized_text, entry.id, 'humanized')}
                        className="text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Copy"
                      >
                        {copiedId === `${entry.id}-humanized` ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {expandedId === entry.id
                        ? entry.humanized_text
                        : truncateText(entry.humanized_text)}
                    </p>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                {(entry.original_text.length > 200 || entry.humanized_text.length > 200) && (
                  <button
                    onClick={() => toggleExpand(entry.id)}
                    className="mt-4 text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    {expandedId === entry.id ? (
                      <>
                        Show Less
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        Show More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!searchTerm && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => fetchHistoryPage(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium bg-white transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => fetchHistoryPage(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium bg-white transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}
