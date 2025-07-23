// Simplified Onboarding Integration for Andes Landing Page
// Add this script to your landing page HTML

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    API_BASE_URL: 'https://v3-production-2670.up.railway.app',
    DEFAULT_LANGUAGE: 'es', // Change to 'en' for English landing pages
    FALLBACK_ENABLED: true,
    ANALYTICS_ENABLED: true
  };

  // Detect language from URL or set default
  function getLanguage() {
    if (window.location.pathname.includes('/en')) return 'en';
    if (window.location.pathname.includes('/es')) return 'es';
    return CONFIG.DEFAULT_LANGUAGE;
  }

  // Main function to start training
  async function startTraining(intent) {
    const language = getLanguage();
    const button = document.getElementById(`start-${intent}-btn`);
    
    if (!button) {
      console.error(`Button not found: start-${intent}-btn`);
      return;
    }

    const originalText = button.innerHTML;
    const loadingText = intent === 'free' 
      ? (language === 'es' ? '🔄 Preparando entrenamiento...' : '🔄 Preparing training...')
      : (language === 'es' ? '🔄 Activando Premium...' : '🔄 Activating Premium...');

    try {
      // Update button state
      button.innerHTML = loadingText;
      button.disabled = true;

      // Track analytics
      if (CONFIG.ANALYTICS_ENABLED) {
        trackEvent('onboarding_start_clicked', intent, language);
      }

      // Call simplified API
      const response = await fetch(`${CONFIG.API_BASE_URL}/onboarding/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, language })
      });

      const data = await response.json();

      if (data.success && data.whatsappLink) {
        // Success - show confirmation and redirect
        button.innerHTML = language === 'es' 
          ? '✅ Redirigiendo a WhatsApp...' 
          : '✅ Redirecting to WhatsApp...';
        
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
        console.log('Using fallback to /start page');
        button.innerHTML = language === 'es' 
          ? '🔄 Redirigiendo...' 
          : '🔄 Redirecting...';
        
        setTimeout(() => {
          window.location.href = `/start?flow=${intent}`;
        }, 500);
      } else {
        // Show error message
        button.innerHTML = language === 'es' 
          ? '❌ Error - Intenta de nuevo' 
          : '❌ Error - Try again';
        
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
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
      }).catch(e => console.log('Analytics failed:', e));

      // Also send to Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', event, {
          'custom_parameter_intent': intent,
          'custom_parameter_language': language,
          'custom_parameter_error': error
        });
      }
    } catch (e) {
      console.log('Analytics error:', e);
    }
  }

  // Initialize when DOM is ready
  function init() {
    // Add event listeners to buttons
    const freeBtn = document.getElementById('start-free-btn');
    const premiumBtn = document.getElementById('start-premium-btn');

    if (freeBtn) {
      freeBtn.addEventListener('click', () => startTraining('free'));
    }

    if (premiumBtn) {
      premiumBtn.addEventListener('click', () => startTraining('premium'));
    }

    // Health check (optional)
    fetch(`${CONFIG.API_BASE_URL}/onboarding/health`)
      .then(r => r.json())
      .then(data => console.log('Onboarding service:', data.status))
      .catch(e => console.log('Health check failed:', e));
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global function for manual calls
  window.andesStartTraining = startTraining;

})();
