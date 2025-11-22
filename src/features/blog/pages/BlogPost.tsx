import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { Language } from '../../../data/content';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAlternateFor, getPostByLangAndSlug } from '../lib/contentLoader';
import BlogSeo from '../components/BlogSeo';
import ReadingProgress from '../components/ReadingProgress';
import ShareButtons from '../components/ShareButtons';
import RelatedPosts from '../components/RelatedPosts';
import OnboardingCta from '../components/OnboardingCta';
import analytics from '@/utils/analytics';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9áéíóúñü\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/**
 * BlogPost (routing-only detail)
 * - Resolves a bilingual slug to a canonical post meta
 * - Provides a link to the alternate language version when available
 * - Defers real content rendering to next steps (MDX/CMS)
 */
const BlogPost: React.FC = () => {
  const { pathname } = useLocation();
  const lang: Language = pathname.startsWith('/es') ? 'es' as Language : 'en';
  const { slug = '' } = useParams();
  const doc = getPostByLangAndSlug(lang, slug);

  if (!doc) {
    return (
      <main className="min-h-screen bg-black text-white pt-20 sm:pt-24 pb-12">
        <section className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-gray-400 mb-6">
            {lang === 'es' ? 'Artículo no encontrado.' : 'Article not found.'}
          </p>
          <Link
            to={lang === 'es' ? '/es/blog' : '/blog'}
            className="text-[#25d366] hover:text-white border border-[#25d366]/50 rounded px-3 py-1"
          >
            {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
          </Link>
        </section>
      </main>
    );
  }

  const { meta, body } = doc;
  const title = meta.title;
  const altDoc = getAlternateFor(doc);
  const altPath = altDoc ? (altDoc.meta.lang === 'es' ? '/es/blog/' : '/blog/') + altDoc.meta.slug : null;
  const wordCount = useMemo(() => body.split(/\s+/).filter(Boolean).length, [body]);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const tableOfContents = useMemo(() =>
    body
      .split('\n')
      .filter((line) => /^##\s+/.test(line))
      .map((line) => {
        const label = line.replace(/^##\s+/, '').trim();
        return { id: slugify(label), label };
      }),
    [body]);

  if (typeof window !== 'undefined') {
    analytics.trackPageView(window.location.pathname, lang);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0c0b] to-[#050505] text-white pt-20 sm:pt-24 pb-12">
      <ReadingProgress />
      <BlogSeo
        type="post"
        lang={meta.lang}
        title={`${title} • Andes Runners`}
        description={meta.description}
        canonicalPath={(meta.lang === 'es' ? '/es/blog/' : '/blog/') + meta.slug}
        alternatePath={altPath}
        cover={meta.cover}
        publishedTime={meta.date}
        modifiedTime={meta.updated}
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:gap-10 px-4 py-8 md:py-12 lg:flex-row">
        {tableOfContents.length > 0 && (
          <aside className="hidden lg:block lg:w-64">
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-neutral-900/60 px-6 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#25d366]/70">
                {lang === 'es' ? 'Contenido' : 'Contents'}
              </p>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-xl border border-transparent px-3 py-2 text-sm text-gray-300 transition hover:border-[#25d366]/40 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
        <article className="flex-1">
          <header className="mb-8 md:mb-10 rounded-3xl md:rounded-[32px] border border-white/10 bg-neutral-900/70 px-6 md:px-8 py-8 md:py-10 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
            <div className="flex flex-wrap items-start justify-between gap-4 md:gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#25d366]/70">
                  {meta.category && <span>{mapCategory(meta.category, lang)}</span>}
                  <span aria-hidden>•</span>
                  <span>{lang === 'es' ? `${readingMinutes} min de lectura` : `${readingMinutes} min read`}</span>
                  {meta.date && (
                    <>
                      <span aria-hidden>•</span>
                      <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString(lang)}</time>
                    </>
                  )}
                </div>
                <h1 className="mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
                {meta.description && (
                  <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-400">{meta.description}</p>
                )}
              </div>
              <div className="flex w-full sm:w-auto shrink-0 items-center gap-2 mt-4 sm:mt-0">
                <Link
                  to={lang === 'es' ? '/es/blog' : '/blog'}
                  className="flex-1 sm:flex-initial rounded-full border border-[#25d366]/50 px-4 py-2 text-xs sm:text-sm font-semibold text-[#25d366] transition hover:border-[#25d366] hover:bg-[#25d366] hover:text-black text-center min-h-[40px] inline-flex items-center justify-center"
                >
                  {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
                </Link>
                <ShareButtons title={title} text={meta.description} lang={lang} />
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-gray-300">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, children, ...props }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h2 id={id} className="mt-10 md:mt-12 text-2xl md:text-3xl font-semibold text-white" {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h3 id={id} className="mt-6 md:mt-8 text-xl md:text-2xl font-semibold text-white" {...props}>
                      {children}
                    </h3>
                  );
                },
                p: ({ children }) => <p className="leading-relaxed text-gray-300">{children}</p>,
                ul: ({ children }) => <ul className="my-6 list-disc space-y-2 pl-6 text-gray-300">{children}</ul>,
                ol: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6 text-gray-300">{children}</ol>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#25d366]/60 pl-4 italic text-gray-300">
                    {children}
                  </blockquote>
                ),
                img: ({ src, alt }) => (
                  <figure className="my-8 overflow-hidden rounded-[28px] border border-white/10">
                    <img src={src ?? ''} alt={alt ?? ''} className="w-full object-cover" loading="lazy" />
                  </figure>
                ),
              }}
            >
              {body}
            </ReactMarkdown>
          </div>

          <footer className="mt-10 md:mt-12 flex flex-wrap items-center gap-2 md:gap-3">
            {altPath && (
              <Link
                to={altPath}
                className="rounded-full border border-[#25d366]/50 px-4 py-2 text-xs sm:text-sm font-semibold text-[#25d366] transition hover:border-[#25d366] hover:bg-[#25d366] hover:text-black min-h-[40px] inline-flex items-center"
              >
                {lang === 'es' ? 'Leer en English' : 'Read in Español'}
              </Link>
            )}
            <Link
              to={lang === 'es' ? '/es/blog' : '/blog'}
              className="rounded-full border border-white/20 px-4 py-2 text-xs sm:text-sm font-semibold text-white/80 transition hover:border-white hover:text-white min-h-[40px] inline-flex items-center"
            >
              {lang === 'es' ? 'Ver más notas' : 'More articles'}
            </Link>
          </footer>
          <OnboardingCta lang={lang} location="blog_post_bottom" />
          <RelatedPosts lang={lang} current={doc} />
        </article>
      </div>
    </main>
  );
};

export default BlogPost;

function mapCategory(category?: string, lang: Language = 'es') {
  if (!category) return lang === 'es' ? 'General' : 'General';
  const key = category.toLowerCase();
  if (key === 'routes') return lang === 'es' ? 'Rutas' : 'Routes';
  if (key === 'training') return lang === 'es' ? 'Entrenamiento' : 'Training';
  if (key === 'nutrition') return lang === 'es' ? 'Nutrición' : 'Nutrition';
  if (key === 'injuries') return lang === 'es' ? 'Lesiones' : 'Injuries';
  if (key === 'grit') return 'GRIT';
  return category;
}
