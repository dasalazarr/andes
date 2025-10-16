import type { Language } from '@/data/content';

const LABEL_DICTIONARY: Record<string, { es: string; en: string }> = {
  training: { es: 'Entrenamiento', en: 'Training' },
  nutrition: { es: 'Nutrición', en: 'Nutrition' },
  injuries: { es: 'Lesiones', en: 'Injuries' },
  grit: { es: 'Historias GRIT', en: 'GRIT Stories' },
  routes: { es: 'Rutas', en: 'Routes' },
  guides: { es: 'Guías', en: 'Guides' },
};

const normalize = (value?: string) => (value || '').toLowerCase();

export const getCategoryLabel = (lang: Language, raw?: string) => {
  const key = normalize(raw);
  if (!key) return lang === 'es' ? 'General' : 'General';
  const entry = LABEL_DICTIONARY[key];
  if (entry) return lang === 'es' ? entry.es : entry.en;
  return raw ?? key;
};
