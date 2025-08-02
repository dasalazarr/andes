import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, MessageCircle } from 'lucide-react';
import { analytics } from '../utils/analytics';

export interface CityInfo {
  id: string;
  name: string;
  imageSrc: string;
  link: string;
  schedule?: {
    es: string[];
    en: string[];
  };
  whatsappLink?: string;
}

interface CityCommunitySectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  cities: CityInfo[];
  language: 'es' | 'en';
}

interface CityModalProps {
  city: CityInfo | null;
  isOpen: boolean;
  onClose: () => void;
  language: 'es' | 'en';
}

const CityModal: React.FC<CityModalProps> = ({ city, isOpen, onClose, language }) => {
  if (!city) return null;

  const scheduleText = {
    es: {
      title: 'Horarios de Entrenamiento',
      noSchedule: 'Horarios por confirmar',
      joinButton: 'Sumarme a grupo WhatsApp'
    },
    en: {
      title: 'Training Schedules',
      noSchedule: 'Schedules to be confirmed',
      joinButton: 'Join WhatsApp Group'
    }
  };

  const t = scheduleText[language];

  const handleWhatsAppClick = () => {
    analytics.trackWhatsAppClick('city_modal', city.name, language);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-neutral-900 border border-white/10 rounded-xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={city.imageSrc}
                alt={city.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-t-xl"></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center text-white">
                <MapPin className="h-5 w-5 mr-2 text-[#25d366]" />
                <h3 className="text-xl font-bold">{city.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">{t.title}</h4>

              {city.schedule && city.schedule[language] ? (
                <ul className="space-y-2 mb-6">
                  {city.schedule[language].map((time, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-[#25d366] rounded-full mr-3"></span>
                      {time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 mb-6">{t.noSchedule}</p>
              )}

              {city.whatsappLink && (
                <a
                  href={city.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25d366] hover:bg-[#20c55e] text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t.joinButton}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CityCommunitySection: React.FC<CityCommunitySectionProps> = ({ sectionTitle, sectionSubtitle, cities, language }) => {
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCityClick = (city: CityInfo) => {
    analytics.trackCitySelection(city.name, language);
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  return (
    <>
      <section id="city-community" className="bg-black">
        <div className="text-center py-16 md:py-24 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{sectionTitle}</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">{sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <div
              key={city.id}
              onClick={() => handleCityClick(city)}
              className="relative group cursor-pointer overflow-hidden"
            >
              <img
                src={city.imageSrc}
                alt={city.name}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              {/* 10% white overlay */}
              <div className="absolute inset-0 bg-white/10 transition-opacity duration-300 group-hover:bg-white/20"></div>

              {/* City name with location icon */}
              <div className="absolute bottom-4 left-4 flex items-center text-white">
                <MapPin className="h-5 w-5 mr-2 text-[#25d366]" />
                <span className="text-lg font-semibold drop-shadow-lg">{city.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CityModal
        city={selectedCity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        language={language}
      />
    </>
  );
};

export default CityCommunitySection;
