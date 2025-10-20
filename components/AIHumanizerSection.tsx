'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface AIHumanizerSectionProps {
  onBalanceUpdate?: () => void
  showResult: boolean
  setShowResult: (show: boolean) => void
}

interface Profile {
  words_balance: number
  extra_words_balance: number
  words_limit: number
}

export default function AIHumanizerSection({ onBalanceUpdate, showResult, setShowResult }: AIHumanizerSectionProps) {
  const { data: session } = useSession()
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [isHumanizing, setIsHumanizing] = useState(false)
  const [isCheckingAI, setIsCheckingAI] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [aiScore, setAiScore] = useState<number | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('default')

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
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setInputText(text)
    setWordCount(countWords(text))
    setError(null)
    setInsufficientBalance(false)
  }

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError('Bitte gib Text ein, der humanisiert werden soll')
      return
    }

    setShowResult(true) // Show result panel
    setIsHumanizing(true)
    setError(null)
    setInsufficientBalance(false)
    setOutputText('') // Clear previous output

    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          style: selectedStyle === 'default' ? undefined : selectedStyle,
        }),
      })

      // Check if response is JSON (error) or stream (success)
      const contentType = response.headers.get('content-type')

      if (!response.ok || contentType?.includes('application/json')) {
        const data = await response.json()

        // Check if it's an insufficient balance error
        if (data.error?.includes('Insufficient word balance')) {
          setInsufficientBalance(true)
          await fetchProfile() // Refresh profile to get updated balance
        } else {
          setError(data.error || 'Text konnte nicht humanisiert werden')
        }
        return
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('Antwort-Stream konnte nicht gelesen werden')
      }

      let accumulatedText = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        accumulatedText += chunk
        setOutputText(accumulatedText)
      }

      // Trigger balance update in header
      if (onBalanceUpdate) {
        onBalanceUpdate()
      }

      // Refresh profile to get updated balance
      await fetchProfile()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsHumanizing(false)
    }
  }

  const handleCheckAI = async () => {
    const textToCheck = outputText || inputText

    if (!textToCheck.trim()) {
      setError('Bitte gib Text ein, der überprüft werden soll')
      return
    }

    setShowResult(true) // Show result panel
    setIsCheckingAI(true)
    setError(null)

    try {
      const response = await fetch('/api/ai-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToCheck,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'KI-Prüfung fehlgeschlagen')
      }

      setAiScore(data.aiScore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsCheckingAI(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      setError('Text konnte nicht kopiert werden')
    }
  }

  const totalBalance = profile ? profile.words_balance + profile.extra_words_balance : 0
  const wordsLimit = profile?.words_limit || 500

  return (
    <section className="h-full flex flex-col">
      {error && !insufficientBalance && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-6 ${showResult ? 'lg:grid-cols-2' : ''} flex-1`}>
        {/* Input Panel */}
        <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-semibold">Dein Text</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {wordCount} / {wordsLimit} Wörter
              </span>
            </div>
          </div>

          <div className="px-4 flex-1 relative flex">
            <textarea
              placeholder="Füge hier deinen Text ein..."
              className="w-full h-full border-none outline-none focus:outline-none resize-none ms-0 ps-0 text-sm"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>

          <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleCheckAI}
                disabled={isCheckingAI}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-[10px] px-4 w-full sm:w-auto text-theme-primary border border-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}
              >
                {isCheckingAI ? 'Wird geprüft...' : 'KI prüfen'}
              </button>
              <button
                onClick={handleHumanize}
                disabled={isHumanizing}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 bg-theme-primary bg-theme-primary-hover text-white rounded-[10px] px-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                {isHumanizing ? 'Wird humanisiert...' : 'Humanisieren'}
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel - Only show after user interaction */}
        {showResult && (
        <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
          <div className="p-4">
            <h2 className="font-semibold flex items-center justify-between">
              <div>Ergebnis</div>
              {aiScore !== null && (
                <div className="px-4 flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-5 w-5 mr-2 ${aiScore < 30 ? 'text-green-500' : aiScore < 60 ? 'text-yellow-500' : 'text-red-500'}`}
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                  <span className={`text-sm font-medium ${aiScore < 30 ? 'text-green-500' : aiScore < 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {aiScore}% KI erkannt
                  </span>
                </div>
              )}
            </h2>
          </div>

          <div className="flex-1 flex flex-col" style={{ minHeight: '400px' }}>
            {insufficientBalance ? (
              <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-slate-950 font-medium mb-0 text-center">
                  Du benötigst mehr Wörter, um deinen Text zu humanisieren
                </div>
                <div className="text-slate-950 mb-2">
                  Aktuelles Guthaben: {totalBalance}/{wordsLimit}
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-10 py-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-md px-4"
                >
                  Mehr Guthaben kaufen
                </Link>
              </div>
            ) : (
              <>
                <div className="px-4 flex-1 relative flex">
                  <textarea
                    readOnly
                    className="w-full h-full border-none outline-none focus:outline-none resize-none ms-0 ps-0 text-sm bg-white"
                    value={outputText}
                  />
                </div>

                <div className="mt-auto px-4 py-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{countWords(outputText)} Wörter</span>
                  <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-md px-3 text-gray-500 hover:text-gray-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copySuccess ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500"
                        >
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                          <path d="m9 11 3 3L22 4"></path>
                        </svg>
                        <span className="text-green-500">Kopiert!</span>
                      </>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
