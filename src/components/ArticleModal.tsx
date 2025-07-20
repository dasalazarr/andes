import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Article, Language } from '../data/content';
import { Button } from './ui/button';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  language: Language;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article, language }) => {
  if (!article) return null;

  const content = article.fullContent[language] || article.excerpt[language];
  const readingTime = Math.ceil(content.split(' ').length / 200);

  const handleShare = async () => {
    const shareData = {
      title: article.title[language],
      text: article.excerpt[language],
      url: window.location.href, // This will share the main page URL, which is fine for this context
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert(language === 'es' ? '¡Enlace copiado al portapapeles!' : 'Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing article:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="bg-neutral-900 border border-white/10 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 md:h-72 w-full">
              <img 
                src={article.image}
                alt={article.imageAlt ? article.imageAlt[language] : article.title[language]}
                className="w-full h-full object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 rounded-full bg-black/30 text-white/80 backdrop-blur-sm hover:bg-[#25d366]/20 hover:text-white"
                onClick={onClose}
                aria-label="Close article detail"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
              <div className="mb-6">
                {article.category && (
                  <span className="inline-block bg-[#006b5b]/50 text-[#25d366] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {article.category[language]}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {article.title[language]}
                </h2>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{new Date(article.date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-[#25d366] hover:prose-a:text-[#006b5b] prose-strong:text-white prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between bg-neutral-900/50 rounded-b-xl">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>{readingTime} min {language === 'es' ? 'de lectura' : 'read'}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare} className="bg-transparent border-[#25d366]/50 text-[#25d366] hover:bg-[#25d366]/20 hover:text-white">
                <Share2 size={16} className="mr-2" />
                {language === 'es' ? 'Compartir' : 'Share'}
              </Button>
            </div>
            {/* <Button onClick={onClose} className="mt-6">Cerrar</Button> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;
