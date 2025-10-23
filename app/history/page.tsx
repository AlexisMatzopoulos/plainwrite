import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HistoryPageClient from './page.client'

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HistoryPageClient />
      <Footer />
    </div>
  )
}
