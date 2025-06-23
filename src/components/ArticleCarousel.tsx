import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import type { Language } from "../data/content";

interface ArticleCarouselProps {
  children: React.ReactNode;
  language: Language;
}

const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ children, language }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the visible width
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Clone the child (ArticleCard) and add the language prop
            const childWithLanguage = React.cloneElement(child as React.ReactElement<any>, { language });
            return (
              <div className="snap-start flex-shrink-0 pr-4 w-full sm:w-[85%] md:w-[45%] lg:w-[32%]">
                {childWithLanguage}
              </div>
            );
          }
          return child;
        })}
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex justify-between pointer-events-none px-4">
        <Button 
          onClick={() => scroll("left")} 
          size="icon" 
          variant="ghost"
          className="rounded-full shadow-md pointer-events-auto bg-black/30 text-white/80 backdrop-blur-sm hover:bg-purple-500/20 hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          onClick={() => scroll("right")} 
          size="icon" 
          variant="ghost"
          className="rounded-full shadow-md pointer-events-auto bg-black/30 text-white/80 backdrop-blur-sm hover:bg-purple-500/20 hover:text-white transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* No custom styles needed here - using inline styles */}
    </div>
  );
};

export default ArticleCarousel;
