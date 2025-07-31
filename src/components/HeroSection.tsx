import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface HeroSectionProps {
  title: string | { variantA: string; variantB: string };
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  videoSrc: string;
  language: 'en' | 'es';
  abVariant?: 'A' | 'B';
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaPrimaryText, ctaSecondaryText, onPrimaryClick, onSecondaryClick, videoSrc, language, abVariant = 'A' }) => {
  const comp = useRef<HTMLDivElement>(null);

  // Lógica para manejar variantes A/B
  const getTitle = () => {
    if (typeof title === 'string') return title;
    return title[`variant${abVariant}` as keyof typeof title] || title.variantA;
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("#title", {
        opacity: 0,
        y: '+=30',
        duration: 1,
      })
      .from("#subtitle", {
        opacity: 0,
        y: '+=20',
        duration: 0.8,
        delay: -0.5 // Overlap with previous animation
      })
      .from("#buttons", {
        opacity: 0,
        y: '+=20',
        duration: 0.8,
        delay: -0.4 // Overlap
      });
    }, comp);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className="w-full h-screen" ref={comp}>
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Preload poster image for better LCP */}
          <link rel="preload" as="image" href={`${videoSrc}.webp`} />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster={`${videoSrc}.webp`}
            aria-label={language === 'es' ? 'Video de fondo: corredor entrenando en pista' : 'Background video: runner training on track'}
          >
            <source src={`${videoSrc}.avif`} type="image/avif" />
            <source src={`${videoSrc}.webp`} type="image/webp" />
            <source src={`${videoSrc}.webm`} type="video/webm" />
            <source src={`${videoSrc}.mp4`} type="video/mp4" />
            {/* Fallback image */}
            <img src={`${videoSrc}.webp`} alt={language === 'es' ? 'Corredor entrenando en pista' : 'Runner training on track'} className="w-full h-full object-cover" />
          </video>
          {/* Overlay oscuro para mejorar contraste */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

{/* Content Container - ensure it's above the video and overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-20">
          {/* Badges de confianza */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6" role="group" aria-label={language === 'es' ? 'Badges de confianza' : 'Trust badges'}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/30">
              <span className="w-2 h-2 bg-[#25d366] rounded-full mr-2"></span>
              {language === 'es' ? '+100 corredores' : '+100 runners'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/30">
              <span className="w-2 h-2 bg-[#25d366] rounded-full mr-2"></span>
              {language === 'es' ? '98% éxito' : '98% success rate'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/30">
              <span className="w-2 h-2 bg-[#25d366] rounded-full mr-2"></span>
              {language === 'es' ? 'Coaches certificados + IA' : 'Certified coaches + AI'}
            </span>
          </div>

          <h1 id="title" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 whitespace-pre-line leading-tight">
            {getTitle()}
          </h1>

          <p id="subtitle" className="text-xl text-white/90 mb-10 max-w-4xl leading-relaxed">
            {subtitle}
          </p>

          <div id="buttons" className="flex flex-col sm:flex-row sm:justify-center gap-6 w-full max-w-lg mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-4 font-semibold rounded-lg bg-[#25d366] text-[#f4f7f8] hover:bg-[#25d366]/90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2 shadow-lg hover:shadow-[#25d366]/25"
              onClick={onPrimaryClick}
              aria-label={language === 'es' ? 'Ver planes de entrenamiento' : 'View training plans'}
            >
              {ctaPrimaryText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 font-semibold rounded-lg border-2 border-[#006b5b] bg-transparent text-white hover:bg-[#006b5b] hover:text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#006b5b] focus:ring-offset-2"
              onClick={onSecondaryClick}
              aria-label={language === 'es' ? 'Unirse a la comunidad' : 'Join community'}
            >
              {ctaSecondaryText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
