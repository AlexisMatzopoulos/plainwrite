import Link from 'next/link'

export default function CTASection() {
  return (
    <div
      className="py-16 w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/gradient.webp')",
      }}
    >
      <div className="lg:container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-950 mb-4">
          Make Your Text Sound Human — Instantly
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          Transform robotic, AI-generated content into clear, natural writing that passes any AI detector. With PlainWrite, you can humanize your text in seconds — no editing skills required.
        </p>
        <Link
          href="/api/auth/signin"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-12 px-8 bg-theme-primary bg-theme-primary-hover text-white text-lg rounded-[14px]"
        >
          Get Started Free
        </Link>
        <div className="mt-4 text-sm text-slate-500">
          500 words free. No credit card required
        </div>
      </div>
    </div>
  )
}
