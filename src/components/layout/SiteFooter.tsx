import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  { key: '', labelEs: 'Blog', labelEn: 'Blog' },
  { key: 'guides', labelEs: 'Guías', labelEn: 'Guides' },
  { key: 'grit', labelEs: 'Historias GRIT', labelEn: 'GRIT Stories' },
  { key: 'injuries', labelEs: 'Lesiones', labelEn: 'Injuries' },
  { key: 'nutrition', labelEs: 'Nutrición', labelEn: 'Nutrition' },
  { key: 'calendar', labelEs: 'Calendario de Carreras', labelEn: 'Race Calendar' },
];

const SiteFooter: React.FC = () => {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith('/es');
  const base = isEs ? '/es/blog' : '/blog';
  const legalBase = isEs ? '/es' : '';
  const privacyPath = `${legalBase}/privacy`;
  const termsPath = `${legalBase}/terms`;
  const privacyLabel = isEs ? 'Política de Privacidad' : 'Privacy Policy';
  const termsLabel = isEs ? 'Términos de Servicio' : 'Terms of Service';
  const disclosureText = isEs
    ? 'Servicio de coaching deportivo potenciado por inteligencia artificial. Tus datos no se utilizan para entrenar modelos de AI.'
    : 'Sports coaching service powered by artificial intelligence. Your data is not used to train AI models.';

  return (
    <footer className="bg-black text-white py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Andes Runners</h4>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Andes Runners</p>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm">
            {categories.map((c) => {
              const label = isEs ? c.labelEs : c.labelEn;
              const href = c.key ? `${base}?cat=${c.key}` : base;
              return (
                <Link key={c.key || 'all'} className="text-gray-300 hover:text-[#25d366]" to={href}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-gray-400 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link className="text-gray-300 hover:text-[#25d366]" to={privacyPath}>
              {privacyLabel}
            </Link>
            <span className="text-gray-600">|</span>
            <Link className="text-gray-300 hover:text-[#25d366]" to={termsPath}>
              {termsLabel}
            </Link>
          </div>
          <p className="text-xs text-gray-500">{disclosureText}</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
