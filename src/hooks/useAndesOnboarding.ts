// Andes Simplified Onboarding Hook
// Handles direct WhatsApp integration for improved conversion rates

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface OnboardingConfig {
  apiBaseUrl: string;
  fallbackEnabled: boolean;
  analyticsEnabled: boolean;
  debug: boolean;
}

const CONFIG: OnboardingConfig = {
  apiBaseUrl: 'https://v3-production-2670.up.railway.app',
  fallbackEnabled: true,
  analyticsEnabled: true,
  debug: false // Set to true for development
};

export const useAndesOnboarding = () => {
  const location = useLocation();

  // Detect language from URL
  const getLanguage = (): 'es' | 'en' => {
    if (location.pathname.includes('/es')) return 'es';
    return 'en';
  };

  // Analytics tracking function
  const trackEvent = (event: string, intent: string, language: string, error?: string) => {
    try {
      // Send to analytics endpoint
      fetch(`${CONFIG.apiBaseUrl}/onboarding/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          intent,
          language,
          error,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      }).catch(e => {
        if (CONFIG.debug) console.log('Analytics failed:', e);
      });

      // Google Analytics if available
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', event, {
          'custom_parameter_intent': intent,
          'custom_parameter_language': language,
          'custom_parameter_error': error
        });
      }

      // Facebook Pixel if available
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('track', 'Lead', {
          content_name: `Andes ${intent} onboarding`,
          content_category: 'running_training',
          value: intent === 'premium' ? 9.99 : 0,
          currency: 'USD'
        });
      }
    } catch (e) {
      if (CONFIG.debug) console.log('Analytics error:', e);
    }
  };

  // Main function to start training
  const startTraining = async (intent: 'free' | 'premium', button: HTMLButtonElement) => {
    const language = getLanguage();
    const originalText = button.innerHTML;
    const loadingText = intent === 'free' 
      ? (language === 'es' ? '🔄 Preparando entrenamiento...' : '🔄 Preparing training...')
      : (language === 'es' ? '🔄 Activando Premium...' : '🔄 Activating Premium...');

    try {
      // Update button state
      button.innerHTML = loadingText;
      button.disabled = true;
      button.classList.add('loading');

      // Track analytics
      if (CONFIG.analyticsEnabled) {
        trackEvent('onboarding_start_clicked', intent, language);
      }

      if (CONFIG.debug) {
        console.log('Starting training:', { intent, language });
      }

      // Call simplified API
      const response = await fetch(`${CONFIG.apiBaseUrl}/onboarding/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, language })
      });

      const data = await response.json();

      if (CONFIG.debug) {
        console.log('API response:', data);
      }

      if (data.success && data.whatsappLink) {
        // Success - show confirmation and redirect
        button.innerHTML = language === 'es' 
          ? '✅ Redirigiendo a WhatsApp...' 
          : '✅ Redirecting to WhatsApp...';
        button.classList.remove('loading');
        button.classList.add('success');
        
        // Track success
        if (CONFIG.analyticsEnabled) {
          trackEvent('onboarding_redirect_success', intent, language);
        }

        // Redirect after brief delay
        setTimeout(() => {
          window.location.href = data.whatsappLink;
        }, 1000);

      } else {
        throw new Error(data.error || 'API returned unsuccessful response');
      }

    } catch (error) {
      console.error('Simplified onboarding failed:', error);
      
      // Track error
      if (CONFIG.analyticsEnabled) {
        trackEvent('onboarding_error', intent, language, (error as Error).message);
      }

      if (CONFIG.fallbackEnabled) {
        // Fallback to existing /start page
        if (CONFIG.debug) {
          console.log('Using fallback to /start page');
        }
        
        button.innerHTML = language === 'es' 
          ? '🔄 Redirigiendo...' 
          : '🔄 Redirecting...';
        button.classList.remove('loading');
        
        setTimeout(() => {
          const fallbackUrl = `/start?flow=${intent}&language=${language}`;
          window.location.href = fallbackUrl;
        }, 500);
      } else {
        // Show error message
        button.innerHTML = language === 'es' 
          ? '❌ Error - Intenta de nuevo' 
          : '❌ Error - Try again';
        button.classList.remove('loading');
        button.classList.add('error');
        
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
          button.classList.remove('error');
        }, 3000);
      }
    }
  };

  // Initialize event listeners
  useEffect(() => {
    const initializeButtons = () => {
      // Find buttons with the correct IDs
      const freeBtn = document.getElementById('start-free-btn') as HTMLButtonElement;
      const premiumBtn = document.getElementById('start-premium-btn') as HTMLButtonElement;

      if (freeBtn) {
        const handleFreeClick = (e: Event) => {
          e.preventDefault();
          startTraining('free', freeBtn);
        };
        freeBtn.addEventListener('click', handleFreeClick);
        if (CONFIG.debug) console.log('Free button initialized');

        // Cleanup function
        return () => freeBtn.removeEventListener('click', handleFreeClick);
      }

      if (premiumBtn) {
        const handlePremiumClick = (e: Event) => {
          e.preventDefault();
          startTraining('premium', premiumBtn);
        };
        premiumBtn.addEventListener('click', handlePremiumClick);
        if (CONFIG.debug) console.log('Premium button initialized');

        // Cleanup function
        return () => premiumBtn.removeEventListener('click', handlePremiumClick);
      }

      // Also handle buttons with data attributes (backup method)
      const onboardingButtons = document.querySelectorAll('.andes-onboarding-btn') as NodeListOf<HTMLButtonElement>;
      const cleanupFunctions: (() => void)[] = [];

      onboardingButtons.forEach(button => {
        const intent = button.getAttribute('data-intent') as 'free' | 'premium';
        if (intent && ['free', 'premium'].includes(intent)) {
          const handleClick = (e: Event) => {
            e.preventDefault();
            startTraining(intent, button);
          };
          button.addEventListener('click', handleClick);
          cleanupFunctions.push(() => button.removeEventListener('click', handleClick));
          if (CONFIG.debug) console.log(`Button with intent ${intent} initialized`);
        }
      });

      return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
      };
    };

    // Initialize with a small delay to ensure DOM is ready
    const timer = setTimeout(initializeButtons, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]); // Re-initialize when route changes

  // Health check (optional)
  useEffect(() => {
    if (CONFIG.debug) {
      fetch(`${CONFIG.apiBaseUrl}/onboarding/health`)
        .then(r => r.json())
        .then(data => console.log('Onboarding service:', data.status))
        .catch(e => console.log('Health check failed:', e));
    }
  }, []);

  return {
    startTraining,
    config: CONFIG
  };
};
