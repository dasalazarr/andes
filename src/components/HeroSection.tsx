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
  backgroundImage = "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1200&q=80",
}) => {
  return (
    <div className="relative w-full h-[600px] bg-background">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto flex-1 bg-black hover:bg-black/90 text-white font-medium"
            onClick={onPrimaryClick}
          >
            {ctaPrimaryText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
