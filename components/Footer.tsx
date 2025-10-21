import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 bg-slate-100 text-slate-500 border-t border-slate-300">
      <div className="container mx-auto px-4 pt-0 md:max-w-6xl">
        <div className="text-sm mb-6">
          EchtSchreib ist kein Werkzeug für akademische Unehrlichkeit oder Betrug.{' '}
          <Link href="/ethical-usage" className="underline">
            Mehr erfahren
          </Link>
        </div>

        <hr className="border-slate-300 mb-4 mt-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-auto">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Produkt</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Humanisierer
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:underline">
                  Preise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Kontakt</h3>
            <Link href="mailto:echtschreib@gmail.com" className="text-sm hover:underline">
              echtschreib@gmail.com
            </Link>
          </div>
        </div>

        <hr className="border-slate-300 mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 font-bold">© 2025 EchtSchreib</p>
          <div className="flex space-x-6">
            <Link href="/datenschutz" className="text-sm hover:underline">
              Datenschutz
            </Link>
            <Link href="/nutzungsbedingungen" className="text-sm hover:underline">
              Nutzungsbedingungen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
