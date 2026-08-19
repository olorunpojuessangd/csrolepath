import { Link, useLocation } from 'react-router';
import { Compass, Home, BookmarkCheck, Scale, Sparkles, ExternalLink } from 'lucide-react';

interface NavigationProps {
  savedCount?: number;
  onOpenSavedDrawer?: () => void;
}

export default function Navigation({ savedCount = 0, onOpenSavedDrawer }: NavigationProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* DESKTOP TOP NAVBAR (hidden on mobile, visible sm and up) */}
      <header className="hidden sm:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Column: Brand Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm leading-tight tracking-tight">CS RolePath</span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase">Berea Student Labor</span>
              </div>
            </Link>
          </div>

          {/* Center Column: Desktop Nav Links (Guaranteed True Center) */}
          <nav className="flex-none flex items-center gap-1 text-sm font-medium">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                pathname === '/'
                  ? 'text-slate-900 font-semibold bg-slate-100/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                pathname.startsWith('/explore') || pathname.startsWith('/role')
                  ? 'text-blue-600 font-semibold bg-blue-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore Roles
            </Link>
            <Link
              to="/compare"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                pathname.startsWith('/compare')
                  ? 'text-blue-600 font-semibold bg-blue-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Compare
            </Link>
            <a
              href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Case Study</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </nav>

          {/* Right Column: Actions (Balances Left Column for Centering) */}
          <div className="flex-1 flex items-center justify-end gap-3">
            {onOpenSavedDrawer && (
              <button
                type="button"
                onClick={onOpenSavedDrawer}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-95 shadow-2xs ${
                  savedCount > 0
                    ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BookmarkCheck className={`w-4 h-4 ${savedCount > 0 ? 'text-white' : 'text-slate-400'}`} />
                <span>My Saved Pathway ({savedCount})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM TAB BAR (visible only on mobile screens) */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 flex items-center justify-around h-16 px-2 shadow-lg">
        {/* Tab 1: Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 active:scale-90 transition-transform ${
            isActive('/') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${isActive('/') ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </Link>

        {/* Tab 2: Explore */}
        <Link
          to="/explore"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 active:scale-90 transition-transform ${
            isActive('/explore') || isActive('/role') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className={`w-5 h-5 ${isActive('/explore') || isActive('/role') ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] font-medium tracking-tight">Explore</span>
        </Link>

        {/* Tab 3: Compare */}
        <Link
          to="/compare"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 active:scale-90 transition-transform ${
            isActive('/compare') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Scale className={`w-5 h-5 ${isActive('/compare') ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] font-medium tracking-tight">Compare</span>
        </Link>

        {/* Tab 4: Saved Drawer */}
        {onOpenSavedDrawer ? (
          <button
            type="button"
            onClick={onOpenSavedDrawer}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-slate-500 hover:text-blue-600 active:scale-90 transition-transform relative"
          >
            <div className="relative">
              <BookmarkCheck className={`w-5 h-5 ${savedCount > 0 ? 'text-blue-600 stroke-[2.25]' : 'stroke-[1.75]'}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                  {savedCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium tracking-tight ${savedCount > 0 ? 'text-blue-600 font-semibold' : ''}`}>Saved</span>
          </button>
        ) : (
          <Link
            to="/explore"
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-slate-500 hover:text-blue-600 active:scale-90 transition-transform"
          >
            <BookmarkCheck className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] font-medium tracking-tight">Saved</span>
          </Link>
        )}
      </nav>
    </>
  );
}
