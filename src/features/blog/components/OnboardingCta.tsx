import React from 'react';
import { Link } from 'react-router-dom';
import analytics from '@/utils/analytics';

interface OnboardingCtaProps {
  lang: 'en' | 'es';
  location: string; // where the CTA is shown (e.g., 'blog_post_bottom')
}

const OnboardingCta: React.FC<OnboardingCtaProps> = ({ lang, location }) => {
  const href = lang === 'es' ? '/es/start?flow=blog&utm_source=blog&utm_medium=cta&utm_campaign=blog_to_onboarding' : '/start?flow=blog&utm_source=blog&utm_medium=cta&utm_campaign=blog_to_onboarding';
  const label = lang === 'es' ? 'Empieza en WhatsApp' : 'Start on WhatsApp';

  const onClick = () => {
    analytics.trackCTAClick('primary', location, lang);
    analytics.trackWhatsAppClick('cta', undefined, lang);
  };

  return (
    <div className="mt-10 p-5 border border-[#25d366]/40 rounded-lg bg-neutral-900/40">
      <p className="mb-3 text-gray-300">
        {lang === 'es' ? '¿Listo para tu plan personalizado?' : 'Ready for your personalized plan?'}
      </p>
      <Link
        to={href}
        onClick={onClick}
        className="inline-block bg-[#25d366] text-black font-medium px-4 py-2 rounded hover:bg-[#1fb85a]"
      >
        {label}
      </Link>
    </div>
  );
};

export default OnboardingCta;

