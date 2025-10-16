import Image from 'next/image'

export default function DetectorsSection() {
  const detectors = [
    { name: 'Turnitin', image: '/images/turnitin.webp' },
    { name: 'Ouriginal', image: '/images/ouriginal.jpg' },
    { name: 'Plagscan', image: '/images/plagscan.png' },
    { name: 'Plagaware', image: '/images/plagaware.png' },
    { name: 'Grammarly', image: '/images/grammarly.webp' },
    { name: 'GPTZero', image: '/images/gptzero.webp' },
  ]

  return (
    <div className="container mx-auto px-4 text-center py-16">
      <h2 className="text-2xl font-bold mb-8 text-slate-950">KI-Inhaltsdetektoren umgehen</h2>
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-4 px-4 max-w-6xl mx-auto">
        {detectors.map((detector) => (
          <div key={detector.name} className="flex items-center text-slate-700">
            <div className="w-32 h-24 flex items-center justify-center">
              <Image
                src={detector.image}
                alt={detector.name}
                width={132}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
