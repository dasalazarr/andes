import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket, Zap, HelpCircle } from 'lucide-react';
import AnimatedSection from "./AnimatedSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const iconComponents: { [key: string]: React.ElementType } = {
  Rocket,
  Zap,
};

interface Plan {
  name: string;
  iconName: string;
  price: string;
  priceDetail: string;
  description: string;
  features: (string | { text: string; tooltip: string })[];
  ctaText: string;
  href?: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
  onCtaClick?: () => void;
  image?: string;
  imageAlt?: string;
  [key: string]: any;
}

interface PricingSectionProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  plans: Plan[];
  onGetFreePlanClick?: () => void;
  language?: 'en' | 'es';
}

const PricingSection: React.FC<PricingSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  plans,
  language: propLanguage,
}) => {
  const location = useLocation();
  const language = propLanguage || (location.pathname.startsWith('/es') ? 'es' : 'en');
  const [buttonStates, setButtonStates] = useState<{ [key: string]: 'idle' | 'loading' | 'success' | 'error' }>({});

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
    }
  };

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
        return <span className="btn-text">{uiTranslations.success[language]}</span>;
      case 'error':
        return <span className="btn-text">{uiTranslations.error[language]}</span>;
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

  const translations = {
    popular: {
      en: 'Popular',
      es: 'Popular'
    },
    whatsIncluded: {
      en: "What's included:",
      es: 'Lo que incluye:'
    }
  };

  return (
    <>
      <AnimatedSection className="mb-6 md:mb-8 text-center pt-8 md:pt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white md:text-4xl">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="mx-auto mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-gray-300 md:text-lg px-4">
            {sectionSubtitle}
          </p>
        )}
      </AnimatedSection>

      <AnimatedSection className="mx-auto flex max-w-3xl flex-col">
        {plans.map((plan, index) => {
          const IconComponent = iconComponents[plan.iconName];
          const isPremium = plan.buttonVariant === 'primary';

          const wrapperClasses = index === 0
            ? 'sticky top-24 md:top-32 z-20 pb-24'
            : 'sticky top-24 md:top-32 -mt-16 md:-mt-24 z-30 pb-24';

          // Base geometry for both cards
          const cardBase = `overflow-hidden rounded-[32px] border transition-all duration-500 backdrop-blur-md`;

          // Distinct styles sharing the same geometry
          const cardClasses = isPremium
            // Pro: Glowing Green Glass (Dark base + Green Gradient)
            ? `${cardBase} bg-gradient-to-br from-[#0a0a0a]/90 to-[#0f3522]/90 border-[#27e97c] shadow-[0_0_60px_rgba(39,233,124,0.15)] text-white`
            // Free: Frosted Dark Glass
            : `${cardBase} bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-white shadow-2xl`;

          return (
            <div key={plan.name} className={wrapperClasses + (index === 0 ? '' : ' mt-64 md:mt-80')}>
              <article className={`${cardClasses} ${isPremium ? 'ring-1 ring-[#27e97c]/50' : ''}`}>
                <div className="md:grid md:grid-cols-[minmax(260px,0.95fr)_1.35fr] md:gap-10">
                  <div className="relative h-56 w-full overflow-hidden md:h-full group border-b md:border-b-0 md:border-r border-white/5">
                    <img
                      src={plan.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80'}
                      alt={plan.imageAlt || plan.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    {/* Unified Overlay for both to ensure text readability if overlaid, but here images are side panels */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  <div className="flex flex-col gap-6 p-6 md:p-10">
                    {(plan as any).urgencyText && (
                      <div className="text-center md:text-left">
                        <span className="text-sm font-bold uppercase tracking-wider text-[#27e97c] drop-shadow-[0_0_10px_rgba(39,233,124,0.5)]">
                          {(plan as any).urgencyText}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {IconComponent && (
                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-md border ${isPremium ? 'bg-[#27e97c]/20 border-[#27e97c] text-[#27e97c] shadow-[0_0_15px_rgba(39,233,124,0.3)]' : 'bg-white/5 border-white/10 text-white'}`}>
                          <IconComponent className="h-6 w-6" />
                        </span>
                      )}
                      <div>
                        <h3 className="text-2xl font-black text-white tracking-tight">{plan.name}</h3>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tight text-white">{plan.price}</span>
                        {plan.priceDetail && (
                          <span className="text-lg font-medium text-gray-400">{plan.priceDetail}</span>
                        )}
                      </div>
                      <p className="mt-4 text-base leading-relaxed font-medium text-gray-300">{plan.description}</p>
                    </div>

                    <div>
                      <button
                        id={isPremium ? 'start-premium-btn' : 'start-free-btn'}
                        className={`w-full rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black ${isPremium
                          ? 'bg-[#27e97c] text-black hover:bg-[#1fc869] focus:ring-[#27e97c] shadow-[0_0_20px_rgba(39,233,124,0.4)] hover:shadow-[0_0_35px_rgba(39,233,124,0.6)]'
                          : 'glass-button text-white hover:text-[#27e97c] hover:border-[#27e97c]/50 focus:ring-white/20'
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
                      {(plan as any).ctaDisclaimer && (
                        <p className="mt-3 text-center text-xs uppercase tracking-wider font-bold text-gray-500">
                          {(plan as any).ctaDisclaimer}
                        </p>
                      )}
                      {(plan as any).guarantee && (
                        <p className="mt-2 text-center text-sm font-medium text-gray-400">
                          {(plan as any).guarantee}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${isPremium ? 'text-[#27e97c]' : 'text-gray-500'}`}>
                        {translations.whatsIncluded[language as keyof typeof translations.whatsIncluded]}
                      </div>
                      <ul className="space-y-4 text-sm">
                        {plan.features.map((feature, fIndex) => {
                          const isFeatureObject = typeof feature === 'object';
                          const featureText = isFeatureObject ? feature.text : feature;
                          const featureTooltip = isFeatureObject ? feature.tooltip : null;
                          const isHighlighted = isPremium && (fIndex === 0 || fIndex === 1);

                          return (
                            <li key={fIndex} className={`flex items-start ${isHighlighted ? 'text-white font-bold' : 'text-gray-300 font-medium'} list-none group/feature`}>
                              <span className="leading-relaxed break-words flex-1 transition-colors duration-200 group-hover/feature:text-white">
                                {featureText}
                                {featureTooltip && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button className="inline-flex align-middle ml-1.5 text-gray-500 hover:text-[#27e97c] transition-colors">
                                          <HelpCircle className="h-4 w-4" />
                                          <span className="sr-only">Info</span>
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent className="glass-card-dark text-white border-white/10 max-w-[250px]">
                                        <p>{featureTooltip}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
        <div className="h-48" />
      </AnimatedSection>
    </>
  );
};

export default PricingSection;
