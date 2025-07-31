import React from 'react';
import { useLanguageDetection } from '../hooks/useLanguageDetection';
import { useLocation } from 'react-router-dom';

interface LanguageDebugInfoProps {
  show?: boolean;
}

export const LanguageDebugInfo: React.FC<LanguageDebugInfoProps> = ({ show = false }) => {
  const location = useLocation();
  const { 
    currentLanguage, 
    isRedirecting, 
    hasDetected, 
    browserLanguage, 
    storedLanguage 
  } = useLanguageDetection();

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
      <h3 className="font-bold mb-2 text-[#25d366]">🌐 Language Debug Info</h3>
      <div className="space-y-1">
        <div><strong>Current URL:</strong> {location.pathname}</div>
        <div><strong>Current Language:</strong> {currentLanguage}</div>
        <div><strong>Browser Language:</strong> {browserLanguage}</div>
        <div><strong>Stored Language:</strong> {storedLanguage || 'none'}</div>
        <div><strong>Has Detected:</strong> {hasDetected ? '✅' : '❌'}</div>
        <div><strong>Is Redirecting:</strong> {isRedirecting ? '🔄' : '✅'}</div>
        <div><strong>Navigator Languages:</strong> {navigator.languages?.join(', ') || 'none'}</div>
      </div>
    </div>
  );
};

export default LanguageDebugInfo;
