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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 justify-center">
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
                  className={`group relative cursor-pointer overflow-hidden rounded-[24px] glass-panel p-5 md:p-6 text-left transition-all duration-300 ease-out focus:outline-none transform ${isOpen ? 'border-[#27e97c] shadow-[0_0_30px_rgba(39,233,124,0.2)] bg-neutral-950/80 scale-105 z-10 -translate-y-1 ring-1 ring-[#27e97c]/50' : 'glass-panel-hover hover:-translate-y-1'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Standardized icon with unified green color */}
                  <div className="w-full flex justify-center relative z-10">
                    <div className={`mb-4 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-md border transition-all duration-300 ${isOpen ? 'bg-[#27e97c]/20 border-[#27e97c] scale-110 shadow-[0_0_15px_rgba(39,233,124,0.3)]' : 'bg-white/5 border-white/10 group-hover:border-[#27e97c]/50 group-hover:bg-[#27e97c]/10'}`}>
                      <Icon className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${isOpen ? 'text-[#27e97c] scale-110' : 'text-gray-300 group-hover:text-[#27e97c]'}`} />
                    </div>
                  </div>
                  <h3 className="relative z-10 text-lg md:text-xl font-bold mb-2 md:mb-3 text-white text-center md:min-h-[56px] flex items-center justify-center px-1 md:px-2 group-hover:text-[#27e97c] transition-colors duration-300">
                    {benefit.headline}
                  </h3>
                  <p className="relative z-10 text-gray-300 text-sm md:text-base text-center md:min-h-[72px] px-1 md:px-2 leading-relaxed">
                    {benefit.copy}
                  </p>
                  {/* Card expandible */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="bg-white/5 rounded-[20px] p-4 border border-[#27e97c]/20 flex flex-col items-center w-full backdrop-blur-sm relative z-10">
                      <div className="text-[#27e97c] font-bold text-sm mb-2 text-center tracking-wide uppercase">{benefit.proof}</div>
                      <blockquote className="text-gray-300 italic text-center text-sm max-w-xs leading-relaxed">
                        "{benefit.testimonial}"
                      </blockquote>
                    </div>
                  </div>
                  {/* Indicador visual de expansión */}
                  <div className={`absolute right-6 top-6 w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-[#27e97c]' : 'text-gray-600 group-hover:text-[#27e97c]/70'}`}>▼</div>
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
