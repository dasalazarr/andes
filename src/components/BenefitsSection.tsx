import React, { Suspense, lazy } from 'react';

const InteractiveBotDemo = lazy(() => import('./InteractiveBotDemo'));

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  sectionTitle: string;
  sectionSubtitle: string; // Added subtitle
  benefits: BenefitItem[];
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ sectionTitle, sectionSubtitle, benefits }) => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-black text-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            {sectionSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-left transition-all duration-300 hover:border-purple-500/50 hover:bg-neutral-800/60">
              <div className="mb-4">
                {React.createElement(benefit.icon, { className: "w-7 h-7 text-purple-400" })}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
              <p className="text-gray-400 text-base">{benefit.description}</p>
            </div>
          ))}
        </div>

        <Suspense fallback={<div className="text-center mt-12">Cargando demo...</div>}>
          <InteractiveBotDemo />
        </Suspense>

      </div>
    </section>
  );
};

export default BenefitsSection;
