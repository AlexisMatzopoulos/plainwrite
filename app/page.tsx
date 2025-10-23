import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeClient from './page.client'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<div>Wird geladen...</div>}>
        <HomeClient />
      </Suspense>
      <Footer />
    </div>
  )
}
