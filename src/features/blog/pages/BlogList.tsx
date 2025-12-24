import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Language } from '../../../data/content';
import { getSummaries, PostSummary } from '../lib/contentLoader';
import { getCategoryLabel } from '../lib/categoryLabels';
import BlogCard from '../components/BlogCard';
import BlogSeo from '../components/BlogSeo';

const FILTERS = [
  { key: '', labelEs: 'Todos', labelEn: 'All' },
  { key: 'guides', labelEs: 'Guías', labelEn: 'Guides' },
  { key: 'injuries', labelEs: 'Lesiones', labelEn: 'Injuries' },
  { key: 'nutrition', labelEs: 'Nutrición', labelEn: 'Nutrition' },
  { key: 'routes', labelEs: 'Rutas', labelEn: 'Routes' },
  { key: 'grit', labelEs: 'Historias GRIT', labelEn: 'GRIT Stories' },
];

const normalize = (value?: string) => (value || '').toLowerCase();

const matchesFilter = (post: PostSummary, filterKey: string) => {
  if (!filterKey) return true;
  const cat = normalize(post.category);
  const tags = (post.tags || []).map(normalize);
  if (filterKey === 'guides') return cat === 'training' || tags.includes('guide') || tags.includes('training');
  if (filterKey === 'routes') return cat === 'routes' || tags.includes('routes') || tags.includes('rutas');
  return cat === filterKey || tags.includes(filterKey);
};

const BlogList: React.FC = () => {
  const { pathname, search } = useLocation();
  const lang: Language = pathname.startsWith('/es') ? 'es' : 'en';
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const filterKey = normalize(params.get('cat') || '');
  const postsAll = useMemo(() => getSummaries(lang), [lang]);
  const posts = useMemo(
    () => postsAll.filter((post) => matchesFilter(post, filterKey)),
    [postsAll, filterKey],
  );

  const basePath = lang === 'es' ? '/es/blog' : '/blog';
  const altListPath = lang === 'es' ? '/blog' : '/es/blog';
  const altLangLabel = lang === 'es' ? 'English' : 'Español';
  const heroTitle = lang === 'es' ? 'Blog de Andes' : 'Andes Blog';
  const heroSubtitle = lang === 'es'
    ? 'Guías, planes y prevención de lesiones para correr mejor cada semana.'
    : 'Guides, plans, and injury prevention to help you run smarter every week.';

  const filtersWithCounts = useMemo(() =>
    FILTERS.map((f) => ({
      ...f,
      count: postsAll.filter((post) => matchesFilter(post, f.key)).length,
    })),
    [postsAll]);

  const eyebrow = lang === 'es' ? 'ANDES BLOG' : 'ANDES BLOG';

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a1510] to-[#050505] text-white pt-20 sm:pt-24">
      <BlogSeo
        type="list"
        lang={lang}
        title={`${heroTitle} • Andes Runners`}
        description={heroSubtitle}
        canonicalPath={basePath}
        alternatePath={altListPath}
      />

      <section className="px-4 py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl md:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <header className="text-center">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] md:tracking-[0.35em] text-white/40">
                <span>{eyebrow}</span>
                <Link
                  to={altListPath}
                  className="rounded-full border border-white/20 px-3 py-1 font-semibold text-white/70 transition hover:border-white hover:text-white text-[10px] sm:text-xs"
                >
                  {altLangLabel}
                </Link>
              </div>
              <h1 className="mt-4 md:mt-6 text-3xl md:text-4xl lg:text-5xl font-bold">{heroTitle}</h1>
              <p className="mx-auto mt-3 md:mt-4 max-w-3xl text-base md:text-lg lg:text-xl text-gray-300">{heroSubtitle}</p>

              {/* Filters with horizontal scroll on mobile */}
              <div className="mt-6 md:mt-8 -mx-6 md:mx-0 px-6 md:px-0">
                <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {filtersWithCounts.map((filter) => {
                    const href = filter.key ? `${basePath}?cat=${filter.key}` : basePath;
                    const active = filter.key === filterKey;
                    return (
                      <Link
                        key={filter.key || 'all'}
                        to={href}
                        className={`flex-shrink-0 rounded-full px-4 md:px-5 py-2 text-xs md:text-sm font-semibold transition whitespace-nowrap min-h-[40px] inline-flex items-center gap-2 ${active
                          ? 'bg-[#25d366] text-black shadow-[0_18px_35px_rgba(37,211,102,0.3)]'
                          : 'border border-[#25d366]/40 text-[#25d366] hover:border-[#25d366] hover:text-white'
                          }`}
                      >
                        <span>{lang === 'es' ? filter.labelEs : filter.labelEn}</span>
                        <span className="text-xs font-medium text-[#25d366]/70">{filter.count}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </header>

            {posts.length === 0 ? (
              <p className="mt-10 md:mt-12 rounded-3xl md:rounded-[28px] border border-dashed border-white/20 bg-white/5 backdrop-blur-md p-8 md:p-10 text-center text-sm md:text-base text-gray-400">
                {lang === 'es'
                  ? 'Aún no tenemos artículos para esta categoría. Vuelve pronto.'
                  : 'We do not have articles in this category yet. Check back soon.'}
              </p>
            ) : (
              <ul className="mt-10 md:mt-12 grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    title={post.title}
                    href={post.href}
                    lang={lang}
                    date={post.date}
                    updated={post.updated}
                    category={getCategoryLabel(lang, post.category)}
                    description={post.description}
                    readingMinutes={post.readingMinutes}
                    cover={post.cover}
                    coverAlt={post.coverAlt}
                    variant="dark"
                  />
                ))}
              </ul>
            )}

            <div className="mt-10 md:mt-12 rounded-3xl md:rounded-[28px] border border-white/10 bg-gradient-to-br from-[#123b2b] to-[#25d366]/40 p-6 md:p-8 text-white">
              <h2 className="text-base md:text-lg font-semibold">
                {lang === 'es' ? '¿Listo para tu próximo objetivo?' : 'Ready for your next goal?'}
              </h2>
              <p className="mt-2 md:mt-3 max-w-2xl text-xs md:text-sm text-white/80">
                {lang === 'es'
                  ? 'Solicita un plan personalizado por WhatsApp con ajustes diarios de Andes.'
                  : 'Request a personalised WhatsApp plan from Andes with daily adjustments.'}
              </p>
              <a
                href={lang === 'es' ? '/es#pricing' : '/#pricing'}
                className="mt-4 md:mt-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white px-5 py-2 text-xs md:text-sm font-semibold text-black transition hover:bg-neutral-100 min-h-[40px]"
              >
                {lang === 'es' ? 'Solicitar plan gratuito' : 'Get your free plan'}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogList;
