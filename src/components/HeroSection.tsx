import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
              className="w-full sm:w-auto bg-black hover:bg-black/90 text-white font-medium flex items-center gap-2 transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg"
              onClick={onPrimaryClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
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
