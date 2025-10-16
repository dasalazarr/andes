import { useState, useEffect, useRef } from 'react';

interface CounterOptions {
  target: number;
  duration?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface CounterReturn {
  count: number;
  ref: React.RefObject<HTMLDivElement>;
  formattedCount: string;
}

export const useAnimatedCounter = ({
  target,
  duration = 2000,
  locale = 'es-ES',
  prefix = '',
  suffix = '',
  decimals = 0,
}: CounterOptions): CounterReturn => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    if (isInView && !prefersReducedMotion && !isAnimationComplete) {
      const startTime = Date.now();
      const endTime = startTime + duration;
      const startCount = 0;
      const endCount = target;

      const updateCounter = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Use ease-out for smoother animation
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = startCount + (endCount - startCount) * easeOutProgress;

        setCount(currentCount);

        if (now < endTime) {
          intervalRef.current = setTimeout(updateCounter, 16); // ~60fps
        } else {
          setCount(endCount);
          setIsAnimationComplete(true);
        }
      };

      updateCounter();
    } else if (isInView && (prefersReducedMotion || isAnimationComplete)) {
      // If reduced motion is preferred or animation is complete, set to final value
      setCount(target);
      setIsAnimationComplete(true);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isInView, target, duration, prefersReducedMotion, isAnimationComplete]);

  const formattedCount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(count);

  return {
    count,
    ref,
    formattedCount: `${prefix}${formattedCount}${suffix}`,
  };
};
