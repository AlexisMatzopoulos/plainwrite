import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HistoryList } from './HistoryList'

/**
 * History Page - Async Server Component (Next.js 15 Pattern)
 *
 * This page follows the official Next.js 15 data fetching pattern:
 * - Fetches user history directly from database on the server
 * - No client-side data fetching or loading states
 * - Server-side auth check with redirect
 * - Passes data to client component for interactivity
 *
 * From Next.js docs: "Query your database directly without an additional API layer"
 */
export default async function HistoryPage() {
  // Server-side auth check (Next.js docs: "Server Components support promises")
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/signin')
  }

  // Direct database query (Next.js docs: "skip the API layer")
  // Fetch only first page (10 items) - pagination handled client-side
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      history: {
        orderBy: { createdAt: 'desc' },
        take: 10, // First page
      },
    },
  })

  if (!user) {
    redirect('/signin')
  }

  // Get total count for pagination
  const totalCount = await prisma.history.count({
    where: { user_id: user.id },
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-full flex-1">
        <HistoryList
          initialHistory={user.history}
          totalCount={totalCount}
        />
      </main>
      <Footer />
    </div>
  )
}
