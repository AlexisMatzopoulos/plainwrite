'use client'

import { useState, useEffect } from 'react'

interface ResultLoadingAnimationProps {
  loadingType: 'humanizing' | 'ai-checking'
  progress?: number
}

const HUMANIZING_MESSAGES = [
  'Text wird analysiert...',
  'Sprachmuster werden optimiert...',
  'Natürliche Formulierungen werden generiert...',
  'Satzstrukturen werden angepasst...',
  'Menschliche Schreibweise wird angewendet...',
  'Stilistische Verbesserungen werden durchgeführt...',
  'KI-Signaturen werden entfernt...',
  'Textkohärenz wird optimiert...'
]

const AI_CHECKING_MESSAGES = [
  'Text wird analysiert...',
  'KI-Muster werden erkannt...',
  'Sprachmodelle werden verglichen...',
  'Textstruktur wird untersucht...',
  'Statistische Analysen laufen...',
  'Wahrscheinlichkeiten werden berechnet...',
  'Detektoren werden abgefragt...',
  'Ergebnisse werden zusammengestellt...'
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
      aria-label={isHumanizing ? "Schreibstil wird angewendet" : "Text wird auf KI geprüft"}
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Main heading */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {isHumanizing ? 'Schreibstil wird angewendet' : 'KI-Prüfung läuft'}
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
          ? 'Schreibstil wird angewendet. Bitte warten Sie einen Moment.'
          : 'Ihr Text wird auf künstliche Intelligenz geprüft. Bitte warten Sie einen Moment.'}
      </span>
    </div>
  )
}
