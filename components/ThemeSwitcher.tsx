'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { themes } from '@/lib/themes'

export default function ThemeSwitcher() {
  const { currentTheme, nextTheme, previousTheme, themeIndex } = useTheme()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + Arrow keys to switch themes
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          nextTheme()
          showThemeNotification()
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          previousTheme()
          showThemeNotification()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextTheme, previousTheme])

  const showThemeNotification = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  return (
    <>
      {/* Floating theme switcher button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Theme Switcher</div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                previousTheme()
                showThemeNotification()
              }}
              className="p-2 hover:bg-gray-100 rounded"
              title="Previous theme (Ctrl+Shift+←)"
            >
              ←
            </button>
            <div className="text-sm font-medium min-w-[120px] text-center">
              {currentTheme.name}
            </div>
            <button
              onClick={() => {
                nextTheme()
                showThemeNotification()
              }}
              className="p-2 hover:bg-gray-100 rounded"
              title="Next theme (Ctrl+Shift+→)"
            >
              →
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-2 text-center">
            {themeIndex + 1} / {themes.length}
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Theme: {currentTheme.name}
        </div>
      )}
    </>
  )
}
