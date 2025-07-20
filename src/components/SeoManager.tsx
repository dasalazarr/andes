import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '@/types';

interface SeoManagerProps {
  lang: Language;
}

const SeoManager: React.FC<SeoManagerProps> = ({ lang }) => {
  const baseUrl = 'https://andesrunners.com'; // Reemplaza con tu dominio real

  const enUrl = `${baseUrl}/`;
  const esUrl = `${baseUrl}/es/`;

  const seoContent = {
    en: {
      title: "Andes Runners - AI-Powered Marathon Training for Beginners",
      description: "Complete your first marathon with personalized AI coaching, expert guidance, and a supportive community. 98% success rate, 40,000+ km analyzed.",
      keywords: "marathon training, running coach, AI coaching, beginner runner, personalized training plan",
      ogTitle: "Andes Runners - Your AI Marathon Coach",
      ogDescription: "Transform from beginner to marathon finisher with our AI-powered coaching platform. Join 2,500+ successful runners.",
    },
    es: {
      title: "Andes Runners - Entrenamiento de Maratón con IA para Principiantes",
      description: "Completa tu primera maratón con coaching personalizado de IA, guía experta y comunidad de apoyo. 98% de éxito, 40,000+ km analizados.",
      keywords: "entrenamiento maratón, coach running, coaching IA, corredor principiante, plan entrenamiento personalizado",
      ogTitle: "Andes Runners - Tu Coach de Maratón con IA",
      ogDescription: "Transforma de principiante a finalista de maratón con nuestra plataforma de coaching con IA. Únete a 2,500+ corredores exitosos.",
    }
  };

  const content = seoContent[lang];

  return (
    <Helmet>
      {/* 1. Actualizar el atributo lang de la etiqueta <html> */}
      <html lang={lang} />

      {/* 2. Meta tags básicos */}
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="keywords" content={content.keywords} />
      <meta name="author" content="Andes Runners" />
      <meta name="robots" content="index, follow" />

      {/* 3. Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={content.ogTitle} />
      <meta property="og:description" content={content.ogDescription} />
      <meta property="og:url" content={lang === 'es' ? esUrl : enUrl} />
      <meta property="og:site_name" content="Andes Runners" />
      <meta property="og:image" content={`${baseUrl}/images/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />

      {/* 4. Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.ogTitle} />
      <meta name="twitter:description" content={content.ogDescription} />
      <meta name="twitter:image" content={`${baseUrl}/images/twitter-image.jpg`} />

      {/* 5. Canonical URL */}
      <link rel="canonical" href={lang === 'es' ? esUrl : enUrl} />

      {/* 6. Hreflang para SEO multilingüe */}
      <link rel="alternate" href={enUrl} hrefLang="en" />
      <link rel="alternate" href={esUrl} hrefLang="es" />

      {/* 7. Idioma por defecto */}
      <link rel="alternate" href={enUrl} hrefLang="x-default" />

      {/* 8. Preconnect para performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* 9. Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Andes Runners",
          "description": content.description,
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.svg`,
          "sameAs": [
            "https://instagram.com/andesrunners",
            "https://facebook.com/andesrunners"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["English", "Spanish"]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SeoManager;
