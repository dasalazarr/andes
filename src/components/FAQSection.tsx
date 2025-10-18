import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { trackFAQClick, trackFAQContactSupport } from '../lib/analytics';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  language: 'en' | 'es';
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, language }) => {
  const handleClick = () => {
    trackFAQClick(question, language);
    onClick();
  };

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.slice(0, 10)}`}
      >
        <span className="text-lg font-medium leading-relaxed text-white">{question}</span>
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors duration-200">
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      <div
        id={`faq-answer-${question.slice(0, 10)}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6 pr-6 text-base leading-relaxed text-gray-300">{answer}</div>
      </div>
    </div>
  );
};

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  faqs: FAQ[];
  language: 'en' | 'es';
}

const FAQSection: React.FC<FAQSectionProps> = ({ sectionTitle, sectionSubtitle, faqs, language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactSupport = () => {
    trackFAQContactSupport(language);
    // TODO: Implementar flujo de contacto
  };

  return (
    <section id="faq" className="bg-black py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{sectionTitle}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{sectionSubtitle}</p>
        </div>

        <div className="rounded-[28px] shadow-[0_25px_50px_rgba(0,0,0,0.45)]">
          <div className="px-6 md:px-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
