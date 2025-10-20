import Image from 'next/image'

export default function UniversitiesSection() {
  const universities = [
    { name: 'LMU', image: '/images/LMU.png' },
    { name: 'Humboldt', image: '/images/humboldt.png' },
    { name: 'TUM', image: '/images/TUM.jpg' },
    { name: 'Heidelberg', image: '/images/heidelberg university.jpg' },
    { name: 'ETH Zürich', image: '/images/eth_zurich.png' },
  ]

  // Duplicate the array for seamless infinite scroll
  const duplicatedUniversities = [...universities, ...universities]

  return (
    <div className="w-full text-center py-4">
      <h2 className="text-2xl font-bold mb-8 text-theme-text text-center">
        Unterstützung für Autoren an führenden Institutionen
      </h2>
      <div className="container mx-auto px-4">
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="flex animate-scroll">
          {duplicatedUniversities.map((university, index) => (
            <div key={`${university.name}-${index}`} className="flex items-center text-slate-700 flex-shrink-0 mx-8">
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
      </div>
    </div>
  )
}
