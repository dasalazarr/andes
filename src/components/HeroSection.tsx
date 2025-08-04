import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface HeroSectionProps {
  title: string | { variantA: string; variantB: string };
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  keyBenefits: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  videoSrc: string;
  language: 'en' | 'es';
  abVariant?: 'A' | 'B';
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaPrimaryText, ctaSecondaryText, keyBenefits, onPrimaryClick, onSecondaryClick, videoSrc, language, abVariant = 'A' }) => {
  const comp = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Lógica para manejar variantes A/B
  const getTitle = () => {
    if (typeof title === 'string') return title;
    return title[`variant${abVariant}` as keyof typeof title] || title.variantA;
  };

  // Delay video loading to improve initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 500); // Load video after 500ms

    return () => clearTimeout(timer);
  }, []);

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
          {/* Show poster image immediately, load video after delay */}
          {!shouldLoadVideo ? (
            <img
              src={`${videoSrc}.jpg`}
              alt={language === 'es' ? 'Corredor entrenando en pista' : 'Runner training on track'}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <video
              key={`${videoSrc}-video`}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
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
              <source src={`${videoSrc}.webm`} type="video/webm" />
              <source src={`${videoSrc}.mp4`} type="video/mp4" />
            </video>
          )}
          {/* Overlay oscuro para mejorar contraste - 50% dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Gradient overlay at bottom for smooth transition to next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

{/* Content Container - ensure it's above the video and overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-20">
          {/* Badges de confianza */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6" role="group" aria-label={language === 'es' ? 'Badges de confianza' : 'Trust badges'}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27e97c]/20 text-[#27e97c] border border-[#27e97c]/30">
              <span className="w-2 h-2 bg-[#27e97c] rounded-full mr-2"></span>
              {language === 'es' ? '+100 corredores' : '+100 runners'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27e97c]/20 text-[#27e97c] border border-[#27e97c]/30">
              <span className="w-2 h-2 bg-[#27e97c] rounded-full mr-2"></span>
              {language === 'es' ? '98% éxito' : '98% success rate'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27e97c]/20 text-[#27e97c] border border-[#27e97c]/30">
              <span className="w-2 h-2 bg-[#27e97c] rounded-full mr-2"></span>
              {language === 'es' ? 'Coaches certificados + IA' : 'Certified coaches + AI'}
            </span>
          </div>

          <h1 id="title" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 whitespace-pre-line leading-tight">
            {getTitle()}
          </h1>

          <p id="subtitle" className="text-2xl text-[#27e97c] mb-8 font-medium">
            {subtitle}
          </p>

          <div id="buttons" className="w-full max-w-sm mx-auto mb-6">
            <Button
              size="lg"
              className="w-full px-8 py-4 text-lg font-semibold rounded-lg bg-[#27e97c] text-black hover:bg-[#27e97c]/90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#27e97c] focus:ring-offset-2 shadow-lg hover:shadow-[#27e97c]/25 flex items-center justify-center"
              onClick={onPrimaryClick}
              aria-label={language === 'es' ? 'Empieza en WhatsApp' : 'Start on WhatsApp'}
            >
              <span className="mr-2">▶</span>
              {ctaPrimaryText}
            </Button>
          </div>

          {/* Key Benefits Micro-copy */}
          <div id="key-benefits" className="text-center mb-8">
            <p className="text-white/80 text-sm font-medium">
              {keyBenefits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
