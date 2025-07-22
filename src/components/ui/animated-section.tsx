import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  stagger?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  ref,
  stagger = false,
  ...props
}) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: stagger ? 0.1 : 0,
      },
    },
  };

  const childVariants = {
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

  return (
    <motion.div
      ref={ref || sectionRef}
      id={id}
      className={className}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      {...props}
    >
      {stagger ? (
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimatedSection;
