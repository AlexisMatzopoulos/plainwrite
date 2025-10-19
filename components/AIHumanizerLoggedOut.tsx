'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, Clipboard } from 'lucide-react'

export default function AIHumanizerLoggedOut() {
  const [text, setText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Standard')
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)

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
    <section>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-[16px] shadow-lg overflow-hidden flex flex-col">
          {/* Header with style dropdown */}
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-semibold">Dein Text</h2>
            <div className="relative">
              <button
                onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                className="justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 px-4 py-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                type="button"
                aria-haspopup="menu"
                aria-expanded={showStyleDropdown}
              >
                <Sparkles className="h-4 w-4" />
                {selectedStyle}
                <ChevronDown className="h-4 w-4" />
              </button>
              {showStyleDropdown && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 absolute right-0 mt-2 w-80"
                  tabIndex={-1}
                >
                  <div
                    role="menuitem"
                    onClick={() => {
                      setSelectedStyle('Standard')
                      setShowStyleDropdown(false)
                    }}
                    className="relative select-none rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 flex items-start gap-3 p-3 cursor-pointer hover:bg-accent"
                    tabIndex={-1}
                  >
                    <div className="flex items-center justify-center w-4 h-4 mt-1">
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
                        className="h-4 w-4 text-green-500"
                      >
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Standard</div>
                      <div className="text-sm text-gray-500">Text kopiert Eingabeton</div>
                    </div>
                    {selectedStyle === 'Standard' && (
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
                        className="h-4 w-4 text-green-500 ml-auto mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    )}
                  </div>
                  <div
                    role="menuitem"
                    onClick={() => {
                      // For non-logged in users, this would trigger upgrade
                      setShowStyleDropdown(false)
                    }}
                    className="relative select-none rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 flex items-start gap-3 p-3 cursor-pointer hover:bg-accent"
                    tabIndex={-1}
                  >
                    <div className="flex items-center justify-center w-4 h-4 mt-1">
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
                        className="h-4 w-4 text-gray-400"
                      >
                        <path d="M2 21a8 8 0 0 1 10.821-7.487"></path>
                        <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                        <circle cx="10" cy="8" r="5"></circle>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Mein Stil</div>
                      <div className="text-sm text-gray-500">Text klingt wie du</div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input h-9 rounded-md text-xs px-3 py-1 bg-green-500 text-white hover:bg-green-600 hover:text-white">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text area */}
          <div className="px-4 flex-1 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Füge hier deinen Text ein..."
              className="flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full border-none outline-none focus:outline-none resize-none min-h-[405px]"
              style={{ minHeight: '406px', height: '400px' }}
            />
            {!text && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  onClick={handlePasteClick}
                  className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-9 flex items-center gap-2 rounded-full px-4 py-2 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 pointer-events-auto"
                >
                  <Clipboard className="h-4 w-4" />
                  Text einfügen
                </button>
              </div>
            )}
          </div>

          {/* Footer with word count and buttons */}
          <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="text-sm text-gray-500">
                {wordCount} / {maxWords} Wörter
              </span>
              {wordCount > 0 && wordCount < 50 && (
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200 whitespace-nowrap">
                  Min. 50 Wörter
                </span>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-9 rounded-[10px] px-4 w-full sm:w-auto bg-green-100 text-green-600 hover:bg-green-200"
                disabled={wordCount < 50}
              >
                Auf KI prüfen
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 bg-green-500 hover:bg-green-600 text-white rounded-[10px] px-4 w-full sm:w-auto"
                disabled={wordCount < 50}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Humanisieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
