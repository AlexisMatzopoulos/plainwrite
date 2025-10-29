'use client'

import { useState } from 'react'
import { useAuth } from './AuthProvider'
import Link from 'next/link'
import ResultLoadingAnimation from './ResultLoadingAnimation'
import { useProfileStore } from '@/store/profileStore'
import { analytics } from '@/lib/analytics'

interface AIHumanizerSectionProps {
  showResult: boolean
  setShowResult: (show: boolean) => void
}

export default function AIHumanizerSection({ showResult, setShowResult }: AIHumanizerSectionProps) {
  const { user } = useAuth()
  const { profile, userRole, updateBalance, refreshProfile } = useProfileStore()
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [isHumanizing, setIsHumanizing] = useState(false)
  const [isCheckingAI, setIsCheckingAI] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [aiScore, setAiScore] = useState<number | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('Original')
  const [showingAIResults, setShowingAIResults] = useState(false)
  const [isLoadingResult, setIsLoadingResult] = useState(false)
  const [isFastMode, setIsFastMode] = useState(true)

  // Check if user has pro/ultra subscription (not free plan)
  const hasProAccess = profile?.subscription_plan &&
    (profile.subscription_plan === 'pro' || profile.subscription_plan === 'ultra')

  const writingStyles = [
    'Original',
    'Academic',
    'Professional',
    'Creative',
    'Formal',
    'Casual',
    'Technical',
    'Conversational',
    'Persuasive',
    'Narrative',
    'Simple'
  ]

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
      setError('Please enter text to apply the writing style')
      return
    }

    // Track conversion start
    analytics.track('text_conversion_started', {
      style: selectedStyle,
      word_count: wordCount,
    })

    setShowResult(true) // Show result panel
    setShowingAIResults(false) // Clear AI results when humanizing
    setIsHumanizing(true)
    setIsLoadingResult(true) // Show loading animation
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
          style: selectedStyle,
          mode: isFastMode ? 'fast' : 'accurate',
        }),
      })

      // Check if response is JSON (error) or stream (success)
      const contentType = response.headers.get('content-type')

      if (!response.ok || contentType?.includes('application/json')) {
        const data = await response.json()

        // Track conversion failure
        analytics.track('text_conversion_failed', {
          style: selectedStyle,
          word_count: wordCount,
          error: data.error,
        })

        // Check if it's an insufficient balance error
        if (data.error?.includes('Insufficient word balance')) {
          setInsufficientBalance(true)
          await refreshProfile() // Refresh profile to get updated balance
        } else {
          setError(data.error || 'Failed to apply writing style')
        }
        setIsLoadingResult(false) // Hide loading animation on error
        return
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('Failed to read response stream')
      }

      let accumulatedText = ''
      let isFirstChunk = true

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        accumulatedText += chunk

        // Hide loading animation when first chunk arrives
        if (isFirstChunk) {
          setIsLoadingResult(false)
          isFirstChunk = false
        }

        setOutputText(accumulatedText)
      }

      // Optimistic update: instantly update balance in Zustand store
      const wordsProcessed = countWords(inputText)
      updateBalance(wordsProcessed)

      // Track successful conversion
      analytics.track('text_conversion_completed', {
        style: selectedStyle,
        word_count: wordsProcessed,
      })

      // Refresh profile from server to ensure accuracy
      await refreshProfile()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsHumanizing(false)
    }
  }

  const handleCheckAI = async () => {
    const textToCheck = outputText || inputText

    if (!textToCheck.trim()) {
      setError('Please enter text to be checked')
      return
    }

    // Check word balance before proceeding
    const wordsProcessed = countWords(textToCheck)
    if (totalBalance < wordsProcessed) {
      setShowResult(true)
      setInsufficientBalance(true)
      return
    }

    setShowResult(true) // Show result panel
    setShowingAIResults(true) // Mark that we're showing AI results
    setIsCheckingAI(true)
    setIsLoadingResult(true) // Show loading animation
    setError(null)
    setInsufficientBalance(false)

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
        throw new Error(data.error || 'AI check failed')
      }

      setAiScore(data.aiScore)
      setIsLoadingResult(false) // Hide loading animation when results arrive
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoadingResult(false) // Hide loading animation on error
    } finally {
      setIsCheckingAI(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)

      // Track copy action
      analytics.track('copy_result', {
        style: selectedStyle,
        word_count: countWords(outputText),
      })
    } catch (err) {
      setError('Failed to copy text')
    }
  }

  const hasUnlimitedAccess = userRole === 'ADMIN' || userRole === 'TESTER'
  const totalBalance = profile ? profile.words_balance + profile.extra_words_balance : 0
  const wordsLimit = profile?.words_limit || 500
  const wordLimitDisplay = hasUnlimitedAccess ? '∞' : wordsLimit

  return (
    <section className="flex flex-col" style={{ height: '80vh' }}>
      {error && !insufficientBalance && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-6 ${showResult ? 'lg:grid-cols-2' : ''} flex-1`}>
        {/* Input Panel */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Your Text</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {wordCount} / {wordLimitDisplay} Words
              </span>
            </div>
          </div>

          {/* Writing Style Selector */}
          <div className="px-4 pt-4 pb-3">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Choose writing style</label>
            <div className="flex gap-2 flex-wrap">
              {writingStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedStyle(style)
                    analytics.track('style_selected', { style })
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedStyle === style
                      ? 'bg-theme-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 flex-1 relative flex">
            <textarea
              placeholder="Paste your text here..."
              className="w-full h-full border-none outline-none focus:outline-none resize-none ms-0 ps-0 text-sm"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>

          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Mode Toggle Switch - Bottom Left */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Fast</span>
              <button
                onClick={() => hasProAccess && setIsFastMode(!isFastMode)}
                disabled={!hasProAccess}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  !hasProAccess ? 'bg-gray-300 cursor-default opacity-50' :
                  isFastMode ? 'bg-gray-300' : 'bg-theme-primary'
                }`}
                title={!hasProAccess ? 'Pro mode requires a Pro or Ultra subscription' : ''}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isFastMode ? 'translate-x-1' : 'translate-x-6'
                  }`}
                />
              </button>
              <span className={`text-sm ${!hasProAccess ? 'text-gray-400' : 'text-gray-600'}`}>Pro</span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleHumanize}
                disabled={isHumanizing}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-opacity h-9 bg-theme-primary hover:opacity-90 text-white rounded-lg px-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
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
                {isHumanizing ? 'Applying style...' : 'Apply Style'}
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel - Only show after user interaction */}
        {showResult && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 flex items-center justify-between">
              <div>Result</div>
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
                    {aiScore}% AI detected
                  </span>
                </div>
              )}
            </h2>
          </div>

          <div className="flex-1 flex flex-col" style={{ minHeight: '400px' }}>
            {isLoadingResult ? (
              <ResultLoadingAnimation
                loadingType={showingAIResults ? 'ai-checking' : 'humanizing'}
              />
            ) : insufficientBalance ? (
              <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-slate-950 font-medium mb-0 text-center">
                  You need more words to apply the writing style
                </div>
                <div className="text-slate-950 mb-2">
                  Current balance: {totalBalance}/{wordsLimit}
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-10 py-2 mt-4 bg-theme-primary bg-theme-primary-hover text-white rounded-md px-4"
                >
                  Buy More Credits
                </Link>
              </div>
            ) : showingAIResults && aiScore !== null ? (
              <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="text-center">
                  {/* Circular Progress Indicator */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <svg className="transform -rotate-90" width="200" height="200">
                      {/* Background circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        stroke={aiScore < 30 ? '#22c55e' : aiScore < 60 ? '#eab308' : '#ef4444'}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(aiScore / 100) * (2 * Math.PI * 85)} ${2 * Math.PI * 85}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    {/* Percentage text in center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className={`text-5xl font-bold ${aiScore < 30 ? 'text-green-500' : aiScore < 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {aiScore}%
                      </div>
                      <div className="text-sm text-slate-500 mt-1">AI detected</div>
                    </div>
                  </div>

                  {/* Status text */}
                  <div className="text-xl font-semibold text-slate-700 mb-2">
                    {aiScore < 30 ? 'Minimal AI detected' : aiScore < 60 ? 'Possibly AI' : 'Likely AI'}
                  </div>
                  <div className="text-sm text-slate-500">
                    The text has been checked for AI-generated content
                  </div>
                </div>
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

                <div className="mt-auto px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{countWords(outputText)} Words</span>
                  <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-lg px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <span className="text-green-500">Copied!</span>
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
