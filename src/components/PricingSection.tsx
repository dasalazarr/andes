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

            let cardClasses = "p-8 rounded-2xl flex flex-col relative border border-[#1a1a1a] bg-neutral-950/90 shadow-none backdrop-blur-sm transition-all duration-300 hover:border-[#25d366]/60";
            if (index === 0) {
              cardClasses += ""; // Gratis: fondo neutro
            } else {
              cardClasses += " bg-gradient-to-br from-[#006b5b]/80 via-[#25d366]/40 to-[#000]/80 ring-1 ring-[#25d366]/10 hover:backdrop-blur-md hover:shadow-[0_0_32px_0_rgba(37,211,102,0.25)] hover:scale-[1.02]";
            }

            return (
              <div 
                key={index} 
                className={cardClasses + (isPremium ? ' premium-card' : '')}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 -mt-3 mr-3 bg-[#25d366] text-black text-xs font-semibold px-3 py-1 rounded-full border border-[#006b5b]">
                    {translations.popular[language as keyof typeof translations.popular]}
                  </div>
                )}

                <div className="flex items-center mb-5">
                  {IconComponent && <IconComponent className={`w-7 h-7 mr-3 ${isPremium ? 'text-[#25d366]' : 'text-[#006b5b]'}`} />}
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">{plan.price}</span>
                  {plan.priceDetail && <span className="text-lg text-white ml-1 drop-shadow-sm">{plan.priceDetail}</span>}
                </div>

                <p className="text-white mb-8 text-base min-h-[40px] leading-relaxed drop-shadow-sm">{plan.description}</p>
                
                <button 
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 mb-8 border border-[#25d366] bg-transparent text-[#25d366] focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2 ${isPremium ? 'premium-btn' : 'border-opacity-40'}`}
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

                <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {translations.whatsIncluded[language as keyof typeof translations.whatsIncluded]}
                </div>
                <ul className="space-y-2 flex-grow text-sm pl-1">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-white flex items-center gap-2 drop-shadow-sm">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25d366] opacity-70"></span>
                      {typeof feature === 'string' ? feature.replace(/^[^a-zA-Z0-9]+/,'') : feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
  .premium-btn {
    transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
  }
  .premium-btn:hover,
  .premium-card:hover .premium-btn {
    background: #25d366 !important;
    color: #000 !important;
    box-shadow: 0 2px 16px 0 rgba(37,211,102,0.18);
    transform: scale(1.04);
    border-color: #25d366;
    z-index: 2;
  }
`}</style>
    </section>
  );
};

export default PricingSection;
