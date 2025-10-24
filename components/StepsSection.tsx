import Image from 'next/image'

export default function StepsSection() {
  const steps = [
    {
      step: 1,
      title: 'Paste Text',
      description: 'Paste any content — homework, assignments, or AI-generated drafts',
      image: '/images/step1.webp',
    },
    {
      step: 2,
      title: 'Check AI Score',
      description: 'See how much of your text is considered human-written',
      image: '/images/step2.webp',
    },
    {
      step: 3,
      title: 'Humanize',
      description: 'Rewrite your text to sound 100% human and pass AI detection',
      image: '/images/step3.webp',
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-theme-text">
            Humanize AI Text in 3 Simple Steps
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Perfect for essays, assignments, blog posts, and research papers
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
              <div className="inline-block rounded-full px-3 py-1 mb-4" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
                <span className="text-sm font-semibold text-theme-primary uppercase">
                  Step {step.step}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-theme-text">{step.title}</h3>
              <p className="text-slate-500 text-md">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
