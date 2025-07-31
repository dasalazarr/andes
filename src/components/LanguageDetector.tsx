import React, { ReactNode } from 'react';
import { useLanguageDetection } from '../hooks/useLanguageDetection';

interface LanguageDetectorProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
}

const DefaultLoadingComponent = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#25d366] mx-auto mb-4"></div>
      <p className="text-white text-lg">Detectando idioma...</p>
      <p className="text-gray-400 text-sm">Detecting language...</p>
    </div>
  </div>
);

export const LanguageDetector: React.FC<LanguageDetectorProps> = ({ 
  children, 
  loadingComponent = <DefaultLoadingComponent /> 
}) => {
  const { isRedirecting, hasDetected } = useLanguageDetection();

  // Show loading component while detecting/redirecting
  if (!hasDetected || isRedirecting) {
    return <>{loadingComponent}</>;
  }

  // Render children once detection is complete
  return <>{children}</>;
};

export default LanguageDetector;
