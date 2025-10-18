import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '@/data/content';
import { getSummaries } from '../lib/contentLoader';
import { getCategoryLabel } from '../lib/categoryLabels';

interface BlogHighlightsProps {
  lang: Language;
  limit?: number;
}

const tabs = [
  { key: 'all', labelEs: 'Todos', labelEn: 'All' },
  { key: 'guides', labelEs: 'Guías', labelEn: 'Guides' },
  { key: 'injuries', labelEs: 'Lesiones', labelEn: 'Injuries' },
  { key: 'nutrition', labelEs: 'Nutrición', labelEn: 'Nutrition' },
  { key: 'routes', labelEs: 'Rutas', labelEn: 'Routes' },
];

const normalizeCategory = (c?: string) => (c || '').toLowerCase();

const BlogHighlights: React.FC<BlogHighlightsProps> = ({ lang, limit = 4 }) => {
  const [tab, setTab] = useState<string>('all');
  const all = useMemo(() => getSummaries(lang), [lang]);
  const filtered = useMemo(() => {
    if (tab === 'all') return all.slice(0, limit);
    return all
      .filter((p) => {
        const cat = normalizeCategory(p.category);
        const tags = (p.tags || []).map((t: string) => t.toLowerCase());
        if (tab === 'guides') return cat === 'training' || tags.includes('guide') || tags.includes('training');
        if (tab === 'routes') return cat === 'routes' || tags.includes('routes') || tags.includes('rutas');
        return cat === tab || tags.includes(tab);
      })
      .slice(0, limit);
  }, [all, tab, limit]);

  const slidesKey = useMemo(() => filtered.map((p) => p.slug).join('|'), [filtered]);
  const loopSlides = useMemo(() => (filtered.length ? [...filtered, ...filtered] : []), [filtered]);

  const heading = lang === 'es' ? 'Aprende y Mejora' : 'Learn and Improve';
  const subtitle = lang === 'es'
    ? 'Guías prácticas para llevar tu carrera al siguiente nivel.'
    : 'Practical guides to take your running to the next level.';
  const blogBase = lang === 'es' ? '/es/blog' : '/blog';
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = 'translateX(0px)';
  }, [slidesKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    if (!track || filtered.length <= 1) return;

    let frameId = 0;
    let position = 0;
    const speed = 0.15; // pixels per frame ~9px/s at 60fps
    const animate = () => {
      const node = trackRef.current;
      if (!node) return;
      const halfWidth = node.scrollWidth / 2;
      if (halfWidth === 0) {
        frameId = window.requestAnimationFrame(animate);
      }

      position -= speed;
      if (Math.abs(position) >= halfWidth) {
        position += halfWidth;
      }

      node.style.transform = `translateX(${position}px)`;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [slidesKey, filtered.length]);

  return (
    <div className="rounded-[20px] shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 md:text-lg">{subtitle}</p>
      </header>

      <div className="mb-7 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => {
          const selected = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-sm rounded-full px-4 py-2 transition ${
                selected
                  ? 'bg-[#25d366] text-black shadow-[0_18px_35px_rgba(37,211,102,0.35)]'
                  : 'border border-[#25d366]/40 text-[#25d366] hover:border-[#25d366] hover:text-white'
              }`}
            >
              {lang === 'es' ? t.labelEs : t.labelEn}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400">
          {lang === 'es' ? 'Pronto más artículos.' : 'Articles coming soon.'}
        </p>
      ) : (
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 pb-6 will-change-transform"
            style={{ transform: 'translateX(0px)' }}
          >
            {loopSlides.map((p, idx) => {
              const readLabel = p.readingMinutes
                ? lang === 'es'
                  ? `${p.readingMinutes} min lectura`
                  : `${p.readingMinutes} min read`
                : null;
              return (
                <Link
                  key={`${p.slug}-${idx}`}
                  to={p.href}
                  data-slide
                  className="group relative h-[450px] w-[630px] shrink-0 snap-center overflow-hidden rounded-[20px] bg-neutral-900"
                >
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={p.coverAlt || p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-700 text-sm text-neutral-300">
                      {p.title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-3 text-white">
                    {p.category && (
                      <span className="inline-flex items-center rounded-full bg-[#25d366]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black shadow-sm">
                        {getCategoryLabel(lang, p.category)}
                      </span>
                    )}
                    <h3 className="text-2xl font-semibold leading-snug text-white drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      {readLabel && <span>{readLabel}</span>}
                      {p.date && (
                        <time dateTime={p.date}>
                          {new Date(p.date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-900 to-transparent" />
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          to={blogBase}
          className="inline-flex items-center gap-2 rounded-full border border-[#25d366]/50 bg-[#25d366] px-6 py-2 text-sm font-semibold text-black shadow-[0_15px_30px_rgba(37,211,102,0.35)] transition hover:bg-[#1fc869]"
        >
          {lang === 'es' ? 'Ver todo el contenido' : 'Browse the full blog'}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogHighlights;
