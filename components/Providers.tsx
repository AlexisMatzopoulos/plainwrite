"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./ThemeProvider"
import ThemeSwitcher from "./ThemeSwitcher"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <ThemeSwitcher />
      </ThemeProvider>
    </SessionProvider>
  )
}
