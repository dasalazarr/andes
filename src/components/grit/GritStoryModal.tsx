import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPathForCanonicalId } from '@/features/blog/lib/contentLoader';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface GritStoryModalProps {
  onClose: () => void;
  story: {
    name: string;
    image: string;
    fullStory: string;
    location: string;
    blogCanonicalId?: string;
  };
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-50vh", opacity: 0, scale: 0.8 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const GritStoryModal: React.FC<GritStoryModalProps> = ({ onClose, story }) => {
  const { pathname } = useLocation();
  const lang = pathname.startsWith('/es') ? 'es' : 'en';
  const blogPath = story.blogCanonicalId ? getPathForCanonicalId(lang as any, story.blogCanonicalId) : null;
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        variants={modal}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10">
          <X size={24} />
        </button>
        
        <div className="p-6 md:p-8">
          <img src={story.image} alt={story.name} className="w-full h-64 object-cover rounded-lg mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{story.name}</h2>
          <p className="text-sm text-gray-500 mb-4 font-medium">{story.location}</p>
          <div className="prose prose-lg max-w-none text-gray-700">
            {story.fullStory.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {blogPath && (
            <div className="mt-6">
              <Link
                to={blogPath}
                className="inline-block bg-black text-white border border-black rounded px-4 py-2 hover:bg-gray-900"
              >
                {lang === 'es' ? 'Leer caso completo' : 'Read full case'}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GritStoryModal;
