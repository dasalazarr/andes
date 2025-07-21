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
    <>
      <AnimatedSection className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-gray-400">
          {sectionSubtitle}
        </p>
      </AnimatedSection>
      <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 text-left shadow-lg transition-all duration-300 focus:ring-2 focus:ring-[#25d366] focus:outline-none ${isOpen ? 'border-[#25d366] shadow-[0_0_24px_rgba(37,211,102,0.25)] scale-105 z-10' : 'hover:border-[#25d366]/60 hover:shadow-[0_0_15px_rgba(37,211,102,0.15)]'}`}
            >
              {/* Micro-animación del ícono */}
              <div className={`mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366]/10 transition-all duration-300 ${isOpen ? 'scale-110 bg-[#25d366]/20' : ''}`}>
                <Icon className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'text-[#25d366] scale-110' : 'text-[#25d366]'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white text-center min-h-[56px]">{benefit.headline}</h3>
              <p className="text-gray-300 text-base text-center min-h-[72px]">{benefit.copy}</p>
              {/* Card expandible */}
              <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="bg-black/60 rounded-xl p-4 border border-[#25d366]/20 shadow-inner flex flex-col items-center">
                  <div className="text-[#25d366] font-semibold text-sm mb-2">{benefit.proof}</div>
                  <blockquote className="text-gray-400 italic text-center text-sm">{benefit.testimonial}</blockquote>
                </div>
              </div>
              {/* Indicador visual de expansión */}
              <div className={`absolute right-6 top-6 w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#25d366]' : 'text-gray-500'}`}>▼</div>
            </div>
          );
        })}
      </AnimatedSection>
    </>
  );
};

export default BenefitsSection;
