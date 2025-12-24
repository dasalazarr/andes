import React from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '@/data/content';
import TagChip from './TagChip';

interface BlogCardProps {
  title: string;
  href: string;
  lang: Language;
  date?: string;
  updated?: string;
  category?: string;
  description?: string;
  readingMinutes?: number;
  cover?: string;
  coverAlt?: string;
  variant?: 'light' | 'dark';
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  href,
  lang,
  date,
  updated,
  category,
  description,
  readingMinutes,
  cover,
  coverAlt,
  variant = 'dark',
}) => {
  const isLight = variant === 'light';
  const containerClasses = isLight
    ? 'bg-white border border-neutral-200 shadow-sm hover:shadow-md'
    : 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#25d366]/50 hover:bg-white/10';
  const headingClass = isLight ? 'text-neutral-900 hover:text-neutral-700' : 'text-white hover:text-[#25d366]';
  const bodyTextClass = isLight ? 'text-neutral-600' : 'text-gray-400';
  const metaTextClass = isLight ? 'text-neutral-500' : 'text-gray-500';
  const readMoreClass = isLight ? 'text-[#0F5132] hover:text-neutral-900' : 'text-[#25d366] hover:text-white';
  const formattedDate = date
    ? new Date(date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : undefined;
  const updatedDate = updated && updated !== date
    ? new Date(updated).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : undefined;
  const readingLabel = readingMinutes
    ? lang === 'es'
      ? `${readingMinutes} min de lectura`
      : `${readingMinutes} min read`
    : undefined;
  const readMoreLabel = lang === 'es' ? 'Leer más' : 'Read more';
  const dateLabel = formattedDate ? (lang === 'es' ? 'Publicado' : 'Published') : undefined;
  const updatedLabel = updatedDate ? (lang === 'es' ? 'Actualizado' : 'Updated') : undefined;

  return (
    <li className={`rounded-xl md:rounded-2xl overflow-hidden transition ${containerClasses}`}>
      <article className="flex h-full flex-col">
        <Link to={href} className="block aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-neutral-800">
          {cover ? (
            <img
              src={cover}
              alt={coverAlt || title}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1F1F1F] to-[#2A2A2A] text-xs sm:text-sm text-gray-400 p-4 text-center">
              {title}
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col px-5 md:px-6 py-4 md:py-5">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3 text-[10px] sm:text-xs">
            {category ? <TagChip label={category} variant={isLight ? 'light' : 'dark'} /> : <span />}
            <div className={`flex flex-wrap items-center gap-1.5 md:gap-2 ${metaTextClass}`}>
              {readingLabel && <span>{readingLabel}</span>}
              {formattedDate && (
                <>
                  {readingLabel && <span aria-hidden>•</span>}
                  <time dateTime={date}>
                    {dateLabel ? `${dateLabel} ${formattedDate}` : formattedDate}
                  </time>
                </>
              )}
              {updatedDate && (
                <>
                  {(readingLabel || formattedDate) && <span aria-hidden>•</span>}
                  <time dateTime={updated}>
                    {updatedLabel ? `${updatedLabel} ${updatedDate}` : updatedDate}
                  </time>
                </>
              )}
            </div>
          </div>

          <h3 className="mt-3 md:mt-4 text-lg md:text-xl font-semibold leading-tight">
            <Link className={headingClass} to={href}>
              {title}
            </Link>
          </h3>

          {description && (
            <p className={`mt-2 md:mt-3 text-xs sm:text-sm leading-relaxed line-clamp-3 ${bodyTextClass}`}>
              {description}
            </p>
          )}

          <div className="mt-auto pt-4 md:pt-5">
            <Link className={`inline-flex items-center text-xs sm:text-sm font-semibold ${readMoreClass} min-h-[32px]`} to={href} aria-label={readMoreLabel}>
              {readMoreLabel}
              <span className="ml-1" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
};

export default BlogCard;
