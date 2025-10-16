'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Wie funktioniert EchtSchreib?',
      answer:
        'EchtSchreib verwendet fortschrittliche KI-Technologie, um deinen Text in einem natürlicheren, menschlicheren Stil umzuschreiben. Es analysiert Muster, nach denen KI-Detektoren suchen, und strukturiert deine Inhalte um, um sie zu umgehen, während die ursprüngliche Bedeutung erhalten bleibt.',
    },
    {
      question: 'Umgeht EchtSchreib Turnitin und andere KI-Prüfer?',
      answer:
        'Ja, EchtSchreib wurde speziell entwickelt, um deine Inhalte durch KI-Erkennungstools wie Turnitin, GPTZero, ZeroGPT, Copyleaks und andere zu bringen. Unser System wird regelmäßig aktualisiert, um sich an neue Erkennungsmethoden anzupassen.',
    },
    {
      question: 'Wie viel kostet EchtSchreib?',
      answer:
        'EchtSchreib bietet sowohl kostenlose als auch Premium-Pläne an. Kostenlose Nutzer erhalten eine begrenzte Anzahl von Wörtern pro Monat, während Premium-Pläne unbegrenzte Humanisierung mit erweiterten Funktionen bieten.',
    },
    {
      question: 'Welche Sprachen unterstützt EchtSchreib?',
      answer:
        'Derzeit unterstützt EchtSchreib hauptsächlich Englisch. Wir arbeiten daran, in Zukunft Unterstützung für weitere Sprachen hinzuzufügen.',
    },
    {
      question: 'Ich möchte einen langen Aufsatz humanisieren. Ist das möglich?',
      answer:
        'Ja! Du kannst Aufsätze jeder Länge humanisieren. Premium-Nutzer haben Zugang zu unbegrenzter Wortanzahl, was es einfach macht, längere Dokumente zu humanisieren.',
    },
    {
      question: 'Ich habe mein Wortlimit erreicht. Wie kann ich es erweitern?',
      answer:
        'Du kannst auf einen Premium-Plan upgraden, um mehr Wörter oder unbegrenzten Zugang zu erhalten. Besuche unsere Preisseite, um verfügbare Optionen zu sehen.',
    },
    {
      question: 'Kann ich frühere Humanisierungen sehen?',
      answer:
        'Ja, alle deine früheren Humanisierungen werden in deinem Konto-Verlauf gespeichert. Du kannst jederzeit von deinem Dashboard darauf zugreifen.',
    },
    {
      question: 'Wie kündige ich mein Abonnement?',
      answer:
        'Du kannst dein Abonnement jederzeit in deinen Kontoeinstellungen kündigen. Dein Zugang bleibt bis zum Ende deines Abrechnungszeitraums bestehen.',
    },
    {
      question: 'Bestraft Google KI-generierte Inhalte?',
      answer:
        'Googles Fokus liegt auf der Inhaltsqualität, nicht darauf, ob sie KI-generiert sind. Humanisierte Inhalte schneiden jedoch tendenziell besser ab, da sie natürlicher lesen und Leser effektiver ansprechen.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8 text-slate-950">FAQ</h2>
      <div className="w-full max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all text-left hover:no-underline w-full"
            >
              {faq.question}
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
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            {openIndex === index && (
              <div className="pb-4 pt-0">
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
