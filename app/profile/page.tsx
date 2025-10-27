import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AccountCard } from './AccountCard'
import { SubscriptionCard } from './SubscriptionCard'

/**
 * Profile Page - Async Server Component (Next.js 15 Pattern)
 *
 * This page follows the official Next.js 15 data fetching pattern:
 * - Fetches data on the server using async/await
 * - Queries database directly (no API layer needed)
 * - Passes data down to client components as props
 * - Handles auth server-side with redirects
 */
export default async function ProfilePage() {
  // Fetch session on the server (Next.js docs: "query your database directly")
  const session = await getServerSession(authOptions)

  // Server-side redirect for unauthenticated users
  if (!session?.user?.email) {
    redirect('/signin')
  }

  // Direct database query (Next.js docs: "skip the API layer")
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  })

  // Handle edge case - user not found
  if (!user) {
    redirect('/signin')
  }

  // Calculate total balance
  const totalBalance = user.profile
    ? user.profile.words_balance + user.profile.extra_words_balance
    : 0

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-full flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Account and Balance Cards - 2 Column Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AccountCard
              userName={session.user.name ?? null}
              userEmail={session.user.email}
              wordsBalance={totalBalance}
            />
          </div>

          {/* Purchase History Card */}
          <div className="border text-card-foreground mb-8 bg-white rounded-[16px] shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h2 className="text-xl font-semibold">Purchase History</h2>
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-gray-500">No payment history found.</p>
            </div>
          </div>

          {/* Subscription Card */}
          <SubscriptionCard profile={user.profile} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
