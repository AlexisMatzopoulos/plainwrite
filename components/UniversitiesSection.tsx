import Image from 'next/image'

export default function UniversitiesSection() {
  const universities = [
    { name: 'Harvard', image: '/images/harvard-university.webp' },
    { name: 'Oregon', image: '/images/university-of-oregon.webp' },
    { name: 'Leeds', image: '/images/university-of-leeds.webp' },
    { name: 'Ateneo', image: '/images/ateneo-university.webp' },
  ]

  return (
    <div className="w-full text-center py-16">
      <h2 className="text-4xl font-bold mb-8 text-slate-950 text-center">
        Unterstützung für Autoren an führenden Institutionen
      </h2>
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-4 px-4 max-w-6xl mx-auto">
        {universities.map((university) => (
          <div key={university.name} className="flex items-center text-slate-700">
            <div className="w-48 h-24 flex items-center justify-center">
              <Image
                src={university.image}
                alt={university.name}
                width={200}
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
