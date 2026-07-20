import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import analytics from '@/utils/analytics';

interface NavSection {
  id: string;
  label: string;
}

const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isEs = pathname.startsWith('/es') || pathname.startsWith('/embajadores');
  const lang = isEs ? 'es' : 'en';
  const homePath = pathname.startsWith('/es') ? '/es' : '/';
  const isHome = pathname === '/' || pathname === '/es';
  const blogPath = homePath === '/es' ? '/es/blog' : '/blog';
  const ambassadorsPath = homePath === '/es' ? '/es/embajadores' : '/embajadores';

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
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setActiveSection(navSections[0]?.id ?? 'hero');
  }, [navSections]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Only show the header near the top; relaxed threshold avoids mobile bounce flicker.
      setIsHidden(currentY > 10);
      setIsElevated(currentY > 0);

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

  const isAmbassadorsActive = pathname.includes('/embajadores');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${isHidden && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      <div
        className={`transition-colors duration-300 ${isMobileMenuOpen || isElevated ? 'border-b border-white/5 bg-surface/90 backdrop-blur-md' : ''
          }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm text-white sm:h-20 sm:justify-start sm:gap-6 sm:px-8">
          <Link
            to={homePath}
            className="group relative inline-flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-brand/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></span>
            <span className="relative flex items-center gap-2">
              <img src="/path2.svg" alt="Andes" className="h-6 w-auto" />
            </span>
          </Link>

          <span className="hidden h-6 w-px bg-white/20 sm:block" aria-hidden="true"></span>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center gap-6 text-base sm:flex">
            {navSections.map((section) => {
              const isActive = isHome && activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goToSection(section.id)}
                  className={`relative px-1 py-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/75 hover:text-white'
                    } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-brand after:to-transparent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : ''
                    }`}
                >
                  {section.label}
                </button>
              );
            })}
            <Link
              to={ambassadorsPath}
              onClick={handleAmbassadorsClick}
              className={`relative px-1 py-1 transition-colors duration-200 ${isAmbassadorsActive ? 'text-brand' : 'text-white/75 hover:text-white'
                } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-brand after:to-transparent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${isAmbassadorsActive ? 'after:scale-x-100' : ''
                }`}
            >
              {isEs ? 'Embajadores' : 'Ambassadors'}
            </Link>
          </nav>

          {/* Desktop Blog Button */}
          <Link
            to={blogPath}
            onClick={handleBlogClick}
            className="group relative hidden shrink-0 items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/30 sm:inline-flex"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full border border-brand/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></span>
            <span className="relative">{isEs ? 'Ver blog' : 'Blog'}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-white backdrop-blur-sm transition-colors hover:bg-surface/70 sm:hidden"
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
            className="absolute inset-x-0 top-16 z-40 flex flex-col items-center gap-6 bg-surface/95 px-6 py-8 text-white backdrop-blur-md sm:hidden"
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <nav className="flex w-full flex-col items-center gap-6 text-lg">
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
