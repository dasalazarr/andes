import React, { useRef, forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCombinedRefs } from '../hooks/useCombinedRefs';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(({ children, className, stagger = false, as: Component = 'section' }, forwardedRef) => {
  const internalRef = useRef(null);
  const combinedRef = useCombinedRefs(internalRef, forwardedRef);
  const isInView = useInView(combinedRef, { once: true, amount: 0.2 });
  const isMobile =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 768px)').matches;

  const MotionComponent = motion[Component];

  if (stagger) {
    return (
      <motion.div
        ref={combinedRef}
        className={className}
        variants={containerVariants}
        initial={isMobile ? 'visible' : 'hidden'}
        animate={isMobile || isInView ? 'visible' : 'hidden'}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <MotionComponent
      ref={combinedRef}
      className={className}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      animate={{ opacity: isMobile || isInView ? 1 : 0, y: isMobile || isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </MotionComponent>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
