import { Suspense } from 'react'
import SignInPageClient from './page.client'
import SignInSkeleton from '@/components/SignInSkeleton'

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInSkeleton />}>
      <SignInPageClient />
    </Suspense>
  )
}
