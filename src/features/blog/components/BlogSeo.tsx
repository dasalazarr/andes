import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Language } from '../../../data/content';

interface BlogSeoBaseProps {
  lang: Language;
  title: string;
  description?: string;
  canonicalPath: string; // begins with '/'
  alternatePath?: string | null; // alternate language version absolute path
  cover?: string;
}

interface BlogSeoPostProps extends BlogSeoBaseProps {
  type: 'post';
  publishedTime?: string; // ISO 8601
  modifiedTime?: string; // ISO 8601
}

interface BlogSeoListProps extends BlogSeoBaseProps {
  type: 'list';
}

type BlogSeoProps = BlogSeoPostProps | BlogSeoListProps;

const BASE_URL = 'https://andesrunners.com';

const BlogSeo: React.FC<BlogSeoProps> = (props) => {
  const {
    lang,
    title,
    description,
    canonicalPath,
    alternatePath,
    cover,
  } = props;

  const canonicalUrl = BASE_URL + canonicalPath;
  const altUrl = alternatePath ? BASE_URL + alternatePath : null;

  const ogType = props.type === 'post' ? 'article' : 'website';

  const jsonLd =
    props.type === 'post'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: description,
          inLanguage: lang,
          mainEntityOfPage: canonicalUrl,
          image: cover ? [BASE_URL + cover] : undefined,
          datePublished: props.publishedTime,
          dateModified: props.modifiedTime || props.publishedTime,
          publisher: {
            '@type': 'Organization',
            name: 'Andes Runners',
            url: BASE_URL,
            logo: {
              '@type': 'ImageObject',
              url: BASE_URL + '/images/logo.svg',
            },
          },
        }
      : null;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="index, follow" />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Provide both language alternates for better SEO coverage */}
      <link rel="alternate" href={BASE_URL + '/blog'} hrefLang="en" />
      <link rel="alternate" href={BASE_URL + '/es/blog'} hrefLang="es" />
      <link rel="alternate" href={BASE_URL + '/blog'} hrefLang="x-default" />
      {altUrl && (
        <link rel="alternate" href={altUrl} hrefLang={lang === 'es' ? 'en' : 'es'} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Andes Runners" />
      {cover && <meta property="og:image" content={BASE_URL + cover} />}
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {cover && <meta name="twitter:image" content={BASE_URL + cover} />} 

      {/* Structured data for posts */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default BlogSeo;

