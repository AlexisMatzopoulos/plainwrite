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
  const [displayProgress, setDisplayProgress] = useState(0)

  // Rotate messages every 5 seconds (8 messages × 5s = 40s total)
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 5000)

    return () => clearInterval(messageInterval)
  }, [messages.length])

  // Animate progress bar
  // Target: 85% in 30 seconds, then slowly edge to 95% over remaining time
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setDisplayProgress((prev) => {
        // After 85%, go very slowly (0.05% per 100ms = ~20 seconds to reach 95%)
        if (prev >= 85) return Math.min(prev + 0.05, 95)
        // Before 85%, increment to reach it in ~30 seconds (0.283% per 100ms)
        return prev + 0.283
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div
      className="relative p-8 min-h-[400px] flex flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={isHumanizing ? "Applying writing style" : "Checking for AI"}
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Main heading */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {isHumanizing ? 'Applying Writing Style' : 'AI Check Running'}
          </h3>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(displayProgress, 95)}%` }}
            />
          </div>
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
