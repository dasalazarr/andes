import React from 'react';

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onCTAClick?: () => void; // Optional click handler for the button
}

const CTASection: React.FC<CTASectionProps> = ({ title, subtitle, buttonText, onCTAClick }) => {
  return (
    <section id="cta" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
          {subtitle}
        </p>
        <button 
          onClick={onCTAClick}
          className="bg-white hover:bg-gray-100 text-blue-700 font-bold py-4 px-10 rounded-lg text-lg md:text-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTASection;
