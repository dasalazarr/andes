import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '@/types';

interface SeoManagerProps {
  lang: Language;
}

const SeoManager: React.FC<SeoManagerProps> = ({ lang }) => {
  const baseUrl = 'https://tu-dominio.com'; // Reemplaza con tu dominio real

  const enUrl = `${baseUrl}/`;
  const esUrl = `${baseUrl}/es/`;

  return (
    <Helmet>
      {/* 1. Actualizar el atributo lang de la etiqueta <html> */}
      <html lang={lang} />

      {/* 2. Añadir etiquetas hreflang para SEO multilingüe */}
      <link rel="alternate" href={enUrl} hrefLang="en" />
      <link rel="alternate" href={esUrl} hrefLang="es" />

      {/* 3. Indicar el idioma por defecto (inglés en este caso) */}
      <link rel="alternate" href={enUrl} hrefLang="x-default" />
    </Helmet>
  );
};

export default SeoManager;
