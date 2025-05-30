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
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="relative overflow-hidden rounded-xl max-w-6xl mx-auto">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-white/90 mb-8 max-w-3xl">
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
    </div>
  );
};

export default HeroSection;
