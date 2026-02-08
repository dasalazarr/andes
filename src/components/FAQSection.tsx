import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { trackFAQClick } from '../lib/analytics';

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
    if (typeof window !== 'undefined' && window.gtag && /30\s*(mensajes|messages)/i.test(question)) {
      window.gtag('event', 'faq_open_30_messages', {
        language,
        question,
        page_location: window.location.href,
      });
    }
    onClick();
  };

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 md:py-6"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.slice(0, 10)}`}
      >
        <span className="text-base font-medium leading-relaxed text-white md:text-lg">{question}</span>
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
        <div className="pb-5 pr-6 text-sm leading-relaxed text-gray-300 md:pb-6 md:text-base">{answer}</div>
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

  return (
    <section id="faq" className="bg-black py-14 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">{sectionTitle}</h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-lg">{sectionSubtitle}</p>
        </div>

        <div className="glass-card-premium rounded-[28px] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.45)]">
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
