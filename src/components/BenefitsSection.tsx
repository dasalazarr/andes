import React, { useState } from 'react';
import AnimatedSection from "./AnimatedSection";

interface BenefitItem {
  icon: React.ElementType;
  headline: string;
  copy: string;
  proof: string;
  testimonial: string;
}

interface BenefitsSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  benefits: BenefitItem[];
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ sectionTitle, sectionSubtitle, benefits }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatedSection className="text-center mb-12 md:mb-16 w-full">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection stagger className="w-full px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          const isOpen = expanded === index;
          return (
            <div
              key={index}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              onClick={() => setExpanded(isOpen ? null : index)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setExpanded(isOpen ? null : index)}
              className={`group relative cursor-pointer overflow-hidden rounded-[24px] bg-neutral-900/60 border border-neutral-800 p-6 text-left shadow-lg transition-all duration-200 ease-out focus:ring-2 focus:ring-[#16a34a] focus:outline-none transform ${isOpen ? 'border-[#16a34a] shadow-[0_0_24px_rgba(22,163,74,0.25)] scale-105 z-10 -translate-y-1' : 'hover:border-[#16a34a]/60 hover:shadow-lg hover:-translate-y-1'}`}
            >
              {/* Standardized icon with unified green color */}
              <div className="w-full flex justify-center">
                <div className={`mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#16a34a]/10 transition-all duration-200 ${isOpen ? 'scale-110 bg-[#16a34a]/20' : ''}`}>
                  <Icon className={`w-12 h-12 transition-transform duration-200 ${isOpen ? 'text-[#16a34a] scale-110' : 'text-[#16a34a]'}`} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white text-center min-h-[56px] flex items-center justify-center px-2">
                {benefit.headline}
              </h3>
              <p className="text-gray-300 text-base text-center min-h-[72px] px-2">
                {benefit.copy}
              </p>
              {/* Card expandible */}
              <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="bg-black/60 rounded-[20px] p-4 border border-[#16a34a]/20 shadow-inner flex flex-col items-center w-full">
                  <div className="text-[#16a34a] font-semibold text-sm mb-2 text-center">{benefit.proof}</div>
                  <blockquote className="text-gray-400 italic text-center text-sm max-w-xs">
                    {benefit.testimonial}
                  </blockquote>
                </div>
              </div>
              {/* Indicador visual de expansión */}
              <div className={`absolute right-6 top-6 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#16a34a]' : 'text-gray-500'}`}>▼</div>
            </div>
          );
        })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BenefitsSection;
