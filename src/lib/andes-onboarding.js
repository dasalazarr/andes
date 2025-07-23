// Andes Simplified Onboarding Integration
// Direct WhatsApp integration for improved conversion rates

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    API_BASE_URL: 'https://v3-production-2670.up.railway.app',
    FALLBACK_ENABLED: true,
    ANALYTICS_ENABLED: true,
    DEBUG: false // Set to true for development
  };

  // Detect language from URL
  function getLanguage() {
    if (window.location.pathname.includes('/es')) return 'es';
    return 'en';
  }

  // Main function to start training
  async function startTraining(intent, button) {
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
      if (CONFIG.ANALYTICS_ENABLED) {
        trackEvent('onboarding_start_clicked', intent, language);
      }

      if (CONFIG.DEBUG) {
        console.log('Starting training:', { intent, language });
      }

      // Call simplified API
      const response = await fetch(`${CONFIG.API_BASE_URL}/onboarding/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, language })
      });

      const data = await response.json();

      if (CONFIG.DEBUG) {
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
        if (CONFIG.ANALYTICS_ENABLED) {
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
      if (CONFIG.ANALYTICS_ENABLED) {
        trackEvent('onboarding_error', intent, language, error.message);
      }

      if (CONFIG.FALLBACK_ENABLED) {
        // Fallback to existing /start page
        if (CONFIG.DEBUG) {
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
  }

  // Analytics tracking function
  function trackEvent(event, intent, language, error = null) {
    try {
      // Send to your analytics endpoint
      fetch(`${CONFIG.API_BASE_URL}/onboarding/analytics`, {
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
        if (CONFIG.DEBUG) console.log('Analytics failed:', e);
      });

      // Also send to Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', event, {
          'custom_parameter_intent': intent,
          'custom_parameter_language': language,
          'custom_parameter_error': error
        });
      }

      // Facebook Pixel if available
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: `Andes ${intent} onboarding`,
          content_category: 'running_training',
          value: intent === 'premium' ? 9.99 : 0,
          currency: 'USD'
        });
      }
    } catch (e) {
      if (CONFIG.DEBUG) console.log('Analytics error:', e);
    }
  }

  // Initialize when DOM is ready
  function init() {
    // Find buttons with the correct selectors
    const freeBtn = document.getElementById('start-free-btn');
    const premiumBtn = document.getElementById('start-premium-btn');

    if (freeBtn) {
      freeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startTraining('free', freeBtn);
      });
      if (CONFIG.DEBUG) console.log('Free button initialized');
    }

    if (premiumBtn) {
      premiumBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startTraining('premium', premiumBtn);
      });
      if (CONFIG.DEBUG) console.log('Premium button initialized');
    }

    // Also handle buttons with data attributes (backup method)
    const onboardingButtons = document.querySelectorAll('.andes-onboarding-btn');
    onboardingButtons.forEach(button => {
      const intent = button.getAttribute('data-intent');
      if (intent && ['free', 'premium'].includes(intent)) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          startTraining(intent, button);
        });
        if (CONFIG.DEBUG) console.log(`Button with intent ${intent} initialized`);
      }
    });

    // Health check (optional)
    if (CONFIG.DEBUG) {
      fetch(`${CONFIG.API_BASE_URL}/onboarding/health`)
        .then(r => r.json())
        .then(data => console.log('Onboarding service:', data.status))
        .catch(e => console.log('Health check failed:', e));
    }
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global function for manual calls
  window.andesStartTraining = startTraining;

  // Expose config for debugging
  if (CONFIG.DEBUG) {
    window.andesOnboardingConfig = CONFIG;
  }

})();
