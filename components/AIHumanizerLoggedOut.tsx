'use client'

import { useState } from 'react'

export default function AIHumanizerLoggedOut() {
  const [text, setText] = useState('')

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  return (
    <section className="py-8">
      <div className="lg:container mx-auto px-4">
        <div className="relative w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Fügen Sie hier Ihren Text ein..."
            className="w-full min-h-[400px] p-6 border border-slate-300 rounded-[16px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {!text && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={handlePasteClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-12 px-8 bg-green-500 hover:bg-green-600 text-white text-base rounded-[14px] pointer-events-auto"
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
                  className="h-5 w-5"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                </svg>
                Text einfügen
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
