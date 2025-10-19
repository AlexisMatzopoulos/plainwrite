'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themes, Theme } from '@/lib/themes'

interface ThemeContextType {
  currentTheme: Theme
  setThemeIndex: (index: number) => void
  themeIndex: number
  nextTheme: () => void
  previousTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeIndex = localStorage.getItem('themeIndex')
    if (savedThemeIndex) {
      setThemeIndex(parseInt(savedThemeIndex, 10))
    }
  }, [])

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('themeIndex', themeIndex.toString())

    // Apply CSS variables
    const theme = themes[themeIndex]
    const root = document.documentElement
    root.style.setProperty('--color-primary', theme.colors.primary)
    root.style.setProperty('--color-primary-hover', theme.colors.primaryHover)
    root.style.setProperty('--color-background', theme.colors.background)
    root.style.setProperty('--color-accent', theme.colors.accent)
    root.style.setProperty('--color-text', theme.colors.text)
    root.style.setProperty('--color-text-muted', theme.colors.textMuted)

    // Convert hex to RGB for rgba() usage
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '0, 0, 0'
    }
    root.style.setProperty('--color-primary-rgb', hexToRgb(theme.colors.primary))
  }, [themeIndex])

  const nextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length)
  }

  const previousTheme = () => {
    setThemeIndex((prev) => (prev - 1 + themes.length) % themes.length)
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themes[themeIndex],
        setThemeIndex,
        themeIndex,
        nextTheme,
        previousTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
