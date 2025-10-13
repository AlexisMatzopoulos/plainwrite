import Image from 'next/image'

export default function StepsSection() {
  const steps = [
    {
      step: 1,
      title: 'Text einfügen',
      description: 'Fügen Sie beliebige Inhalte ein — Hausaufgaben, Aufgaben oder KI-generierte Entwürfe',
      image: '/images/step1.webp',
    },
    {
      step: 2,
      title: 'KI-Score prüfen',
      description: 'Sehen Sie, wie viel von Ihrem Text als menschlich geschrieben gilt',
      image: '/images/step2.webp',
    },
    {
      step: 3,
      title: 'Humanisieren',
      description: 'Schreiben Sie Ihren Text um, damit er zu 100% menschlich klingt und KI-Erkennung besteht',
      image: '/images/step3.webp',
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-950">
            KI-Texte in 3 einfachen Schritten humanisieren
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Perfekt für Essays, Aufgaben, Blogbeiträge und Forschungsarbeiten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-[16px] overflow-hidden hover:ring-1 hover:ring-green-500 p-6 shadow-lg"
            >
              <div className="w-full h-52 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block bg-green-100 rounded-full px-3 py-1 mb-4">
                <span className="text-sm font-semibold text-green-600 uppercase">
                  Schritt {step.step}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">{step.title}</h3>
              <p className="text-slate-500 text-md">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
