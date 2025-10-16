import React from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '../../../data/content';
import { getRelatedPosts, PostDoc } from '../lib/contentLoader';

interface RelatedPostsProps {
  lang: Language;
  current: PostDoc;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ lang, current }) => {
  const related = getRelatedPosts(lang, current, 3);
  if (!related.length) return null;
  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold mb-4">{lang === 'es' ? 'Artículos relacionados' : 'Related articles'}</h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {related.map((d) => (
          <li key={d.meta.slug} className="bg-neutral-900/50 border border-white/10 rounded-lg p-4 hover:border-[#25d366]/60 transition">
            <h4 className="font-medium">
              <Link className="hover:text-[#25d366]" to={(d.meta.lang === 'es' ? '/es/blog/' : '/blog/') + d.meta.slug}>
                {d.meta.title}
              </Link>
            </h4>
            {d.meta.date && (
              <p className="text-xs text-gray-500 mt-1">{new Date(d.meta.date).toLocaleDateString(lang)}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;

