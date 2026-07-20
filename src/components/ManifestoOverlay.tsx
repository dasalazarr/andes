import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface ManifestoOverlayProps {
  text: string;
  minDurationMs?: number;
  onComplete?: () => void;
}

const DEFAULT_MIN_MS = 1100;

// Standalone intro overlay for pages that want a manifesto moment on every
// visit (unlike LanguageDetector's home-only, first-visit-only version).
const ManifestoOverlay: React.FC<ManifestoOverlayProps> = ({ text, minDurationMs = DEFAULT_MIN_MS, onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setTimeout(() => setMinTimeElapsed(true), minDurationMs);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, minDurationMs]);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
    }
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!minTimeElapsed && (
        <motion.div
          key="manifesto"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center font-display text-3xl font-medium italic text-cream sm:text-5xl"
          >
            {text}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManifestoOverlay;
