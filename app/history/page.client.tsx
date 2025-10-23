'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HistorySkeleton from '@/components/HistorySkeleton'

interface HistoryEntry {
  id: string
  createdAt: string
  original_text: string
  humanized_text: string
  words_count: number
  style_used: string | null
}

interface HistoryResponse {
  history: HistoryEntry[]
  total: number
  limit: number
  offset: number
}

export default function HistoryPageClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchHistory()
    }
  }, [session, currentPage])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const offset = (currentPage - 1) * itemsPerPage
      const response = await fetch(`/api/history?limit=${itemsPerPage}&offset=${offset}`)
      const data: HistoryResponse = await response.json()

      if (response.ok) {
        setHistory(data.history)
        setTotal(data.total)
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Möchtest du diesen Eintrag wirklich löschen?')) {
      return
    }

    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh the history list
        fetchHistory()
      } else {
        alert('Fehler beim Löschen des Eintrags')
      }
    } catch (error) {
      console.error('Error deleting history entry:', error)
      alert('Fehler beim Löschen des Eintrags')
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

  const filteredHistory = history.filter(entry => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      entry.original_text.toLowerCase().includes(searchLower) ||
      entry.humanized_text.toLowerCase().includes(searchLower)
    )
  })

  const totalPages = Math.ceil(total / itemsPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (status === 'loading' || loading) {
    return (
      <div className="w-full flex-1">
        <HistorySkeleton />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <div className="w-full flex-1">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-theme-text">Verlauf</h1>
            <p className="text-slate-500 text-lg">Hier findest du alle deine humanisierten Texte</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Suche in deinem Verlauf..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white shadow-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
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

          {/* History List */}
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-[16px] shadow-lg p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-slate-400 mb-4"
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
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {searchTerm ? 'Keine Ergebnisse gefunden' : 'Noch keine Einträge'}
              </h3>
              <p className="text-slate-500">
                {searchTerm
                  ? 'Versuche es mit einem anderen Suchbegriff'
                  : 'Humanisiere deinen ersten Text, um ihn hier zu sehen'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-[16px] shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-slate-500">
                            {formatDate(entry.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{entry.words_count} Wörter</span>
                          {entry.style_used && entry.style_used !== 'default' && (
                            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)' }}>
                              {entry.style_used}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        aria-label="Löschen"
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
                    <div className="space-y-4">
                      {/* Original Text */}
                      <div className="border border-slate-200 rounded-[10px] p-4 bg-slate-50">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-slate-700">Original Text</h3>
                          <button
                            onClick={() => handleCopy(entry.original_text, entry.id, 'original')}
                            className="text-slate-500 hover:text-slate-700 p-1"
                            aria-label="Kopieren"
                          >
                            {copiedId === `${entry.id}-original` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-emerald-500"
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
                                className="h-5 w-5"
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
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">
                          {expandedId === entry.id
                            ? entry.original_text
                            : truncateText(entry.original_text)}
                        </p>
                      </div>

                      {/* Humanized Text */}
                      <div className="border rounded-[10px] p-4" style={{ borderColor: 'rgba(var(--color-primary-rgb), 0.3)', backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)' }}>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-slate-700">Humanisierter Text</h3>
                          <button
                            onClick={() => handleCopy(entry.humanized_text, entry.id, 'humanized')}
                            className="text-slate-500 hover:text-slate-700 p-1"
                            aria-label="Kopieren"
                          >
                            {copiedId === `${entry.id}-humanized` ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-emerald-500"
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
                                className="h-5 w-5"
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
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">
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
                        className="mt-4 text-theme-primary hover:opacity-80 text-sm font-medium flex items-center gap-1"
                      >
                        {expandedId === entry.id ? (
                          <>
                            Weniger anzeigen
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
                            Mehr anzeigen
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
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 border border-slate-300 rounded-[10px] hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-medium bg-white shadow-sm"
              >
                Zurück
              </button>
              <span className="px-4 py-2 text-slate-600 font-medium">
                Seite {currentPage} von {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-6 py-2 border border-slate-300 rounded-[10px] hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-medium bg-white shadow-sm"
              >
                Weiter
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
