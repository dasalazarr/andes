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
    <main className="min-h-screen bg-gradient-to-b from-[#0c0f0d] via-[#0a0c0b] to-[#050505] text-white pt-20 sm:pt-24">
      <BlogSeo
        type="list"
        lang={lang}
        title={`${heroTitle} • Andes Runners`}
        description={heroSubtitle}
        canonicalPath={basePath}
        alternatePath={altListPath}
      />

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[36px] border border-white/10 bg-neutral-950/75 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] md:p-12">
            <header className="text-center">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/40">
                <span>{eyebrow}</span>
                <Link
                  to={altListPath}
                  className="rounded-full border border-white/20 px-3 py-1 font-semibold text-white/70 transition hover:border-white hover:text-white"
                >
                  {altLangLabel}
                </Link>
              </div>
              <h1 className="mt-6 text-4xl font-bold md:text-5xl">{heroTitle}</h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">{heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {filtersWithCounts.map((filter) => {
                  const href = filter.key ? `${basePath}?cat=${filter.key}` : basePath;
                  const active = filter.key === filterKey;
                  return (
                    <Link
                      key={filter.key || 'all'}
                      to={href}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                        active
                          ? 'bg-[#25d366] text-black shadow-[0_18px_35px_rgba(37,211,102,0.3)]'
                          : 'border border-[#25d366]/40 text-[#25d366] hover:border-[#25d366] hover:text-white'
                      }`}
                    >
                      {lang === 'es' ? filter.labelEs : filter.labelEn}
                      <span className="ml-2 text-xs font-medium text-[#25d366]/70">{filter.count}</span>
                    </Link>
                  );
                })}
              </div>
            </header>

            {posts.length === 0 ? (
              <p className="mt-12 rounded-[28px] border border-dashed border-white/20 bg-neutral-900/60 p-10 text-center text-gray-400">
                {lang === 'es'
                  ? 'Aún no tenemos artículos para esta categoría. Vuelve pronto.'
                  : 'We do not have articles in this category yet. Check back soon.'}
              </p>
            ) : (
              <ul className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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

            <div className="mt-12 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#123b2b] to-[#25d366]/40 p-8 text-white">
              <h2 className="text-lg font-semibold">
                {lang === 'es' ? '¿Listo para tu próximo objetivo?' : 'Ready for your next goal?'}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/80">
                {lang === 'es'
                  ? 'Solicita un plan personalizado por WhatsApp con ajustes diarios de Andes.'
                  : 'Request a personalised WhatsApp plan from Andes with daily adjustments.'}
              </p>
              <Link
                to={lang === 'es' ? '/es/start' : '/start'}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-100"
              >
                {lang === 'es' ? 'Solicitar plan gratuito' : 'Get your free plan'}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogList;
