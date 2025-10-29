'use client'

import { useState, useEffect } from 'react'

interface ResultLoadingAnimationProps {
  loadingType: 'humanizing' | 'ai-checking'
  progress?: number
}

const HUMANIZING_MESSAGES = [
  'Analyzing text...',
  'Optimizing language patterns...',
  'Generating natural phrasing...',
  'Adjusting sentence structures...',
  'Applying human writing style...',
  'Making stylistic improvements...',
  'Removing AI signatures...',
  'Optimizing text coherence...'
]

const AI_CHECKING_MESSAGES = [
  'Analyzing text...',
  'Detecting AI patterns...',
  'Comparing language models...',
  'Examining text structure...',
  'Running statistical analysis...',
  'Calculating probabilities...',
  'Querying detectors...',
  'Compiling results...'
]

export default function ResultLoadingAnimation({
  loadingType,
  progress = 0
}: ResultLoadingAnimationProps) {
  const isHumanizing = loadingType === 'humanizing'
  const messages = isHumanizing ? HUMANIZING_MESSAGES : AI_CHECKING_MESSAGES

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  // Rotate messages every 5 seconds (8 messages × 5s = 40s total)
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 5000)

    return () => clearInterval(messageInterval)
  }, [messages.length])

  return (
    <div
      className="relative p-8 min-h-[400px] flex flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={isHumanizing ? "Applying writing style" : "Checking for AI"}
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Professional Spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-16 h-16 border-4 border-gray-200 border-t-theme-primary rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-theme-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {isHumanizing ? 'Applying Writing Style' : 'AI Check Running'}
          </h3>
        </div>

        {/* Rotating technical message */}
        <div className="text-center min-h-[28px]">
          <p className="text-sm text-slate-600 transition-opacity duration-300">
            {messages[currentMessageIndex]}
          </p>
        </div>
      </div>

      {/* Screen reader only text */}
      <span className="sr-only">
        {isHumanizing
          ? 'Applying writing style. Please wait a moment.'
          : 'Your text is being checked for artificial intelligence. Please wait a moment.'}
      </span>
    </div>
  )
}
