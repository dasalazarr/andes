import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  videoSrc?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Your First Marathon: \n Intelligent Guide for Beginners",
  subtitle = "Andes provides personalized training plans, expert guidance, and a supportive community to help you achieve your marathon goals, regardless of your experience level.",
  ctaPrimaryText = "Get Your Beta Personalized Plan",
  ctaSecondaryText = "Join Our Community",
  onPrimaryClick,
  onSecondaryClick,
  videoSrc = "/videos/video1", // Default video base path, extension handled below
  // backgroundImage prop is no longer used for the main background
  // backgroundImage = "/images/background.png", 
}) => {
  const comp = useRef<HTMLDivElement>(null);

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
        {/* Video Background with Overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline // Important for iOS Safari
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
            poster={`${videoSrc}.jpg`} // Assumes poster image has .jpg extension
          >
            <source src={`${videoSrc}.webm`} type="video/webm" />
            <source src={`${videoSrc}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay on top of video */}
        </div>

        {/* Content Container - ensure it's above the video and overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-20">
          <h1 id="title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 whitespace-pre-line">
            {title}
          </h1>

          <p id="subtitle" className="text-lg text-white/90 mb-8 max-w-3xl">
            {subtitle}
          </p>

          <div id="buttons" className="flex flex-col sm:flex-row sm:justify-center gap-4 w-full max-w-md mx-auto">
            <Button
              size="lg"
              className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-fuchsia/60
                bg-gradient-to-r from-neon-purple to-fuchsia-gradient-start hover:from-fuchsia-gradient-start hover:to-purple-hover
                shadow-lg hover:shadow-electric-fuchsia/50"
              style={{
                backgroundSize: '200% 200%',
                animation: 'pulse-gradient 4s ease infinite',
                boxShadow: '0 0 15px rgba(155, 93, 229, 0.35)'
              }}
              onClick={onPrimaryClick}
            >
              <Zap className="h-5 w-5 mr-2 animate-icon-glow text-solar-yellow" />
              {ctaPrimaryText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:border-white"
              onClick={onSecondaryClick}
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
