import React, { useState } from 'react';
import analytics from '@/utils/analytics';
import { startOnboarding } from '@/lib/onboarding';

interface OnboardingCtaProps {
  lang: 'en' | 'es';
  location: string; // where the CTA is shown (e.g., 'blog_post_bottom')
}

const OnboardingCta: React.FC<OnboardingCtaProps> = ({ lang, location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const label = lang === 'es' ? 'Empieza en WhatsApp' : 'Start on WhatsApp';
  const loadingLabel = lang === 'es' ? 'Conectando...' : 'Connecting...';

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    analytics.trackCTAClick('primary', location, lang);
    analytics.trackWhatsAppClick('cta', undefined, lang);

    try {
      await startOnboarding({ intent: 'free', language: lang, placement: 'mid' });
    } catch (error) {
      console.error('Onboarding failed, using fallback:', error);
      window.location.href = `/start?flow=free&language=${lang}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 p-5 border border-[#25d366]/40 rounded-lg bg-neutral-900/40">
      <p className="mb-3 text-gray-300">
        {lang === 'es' ? '¿Listo para tu plan personalizado?' : 'Ready for your personalized plan?'}
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="inline-block bg-[#25d366] text-black font-medium px-4 py-2 rounded hover:bg-[#1fb85a] disabled:opacity-60"
      >
        {isLoading ? loadingLabel : label}
      </button>
    </div>
  );
};

export default OnboardingCta;

