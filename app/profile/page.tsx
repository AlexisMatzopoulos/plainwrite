import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfilePageClient from './page.client'

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-0px)]">
      <Header />
      <ProfilePageClient />
      <Footer />
    </div>
  )
}
