import React from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket, Zap, Check, Icon as LucideIcon } from 'lucide-react';

// Define a type for the icon components for cleaner mapping
const iconComponents: { [key: string]: React.ElementType } = {
  Rocket: Rocket,
  Zap: Zap,
};

interface Plan {
  name: string;
  iconName: string;
  price: string;
  priceDetail: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
  onCtaClick?: () => void; // Kept for potential future use, but not primary for this redesign
}

interface PricingSectionProps {
  sectionTitle: string;
  sectionSubtitle?: string; // Made optional to avoid breaking home.tsx immediately
  plans: Plan[];
  onGetFreePlanClick?: () => void;
  language?: 'en' | 'es'; // Add language prop
}

const PricingSection: React.FC<PricingSectionProps> = ({ 
  sectionTitle, 
  sectionSubtitle, 
  plans, 
  onGetFreePlanClick,
  language: propLanguage 
}) => {
  const location = useLocation();
  // Use propLanguage if provided, otherwise detect from URL
  const language = propLanguage || (location.pathname.startsWith('/es') ? 'es' : 'en');
  
  // Bilingual text
  const translations = {
    popular: {
      en: 'Popular',
      es: 'Popular'
    },
    whatsIncluded: {
      en: "What's included:",
      es: "Lo que incluye:"
    }
  };
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950 text-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = iconComponents[plan.iconName];
            const isPremium = plan.buttonVariant === 'primary'; // Corresponds to the second card (index 1)

            let cardClasses = "p-8 rounded-xl flex flex-col relative border border-neutral-700 shadow-lg shadow-black/30 backdrop-blur-sm";
            
            if (index === 0) { // Card 1 (Gratis) - Origin at bottom
              cardClasses += " bg-[radial-gradient(ellipse_at_50%_100%,theme(colors.bg-purple-light/60%)_0%,theme(colors.bg-purple-dark/50%)_75%)]";
            } else { // Card 2 (Premium) - Origin at top
              cardClasses += " bg-[radial-gradient(ellipse_at_50%_0%,theme(colors.fuchsia-gradient-start/60%)_0%,theme(colors.bg-purple-dark/50%)_75%)] ring-1 ring-electric-fuchsia/30";
            }

            return (
              <div 
                key={index} 
                className={cardClasses}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 -mt-3 mr-3 bg-gradient-to-r from-electric-fuchsia to-fuchsia-gradient-end text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse-slow">
                    {translations.popular[language as keyof typeof translations.popular]}
                  </div>
                )}

                <div className="flex items-center mb-5">
                  {IconComponent && <IconComponent className={`w-8 h-8 mr-4 ${isPremium ? 'text-electric-fuchsia animate-icon-glow' : 'text-link-purple'}`} />}
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  {plan.priceDetail && <span className="text-lg text-gray-300 ml-1">{plan.priceDetail}</span>}
                </div>

                <p className="text-gray-300 mb-8 text-sm min-h-[40px]">{plan.description}</p>
                
                <button 
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 mb-8 transform hover:scale-105 
                    ${isPremium // Premium plan button (index 1)
                      ? 'bg-gradient-to-r from-neon-purple to-electric-fuchsia hover:from-fuchsia-gradient-start hover:to-purple-hover text-white shadow-lg hover:shadow-electric-fuchsia/50'
                      // Gratis plan button (index 0)
                      : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300 shadow-md hover:shadow-neutral-700/40 border-t border-link-purple/20'}`}
                  onClick={() => {
                    if (isPremium) {
                      window.location.href = 'https://9968687471249.gumroad.com/l/andes';
                    } else if (onGetFreePlanClick) {
                      onGetFreePlanClick();
                    }
                  }}
                >
                  {plan.ctaText}
                </button>

                <div className="mb-2 text-sm font-medium text-gray-100">
                  {translations.whatsIncluded[language as keyof typeof translations.whatsIncluded]}
                </div>
                <ul className="space-y-3 flex-grow text-sm pl-1">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-gray-300">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
