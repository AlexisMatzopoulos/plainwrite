import Link from 'next/link'

interface HeroSectionProps {
  isLoggedIn?: boolean
}

export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          KI-Texte humanisieren & KI-Detektoren überlisten
        </h1>
        <p className="text-muted-foreground mb-6 mt-4 text-slate-500 max-w-xl mx-auto">
          EchtSchreib macht aus deinen KI-generierten Inhalten vollständig humanisiertes, nicht erkennbares Schreiben, das jedes KI-Erkennungstool übersteht.
        </p>
        <Link
          href={isLoggedIn ? '/pricing' : '/api/auth/signin'}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-10 py-8 px-16 bg-green-500 hover:bg-green-600 text-white text-lg rounded-[14px]"
        >
          {isLoggedIn ? 'Mehr Wörter kaufen' : 'Kostenlos starten'}
        </Link>
        {!isLoggedIn && (
          <div className="text-sm mt-2" style={{ color: 'rgb(100, 116, 139)' }}>
            Keine Kreditkarte erforderlich
          </div>
        )}
      </div>
    </section>
  )
}
