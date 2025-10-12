'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How does Natural Write work?',
      answer:
        'Natural Write uses advanced AI technology to rewrite your text in a more natural, human-like style. It analyzes patterns that AI detectors look for and restructures your content to bypass them while maintaining the original meaning.',
    },
    {
      question: 'Does Natural Write bypass Turnitin and other AI checkers?',
      answer:
        'Yes, Natural Write is specifically designed to help your content pass AI detection tools including Turnitin, GPTZero, ZeroGPT, Copyleaks, and others. Our system is regularly updated to adapt to new detection methods.',
    },
    {
      question: 'How much does Natural Write cost?',
      answer:
        'Natural Write offers both free and premium plans. Free users get a limited number of words per month, while premium plans offer unlimited humanization with advanced features.',
    },
    {
      question: 'What languages does Natural Write support?',
      answer:
        'Currently, Natural Write primarily supports English. We are working on adding support for more languages in the future.',
    },
    {
      question: 'I want to humanize a long essay. Is it possible?',
      answer:
        'Yes! You can humanize essays of any length. Premium users have access to unlimited word counts, making it easy to humanize longer documents.',
    },
    {
      question: 'I reached my word limit. How can I extend it?',
      answer:
        'You can upgrade to a premium plan to get more words or unlimited access. Visit our pricing page to see available options.',
    },
    {
      question: 'Can I see previous humanizations?',
      answer:
        'Yes, all your previous humanizations are saved in your account history. You can access them anytime from your dashboard.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer:
        'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.',
    },
    {
      question: 'Does Google penalize AI-generated content?',
      answer:
        "Google's focus is on content quality, not whether it's AI-generated. However, humanized content tends to perform better as it reads more naturally and engages readers more effectively.",
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
