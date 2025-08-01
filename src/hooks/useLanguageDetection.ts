import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type SupportedLanguage = 'en' | 'es';

interface LanguageDetectionConfig {
  defaultLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  storageKey: string;
}

const DEFAULT_CONFIG: LanguageDetectionConfig = {
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es'],
  storageKey: 'andes-language-preference'
};

export const useLanguageDetection = (config: Partial<LanguageDetectionConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const navigate = useNavigate();
  const location = useLocation();
  
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>(finalConfig.defaultLanguage);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasDetected, setHasDetected] = useState(false);

  // Get browser language preference
  const getBrowserLanguage = (): SupportedLanguage => {
    try {
      // Check navigator.languages array first (more accurate)
      const languages = navigator.languages || [navigator.language];
      
      for (const lang of languages) {
        const langCode = lang.toLowerCase().split('-')[0];
        if (finalConfig.supportedLanguages.includes(langCode as SupportedLanguage)) {
          return langCode as SupportedLanguage;
        }
      }
      
      // Fallback to navigator.language
      const browserLang = navigator.language.toLowerCase().split('-')[0];
      return finalConfig.supportedLanguages.includes(browserLang as SupportedLanguage) 
        ? browserLang as SupportedLanguage 
        : finalConfig.defaultLanguage;
    } catch (error) {
      console.warn('Language detection failed, using default:', error);
      return finalConfig.defaultLanguage;
    }
  };

  // Get current language from URL
  const getCurrentLanguageFromURL = (): SupportedLanguage => {
    const pathname = location.pathname;
    if (pathname.startsWith('/es')) return 'es';
    return 'en';
  };

  // Get stored language preference
  const getStoredLanguage = (): SupportedLanguage | null => {
    try {
      const stored = localStorage.getItem(finalConfig.storageKey);
      if (stored && finalConfig.supportedLanguages.includes(stored as SupportedLanguage)) {
        return stored as SupportedLanguage;
      }
    } catch (error) {
      console.warn('Failed to read language preference from storage:', error);
    }
    return null;
  };

  // Store language preference
  const storeLanguagePreference = (language: SupportedLanguage) => {
    try {
      localStorage.setItem(finalConfig.storageKey, language);
    } catch (error) {
      console.warn('Failed to store language preference:', error);
    }
  };

  // Check if this is the first visit (no stored preference and on root path only)
  const isFirstVisit = (): boolean => {
    const hasStoredPreference = getStoredLanguage() !== null;
    const isOnRootPath = location.pathname === '/';

    // Only consider it a first visit if user is on root path with no stored preference
    // If user explicitly navigates to /es/, respect that choice
    return !hasStoredPreference && isOnRootPath;
  };

  // Get target route for a language
  const getRouteForLanguage = (language: SupportedLanguage): string => {
    const currentPath = location.pathname;
    const search = location.search;
    const hash = location.hash;
    
    if (language === 'es') {
      // Convert to Spanish route
      if (currentPath.startsWith('/es')) {
        return currentPath + search + hash; // Already on Spanish route
      }
      return `/es${currentPath === '/' ? '' : currentPath}${search}${hash}`;
    } else {
      // Convert to English route
      if (currentPath.startsWith('/es')) {
        const pathWithoutEs = currentPath.replace(/^\/es/, '') || '/';
        return pathWithoutEs + search + hash;
      }
      return currentPath + search + hash; // Already on English route
    }
  };

  // Perform automatic redirection
  const performAutoRedirect = (targetLanguage: SupportedLanguage) => {
    const currentLanguage = getCurrentLanguageFromURL();
    
    if (currentLanguage !== targetLanguage) {
      setIsRedirecting(true);
      const targetRoute = getRouteForLanguage(targetLanguage);
      
      console.log('🌐 Auto-redirecting:', {
        from: location.pathname,
        to: targetRoute,
        language: targetLanguage,
        reason: 'automatic language detection'
      });
      
      // Store the preference
      storeLanguagePreference(targetLanguage);
      
      // Perform redirect
      navigate(targetRoute, { replace: true });
      
      // Reset redirecting state after a delay
      setTimeout(() => setIsRedirecting(false), 500);
    }
  };

  // Manual language change function
  const changeLanguage = (language: SupportedLanguage) => {
    console.log('🔄 Manual language change to:', language);
    
    // Store preference
    storeLanguagePreference(language);
    
    // Update state
    setDetectedLanguage(language);
    
    // Navigate to appropriate route
    const targetRoute = getRouteForLanguage(language);
    navigate(targetRoute);
  };

  // Main language detection effect
  useEffect(() => {
    if (hasDetected) return; // Prevent multiple detections
    


    // Get language preference priority:
    // 1. Stored user preference (highest priority)
    // 2. Browser language (for first-time visitors)
    // 3. Default language (fallback)
    
    const storedLanguage = getStoredLanguage();
    const browserLanguage = getBrowserLanguage();
    const currentURLLanguage = getCurrentLanguageFromURL();
    
    let targetLanguage: SupportedLanguage;

    // Simplified logic: URL takes precedence over everything else
    if (currentURLLanguage === 'es') {
      // User explicitly navigated to Spanish version
      targetLanguage = 'es';
      storeLanguagePreference(targetLanguage);

    } else if (currentURLLanguage === 'en') {
      // User is on English version (root or explicit)
      targetLanguage = 'en';
      if (location.pathname === '/' && isFirstVisit()) {
        // First visit to root - check if we should redirect to Spanish
        if (browserLanguage === 'es' && !storedLanguage) {
          targetLanguage = 'es';
          performAutoRedirect(targetLanguage);
          return;
        }
      }
      storeLanguagePreference(targetLanguage);

    } else {
      // Fallback
      targetLanguage = storedLanguage || browserLanguage;

    }

    setDetectedLanguage(targetLanguage);

    setHasDetected(true);
  }, [location.pathname]); // Re-run when pathname changes

  // Update detected language when URL changes
  useEffect(() => {
    if (hasDetected && !isRedirecting) {
      const currentLanguage = getCurrentLanguageFromURL();
      if (currentLanguage !== detectedLanguage) {
        setDetectedLanguage(currentLanguage);
        // Update stored preference when user manually navigates
        storeLanguagePreference(currentLanguage);
      }
    }
  }, [location.pathname, hasDetected, isRedirecting]);

  return {
    currentLanguage: detectedLanguage,
    isRedirecting,
    hasDetected,
    changeLanguage,
    supportedLanguages: finalConfig.supportedLanguages,
    browserLanguage: getBrowserLanguage(),
    storedLanguage: getStoredLanguage()
  };
};
