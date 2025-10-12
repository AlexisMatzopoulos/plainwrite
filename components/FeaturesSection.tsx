import Image from 'next/image'

export default function FeaturesSection() {
  const features = [
    {
      title: (
        <>
          Built on Science,
          <br />
          Powered by Precision
        </>
      ),
      description: (
        <>
          Our rewriting engine is trained on over 1.2 million samples of academic writing,
          essays, and AI-generated text.
          <br />
          <br />
          Using advanced linguistic modeling, we analyze syntax, tone, and word patterns commonly
          flagged by detection systems.
        </>
      ),
      imagePosition: 'right',
      image: '/images/feature1.webp',
    },
    {
      title: (
        <>
          Tested and Proven
          <br />
          Across All AI-Detectors
        </>
      ),
      description: (
        <>
          We test every rewrite against leading detection tools like GPTZero, Turnitin, ZeroGPT,
          Quillbot and more.
          <br />
          <br />
          Our system is updated weekly to adapt to new detection methods and eliminate flagged
          patterns like burstiness, perplexity, and unnatural phrasing.
        </>
      ),
      imagePosition: 'left',
      image: '/images/feature2.webp',
    },
    {
      title: (
        <>
          Trusted by 350,000+
          <br />
          Writers Worldwide
        </>
      ),
      description: (
        <>
          Students polish their writing to sound more natural, marketers improve content for
          better engagement and SEO, and businesses send emails that feel personal — not robotic.
          <br />
          <br />
          Natural Write adapts to each use case, delivering clear, human-sounding text that reads
          like it was written by you.
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
