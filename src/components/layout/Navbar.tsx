import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ExternalLink, BookmarkCheck, Compass, GitCompare, BookOpen, Home, Menu, X } from 'lucide-react';
import { AnimatedThemeToggle } from '../ui/AnimatedThemeToggle';

interface NavbarProps {
  savedCount?: number;
  onOpenSavedDrawer?: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative px-3.5 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-150 cursor-pointer outline-none select-none font-medium flex items-center gap-1.5 ${
    isActive
      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-white dark:bg-zinc-800 shadow-sm border border-blue-500/20'
      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
  }`;

export const Navbar: React.FC<NavbarProps> = ({ savedCount = 0, onOpenSavedDrawer }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-[rgba(250,250,250,0.97)] dark:bg-[rgba(9,9,11,0.98)] transition-colors duration-200"
      style={{ isolation: 'isolate' }}
    >
      {/* Desktop: [brand LEFT] [nav CENTERED] [actions RIGHT] */}
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 h-16 hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-4">

        {/* LEFT: Text-only Wordmark Block */}
        <div className="flex items-center justify-start">
          <Link
            to="/"
            className="flex flex-col group cursor-pointer select-none"
          >
            <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white leading-none flex items-center">
              <span>CS</span>
              <span className="text-[#4F46E5] dark:text-indigo-400 animate-slash-blink font-bold mx-[0.5px]">/</span>
              <span className="wordmark-typewriter">RolePath</span>
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 tracking-wider uppercase font-medium mt-1">
              Student Labor
            </span>
          </Link>
        </div>

        {/* CENTER: Navigation pill */}
        <nav
          className="flex items-center gap-0.5 p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10"
          aria-label="Main Navigation"
        >
          <NavLink to="/" end className={navLinkClass}>
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/explore" className={navLinkClass}>
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Roles</span>
          </NavLink>

          <NavLink to="/compare" className={navLinkClass}>
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare</span>
          </NavLink>

          <a
            href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-3.5 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-150 cursor-pointer outline-none select-none font-medium flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study</span>
            <ExternalLink className="w-3 h-3 opacity-50 ml-0.5" />
          </a>
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
      <div className="md:hidden w-full max-w-[1140px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex flex-col group cursor-pointer select-none">
          <span className="text-base font-bold tracking-tight text-zinc-950 dark:text-white leading-none flex items-center">
            <span>CS</span>
            <span className="text-[#4F46E5] dark:text-indigo-400 animate-slash-blink font-bold mx-[0.5px]">/</span>
            <span className="wordmark-typewriter">RolePath</span>
          </span>
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
