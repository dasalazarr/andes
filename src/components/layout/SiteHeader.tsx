import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import analytics from '@/utils/analytics';

interface NavSection {
  id: string;
  label: string;
}

const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith('/es');
  const lang = isEs ? 'es' : 'en';
  const homePath = isEs ? '/es' : '/';
  const blogPath = isEs ? '/es/blog' : '/blog';

  const navSections = useMemo<NavSection[]>(
    () => [
      { id: 'hero', label: isEs ? 'Inicio' : 'Home' },
      { id: 'benefits', label: isEs ? 'Beneficios' : 'Benefits' },
      { id: 'reviews', label: isEs ? 'Testimonios' : 'Reviews' },
      { id: 'pricing', label: isEs ? 'Planes' : 'Plans' },
      { id: 'articles', label: isEs ? 'Aprender' : 'Learn' },
    ],
    [isEs],
  );

  const [activeSection, setActiveSection] = useState<string>(navSections[0]?.id ?? 'hero');
  const [isElevated, setIsElevated] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setActiveSection(navSections[0]?.id ?? 'hero');
  }, [navSections]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Solo mostrar el header cuando esté en la parte superior (scrollY === 0)
      setIsHidden(currentY > 0);

      setIsElevated(currentY > 0);

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
  }, [navSections]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBlogClick = () => {
    setIsMobileMenuOpen(false);
    analytics.trackCTAClick('secondary', 'header_nav_blog', lang);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${isHidden && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      <div
        className={`transition-colors duration-300 ${isMobileMenuOpen ? 'bg-black/90 backdrop-blur-md' : ''
          }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm text-white sm:h-20 sm:justify-start sm:gap-6 sm:px-8">
          <Link
            to={homePath}
            className="group relative inline-flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[#27e97c]/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></span>
            <span className="relative flex items-center gap-2">
              <img src="/path2.svg" alt="Andes Logo" className="h-6 w-auto" />
            </span>
          </Link>

          <span className="hidden h-6 w-px bg-white/20 sm:block" aria-hidden="true"></span>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center gap-6 text-base sm:flex">
            {navSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.id);
                    scrollToSection(section.id);
                  }}
                  className={`relative px-1 py-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/75 hover:text-white'
                    } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-[#27e97c] after:to-transparent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : ''
                    }`}
                >
                  {section.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Blog Button */}
          <Link
            to={blogPath}
            onClick={handleBlogClick}
            className="group relative hidden shrink-0 items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/30 sm:inline-flex"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full border border-[#27e97c]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></span>
            <span className="relative">{isEs ? 'Ver blog' : 'Blog'}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full text-white sm:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-16 z-40 flex flex-col items-center gap-6 bg-black/95 px-6 py-8 text-white backdrop-blur-md sm:hidden"
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <nav className="flex w-full flex-col items-center gap-6 text-lg">
              {navSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.id);
                      scrollToSection(section.id);
                    }}
                    className={`relative w-full py-2 text-center transition-colors duration-200 ${isActive ? 'text-[#27e97c] font-medium' : 'text-white/75 hover:text-white'
                      }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 h-px w-12 bg-white/10"></div>

            <Link
              to={blogPath}
              onClick={handleBlogClick}
              className="group relative inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/20"
            >
              <span className="relative">{isEs ? 'Ver blog' : 'Blog'}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
