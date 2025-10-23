import { Suspense } from 'react'
import SignInPageClient from './page.client'

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Wird geladen...</div>
      </div>
    }>
      <SignInPageClient />
    </Suspense>
  )
}
