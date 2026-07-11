import React from 'react';
import AnimatedSection from "./AnimatedSection";

interface BenefitItem {
  icon: React.ElementType;
  headline: string;
  copy: string;
  proof: string;
  testimonial?: string;
}

interface BenefitsSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  benefits: BenefitItem[];
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ sectionTitle, sectionSubtitle, benefits }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <AnimatedSection className="mb-8 w-full text-center md:mb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-lg">
            {sectionSubtitle}
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection className="w-full px-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.headline}
                  className="group glass-panel rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.12)] md:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                      Paso {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{benefit.headline}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
                    {benefit.copy}
                  </p>

                  <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-medium text-gray-200 md:text-sm">
                    {benefit.proof}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BenefitsSection;
