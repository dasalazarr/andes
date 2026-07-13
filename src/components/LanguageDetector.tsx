import React, { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguageDetection } from '../hooks/useLanguageDetection';

interface LanguageDetectorProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
}

// Brand manifesto shown only on a visitor's first arrival at the root URL,
// reusing the wait that language detection already imposes. Repeat visits
// (stored preference) and reduced-motion users skip it entirely.
const MANIFESTO_MIN_MS = 1100;

const isFirstRootVisit = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return (
      window.location.pathname === '/' &&
      localStorage.getItem('andes-language-preference') === null
    );
  } catch {
    return false;
  }
};

const getManifestoText = (): string => {
  try {
    const langs = navigator.languages || [navigator.language];
    const isEs = langs.some((lang) => (lang || '').toLowerCase().startsWith('es'));
    return isEs ? 'Hoy es el día.' : "Today's the day.";
  } catch {
    return "Today's the day.";
  }
};

export const LanguageDetector: React.FC<LanguageDetectorProps> = ({
  children,
  loadingComponent = <div className="min-h-screen bg-surface" aria-hidden="true" />,
}) => {
  const { isRedirecting, hasDetected } = useLanguageDetection();
  const prefersReducedMotion = useReducedMotion();

  // Captured before useLanguageDetection's effect stores the preference.
  const [showManifesto] = useState(() => isFirstRootVisit());
  const [manifestoText] = useState(() => getManifestoText());
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const holdManifesto = showManifesto && !prefersReducedMotion;

  useEffect(() => {
    if (!holdManifesto) return;
    const timer = window.setTimeout(() => setMinTimeElapsed(true), MANIFESTO_MIN_MS);
    return () => window.clearTimeout(timer);
  }, [holdManifesto]);

  const detectionReady = hasDetected && !isRedirecting;

  if (!detectionReady && !holdManifesto) {
    return <>{loadingComponent}</>;
  }

  return (
    <>
      {detectionReady ? children : null}
      <AnimatePresence>
        {holdManifesto && (!detectionReady || !minTimeElapsed) ? (
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
              className="text-center font-display text-3xl font-medium italic text-cream sm:text-4xl"
            >
              {manifestoText}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default LanguageDetector;
