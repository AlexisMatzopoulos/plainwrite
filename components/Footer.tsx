import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 bg-white text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Copyright */}
          <p className="text-sm font-semibold">© 2025 PlainWrite</p>

          {/* Links */}
          <div className="flex space-x-6">
            {/* <Link href="/imprint" className="text-sm hover:underline">
              Imprint
            </Link> */}
            <Link href="/privacy-policy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="text-sm hover:underline">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
