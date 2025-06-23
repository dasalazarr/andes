import React from 'react';
import type { Article, Language } from '../data/content';

interface ArticleCardProps {
  article: Article;
  language: Language;
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, language, onClick }) => {
  // NOTE: Assuming 'summary' and 'category' might not exist on the Article type yet.
  // The linter previously reported errors. We will add them back once the type is updated.
  const { title, image, imageAlt, excerpt, category } = article;

  return (
    <div 
      className="bg-neutral-900/50 border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20 cursor-pointer h-full flex flex-col group" 
      onClick={() => onClick(article)}
    >
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" 
          src={image} 
          alt={imageAlt ? imageAlt[language] : title[language]} 
          style={{ objectPosition: 'center 30%' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          {category && (
            <span className="inline-block bg-purple-900/30 text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded">
              {category[language]}
            </span>
          )}
          <span className="text-xs text-gray-500 ml-auto">
            {new Date(article.date).toLocaleDateString(language, { year: 'numeric', month: 'long' })}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {title[language]}
        </h3>
        {excerpt && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {excerpt[language]}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
