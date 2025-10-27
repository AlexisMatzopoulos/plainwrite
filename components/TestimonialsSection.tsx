interface TestimonialsSectionProps {
  isLoggedIn?: boolean
}

export default function TestimonialsSection({ isLoggedIn = false }: TestimonialsSectionProps) {
  const testimonials = [
    {
      quote:
        'PlainWrite hat mir geholfen, KI-Text von ChatGPT in Sekunden zu humanisieren. Es ließ mein Schreiben echt klingen und bestand Turnitin problemlos. Dieses Tool hat meine Note gerettet.',
      author: 'Julia K., Studentin',
    },
    {
      quote:
        "Ich habe mehrere Tools ausprobiert, um KI-Detektoren zu umgehen, aber nichts ist mit PlainWrite vergleichbar. Es ist schnell, präzise, und die kostenlose Humanisierungs-Funktion ist ein Lebensretter.",
      author: 'Liam R., Content-Autor',
    },
    {
      quote:
        'Das Beste an PlainWrite? Ich kann meinen Text humanisieren und KI-Entwürfe umschreiben, ohne Qualität zu verlieren. Es fühlt sich an, als hätte ein echter Redakteur es überarbeitet.',
      author: 'Sophie M., Freelancerin',
    },
  ]

  return (
    <div className="relative w-full py-16">
      {isLoggedIn ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 75%), url(/images/gradient.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-slate-950">
          Was unsere Nutzer sagen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500 w-8 h-8 mb-4 fill-green-500 stroke-1 transform -rotate-180"
              >
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
              </svg>
              <p className="text-slate-800 mb-4 flex-grow">{testimonial.quote}</p>
              <p className="text-slate-400">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
