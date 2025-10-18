import React from 'react';
import { useLocation } from 'react-router-dom';

interface ShareButtonsProps {
  title: string;
  text?: string;
  lang: 'en' | 'es';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text, lang }) => {
  const { pathname } = useLocation();
  const url = typeof window !== 'undefined' ? window.location.origin + pathname : pathname;

  const handleShare = async () => {
    const shareData = { title, text: text || title, url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert(lang === 'es' ? 'Enlace copiado al portapapeles' : 'Link copied to clipboard');
      }
    } catch (e) {
      // Silently ignore
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-sm text-[#25d366] hover:text-white border border-[#25d366]/50 rounded px-3 py-1"
    >
      {lang === 'es' ? 'Compartir' : 'Share'}
    </button>
  );
};

export default ShareButtons;

