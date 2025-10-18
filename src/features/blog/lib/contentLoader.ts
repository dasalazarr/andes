/**
 * Content Loader (Phase 1)
 * - Loads Markdown posts from /content/blog/{en,es} using Vite's import.meta.glob
 * - Parses minimal YAML frontmatter without external dependencies
 * - Exposes helpers to list posts and resolve bilingual slugs
 */

import type { Language } from '../../../data/content';

export interface PostMeta {
  lang: Language;
  slug: string;
  title: string;
  description?: string;
  date?: string; // ISO 8601
  tags?: string[];
  category?: string;
  cover?: string;
  coverAlt?: string;
  canonicalId: string;
  published: boolean;
  updated?: string;
}

export interface PostDoc {
  meta: PostMeta;
  body: string;
}

export interface PostSummary {
  lang: Language;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  href: string;
  date?: string;
  updated?: string;
  cover?: string;
  coverAlt?: string;
  readingMinutes: number;
}

// Collect raw markdown files at build time
// Vite handles these at compile-time; no runtime network/filesystem access.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Vite's non-standard typing for `as: 'raw'`
const modules: Record<string, string> = import.meta.glob('/content/blog/**/*.md', {
  eager: true,
  as: 'raw',
});

const trimQuotes = (s: string) => s.replace(/^['"]|['"]$/g, '');

function parseInlineArray(val: string): string[] {
  const inner = val.trim().slice(1, -1).trim(); // remove [ ]
  if (!inner) return [];
  return inner
    .split(',')
    .map((p) => trimQuotes(p.trim()))
    .filter(Boolean);
}

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const fmMatch = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/);
  if (!fmMatch) return { data: {}, content: raw };
  const fm = fmMatch[1];
  const content = raw.slice(fmMatch[0].length);

  const data: Record<string, any> = {};
  for (const line of fm.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const valueRaw = trimmed.slice(idx + 1).trim();
    let value: any = valueRaw;
    if (valueRaw.startsWith('[') && valueRaw.endsWith(']')) {
      value = parseInlineArray(valueRaw);
    } else if (/^(true|false)$/i.test(valueRaw)) {
      value = /^true$/i.test(valueRaw);
    } else {
      value = trimQuotes(valueRaw);
    }
    data[key] = value;
  }
  return { data, content };
}

function inferLangFromPath(path: string): Language {
  return path.includes('/blog/es/') ? 'es' : 'en';
}

function inferSlugFromPath(path: string): string {
  const filename = path.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

// Build in-memory documents
const DOCS: PostDoc[] = Object.entries(modules).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  const lang = (data.lang as Language) || inferLangFromPath(path);
  const slug = (data.slug as string) || inferSlugFromPath(path);
  const meta: PostMeta = {
    lang,
    slug,
    title: (data.title as string) || inferSlugFromPath(path),
    description: data.description as string | undefined,
    date: data.date as string | undefined,
    tags: (data.tags as string[]) || [],
    category: data.category as string | undefined,
    cover: data.cover as string | undefined,
    coverAlt: data.coverAlt as string | undefined,
    canonicalId: (data.canonicalId as string) || slug,
    published: (data.published as boolean) ?? true,
    updated: data.updated as string | undefined,
  };
  return { meta, body: content.trim() };
});

// Index by language and slug
const byLang = new Map<Language, PostDoc[]>();
for (const doc of DOCS) {
  if (!doc.meta.published) continue;
  const arr = byLang.get(doc.meta.lang) ?? [];
  arr.push(doc);
  byLang.set(doc.meta.lang, arr);
}

for (const [lang, arr] of byLang.entries()) {
  arr.sort((a, b) => {
    const da = a.meta.date ? Date.parse(a.meta.date) : 0;
    const db = b.meta.date ? Date.parse(b.meta.date) : 0;
    return db - da;
  });
}

export const getPostsByLang = (lang: Language): PostDoc[] => byLang.get(lang) ?? [];

export const getPostByLangAndSlug = (lang: Language, slug: string): PostDoc | undefined =>
  getPostsByLang(lang).find((d) => d.meta.slug === slug);

export const getAlternateFor = (doc: PostDoc): PostDoc | undefined => {
  const other = doc.meta.lang === 'es' ? 'en' : 'es';
  const others = getPostsByLang(other);
  return others.find((d) => d.meta.canonicalId === doc.meta.canonicalId);
};

const estimateReadingMinutes = (body: string) => {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const getSummaries = (lang: Language): PostSummary[] =>
  getPostsByLang(lang).map((d) => ({
    lang,
    slug: d.meta.slug,
    title: d.meta.title,
    description: d.meta.description,
    category: d.meta.category,
    tags: d.meta.tags ?? [],
    href: (lang === 'es' ? '/es/blog/' : '/blog/') + d.meta.slug,
    date: d.meta.date,
    updated: d.meta.updated,
    cover: d.meta.cover,
    coverAlt: d.meta.coverAlt,
    readingMinutes: estimateReadingMinutes(d.body),
  }));

// Related posts by shared tags (priority) and category (fallback)
export function getRelatedPosts(lang: Language, base: PostDoc, limit = 3) {
  const posts = getPostsByLang(lang).filter((d) => d.meta.slug !== base.meta.slug);
  const baseTags = new Set(base.meta.tags ?? []);
  const sameCategory = base.meta.category;
  const scored = posts.map((p) => {
    const tags = p.meta.tags ?? [];
    const overlap = tags.reduce((acc, t) => acc + (baseTags.has(t) ? 1 : 0), 0);
    const catBoost = sameCategory && p.meta.category === sameCategory ? 0.5 : 0;
    const dateScore = p.meta.date ? Date.parse(p.meta.date) / 1e13 : 0; // tiny tie-breaker
    return { post: p, score: overlap + catBoost + dateScore };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

// Resolve document by canonicalId for a language, with fallback to alternate language
export function getDocByCanonicalId(lang: Language, canonicalId: string): PostDoc | undefined {
  const inLang = getPostsByLang(lang).find((d) => d.meta.canonicalId === canonicalId);
  if (inLang) return inLang;
  const alt: Language = lang === 'es' ? 'en' : 'es';
  return getPostsByLang(alt).find((d) => d.meta.canonicalId === canonicalId);
}

// Build public path for canonicalId, preferring the requested language
export function getPathForCanonicalId(lang: Language, canonicalId: string): string | null {
  const doc = getDocByCanonicalId(lang, canonicalId);
  if (!doc) return null;
  const base = doc.meta.lang === 'es' ? '/es/blog/' : '/blog/';
  return base + doc.meta.slug;
}
