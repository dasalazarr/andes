import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket, Zap } from 'lucide-react';
import AnimatedSection from "./AnimatedSection";

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
  features: string[];
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

      setTimeout(() => {
        window.location.href = `/start?flow=${intent}&language=${language}`;
      }, 1500);
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

      <AnimatedSection className="mx-auto flex max-w-3xl flex-col">
        {plans.map((plan, index) => {
          const IconComponent = iconComponents[plan.iconName];
          const isPremium = plan.buttonVariant === 'primary';

          const wrapperClasses = index === 0
            ? 'sticky top-24 md:top-32 z-20 pb-24'
            : 'sticky top-24 md:top-32 -mt-16 md:-mt-24 z-30 pb-24';

          const cardBase = `overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] backdrop-blur transition-all duration-300`;
          const cardClasses = isPremium
            ? `${cardBase} bg-gradient-to-br from-white to-[#e9ffe8] text-gray-900 border border-[#27e97c]/40`
            : `${cardBase} bg-neutral-950/90 text-white hover:border-[#27e97c]/35`;

          return (
            <div key={plan.name} className={wrapperClasses + (index === 0 ? '' : ' mt-64 md:mt-80')}>
              <article className={`${cardClasses}${isPremium ? ' premium-card' : ''}`}>
                <div className="md:grid md:grid-cols-[minmax(260px,0.95fr)_1.35fr] md:gap-10">
                  <div className="relative h-56 w-full overflow-hidden md:h-full">
                    <img
                      src={plan.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80'}
                      alt={plan.imageAlt || plan.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    {!isPremium && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent md:bg-gradient-to-l md:from-black/35 md:via-black/10 md:to-transparent" />
                    )}
                  </div>

                  <div className="flex flex-col gap-6 p-6 md:p-10">
                    {(plan as any).urgencyText && (
                      <div className="text-center md:text-left">
                        <span className={`text-sm font-semibold ${isPremium ? 'text-red-600' : 'text-red-400'}`}>
                          {(plan as any).urgencyText}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {IconComponent && (
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${isPremium ? 'bg-[#27e97c]/20 text-[#0f5132]' : 'bg-[#27e97c]/15 text-[#27e97c]'}`}>
                          <IconComponent className="h-5 w-5" />
                        </span>
                      )}
                      <div>
                        <h3 className={`text-2xl font-bold ${isPremium ? 'text-gray-900' : 'text-white'}`}>{plan.name}</h3>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-extrabold ${isPremium ? 'text-gray-900' : 'text-white'}`}>{plan.price}</span>
                        {plan.priceDetail && (
                          <span className={`text-lg ${isPremium ? 'text-gray-700' : 'text-gray-300'}`}>{plan.priceDetail}</span>
                        )}
                      </div>
                      <p className={`${isPremium ? 'text-gray-700' : 'text-gray-200'} mt-4 text-base leading-relaxed`}>{plan.description}</p>
                    </div>

                    <div>
                      <button
                        id={isPremium ? 'start-premium-btn' : 'start-free-btn'}
                        className={`w-full rounded-full px-6 py-4 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isPremium
                            ? 'bg-[#27e97c] text-black shadow-lg hover:bg-[#1fc869] focus:ring-[#27e97c]'
                            : 'border border-[#27e97c] text-[#27e97c] hover:bg-[#27e97c] hover:text-black focus:ring-[#27e97c]'
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
                        <p className={`mt-3 text-center text-sm ${isPremium ? 'text-gray-600' : 'text-gray-400'}`}>
                          {(plan as any).ctaDisclaimer}
                        </p>
                      )}
                      {(plan as any).guarantee && (
                        <p className={`mt-2 text-center text-sm font-medium ${isPremium ? 'text-gray-700' : 'text-gray-300'}`}>
                          {(plan as any).guarantee}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className={`mb-2 text-xs font-semibold uppercase tracking-[0.3em] ${isPremium ? 'text-[#0f5132]' : 'text-gray-400'}`}>
                        {translations.whatsIncluded[language as keyof typeof translations.whatsIncluded]}
                      </div>
                      <ul className="space-y-3 text-sm">
                        {plan.features.map((feature, fIndex) => {
                          const isHighlighted = isPremium && (fIndex === 0 || fIndex === 1);
                          return (
                            <li key={fIndex} className={`flex items-start gap-3 ${isPremium ? 'text-gray-700' : 'text-gray-200'} ${isHighlighted ? 'font-semibold' : ''}`}>
                              <span className="mt-1.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[#27e97c]" />
                              <span className="leading-relaxed break-words">{feature}</span>
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
