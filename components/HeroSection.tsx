import Link from 'next/link'

interface HeroSectionProps {
  isLoggedIn?: boolean
}

export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        {!isLoggedIn && (
          <div className="inline-block bg-white rounded-full px-3 py-1 mb-6 shadow-sm">
            <span className="text-sm font-semibold uppercase bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
              Trusted by 350,000+ users
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold text-slate-900">
          Humanize AI Text & Outsmart AI Detectors
        </h1>
        <p className="text-muted-foreground mb-6 mt-4 text-slate-500 max-w-xl mx-auto">
          Natural Write converts your AI-generated content into fully humanized, undetectable
          writing - ensuring it passes every AI detection tool
        </p>
        <Link
          href={isLoggedIn ? '/pricing' : '/api/auth/signin'}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-green-500 hover:bg-green-600 text-white text-lg rounded-[14px]"
        >
          {isLoggedIn ? 'Get more words' : 'Start for free'}
        </Link>
      </div>
    </section>
  )
}
