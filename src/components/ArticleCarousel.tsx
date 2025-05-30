import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ArticleCarouselProps {
  children: React.ReactNode;
}

const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ children }) => {
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
        {React.Children.map(children, (child) => (
          <div className="snap-start flex-shrink-0 pr-4 w-full sm:w-[85%] md:w-[45%] lg:w-[32%]">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex justify-between pointer-events-none">
        <Button 
          onClick={() => scroll("left")} 
          size="icon" 
          variant="secondary"
          className="rounded-full shadow-md pointer-events-auto opacity-90 hover:opacity-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          onClick={() => scroll("right")} 
          size="icon" 
          variant="secondary"
          className="rounded-full shadow-md pointer-events-auto opacity-90 hover:opacity-100"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* No custom styles needed here - using inline styles */}
    </div>
  );
};

export default ArticleCarousel;
