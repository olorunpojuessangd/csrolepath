import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ExternalLink, BookmarkCheck, Compass, GitCompare, BookOpen, Home, Menu, X } from 'lucide-react';
import { AnimatedThemeToggle } from '../ui/AnimatedThemeToggle';
import { BrandWordmark } from '../common/BrandWordmark';

interface NavbarProps {
  savedCount?: number;
  onOpenSavedDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ savedCount = 0, onOpenSavedDrawer }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sliding pill indicator tracking
  const navContainerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/explore', label: 'Explore Roles', icon: Compass },
    { to: '/compare', label: 'Compare', icon: GitCompare },
    {
      to: 'https://sites.google.com/view/olorunpojuessangd335/final-blog-post',
      label: 'Case Study',
      icon: BookOpen,
      isExternal: true,
    },
  ];

  const getActiveIndex = () => {
    if (location.pathname === '/') return 0;
    if (location.pathname.startsWith('/explore') || location.pathname.startsWith('/role/')) return 1;
    if (location.pathname.startsWith('/compare')) return 2;
    return null;
  };

  const activeIdx = getActiveIndex();
  const targetIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  useEffect(() => {
    if (targetIdx !== null && itemRefs.current[targetIdx]) {
      const el = itemRefs.current[targetIdx];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setIndicator(prev => ({ ...prev, opacity: 0 }));
    }
  }, [targetIdx, location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-[rgba(250,250,250,0.97)] dark:bg-[rgba(9,9,11,0.98)] transition-colors duration-200"
      style={{ isolation: 'isolate' }}
    >
      {/* Desktop: [brand LEFT] [nav CENTERED with sliding pill] [actions RIGHT] */}
      <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 h-16 hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-4">

        {/* LEFT: Text-only Wordmark Block */}
        <div className="flex items-center justify-start">
          <Link
            to="/"
            className="flex flex-col group cursor-pointer select-none"
          >
            <BrandWordmark size="md" />
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 tracking-wider uppercase font-medium mt-1">
              Student Labor
            </span>
          </Link>
        </div>

        {/* CENTER: Navigation pill with sliding hover cursor */}
        <nav
          ref={navContainerRef}
          onMouseLeave={() => setHoveredIdx(null)}
          className="relative flex items-center gap-0.5 p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10"
          aria-label="Main Navigation"
        >
          {/* Smooth Sliding Pill Indicator */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-blue-500/20 transition-all duration-200 ease-out pointer-events-none"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />

          {navLinks.map((item, idx) => {
            const Icon = item.icon;
            const isItemActive = idx === activeIdx;

            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="relative z-10 px-3.5 py-1.5 text-xs sm:text-sm rounded-full transition-colors duration-150 cursor-pointer outline-none select-none font-medium flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-50 ml-0.5" />
                </a>
              );
            }

            return (
              <NavLink
                key={item.label}
                ref={(el) => { itemRefs.current[idx] = el; }}
                to={item.to}
                end={item.end}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative z-10 px-3.5 py-1.5 text-xs sm:text-sm rounded-full transition-colors duration-150 cursor-pointer outline-none select-none font-medium flex items-center gap-1.5 ${
                  isItemActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT: Saved + Theme toggle */}
        <div className="flex items-center justify-end gap-3">
          {onOpenSavedDrawer && savedCount > 0 && (
            <button
              type="button"
              onClick={onOpenSavedDrawer}
              className="px-3 py-1 text-xs rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span className="font-medium">Saved ({savedCount})</span>
            </button>
          )}
          <AnimatedThemeToggle />
        </div>

      </div>

      {/* Mobile: brand left, actions right */}
      <div className="md:hidden w-full px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex flex-col group cursor-pointer select-none">
          <BrandWordmark size="sm" />
          <span className="text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wider uppercase font-medium mt-0.5">
            Student Labor
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {onOpenSavedDrawer && savedCount > 0 && (
            <button
              type="button"
              onClick={onOpenSavedDrawer}
              className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1 font-medium"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{savedCount}</span>
            </button>
          )}
          <AnimatedThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#09090b] px-4 py-4 space-y-1.5 shadow-xl">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            <Compass className="w-4 h-4" />
            <span>Explore Roles</span>
          </NavLink>

          <NavLink
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare</span>
          </NavLink>

          <a
            href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Case Study</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      )}
    </header>
  );
};
