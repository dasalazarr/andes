// Configuración simple de Google Analytics para el MVP
// Permite rastrear eventos clave para validar la demanda en LatAm

// ID de medición de GA (se debe reemplazar con el ID real en producción)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Inicializar Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Evitar cargar GA en desarrollo
    if (process.env.NODE_ENV === 'production') {
      // Cargar el script de GA
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
      
      // Configurar gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);
      
      // Hacer gtag accesible globalmente
      window.gtag = gtag;
    }
  }
};

// Evento para rastrear visualizaciones de artículos
export const trackArticleView = (articleTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_article', {
      'article_title': articleTitle
    });
  }
};

// Evento para rastrear descargas de planes de entrenamiento
export const trackPlanDownload = (planTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download_plan', {
      'plan_title': planTitle
    });
  }
};

// Evento para rastrear envíos de formulario de plan personalizado
export const trackFormSubmission = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      'form_name': 'personalized_plan_request'
    });
  }
};

// A/B Testing Analytics
export const trackABTest = (variant: 'A' | 'B', language: 'en' | 'es') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'ab_test_view', {
      'experiment_name': 'hero_title_variant',
      'variant': variant,
      'language': language,
      'custom_parameter_1': 'hero_section'
    });
  }
};

export const trackHeroCTR = (variant: 'A' | 'B', language: 'en' | 'es', buttonType: 'primary' | 'secondary') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'hero_ctr', {
      'experiment_name': 'hero_title_variant',
      'variant': variant,
      'language': language,
      'button_type': buttonType,
      'custom_parameter_1': 'hero_section'
    });
  }
};

export const trackTrustBadgeClick = (badgeType: string, language: 'en' | 'es') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'trust_badge_click', {
      'badge_type': badgeType,
      'language': language,
      'custom_parameter_1': 'hero_section'
    });
  }
};

export const trackSocialProofView = (language: 'en' | 'es') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'social_proof_view', {
      'language': language,
      'custom_parameter_1': 'hero_section'
    });
  }
};

// FAQ Analytics
export const trackFAQSearch = (searchTerm: string, language: 'en' | 'es') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'faq_search', {
      'search_term': searchTerm,
      'language': language,
      'custom_parameter_1': 'faq_section'
    });
  }
};

export const trackFAQClick = (question: string, language: 'en' | 'es') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'faq_click', {
      'question': question,
      'language': language,
      'custom_parameter_1': 'faq_section'
    });
  }
};

export const trackFAQContactSupport = (language: 'en' | 'es') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag('event', 'faq_contact_support', {
      'language': language,
      'custom_parameter_1': 'faq_section'
    });
  }
};

// Declaración para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
