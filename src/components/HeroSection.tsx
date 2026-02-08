import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
  videoSrc: string;
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
  videoSrc,
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
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster={`${videoSrc}.jpg`}
            aria-label={language === 'es' ? 'Video de fondo: corredor entrenando en pista' : 'Background video: runner training on track'}
            onError={(e) => {
              const video = e.target as HTMLVideoElement;
              const fallbackImg = video.parentElement?.querySelector('img');
              if (fallbackImg) {
                fallbackImg.style.display = 'block';
                video.style.display = 'none';
              }
            }}
          >
            <source src={`${videoSrc}.webm`} type="video/webm" />
            <source src={`${videoSrc}.mp4`} type="video/mp4" />
            <img
              src={`${videoSrc}.jpg`}
              alt={language === 'es' ? 'Corredor entrenando en pista' : 'Runner training on track'}
              className="w-full h-full object-cover"
              style={{ display: 'none' }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                if (img.parentElement) {
                  img.parentElement.style.backgroundColor = '#1a1a1a';
                }
              }}
            />
          </video>
          <div className="absolute inset-0 bg-black/55"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(39,233,124,0.16),transparent_45%)]"></div>
          <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black via-black/85 to-transparent"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
            <div className="glass-card-premium max-w-xl rounded-[28px] p-5 text-white sm:p-7 md:p-8">
              <div id="preheading" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-xs">
                <span className="h-px w-6 bg-white/40 sm:w-8" aria-hidden="true"></span>
                <Sparkles className="h-3.5 w-3.5 text-[#27e97c]" aria-hidden="true" />
                <span>{preheading}</span>
              </div>

              <h1 id="headline" className="mt-4 text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl">
                <span className="block">{currentHeadline.lead}</span>
                <span className="mt-1 block text-white">
                  <span className="relative inline-flex items-center">
                    <span className="absolute inset-x-0 bottom-1 h-2 bg-[#27e97c]/30 sm:h-3" aria-hidden="true"></span>
                    <span className="relative text-[#27e97c]">{currentHeadline.accent}</span>
                  </span>
                  {currentHeadline.trailing ? (
                    <span className="ml-2">{currentHeadline.trailing}</span>
                  ) : null}
                </span>
              </h1>

              <p id="description" className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                {description}
              </p>

              <div id="cta" className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="group min-h-[48px] rounded-full bg-[#27e97c] px-6 text-base font-semibold text-black shadow-[0_14px_30px_rgba(39,233,124,0.3)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#25d366] focus-visible:ring-[#27e97c]"
                  onClick={handlePrimaryClick}
                  disabled={loadingCta !== null}
                  aria-label={ctaPrimaryText}
                >
                  <span>{loadingCta === "primary" ? (language === "es" ? "Preparando..." : "Preparing...") : ctaPrimaryText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>

                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="min-h-[48px] rounded-full border-white/25 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15"
                  onClick={handleSecondaryClick}
                  disabled={loadingCta !== null}
                  aria-label={ctaSecondaryText}
                >
                  {loadingCta === "secondary" ? (language === "es" ? "Activando..." : "Activating...") : ctaSecondaryText}
                </Button>
              </div>

              <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-medium leading-relaxed text-white/80 sm:text-sm">
                {limitNotice}
              </p>

              <div id="key-benefits" className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 sm:text-xs">
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
