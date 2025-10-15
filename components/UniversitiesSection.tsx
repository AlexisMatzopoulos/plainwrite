import Image from 'next/image'

export default function UniversitiesSection() {
  const universities = [
    { name: 'LMU', image: '/images/LMU.png' },
    { name: 'Humboldt', image: '/images/humboldt.png' },
    { name: 'TUM', image: '/images/TUM.jpg' },
    { name: 'Heidelberg', image: '/images/heidelberg university.jpg' },
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
