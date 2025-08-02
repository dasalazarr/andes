// Google Analytics utility functions
// Provides type-safe event tracking for key user interactions

// Use existing gtag declaration from src/lib/analytics.ts

// Event categories for organized tracking
export const EventCategories = {
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  NAVIGATION: 'navigation',
  FORM: 'form',
  VIDEO: 'video',
  DOWNLOAD: 'download'
} as const;

// Custom event tracking functions
export const trackEvent = (
  eventName: string,
  category: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      ...parameters
    });
  }
};

// Specific tracking functions for key user actions
export const analytics = {
  // Language switching
  trackLanguageChange: (language: 'es' | 'en', method: 'auto' | 'manual') => {
    trackEvent('language_change', EventCategories.NAVIGATION, {
      language,
      method,
      page_location: window.location.href
    });
  },

  // CTA button clicks
  trackCTAClick: (ctaType: 'primary' | 'secondary', location: string, language: 'es' | 'en') => {
    trackEvent('cta_click', EventCategories.CONVERSION, {
      cta_type: ctaType,
      cta_location: location,
      language,
      page_location: window.location.href
    });
  },

  // Plan selection
  trackPlanSelection: (planType: 'free' | 'premium', planName: string, language: 'es' | 'en') => {
    trackEvent('plan_selection', EventCategories.CONVERSION, {
      plan_type: planType,
      plan_name: planName,
      language,
      page_location: window.location.href
    });
  },

  // Form interactions
  trackFormStart: (formType: 'plan_request' | 'lead_magnet', language: 'es' | 'en') => {
    trackEvent('form_start', EventCategories.FORM, {
      form_type: formType,
      language,
      page_location: window.location.href
    });
  },

  trackFormComplete: (formType: 'plan_request' | 'lead_magnet', language: 'es' | 'en') => {
    trackEvent('form_complete', EventCategories.FORM, {
      form_type: formType,
      language,
      page_location: window.location.href
    });
  },

  trackFormStep: (formType: string, step: number, totalSteps: number, language: 'es' | 'en') => {
    trackEvent('form_step', EventCategories.FORM, {
      form_type: formType,
      step_number: step,
      total_steps: totalSteps,
      progress_percentage: Math.round((step / totalSteps) * 100),
      language,
      page_location: window.location.href
    });
  },

  // Content engagement
  trackArticleClick: (articleId: string, articleTitle: string, language: 'es' | 'en') => {
    trackEvent('article_click', EventCategories.ENGAGEMENT, {
      article_id: articleId,
      article_title: articleTitle,
      language,
      page_location: window.location.href
    });
  },

  trackVideoPlay: (videoId: string, language: 'es' | 'en') => {
    trackEvent('video_play', EventCategories.VIDEO, {
      video_id: videoId,
      language,
      page_location: window.location.href
    });
  },

  // Community engagement
  trackCitySelection: (cityName: string, language: 'es' | 'en') => {
    trackEvent('city_selection', EventCategories.ENGAGEMENT, {
      city_name: cityName,
      language,
      page_location: window.location.href
    });
  },

  trackWhatsAppClick: (source: 'cta' | 'city_modal' | 'plan_card', cityName?: string, language?: 'es' | 'en') => {
    trackEvent('whatsapp_click', EventCategories.CONVERSION, {
      source,
      city_name: cityName,
      language,
      page_location: window.location.href
    });
  },

  // Downloads
  trackPDFDownload: (planName: string, language: 'es' | 'en') => {
    trackEvent('pdf_download', EventCategories.DOWNLOAD, {
      plan_name: planName,
      language,
      page_location: window.location.href
    });
  },

  // Pricing section engagement
  trackPricingView: (language: 'es' | 'en') => {
    trackEvent('pricing_view', EventCategories.ENGAGEMENT, {
      language,
      page_location: window.location.href
    });
  },

  // Scroll depth tracking
  trackScrollDepth: (percentage: number, language: 'es' | 'en') => {
    trackEvent('scroll_depth', EventCategories.ENGAGEMENT, {
      scroll_percentage: percentage,
      language,
      page_location: window.location.href
    });
  },

  // Page views with language context
  trackPageView: (pagePath: string, language: 'es' | 'en') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-YZGJF3K32D', {
        page_path: pagePath,
        custom_map: {
          custom_parameter_1: language
        }
      });
    }
  }
};

// Initialize analytics with language detection
export const initializeAnalytics = (language: 'es' | 'en') => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Set user properties
    window.gtag('set', {
      user_properties: {
        language_preference: language,
        site_version: 'v2.0'
      }
    });

    // Track initial page view
    analytics.trackPageView(window.location.pathname, language);
  }
};

export default analytics;
