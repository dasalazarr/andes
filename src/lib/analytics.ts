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

// Declaración para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
