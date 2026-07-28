import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, ChevronDown, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import analytics from '@/utils/analytics';
import { startOnboarding } from '@/lib/onboarding';

interface NavSection {
  id: string;
  label: string;
}

// Selector de ciudad (ref. dropdown "DIEGO" de fortius). Hoy 1 ciudad; listo para escalar
// a /madrid, /bilbao… El eje ciudad es ortogonal al idioma (prefijo /es normal).
const CITIES = [{ slug: 'pamplona', label: 'Pamplona' }];

const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isEs = pathname.startsWith('/es') || pathname.startsWith('/embajadores');
  const lang: 'es' | 'en' = isEs ? 'es' : 'en';
  const homePath = pathname.startsWith('/es') ? '/es' : '/';
  const isHome = pathname === '/' || pathname === '/es';
  const blogPath = homePath === '/es' ? '/es/blog' : '/blog';
  const ambassadorsPath = homePath === '/es' ? '/es/embajadores' : '/embajadores';

  const cityPath = (slug: string) => (homePath === '/es' ? `/es/${slug}` : `/${slug}`);
  const activeCity = CITIES.find((c) => pathname.includes(`/${c.slug}`));

  const navSections = useMemo<NavSection[]>(
    () => [
      { id: 'hero', label: isEs ? 'Inicio' : 'Home' },
      { id: 'club', label: isEs ? 'El club' : 'The club' },
      { id: 'how-it-works', label: isEs ? 'Cómo funciona' : 'How it works' },
      { id: 'pricing', label: isEs ? 'Planes' : 'Plans' },
    ],
    [isEs],
  );

  const [activeSection, setActiveSection] = useState<string>(navSections[0]?.id ?? 'hero');
  const [isElevated, setIsElevated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCtaLoading, setIsCtaLoading] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const cityMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSection(navSections[0]?.id ?? 'hero');
  }, [navSections]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Floating pill stays permanently visible; it just gains a stronger glass on scroll.
      setIsElevated(currentY > 4);

      if (!isHome) return;

      const viewportAnchor = window.innerHeight * 0.2;
      let nextActive = navSections[0]?.id ?? 'hero';

      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (!el) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom >= viewportAnchor) {
          nextActive = section.id;
          break;
        }
        if (rect.top > viewportAnchor) {
          break;
        }
        nextActive = section.id;
      }

      setActiveSection(nextActive);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navSections, isHome]);

  // Close the city dropdown when clicking outside it.
  useEffect(() => {
    if (!isCityMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (cityMenuRef.current && !cityMenuRef.current.contains(e.target as Node)) {
        setIsCityMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isCityMenuOpen]);

  const goToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (isHome) {
      setActiveSection(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Off-home the anchors don't exist: navigate home with a hash that home.tsx resolves on mount.
      navigate(`${homePath}#${id}`);
    }
  };

  const handleBlogClick = () => {
    setIsMobileMenuOpen(false);
    analytics.trackCTAClick('secondary', 'header_nav_blog', lang);
  };

  const handleAmbassadorsClick = () => {
    setIsMobileMenuOpen(false);
    analytics.trackCTAClick('secondary', 'header_nav_ambassadors', lang);
  };

  const handleCityClick = (slug: string) => {
    setIsMobileMenuOpen(false);
    setIsCityMenuOpen(false);
    analytics.trackCTAClick('secondary', `header_city_${slug}`, lang);
  };

  // Permanent conversion CTA — the whole funnel exists to start a WhatsApp conversation.
  const handleStartFree = async () => {
    if (isCtaLoading) return;
    setIsMobileMenuOpen(false);
    setIsCtaLoading(true);
    analytics.trackCTAClick('primary', 'header_start_free', lang);
    analytics.trackWhatsAppClick('cta', undefined, lang);
    try {
      await startOnboarding({ intent: 'free', language: lang, placement: 'sticky' });
    } catch (error) {
      console.error('Header start-free onboarding failed:', error);
    } finally {
      setIsCtaLoading(false);
    }
  };

  const isAmbassadorsActive = pathname.includes('/embajadores');
  const isBlogActive = pathname.includes('/blog');
  const isCityActive = Boolean(activeCity);
  const cityLabel = activeCity?.label ?? 'Pamplona';

  const startFreeLabel = isCtaLoading
    ? isEs ? 'Conectando…' : 'Connecting…'
    : isEs ? 'Empezar gratis' : 'Start free';

  const navLinkClass = (active: boolean) =>
    `relative px-1 py-1 text-sm transition-colors duration-200 ${active ? 'text-brand' : 'text-white/70 hover:text-white'
    } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-brand after:to-transparent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${active ? 'after:scale-x-100' : ''
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-5xl px-3 pt-3 sm:px-4 sm:pt-4">
        {/* Floating glass pill (ref. kinso.ai), adapted to the dark theme */}
        <div
          className={`flex h-14 items-center gap-3 rounded-full border px-3 pl-5 text-sm text-white backdrop-blur-xl transition-colors duration-300 ${
            isElevated || isMobileMenuOpen
              ? 'border-white/10 bg-surface/80 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.75)]'
              : 'border-white/[0.07] bg-surface/50'
          }`}
        >
          <Link
            to={homePath}
            className="group relative inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-brand/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></span>
            <span className="relative flex items-center gap-2">
              <img src="/path2.svg" alt="Andes" className="h-6 w-auto" />
            </span>
          </Link>

          <span className="hidden h-6 w-px bg-white/15 sm:block" aria-hidden="true"></span>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center gap-6 text-base sm:flex">
            {navSections.map((section) => {
              const isActive = isHome && activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goToSection(section.id)}
                  className={navLinkClass(isActive)}
                >
                  {section.label}
                </button>
              );
            })}
            <Link to={ambassadorsPath} onClick={handleAmbassadorsClick} className={navLinkClass(isAmbassadorsActive)}>
              {isEs ? 'Embajadores' : 'Ambassadors'}
            </Link>
            <Link to={blogPath} onClick={handleBlogClick} className={navLinkClass(isBlogActive)}>
              Blog
            </Link>
          </nav>

          {/* City selector (dropdown) + permanent CTA */}
          <div ref={cityMenuRef} className="relative ml-auto hidden shrink-0 sm:block">
            <button
              type="button"
              onClick={() => setIsCityMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isCityMenuOpen}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                isCityActive || isCityMenuOpen
                  ? 'border-brand/50 bg-brand/10 text-white'
                  : 'border-white/15 bg-white/5 text-white/85 hover:border-white/30 hover:text-white'
              }`}
            >
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
              <span>{cityLabel}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCityMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <AnimatePresence>
              {isCityMenuOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 min-w-[200px] rounded-2xl border border-white/10 bg-surface/95 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl"
                >
                  {CITIES.map((city) => {
                    const active = pathname.includes(`/${city.slug}`);
                    return (
                      <Link
                        key={city.slug}
                        to={cityPath(city.slug)}
                        onClick={() => handleCityClick(city.slug)}
                        role="menuitem"
                        className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-150 ${
                          active ? 'bg-white/[0.06] text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                          {city.label}
                        </span>
                        {active && <Check className="h-4 w-4 text-brand" aria-hidden="true" />}
                      </Link>
                    );
                  })}
                  <p className="px-3 pb-1 pt-2 text-[11px] text-white/35">
                    {isEs ? 'Más ciudades pronto' : 'More cities soon'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Permanent conversion CTA (all breakpoints) */}
          <button
            type="button"
            onClick={handleStartFree}
            disabled={isCtaLoading}
            className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-black shadow-[0_6px_18px_rgba(37,211,102,0.35)] transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-70 sm:ml-0 sm:px-5"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
            <span>{startFreeLabel}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 sm:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-20 z-40 mx-3 flex flex-col items-center gap-5 rounded-[28px] border border-white/10 bg-surface px-6 py-8 text-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] sm:hidden"
          >
            <nav className="flex w-full flex-col items-center gap-4 text-lg">
              {navSections.map((section) => {
                const isActive = isHome && activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => goToSection(section.id)}
                    className={`relative w-full py-2 text-center transition-colors duration-200 ${isActive ? 'font-medium text-brand' : 'text-white/75 hover:text-white'
                      }`}
                  >
                    {section.label}
                  </button>
                );
              })}
              <Link
                to={ambassadorsPath}
                onClick={handleAmbassadorsClick}
                className={`relative w-full py-2 text-center transition-colors duration-200 ${isAmbassadorsActive ? 'font-medium text-brand' : 'text-white/75 hover:text-white'
                  }`}
              >
                {isEs ? 'Embajadores' : 'Ambassadors'}
              </Link>
              <Link
                to={blogPath}
                onClick={handleBlogClick}
                className={`relative w-full py-2 text-center transition-colors duration-200 ${isBlogActive ? 'font-medium text-brand' : 'text-white/75 hover:text-white'
                  }`}
              >
                Blog
              </Link>
            </nav>

            {/* City selector (mobile) */}
            <div className="flex w-full flex-col items-center gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{isEs ? 'Ciudad' : 'City'}</p>
              {CITIES.map((city) => {
                const active = pathname.includes(`/${city.slug}`);
                return (
                  <Link
                    key={city.slug}
                    to={cityPath(city.slug)}
                    onClick={() => handleCityClick(city.slug)}
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-base transition-colors duration-200 ${
                      active ? 'border-brand/50 bg-brand/10 text-white' : 'border-white/15 text-white/80 hover:text-white'
                    }`}
                  >
                    <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                    {city.label}
                  </Link>
                );
              })}
            </div>

            <div className="h-px w-12 bg-white/10"></div>

            <button
              type="button"
              onClick={handleStartFree}
              disabled={isCtaLoading}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-3 text-base font-semibold text-black shadow-[0_6px_18px_rgba(37,211,102,0.35)] transition hover:brightness-110 disabled:opacity-70"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              {startFreeLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
