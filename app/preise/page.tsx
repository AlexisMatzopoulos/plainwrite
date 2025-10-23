
import Header from '@/components/Header'
import PricingSection from '@/components/PricingSection'
import Footer from '@/components/Footer'

export default function PricingPage() {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header  />
      <main className="flex-1 bg-white">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
