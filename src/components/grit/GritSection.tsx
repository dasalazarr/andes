import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { runnerImages, RunnerName } from "@/images/runners";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.2, // Increased duration for slower animation
      ease: "easeOut"
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 // Increased delay between children
    }
  }
};

const GritSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const stories = [
    {
      name: "Carlos",
      location: "Bogotá",
      imageKey: "carlos" as RunnerName,
      achievement: "From sedentary to marathoner in 14 months"
    },
    {
      name: "Ana",
      location: "Santiago",
      imageKey: "ana" as RunnerName,
      achievement: "Completed her first half marathon after overcoming depression"
    },
    {
      name: "Miguel",
      location: "Mexico City",
      imageKey: "miguel" as RunnerName,
      achievement: "3 marathons training at 4:30 AM for 5 years"
    },
    {
      name: "Carmen",
      location: "San José",
      imageKey: "carmen" as RunnerName,
      achievement: "Started running at 45, now at 52 she has completed 6 marathons"
    },
    {
      name: "Javier",
      location: "Montevideo",
      imageKey: "javier" as RunnerName,
      achievement: "Transformed his life routine through running after his divorce"
    },
    {
      name: "María",
      location: "Medellín",
      imageKey: "maria" as RunnerName,
      achievement: "Mother of three who qualified for the Boston Marathon after 3 years of training"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16" ref={ref}>
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-gray-900">
            GRIT
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real stories from runners who transformed their lives through unwavering discipline.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          variants={staggerContainer}
        >
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              variants={fadeInUp}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 shadow-md">
                <img 
                  src={runnerImages[story.imageKey]} 
                  alt={story.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium text-center">{story.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{story.location}</p>

              <p className="text-xs font-semibold text-center text-gray-700 mt-4 max-w-xs mx-auto">
                {story.achievement}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GritSection;
