'use client'

import { useState } from 'react'
import { Sparkles, Clipboard } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AIHumanizerLoggedOut() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Original')

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const maxWords = 500
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

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  return (
    <section className="flex flex-col" style={{ height: '80vh' }}>
      <div className="grid grid-cols-1 gap-6 flex-1">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full">
          {/* Header with word count */}
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Your Text</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {wordCount} / {maxWords} Words
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
                  onClick={() => setSelectedStyle(style)}
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

          {/* Text area */}
          <div className="px-4 flex-1 relative flex">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full h-full border-none outline-none focus:outline-none resize-none"
            />
            {!text && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  onClick={handlePasteClick}
                  className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-9 flex items-center gap-2 rounded-full px-4 py-2 border-theme-primary text-theme-primary pointer-events-auto"
                  style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.1)'}
                >
                  <Clipboard className="h-4 w-4" />
                  Paste Text
                </button>
              </div>
            )}
          </div>

          {/* Footer with toggle and buttons */}
          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Fast Mode Toggle - Bottom Left */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Fast</span>
              <button
                disabled
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-default opacity-50"
                title="Pro mode requires a Pro or Ultra subscription"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>
              <span className="text-sm text-gray-400">Pro</span>
            </div>

            {/* Action Buttons - Right Side */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => wordCount > 0 && router.push('/signin')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-opacity h-9 bg-theme-primary hover:opacity-90 text-white rounded-lg px-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={wordCount === 0}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Style
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
