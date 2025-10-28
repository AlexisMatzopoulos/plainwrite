'use client'

import { useState } from 'react'
import { Sparkles, Clipboard } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AIHumanizerLoggedOut() {
  const router = useRouter()
  const [text, setText] = useState('')

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const maxWords = 500

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
        <div className="bg-white rounded-[16px] overflow-hidden flex flex-col h-full" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
          {/* Header with word count */}
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-semibold">Your Text</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {wordCount} / {maxWords} Words
              </span>
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

          {/* Footer with buttons */}
          <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => wordCount > 0 && router.push('/signin')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-[10px] px-4 w-full sm:w-auto text-theme-primary border border-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}
                disabled={wordCount === 0}
              >
                Check AI
              </button>
              <button
                onClick={() => wordCount > 0 && router.push('/signin')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors h-9 bg-theme-primary bg-theme-primary-hover text-white rounded-[10px] px-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={wordCount === 0}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Humanize
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
