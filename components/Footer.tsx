import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 bg-white text-slate-500 border-t border-slate-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 font-bold">© 2025 EchtSchreib</p>
          <div className="flex space-x-6">
            {/* <Link href="/impressum" className="text-sm hover:underline">
              Impressum
            </Link> */}
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
