import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-500/50">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-5 md:p-6 focus:outline-none"
      >
        <span className="text-base md:text-lg font-medium text-gray-100">{question}</span>
        <ChevronDown
          className={`w-6 h-6 transform transition-transform duration-300 text-purple-400 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-5 md:px-6 pb-5 text-gray-400">
          <p>{answer}</p>
        </div>
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
}

const FAQSection: React.FC<FAQSectionProps> = ({ sectionTitle, sectionSubtitle, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            {sectionSubtitle}
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
