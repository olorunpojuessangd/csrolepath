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
      {/* DESKTOP TOP NAVBAR */}
      <header className="hidden sm:block sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D0D5DD]">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex-1 flex items-center justify-start">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-[6px] bg-[#4F46E5] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#0A0E14] text-sm leading-none tracking-tight">CS RolePath</span>
                <span className="text-[10px] font-normal text-[#6B7280] tracking-wide uppercase mt-0.5">Berea Student Labor</span>
              </div>
            </Link>
          </div>

          {/* Center: Nav links */}
          <nav className="flex-none flex items-center gap-1 text-sm font-medium">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                pathname === '/'
                  ? 'text-[#0A0E14] font-semibold bg-[#F3F4F6]'
                  : 'text-[#3D4451] hover:text-[#0A0E14] hover:bg-[#F3F4F6]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                pathname.startsWith('/explore') || pathname.startsWith('/role')
                  ? 'text-[#4F46E5] font-semibold bg-[#EEF0FF]'
                  : 'text-[#3D4451] hover:text-[#0A0E14] hover:bg-[#F3F4F6]'
              }`}
            >
              Explore Roles
            </Link>
            <Link
              to="/compare"
              className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                pathname.startsWith('/compare')
                  ? 'text-[#4F46E5] font-semibold bg-[#EEF0FF]'
                  : 'text-[#3D4451] hover:text-[#0A0E14] hover:bg-[#F3F4F6]'
              }`}
            >
              Compare
            </Link>
            <a
              href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[#6B7280] hover:text-[#0A0E14] hover:bg-[#F3F4F6] rounded-[6px] transition-colors flex items-center gap-1.5"
            >
              <span>Case Study</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#6B7280]" />
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-3">
            {onOpenSavedDrawer && (
              <button
                type="button"
                onClick={onOpenSavedDrawer}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border text-xs font-medium transition-colors ${
                  savedCount > 0
                    ? 'bg-[#EEF0FF] border-[#4F46E5] text-[#4F46E5]'
                    : 'bg-[#FFFFFF] border-[#D0D5DD] text-[#3D4451] hover:bg-[#F3F4F6]'
                }`}
              >
                <BookmarkCheck className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-[#4F46E5]' : 'text-[#6B7280]'}`} />
                <span>My Saved Pathway ({savedCount})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#D0D5DD] flex items-center justify-around h-14 px-2">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 ${
            isActive('/') ? 'text-[#4F46E5] font-medium' : 'text-[#6B7280]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        <Link
          to="/explore"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 ${
            isActive('/explore') || isActive('/role') ? 'text-[#4F46E5] font-medium' : 'text-[#6B7280]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Explore</span>
        </Link>

        <Link
          to="/compare"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 ${
            isActive('/compare') ? 'text-[#4F46E5] font-medium' : 'text-[#6B7280]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Compare</span>
        </Link>

        {onOpenSavedDrawer ? (
          <button
            type="button"
            onClick={onOpenSavedDrawer}
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-[#6B7280] relative"
          >
            <div className="relative">
              <BookmarkCheck className={`w-4 h-4 ${savedCount > 0 ? 'text-[#4F46E5]' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#4F46E5] text-white rounded-full text-[8px] font-semibold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] tracking-tight ${savedCount > 0 ? 'text-[#4F46E5] font-medium' : ''}`}>Saved</span>
          </button>
        ) : (
          <Link
            to="/explore"
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-[#6B7280]"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span className="text-[10px] tracking-tight">Saved</span>
          </Link>
        )}
      </nav>
    </>
  );
}
