import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CallbackPageClient from './page.client'

export default function CallbackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CallbackPageClient />
      <Footer />
    </div>
  )
}
