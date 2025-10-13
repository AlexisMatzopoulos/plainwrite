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
              Vertraut von über 350.000 Nutzern
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold text-slate-900">
          KI-Texte humanisieren & KI-Detektoren überlisten
        </h1>
        <p className="text-muted-foreground mb-6 mt-4 text-slate-500 max-w-xl mx-auto">
          EchtSchreib verwandelt Ihre KI-generierten Inhalte in vollständig humanisierte, nicht erkennbare Texte – und stellt sicher, dass sie jeden KI-Detektor passieren
        </p>
        <Link
          href={isLoggedIn ? '/pricing' : '/api/auth/signin'}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-green-500 hover:bg-green-600 text-white text-lg rounded-[14px]"
        >
          {isLoggedIn ? 'Mehr Wörter kaufen' : 'Kostenlos starten'}
        </Link>
      </div>
    </section>
  )
}
