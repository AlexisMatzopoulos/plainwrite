import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 bg-slate-100 text-slate-500 border-t border-slate-300">
      <div className="container mx-auto px-4 pt-0 md:max-w-6xl">
        <div className="text-sm mb-6">
          Natural Write is not a tool for academic dishonesty or cheating.{' '}
          <Link href="/ethical-usage" className="underline">
            Read more
          </Link>
        </div>

        <hr className="border-slate-300 mb-4 mt-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-auto">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Humanizer
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-sm hover:underline">
                  Earn with us
                </Link>
              </li>
              <li>
                <Link href="/ip-checker" className="text-sm hover:underline">
                  IP Checker
                </Link>
              </li>
              <li>
                <a
                  href="https://forms.gle/gWSc869rNh3FusGR6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
            <Link href="mailto:hello.naturalwrite@gmail.com" className="text-sm hover:underline">
              hello.naturalwrite@gmail.com
            </Link>
          </div>
        </div>

        <hr className="border-slate-300 mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 font-bold">© 2025 Natural Write</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
