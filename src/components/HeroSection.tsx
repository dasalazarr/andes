import React, { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  keyBenefits: string;
  onPrimaryClick: () => void;
  videoSrc: string;
  language: 'en' | 'es';
  abVariant?: 'A' | 'B';
}

const HeroSection: React.FC<HeroSectionProps> = ({
  preheading,
  headline,
  description,
  ctaPrimaryText,
  keyBenefits,
  onPrimaryClick,
  videoSrc,
  language,
  abVariant = 'A',
}) => {
  const comp = useRef<HTMLDivElement>(null);

  // Lógica para manejar variantes A/B
  const resolveHeadline = (): HeroHeadlineVariant => {
    if ('variantA' in headline) {
      const variant = headline[`variant${abVariant}` as keyof typeof headline];
      return (variant as HeroHeadlineVariant) || headline.variantA;
    }
    return headline as HeroHeadlineVariant;
  };

  const currentHeadline = resolveHeadline();

  // Log video source changes
  useEffect(() => {
    console.log('Video source changed to:', videoSrc);
  }, [videoSrc]);

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
          delay: -0.3,
        });
    }, comp);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className="w-full h-screen min-h-[100dvh]" ref={comp}>
      <div className="relative w-full h-full min-h-[600px] sm:min-h-[700px] md:min-h-screen overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Preload poster image for better LCP */}
          <link rel="preload" as="image" href={`${videoSrc}.jpg`} />
          <video
            key={`${videoSrc}-video`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster={`${videoSrc}.jpg`}
            aria-label={language === 'es' ? 'Video de fondo: corredor entrenando en pista' : 'Background video: runner training on track'}
            onError={(e) => {
              console.warn('Video failed to load:', videoSrc, e);
              // Fallback to poster image if video fails
              const video = e.target as HTMLVideoElement;
              const fallbackImg = video.parentElement?.querySelector('img');
              if (fallbackImg) {
                fallbackImg.style.display = 'block';
                video.style.display = 'none';
              }
            }}
          >
            <source src={`${videoSrc}.webm?t=${new Date().getTime()}`} type="video/webm" key={`${videoSrc}-webm`} />
            <source src={`${videoSrc}.mp4?t=${new Date().getTime()}`} type="video/mp4" key={`${videoSrc}-mp4`} />
            {/* Fallback image */}
            <img
              src={`${videoSrc}.jpg?t=${new Date().getTime()}`}
              alt={language === 'es' ? 'Corredor entrenando en pista' : 'Runner training on track'}
              className="w-full h-full object-cover"
              style={{ display: 'none' }}
              onError={(e) => {
                console.warn('Poster image failed to load:', `${videoSrc}.jpg`);
                // Use a solid color background as final fallback
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                if (img.parentElement) {
                  img.parentElement.style.backgroundColor = '#1a1a1a';
                }
              }}
            />
          </video>
          {/* Overlay oscuro para mejorar contraste - 50% dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Gradient overlay at bottom for smooth transition to next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        {/* Content Container - ensure it's above the video and overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6 px-4 sm:px-6 py-16 sm:py-20 text-white">
            <div id="preheading" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/70">
              <span className="h-px w-8 sm:w-10 bg-white/40" aria-hidden="true"></span>
              <span>{preheading}</span>
            </div>

            <h1 id="headline" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              <span className="block">{currentHeadline.lead}</span>
              <span className="mt-2 block text-white">
                <span className="relative inline-flex items-center">
                  <span className="absolute inset-x-0 bottom-1 h-2 sm:h-3 bg-[#27e97c]/30" aria-hidden="true"></span>
                  <span className="relative text-[#27e97c]">{currentHeadline.accent}</span>
                </span>
                {currentHeadline.trailing ? (
                  <span className="ml-2">{currentHeadline.trailing}</span>
                ) : null}
              </span>
            </h1>

            <p id="description" className="max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
              {description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>

            <div id="cta" className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 mt-2">
              <Button
                size="lg"
                className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#27e97c] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:bg-[#27e97c]/90 hover:shadow-[#27e97c]/30 focus-visible:ring-[#27e97c] min-h-[48px]"
                onClick={onPrimaryClick}
                aria-label={language === 'es' ? 'Empieza en WhatsApp' : 'Start on WhatsApp'}
              >
                <span>{ctaPrimaryText}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <div id="key-benefits" className="text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] text-white/60">
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
