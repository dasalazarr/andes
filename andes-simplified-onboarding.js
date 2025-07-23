// ============================================================================
// ANDES SIMPLIFIED ONBOARDING - FRONTEND INTEGRATION
// ============================================================================
// Complete frontend system for direct-to-WhatsApp onboarding flow
// Add this script to your landing page HTML

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    API_BASE_URL: 'https://v3-production-2670.up.railway.app',
    FALLBACK_URL: '/start',
    DEFAULT_LANGUAGE: 'es',
    ANALYTICS_ENABLED: true,
    DEBUG_MODE: true, // ENABLED FOR DEBUGGING
    RETRY_ATTEMPTS: 2,
    TIMEOUT_MS: 10000
  };

  // Utility functions
  const log = (...args) => {
    if (CONFIG.DEBUG_MODE) {
      console.log('[Andes Onboarding]', ...args);
    }
  };

  const error = (...args) => {
    console.error('[Andes Onboarding Error]', ...args);
  };

  // Language detection
  function getLanguage() {
    // Check URL path
    if (window.location.pathname.includes('/en')) return 'en';
    if (window.location.pathname.includes('/es')) return 'es';
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    
    return CONFIG.DEFAULT_LANGUAGE;
  }

  // Analytics tracking
  function trackEvent(event, intent, language, metadata = {}) {
    if (!CONFIG.ANALYTICS_ENABLED) return;
    
    try {
      const eventData = {
        event,
        intent,
        language,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        metadata
      };

      log('Tracking event:', eventData);

      // Send to backend analytics
      fetch(`${CONFIG.API_BASE_URL}/onboarding/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      }).catch(e => log('Analytics failed:', e));

      // Send to Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', event, {
          'custom_parameter_intent': intent,
          'custom_parameter_language': language,
          'custom_parameter_metadata': JSON.stringify(metadata)
        });
      }

      // Send to Facebook Pixel if available
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: `Andes ${intent} onboarding`,
          content_category: 'running_training',
          value: intent === 'premium' ? 9.99 : 0,
          currency: 'USD'
        });
      }

    } catch (e) {
      error('Analytics error:', e);
    }
  }

  // Button state management
  function updateButtonState(button, state, text, disabled = false) {
    if (!button) return;
    
    button.innerHTML = text;
    button.disabled = disabled;
    button.classList.toggle('loading', state === 'loading');
    button.classList.toggle('success', state === 'success');
    button.classList.toggle('error', state === 'error');
  }

  // Main onboarding function
  async function startTraining(intent, retryCount = 0) {
    const language = getLanguage();
    const button = document.getElementById(`start-${intent}-btn`);
    
    if (!button) {
      error(`Button not found: start-${intent}-btn`);
      return;
    }

    const originalText = button.innerHTML;
    const loadingTexts = {
      free: {
        es: '🔄 Preparando entrenamiento gratuito...',
        en: '🔄 Preparing free training...'
      },
      premium: {
        es: '🔄 Activando Andes Premium...',
        en: '🔄 Activating Andes Premium...'
      }
    };

    try {
      // Update button to loading state
      updateButtonState(button, 'loading', loadingTexts[intent][language], true);
      
      // Track start event
      trackEvent('onboarding_start_clicked', intent, language, { retryCount });

      log(`Starting ${intent} onboarding (attempt ${retryCount + 1})`);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);

      // Call simplified API
      const response = await fetch(`${CONFIG.API_BASE_URL}/onboarding/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, language }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      log('API response:', data);

      if (data.success && data.whatsappLink) {
        // Success - show confirmation and redirect
        const successText = language === 'es' 
          ? '✅ Redirigiendo a WhatsApp...' 
          : '✅ Redirecting to WhatsApp...';
        
        updateButtonState(button, 'success', successText, true);
        
        // Track success
        trackEvent('onboarding_redirect_success', intent, language, {
          whatsappNumber: data.whatsappNumber,
          responseTime: Date.now()
        });

        // Redirect after brief delay
        setTimeout(() => {
          log('Redirecting to WhatsApp:', data.whatsappLink);
          window.location.href = data.whatsappLink;
        }, 1500);

      } else {
        throw new Error(data.error || 'API returned unsuccessful response');
      }

    } catch (error) {
      error('Simplified onboarding failed:', error);
      
      // Track error
      trackEvent('onboarding_error', intent, language, {
        error: error.message,
        retryCount,
        isTimeout: error.name === 'AbortError'
      });

      // Retry logic
      if (retryCount < CONFIG.RETRY_ATTEMPTS && error.name !== 'AbortError') {
        log(`Retrying... (${retryCount + 1}/${CONFIG.RETRY_ATTEMPTS})`);
        setTimeout(() => startTraining(intent, retryCount + 1), 1000);
        return;
      }

      // Fallback to existing /start page
      log('Using fallback to /start page');
      
      const fallbackText = language === 'es' 
        ? '🔄 Redirigiendo al formulario...' 
        : '🔄 Redirecting to form...';
      
      updateButtonState(button, 'loading', fallbackText, true);
      
      trackEvent('onboarding_fallback_used', intent, language, {
        finalError: error.message,
        totalRetries: retryCount
      });

      setTimeout(() => {
        window.location.href = `${CONFIG.FALLBACK_URL}?flow=${intent}`;
      }, 1000);
    }
  }

  // Health check function
  async function checkSystemHealth() {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/onboarding/health`);
      const data = await response.json();
      log('System health:', data);
      return data.status === 'healthy';
    } catch (e) {
      error('Health check failed:', e);
      return false;
    }
  }

  // Initialize system
  function init() {
    log('Initializing Andes Simplified Onboarding System');
    
    // Add event listeners to buttons
    const freeBtn = document.getElementById('start-free-btn');
    const premiumBtn = document.getElementById('start-premium-btn');

    if (freeBtn) {
      freeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startTraining('free');
      });
      log('Free button initialized');
    } else {
      error('Free button not found (ID: start-free-btn)');
    }

    if (premiumBtn) {
      premiumBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startTraining('premium');
      });
      log('Premium button initialized');
    } else {
      error('Premium button not found (ID: start-premium-btn)');
    }

    // Perform health check
    checkSystemHealth().then(isHealthy => {
      log('System health check:', isHealthy ? 'HEALTHY' : 'UNHEALTHY');
      if (!isHealthy) {
        error('Backend system appears to be unhealthy');
      }
    });

    // Track page load
    trackEvent('onboarding_page_loaded', 'unknown', getLanguage(), {
      hasFreeBtnBtn: !!freeBtn,
      hasPremiumBtn: !!premiumBtn,
      userAgent: navigator.userAgent
    });
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global functions for manual calls
  window.andesStartTraining = startTraining;
  window.andesCheckHealth = checkSystemHealth;
  window.andesConfig = CONFIG;

  log('Andes Simplified Onboarding System loaded');

})();
