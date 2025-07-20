import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={handleClick}
        className="w-full flex justify-between items-center text-left py-6 focus:outline-none focus:ring-1 focus:ring-[#25d366] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.slice(0, 10)}`}
      >
        <span className="text-lg font-medium text-white pr-4 leading-relaxed">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-[#25d366]' : ''
          }`}
        />
      </button>
      
      <div
        id={`faq-answer-${question.slice(0, 10)}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6">
          <p className="text-gray-300 leading-relaxed text-base">
            {answer}
          </p>
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
  language: 'en' | 'es';
}

const FAQSection: React.FC<FAQSectionProps> = ({ sectionTitle, sectionSubtitle, faqs, language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primer FAQ abierto por defecto
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactSupport = () => {
    trackFAQContactSupport(language);
    // TODO: Implementar lógica de contacto
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>
        
        <div className="bg-gray-900/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-800/50">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  language={language}
                />
            ))}
          </div>
        </div>
        
        {/* CTA adicional */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            {language === 'es' ? '¿No encuentras la respuesta que buscas?' : "Can't find the answer you're looking for?"}
          </p>
          <button 
            onClick={handleContactSupport}
            className="inline-flex items-center px-6 py-3 text-[#25d366] border border-[#25d366] rounded-lg hover:bg-[#25d366] hover:text-black transition-colors duration-200 font-medium"
          >
            {language === 'es' ? 'Contactar soporte' : 'Contact support'}
            <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
