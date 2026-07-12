import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '@/types';

interface SeoManagerProps {
  lang: Language;
}

const SeoManager: React.FC<SeoManagerProps> = ({ lang }) => {
  const baseUrl = 'https://andesrc.com';

  const enUrl = `${baseUrl}/`;
  const esUrl = `${baseUrl}/es/`;

  const seoContent = {
    en: {
      title: "Andes — Fall in love with running in two weeks",
      description: "A running club with real meetups in Pamplona and a WhatsApp coach that adapts to you. Your first race, no fear, no injuries. Start free.",
      keywords: "running club Pamplona, beginner running, WhatsApp running coach, first race, women running club, couch to 5k",
      ogTitle: "Andes — The club that makes you fall in love with running",
      ogDescription: "Meetups that feel like plans with friends and a coach on WhatsApp that adapts to you. Your first race, no fear, no injuries.",
    },
    es: {
      title: "Andes — Enamórate de correr en dos semanas",
      description: "Un club de running con quedadas reales en Pamplona y una coach por WhatsApp que se adapta a ti. Tu primera carrera, sin miedo y sin lesiones. Empieza gratis.",
      keywords: "club running Pamplona, empezar a correr, coach running WhatsApp, primera carrera, club running mujeres, correr desde cero",
      ogTitle: "Andes — El club que te enamora de correr",
      ogDescription: "Quedadas que se sienten como un plan con amigas y una coach en WhatsApp que se adapta a ti. Tu primera carrera, sin miedo y sin lesiones.",
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
      <meta name="author" content="Andes" />
      <meta name="robots" content="index, follow" />

      {/* 3. Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={content.ogTitle} />
      <meta property="og:description" content={content.ogDescription} />
      <meta property="og:url" content={lang === 'es' ? esUrl : enUrl} />
      <meta property="og:site_name" content="Andes" />
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
          "name": "Andes",
          "description": content.description,
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.svg`,
          "sameAs": [
            "https://instagram.com/andescoach",
            "https://tiktok.com/@andesrc"
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
