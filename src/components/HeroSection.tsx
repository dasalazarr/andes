import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Unlock } from "lucide-react";

type HeroHeadlineVariant = {
  lead: string;
  accent: string;
  trailing?: string;
};

type HeroHeadline =
  | HeroHeadlineVariant
  | { variantA: HeroHeadlineVariant; variantB: HeroHeadlineVariant };

interface HeroSectionProps {
  preheading: string;
  headline: HeroHeadline;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  limitNotice: string;
  keyBenefits: string;
  onPrimaryClick: () => void | Promise<void>;
  onSecondaryClick: () => void | Promise<void>;
  imageSrc: string;
  language: 'en' | 'es';
  abVariant?: 'A' | 'B';
}

const HeroSection: React.FC<HeroSectionProps> = ({
  preheading,
  headline,
  description,
  ctaPrimaryText,
  ctaSecondaryText,
  limitNotice,
  keyBenefits,
  onPrimaryClick,
  onSecondaryClick,
  imageSrc,
  language,
  abVariant = 'A',
}) => {
  const comp = useRef<HTMLDivElement>(null);
  const [loadingCta, setLoadingCta] = useState<'primary' | 'secondary' | null>(null);

  // Lógica para manejar variantes A/B
  const resolveHeadline = (): HeroHeadlineVariant => {
    if ('variantA' in headline) {
      const variant = headline[`variant${abVariant}` as keyof typeof headline];
      return (variant as HeroHeadlineVariant) || headline.variantA;
    }
    return headline as HeroHeadlineVariant;
  };

  const currentHeadline = resolveHeadline();

  useLayoutEffect(() => {
    // GSAP writes inline transforms via rAF, so the global reduced-motion CSS can't stop it.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("#preheading", {
        opacity: 0,
        y: '+=16',
        duration: 0.8,
      })
        .from("#headline", {
          opacity: 0,
          y: '+=30',
          duration: 1,
          delay: -0.3,
        })
        .from("#description", {
          opacity: 0,
          y: '+=20',
          duration: 0.8,
          delay: -0.5,
        })
        .from("#cta", {
          opacity: 0,
          y: '+=20',
          duration: 0.8,
          delay: -0.4,
        })
        .from("#key-benefits", {
          opacity: 0,
          y: '+=16',
          duration: 0.6,
          delay: -0.25,
        });
    }, comp);

    return () => ctx.revert(); // Cleanup
  }, []);

  const handlePrimaryClick = async () => {
    setLoadingCta('primary');
    try {
      await Promise.resolve(onPrimaryClick());
    } finally {
      setLoadingCta(null);
    }
  };

  const handleSecondaryClick = async () => {
    setLoadingCta('secondary');
    try {
      await Promise.resolve(onSecondaryClick());
    } finally {
      setLoadingCta(null);
    }
  };

  return (
    <div className="w-full min-h-[88dvh]" ref={comp}>
      <div className="relative min-h-[88dvh] w-full overflow-hidden md:min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={language === 'es' ? 'Corredoras entrenando juntas al amanecer' : 'Women running together at sunrise'}
            className="h-full w-full object-cover"
            width={1800}
            height={1200}
          />
          <div className="absolute inset-0 bg-surface/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,107,91,0.28),transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-surface via-surface/85 to-transparent"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
            <div className="max-w-2xl text-cream">
              <div id="preheading" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/70 sm:text-xs">
                <span className="h-px w-6 bg-brand/50 sm:w-8" aria-hidden="true"></span>
                <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                <span>{preheading}</span>
              </div>

              <h1 id="headline" className="mt-5 font-display text-4xl font-medium leading-[1.05] sm:text-5xl md:text-7xl">
                <span className="block">{currentHeadline.lead}</span>
                <span className="mt-1 block italic text-brand">
                  {currentHeadline.accent}
                  {currentHeadline.trailing ? (
                    <span className="ml-2 not-italic text-cream">{currentHeadline.trailing}</span>
                  ) : null}
                </span>
              </h1>

              <p id="description" className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
                {description}
              </p>

              <div id="cta" className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="group min-h-[52px] rounded-full bg-whatsapp px-7 text-base font-semibold text-black shadow-[0_10px_30px_rgba(37,211,102,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-brand"
                  onClick={handlePrimaryClick}
                  disabled={loadingCta !== null}
                  aria-label={ctaPrimaryText}
                >
                  <FaWhatsapp className="mr-2 h-5 w-5" aria-hidden="true" />
                  <span>{loadingCta === "primary" ? (language === "es" ? "Preparando..." : "Preparing...") : ctaPrimaryText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>

                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="min-h-[52px] rounded-full border-cream/25 bg-transparent px-7 text-base font-medium text-cream hover:bg-cream/10 hover:text-cream"
                  onClick={handleSecondaryClick}
                  disabled={loadingCta !== null}
                  aria-label={ctaSecondaryText}
                >
                  {loadingCta === "secondary" ? (language === "es" ? "Un momento..." : "One moment...") : ctaSecondaryText}
                </Button>
              </div>

              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand sm:text-sm">
                <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{limitNotice}</span>
              </p>

              <div id="key-benefits" className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55 sm:text-xs">
                {keyBenefits}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
