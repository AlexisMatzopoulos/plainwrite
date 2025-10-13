import Image from 'next/image'

export default function FeaturesSection() {
  const features = [
    {
      title: (
        <>
          Auf Wissenschaft aufgebaut,
          <br />
          mit Präzision betrieben
        </>
      ),
      description: (
        <>
          Unsere Umschreibungs-Engine wurde mit über 1,2 Millionen Proben akademischer Texte,
          Essays und KI-generierter Inhalte trainiert.
          <br />
          <br />
          Mit fortschrittlicher linguistischer Modellierung analysieren wir Syntax, Ton und Wortmuster,
          die häufig von Erkennungssystemen markiert werden.
        </>
      ),
      imagePosition: 'right',
      image: '/images/feature1.webp',
    },
    {
      title: (
        <>
          Getestet und bewährt
          <br />
          bei allen KI-Detektoren
        </>
      ),
      description: (
        <>
          Wir testen jede Umschreibung gegen führende Erkennungstools wie GPTZero, Turnitin, ZeroGPT,
          Quillbot und mehr.
          <br />
          <br />
          Unser System wird wöchentlich aktualisiert, um sich an neue Erkennungsmethoden anzupassen und
          markierte Muster wie Burst-Verhalten, Perplexität und unnatürliche Formulierungen zu eliminieren.
        </>
      ),
      imagePosition: 'left',
      image: '/images/feature2.webp',
    },
    {
      title: (
        <>
          Vertraut von über 350.000
          <br />
          Autoren weltweit
        </>
      ),
      description: (
        <>
          Studenten verfeinern ihre Texte, um natürlicher zu klingen, Marketer verbessern Inhalte für
          besseres Engagement und SEO, und Unternehmen versenden E-Mails, die persönlich wirken – nicht roboterhaft.
          <br />
          <br />
          EchtSchreib passt sich jedem Anwendungsfall an und liefert klare, menschlich klingende Texte,
          die sich lesen, als hätten Sie sie selbst geschrieben.
        </>
      ),
      imagePosition: 'right',
      image: '/images/feature3.webp',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="space-y-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col-reverse lg:flex-row items-center gap-8 ${
              feature.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:w-1/2">
              <div className="w-full h-auto aspect-[3/2] rounded-lg relative overflow-hidden">
                <Image
                  src={feature.image}
                  alt={`Feature ${index + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-4xl font-bold text-slate-900">{feature.title}</h3>
              <p className="text-lg text-slate-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
