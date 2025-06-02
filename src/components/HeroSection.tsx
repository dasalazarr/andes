import React from "react";
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
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Your First Marathon, Without Fear: Intelligent Guide for Beginners",
  subtitle = "Andes provides personalized training plans, expert guidance, and a supportive community to help you achieve your marathon goals, regardless of your experience level.",
  ctaPrimaryText = "Get Your Beta Personalized Plan",
  ctaSecondaryText = "Join Our Community",
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage = "/images/background.png",
}) => {
  return (
    <div className="w-full h-screen max-h-[90vh]">
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-white/90 mb-8 max-w-3xl">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto flex-1 bg-black hover:bg-black/90 text-white font-medium flex items-center gap-2"
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
              className="w-full sm:w-auto flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
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
