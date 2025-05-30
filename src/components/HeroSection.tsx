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
  title = "Tu Primera Maratón, Sin Miedo",
  subtitle = "Guía inteligente y personalizada para corredores principiantes en América Latina. Entrena con planes adaptados a tu realidad y únete a una comunidad que te apoya.",
  ctaPrimaryText = "Solicita tu Plan Personalizado Beta",
  ctaSecondaryText = "Únete a nuestra Comunidad",
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage = "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
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
        <div className="absolute inset-0 bg-black/50" />
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
            className="w-full sm:w-auto flex-1 bg-primary hover:bg-primary/90 text-white font-medium"
            onClick={onPrimaryClick}
          >
            {ctaPrimaryText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto flex-1 border-white text-white hover:bg-white/20"
            onClick={onSecondaryClick}
          >
            {ctaSecondaryText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
