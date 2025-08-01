import React, { useEffect, forwardRef, useCallback } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { runnerImages, RunnerName } from "@/images/runners";
import { gritStoriesContent } from '@/data/content'; // Import new content

import { Language } from '@/types'; // Assuming Language type is defined, e.g., in src/types.ts or similar


const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 // Increased delay between children
    }
  }
};

interface GritSectionProps {
  language: Language;
  onStoryClick: (story: any) => void;
  content: {
    sectionTitle: string;
    sectionSubtitle: string;
    stories: any[];
  };
}

const GritSection = forwardRef<HTMLElement, GritSectionProps>(({ language, onStoryClick, content }, forwardedRef) => {
  const controls = useAnimation();
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      // Ref from react-intersection-observer
      inViewRef(node);

      // Forwarded ref
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef, inViewRef]
  );

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id="grit-stories" className="py-16 bg-gradient-to-b from-black via-gray-950 to-black" ref={setRefs}>
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
      >
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {content.sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            {content.sectionSubtitle}
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {content.stories.map((story, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-neutral-900/50 border border-neutral-800 shadow-lg transition-all duration-300 hover:border-[#25d366]/60 hover:shadow-xl"
              onClick={() => onStoryClick({ ...story, image: runnerImages[story.imageKey] })}
            >
              {/* Image with overlay and hover effects */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={runnerImages[story.imageKey]}
                  alt={story.name}
                  className="h-full w-full object-cover object-top grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-110"
                  loading="lazy"
                />
                {/* 40% black overlay */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300"></div>

                {/* Hover CTA with Single Key KPI */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 text-center text-white border border-[#25d366]/30 transform scale-95 group-hover:scale-100 transition-transform duration-150 ease-out">
                    {/* KPI Label */}
                    <div className="text-[#25d366] font-semibold text-sm uppercase tracking-wide mb-3">
                      {language === 'es' ? 'KPI clave' : 'Key KPI'}
                    </div>

                    {/* Single Key Performance Indicator */}
                    {(story as any).keyKpi && (
                      <div className="text-white font-bold text-xl">
                        {(story as any).keyKpi}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white">{story.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    {story.location.split(',')[0].trim()}
                  </p>
                  {story.keyMetric && (
                    <span className="rounded bg-[#25d366]/20 px-2 py-1 text-sm font-bold text-[#25d366]">
                      {story.keyMetric}
                    </span>
                  )}
                </div>
                <p className="mt-3 leading-relaxed text-gray-300">{story.achievement}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

export default GritSection;
