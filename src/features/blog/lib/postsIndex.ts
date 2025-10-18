/**
 * Blog posts index (Phase 1 — routing only)
 *
 * Minimal, language-aware slug mapping to support clean routes:
 * - /blog and /es/blog for listings
 * - /blog/:slug and /es/blog/:slug for detail
 *
 * Notes
 * - Content rendering will arrive in later steps (MDX/CMS). Here we only
 *   provide enough metadata for routing, language switching, and 404s.
 * - Keep design/colors via existing global styles; no new theme tokens here.
 */

import type { Language } from '../../../data/content';

export type CanonicalId = string;

export interface BlogPostRouteMeta {
  canonicalId: CanonicalId;
  slugs: { en: string; es: string };
  title?: { en: string; es: string };
  date?: string; // ISO 8601 when available
}

// Seed with a tiny sample to make routes navigable. Real content arrives later.
export const POSTS_INDEX: BlogPostRouteMeta[] = [
  {
    canonicalId: 'nutrition-for-runners',
    slugs: { en: 'nutrition-for-runners', es: 'nutricion-para-corredores' },
    title: { en: 'Nutrition for Runners', es: 'Nutrición para Corredores' },
  },
  {
    canonicalId: 'marathon-prep',
    slugs: { en: 'marathon-preparation-guide', es: 'guia-preparacion-maraton' },
    title: { en: 'Marathon Preparation Guide', es: 'Guía de Preparación para Maratón' },
  },
  {
    canonicalId: 'running-shoes',
    slugs: { en: 'how-to-choose-running-shoes', es: 'como-elegir-zapatillas-running' },
    title: { en: 'How to Choose Running Shoes', es: 'Cómo Elegir Zapatillas de Running' },
  },
];

export const detectLanguageFromPath = (pathname: string): Language =>
  pathname.startsWith('/es') ? 'es' : 'en';

export const buildPostPath = (lang: Language, slug: string) =>
  lang === 'es' ? `/es/blog/${slug}` : `/blog/${slug}`;

export const buildListPath = (lang: Language) => (lang === 'es' ? '/es/blog' : '/blog');

export const getAllForLang = (lang: Language) =>
  POSTS_INDEX.map((p) => ({
    canonicalId: p.canonicalId,
    slug: p.slugs[lang],
    title: p.title?.[lang] ?? p.canonicalId,
    href: buildPostPath(lang, p.slugs[lang]),
  }));

export const getBySlug = (slug: string): BlogPostRouteMeta | undefined =>
  POSTS_INDEX.find((p) => p.slugs.en === slug || p.slugs.es === slug);

export const getAlternateLang = (lang: Language): Language => (lang === 'es' ? 'en' : 'es');

export const getAlternatePath = (currentLang: Language, slug: string): string | null => {
  const meta = getBySlug(slug);
  if (!meta) return null;
  const alt = getAlternateLang(currentLang);
  const altSlug = meta.slugs[alt];
  return buildPostPath(alt, altSlug);
};

