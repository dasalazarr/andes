import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket, Zap } from 'lucide-react';
import AnimatedSection from "./AnimatedSection";

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
  href?: string; // Add href property
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
  const language = propLanguage || (location.pathname.startsWith('/es') ? 'es' : 'en');
  const [buttonStates, setButtonStates] = useState<{[key: string]: 'idle' | 'loading' | 'success' | 'error'}>({});

  // Add UI state translations
  const uiTranslations = {
    loading: {
      free: {
        es: '🔄 Preparando entrenamiento...',
        en: '🔄 Preparing training...'
      },
      premium: {
        es: '🔄 Activando Premium...',
        en: '🔄 Activating Premium...'
      }
    },
    success: {
      es: '✅ Redirigiendo a WhatsApp...',
      en: '✅ Redirecting to WhatsApp...'
    },
    error: {
      es: '🔄 Redirigiendo al formulario...',
      en: '🔄 Redirecting to form...'
    }
  };

  const handleOnboarding = async (intent: 'free' | 'premium') => {
    const buttonKey = `${intent}-btn`;
    setButtonStates(prev => ({ ...prev, [buttonKey]: 'loading' }));



    try {
      const response = await fetch('https://v3-production-2670.up.railway.app/onboarding/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, language })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.whatsappLink) {
          setButtonStates(prev => ({ ...prev, [buttonKey]: 'success' }));

          setTimeout(() => {
            window.location.href = data.whatsappLink;
          }, 1000);
          return;
        }
      }

      throw new Error('API call failed');
    } catch (error) {
      console.error('Onboarding error:', error);
      setButtonStates(prev => ({ ...prev, [buttonKey]: 'error' }));

      setTimeout(() => {
        window.location.href = `/start?flow=${intent}&language=${language}`;
      }, 1500);
    }
  };

  // Update button rendering logic
  const getButtonText = (plan: Plan, isPremium: boolean) => {
    const currentState = buttonStates[`${isPremium ? 'premium' : 'free'}-btn`];



    switch (currentState) {
      case 'loading':
        return (
          <span className="btn-text">
            {uiTranslations.loading[isPremium ? 'premium' : 'free'][language]}
          </span>
        );
      case 'success':
        return (
          <span className="btn-text">
            {uiTranslations.success[language]}
          </span>
        );
      case 'error':
        return (
          <span className="btn-text">
            {uiTranslations.error[language]}
          </span>
        );
      default:
        return (
          <>
            <span className="btn-text">{plan.ctaText}</span>
            <span className="btn-icon" style={{ marginLeft: '8px' }}>
              {isPremium ? '💎' : '🏃‍♂️'}
            </span>
          </>
        );
    }
  };

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
    <>
      <AnimatedSection className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        )}
      </AnimatedSection>

      <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => {
          const IconComponent = iconComponents[plan.iconName];
          const isPremium = plan.buttonVariant === 'primary';
          const isFree = index === 0;

          let cardClasses = `p-6 lg:p-8 rounded-2xl flex flex-col relative transition-all duration-300 hover:-translate-y-1 min-h-[600px]`;

          if (isFree) {
            cardClasses += " border border-[#1a1a1a] bg-neutral-950/90 hover:border-[#27e97c]/40 hover:shadow-lg";
          } else {
            cardClasses += " bg-gradient-to-br from-white to-green-50 border-2 border-[#27e97c] shadow-xl hover:shadow-2xl hover:scale-105 text-gray-900 md:transform md:scale-105";
          }

          return (
            <div
              key={index}
              className={cardClasses + (isPremium ? ' premium-card' : '')}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  {(plan as any).popularBadge || translations.popular[language as keyof typeof translations.popular]}
                </div>
              )}

              {/* Add top padding for popular badge */}
              <div className={plan.isPopular ? "pt-4" : ""}>
                {/* Urgency Text */}
                {(plan as any).urgencyText && (
                  <div className="text-center mb-4">
                    <span className={`font-semibold text-sm ${isPremium ? 'text-red-600' : 'text-red-400'}`}>
                      {(plan as any).urgencyText}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-3">
                  {IconComponent && (
                    <div className="flex-shrink-0">
                      <IconComponent className={`w-6 h-6 ${isPremium ? 'text-[#27e97c]' : 'text-[#27e97c]'}`} />
                    </div>
                  )}
                  <h3 className={`text-lg lg:text-xl font-bold ${isPremium ? 'text-gray-900' : 'text-white'} leading-tight break-words`}>
                    {plan.name}
                  </h3>
                </div>
              </div>

              {/* Enhanced Pricing Display */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className={`text-4xl lg:text-5xl font-extrabold ${isPremium ? 'text-gray-900' : 'text-white'} tracking-tight`}>
                    {plan.price}
                  </span>
                  {plan.priceDetail && (
                    <span className={`text-lg ${isPremium ? 'text-gray-700' : 'text-white'} ml-1`}>
                      {plan.priceDetail}
                    </span>
                  )}
                </div>


              </div>

              <p className={`${isPremium ? 'text-gray-700' : 'text-white'} mb-6 text-base leading-relaxed`}>
                {plan.description}
              </p>
              
              <button
                id={isPremium ? 'start-premium-btn' : 'start-free-btn'}
                className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 ${
                  isPremium
                    ? 'bg-gradient-to-r from-[#27e97c] to-green-500 text-black hover:from-green-500 hover:to-[#27e97c] shadow-lg hover:shadow-xl focus:ring-[#27e97c]'
                    : 'border-2 border-[#27e97c] bg-transparent text-[#27e97c] hover:bg-[#27e97c] hover:text-black focus:ring-[#27e97c]'
                } andes-onboarding-btn ${buttonStates[`${isPremium ? 'premium' : 'free'}-btn`] === 'loading' ? 'opacity-80' : ''}`}
                data-intent={isPremium ? 'premium' : 'free'}
                data-language={language}
                type="button"
                onClick={() => handleOnboarding(isPremium ? 'premium' : 'free')}
                disabled={buttonStates[`${isPremium ? 'premium' : 'free'}-btn`] === 'loading'}
                aria-label={isPremium
                  ? (language === 'es' ? 'Comenzar entrenamiento premium' : 'Start premium training')
                  : (language === 'es' ? 'Comenzar entrenamiento gratuito' : 'Start free training')
                }
              >
                {getButtonText(plan, isPremium)}
              </button>

              {/* CTA Disclaimer */}
              {(plan as any).ctaDisclaimer && (
                <p className={`text-center text-sm ${isPremium ? 'text-gray-600' : 'text-gray-400'} mb-4`}>
                  {(plan as any).ctaDisclaimer}
                </p>
              )}

              {/* Guarantee */}
              {(plan as any).guarantee && (
                <div className="text-center mb-4">
                  <span className={`text-sm font-medium ${isPremium ? 'text-gray-700' : 'text-gray-300'}`}>
                    {(plan as any).guarantee}
                  </span>
                </div>
              )}

              <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.whatsIncluded[language as keyof typeof translations.whatsIncluded]}
              </div>
              <ul className="space-y-3 flex-grow text-sm">
                {plan.features.map((feature, fIndex) => {
                  const isHighlighted = isPremium && (fIndex === 0 || fIndex === 1); // Highlight first two features for premium
                  return (
                    <li key={fIndex} className={`flex items-start gap-3 ${isPremium ? 'text-gray-700' : 'text-white'} ${isHighlighted ? 'font-semibold' : ''}`}>
                      <span className="inline-block w-2 h-2 rounded-full bg-[#27e97c] mt-1.5 flex-shrink-0"></span>
                      <span className="leading-relaxed break-words overflow-hidden">
                        {typeof feature === 'string' ? feature : feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </AnimatedSection>
      <style>{`
  .premium-btn {
    transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
  }
  .premium-btn:hover,
  .premium-card:hover .premium-btn {
    background: #27e97c !important;
    color: #000 !important;
    box-shadow: 0 2px 16px 0 rgba(39,233,124,0.18);
    transform: scale(1.04);
    border-color: #27e97c;
    z-index: 2;
  }

  /* Andes Onboarding Button States */
  .andes-onboarding-btn.loading {
    opacity: 0.8;
    cursor: not-allowed;
    pointer-events: none;
  }

  .andes-onboarding-btn.loading .btn-text {
    opacity: 0.7;
  }

  .andes-onboarding-btn.success {
    background: #27e97c !important;
    color: #000 !important;
    border-color: #27e97c;
  }

  .andes-onboarding-btn.error {
    background: #ef4444 !important;
    color: white !important;
    border-color: #ef4444;
  }

  .andes-onboarding-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`}</style>
    </>
  );
};

export default PricingSection;
