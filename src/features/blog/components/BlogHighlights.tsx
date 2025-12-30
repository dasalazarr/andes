import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '@/data/content';
import { getSummaries } from '../lib/contentLoader';
import { getCategoryLabel } from '../lib/categoryLabels';

interface BlogHighlightsProps {
  lang: Language;
  limit?: number;
}

const normalizeCategory = (c?: string) => (c || '').toLowerCase();

const BlogHighlights: React.FC<BlogHighlightsProps> = ({ lang, limit = 4 }) => {
  const all = useMemo(() => getSummaries(lang), [lang]);
  const filtered = useMemo(() => {
    const featuredSlugs = lang === 'es'
      ? ['nutricion-para-corredores', 'como-empezar-a-correr-2025']
      : ['nutrition-for-runners', 'how-to-start-running-2025'];

    // Sort: 
    // 1. Featured slugs first (in their defined order)
    // 2. Then guides/training
    // 3. Then by date (default)
    return [...all].sort((a, b) => {
      const aFeaturedIndex = featuredSlugs.indexOf(a.slug);
      const bFeaturedIndex = featuredSlugs.indexOf(b.slug);

      // If both are featured, sort by their index in FEATURED_SLUGS
      if (aFeaturedIndex !== -1 && bFeaturedIndex !== -1) return aFeaturedIndex - bFeaturedIndex;
      // If only one is featured, it goes first
      if (aFeaturedIndex !== -1) return -1;
      if (bFeaturedIndex !== -1) return 1;

      // Fallback to previous "smart" logic
      const aIsGuide = a.category?.includes('training') || a.tags?.includes('guide');
      const bIsGuide = b.category?.includes('training') || b.tags?.includes('guide');
      if (aIsGuide && !bIsGuide) return -1;
      if (!aIsGuide && bIsGuide) return 1;

      return 0;
    }).slice(0, limit);
  }, [all, limit, lang]);

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

    // Only animate on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

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
    <div className="overflow-hidden">
      <header className="mb-6 md:mb-8 text-center pt-8 md:pt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white md:text-4xl">{heading}</h2>
        <p className="mx-auto mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-gray-300 md:text-lg px-4">{subtitle}</p>
      </header>


      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 pb-10">
          {lang === 'es' ? 'Pronto más artículos.' : 'Articles coming soon.'}
        </p>
      ) : (
        <div className="relative overflow-hidden pb-8 md:pb-12">
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 pb-6 overflow-x-auto snap-x md:overflow-visible md:snap-none scrollbar-hide px-4 md:px-8"
            style={{
              // Reset transform on mobile via style prop if needed, though JS check handles it
              transform: typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 'none' : 'translateX(0px)'
            }}
          >
            {loopSlides.map((p, idx) => {
              const readLabel = p.readingMinutes
                ? lang === 'es'
                  ? `${p.readingMinutes} min lectura`
                  : `${p.readingMinutes} min read`
                : null;

              // Don't render duplicates on mobile to avoid confusion in native scroll
              if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches && idx >= filtered.length) return null;

              return (
                <Link
                  key={`${p.slug}-${idx}`}
                  to={p.href}
                  data-slide
                  className="group relative h-[400px] w-[85vw] sm:w-[400px] md:h-[450px] md:w-[630px] shrink-0 snap-center overflow-hidden rounded-[24px] glass-panel border-white/5 transition-all duration-500 hover:border-[#27e97c]/50 hover:shadow-[0_0_30px_rgba(39,233,124,0.15)]"
                >
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={p.coverAlt || p.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-sm text-neutral-300">
                      {p.title}
                    </div>
                  )}
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/80" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3 md:space-y-4">
                    {p.category && (
                      <span className="inline-flex items-center rounded-full bg-[#27e97c] px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_10px_rgba(39,233,124,0.4)]">
                        {getCategoryLabel(lang, p.category)}
                      </span>
                    )}
                    <h3 className="text-xl md:text-3xl font-bold leading-tight text-white drop-shadow-md line-clamp-2 md:line-clamp-none group-hover:text-[#27e97c] transition-colors duration-300">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
                      {readLabel && <span>{readLabel}</span>}
                      {p.date && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#27e97c]" />
                          <time dateTime={p.date}>
                            {new Date(p.date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10" />
          <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10" />
        </div>
      )}

      <div className="pb-8 md:pb-10 flex justify-center">
        <Link
          to={blogBase}
          className="inline-flex items-center gap-2 rounded-full glass-button px-8 py-3 text-sm font-bold text-white hover:bg-[#27e97c] hover:text-black hover:border-[#27e97c] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(39,233,124,0.4)]"
        >
          {lang === 'es' ? 'Ver todo el contenido' : 'Browse the full blog'}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogHighlights;
