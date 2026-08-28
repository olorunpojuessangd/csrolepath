import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ListFilter,
  X,
  Check,
  Sparkles,
  Compass,
  Clock,
  BookmarkCheck,
  Layers,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { CareerTrack, CareerTrackId } from '../../types/role';
import { playClickSound } from '../../lib/sound';

interface RoleFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTrack: CareerTrackId;
  onTrackChange: (track: CareerTrackId) => void;
  onlyBeginnerFriendly: boolean;
  onToggleBeginner: () => void;
  onlyInternshipAligned: boolean;
  onToggleInternship: () => void;
  onlyLightHours: boolean;
  onToggleLightHours: () => void;
  onlySaved: boolean;
  onToggleSaved: () => void;
  savedCount: number;
  onClearAllFilters: () => void;
}

const TRACKS: CareerTrack[] = [
  { id: 'all', label: 'All Roles', description: 'Explore all 8 student labor positions' },
  { id: 'swe', label: 'Software Engineering', description: 'Frontend, full-stack, and software development' },
  { id: 'ai-data', label: 'AI & Data Science', description: 'Data research, Python analysis, and database architecture' },
  { id: 'systems', label: 'Systems & Hardware', description: 'ITS support, makerspace labs, and infrastructure' },
  { id: 'teaching', label: 'Teaching & Mentoring', description: 'Teaching assistants and peer tutoring' },
  { id: 'ux', label: 'Design & UX', description: 'User experience research and interaction design' },
];

export function RoleFilters({
  searchTerm,
  onSearchChange,
  selectedTrack,
  onTrackChange,
  onlyBeginnerFriendly,
  onToggleBeginner,
  onlyInternshipAligned,
  onToggleInternship,
  onlyLightHours,
  onToggleLightHours,
  onlySaved,
  onToggleSaved,
  savedCount,
  onClearAllFilters,
}: RoleFiltersProps) {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close filter menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setFilterMenuOpen(false);
      }
    }
    if (filterMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterMenuOpen]);

  const activeFilterCount =
    (onlyBeginnerFriendly ? 1 : 0) +
    (onlyInternshipAligned ? 1 : 0) +
    (onlyLightHours ? 1 : 0) +
    (onlySaved ? 1 : 0) +
    (selectedTrack !== 'all' ? 1 : 0);

  const filterOptions = [
    {
      id: 'beginner',
      group: 'Experience Level',
      label: 'Beginner-Friendly',
      desc: 'Roles with zero prior CS prerequisites',
      icon: Sparkles,
      isActive: onlyBeginnerFriendly,
      onToggle: onToggleBeginner,
    },
    {
      id: 'internship',
      group: 'Career Pathway',
      label: 'Internship Trajectory',
      desc: 'Roles bridging directly to tech internships',
      icon: Compass,
      isActive: onlyInternshipAligned,
      onToggle: onToggleInternship,
    },
    {
      id: 'secondary',
      group: 'Commitment & Hours',
      label: 'Secondary Eligible (5 hrs)',
      desc: 'Can hold alongside primary 10 hr contract',
      icon: Clock,
      isActive: onlyLightHours,
      onToggle: onToggleLightHours,
    },
    ...(savedCount > 0
      ? [
          {
            id: 'saved',
            group: 'Bookmarks',
            label: `Saved Roles (${savedCount})`,
            desc: 'View only your bookmarked positions',
            icon: BookmarkCheck,
            isActive: onlySaved,
            onToggle: onToggleSaved,
          },
        ]
      : []),
  ];

  const filteredOptions = filterOptions.filter(
    (opt) =>
      opt.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
      opt.desc.toLowerCase().includes(filterQuery.toLowerCase()) ||
      opt.group.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 mb-8">
      {/* SEGMENTED TRACK NAVIGATOR */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
          {TRACKS.map((track) => {
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onTrackChange(track.id);
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer select-none z-10 ${
                  isSelected
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-white/90 dark:bg-zinc-800/90 shadow-sm border border-blue-500/20'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <span>{track.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH AND INTERACTIVE FILTER CONTROLS */}
      <div className="liquid-card p-5 sm:p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-lg space-y-4">
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by role title, skill (Python, SQL, Figma), or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onSearchChange('');
            }}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full pl-10 pr-10 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-colors shadow-inner"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSearchChange('');
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {/* Main Interactive Filter Dropdown Popover */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setFilterMenuOpen(!filterMenuOpen);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border select-none ${
                activeFilterCount > 0
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25'
                  : 'bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-200 border-black/5 dark:border-white/10 hover:border-blue-500/30 hover:bg-black/[0.05] dark:hover:bg-white/[0.08]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  filterMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Interactive Popover Menu */}
            <AnimatePresence>
              {filterMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-2xl p-2 z-50 overflow-hidden"
                >
                  {/* Search inside filters */}
                  <div className="relative mb-2 px-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Filter criteria..."
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1 scrollbar-none py-1">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              playClickSound();
                              option.onToggle();
                            }}
                            className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                              option.isActive
                                ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                                : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <div className="mt-0.5">
                              <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                  option.isActive
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'border-zinc-300 dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/50'
                                }`}
                              >
                                {option.isActive && <Check className="w-3 h-3" />}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />
                                <span className="text-xs font-semibold truncate">
                                  {option.label}
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-tight">
                                {option.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-xs text-zinc-400">
                        No filters match "{filterQuery}"
                      </div>
                    )}
                  </div>

                  {activeFilterCount > 0 && (
                    <div className="pt-2 mt-1 border-t border-black/5 dark:border-white/10 flex items-center justify-between px-1">
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          onClearAllFilters();
                        }}
                        className="text-[11px] text-rose-500 hover:text-rose-600 dark:text-rose-400 font-semibold cursor-pointer"
                      >
                        Reset all
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active Filter Badges with Animation & Instant Removal */}
          <AnimatePresence mode="popLayout">
            {onlyBeginnerFriendly && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>Beginner-Friendly</span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onToggleBeginner();
                  }}
                  className="hover:opacity-75 p-0.5 cursor-pointer rounded-full"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}

            {onlyInternshipAligned && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs"
              >
                <Compass className="w-3 h-3 text-blue-500" />
                <span>Internship Trajectory</span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onToggleInternship();
                  }}
                  className="hover:opacity-75 p-0.5 cursor-pointer rounded-full"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}

            {onlyLightHours && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs"
              >
                <Clock className="w-3 h-3 text-blue-500" />
                <span>Secondary Eligible (5 hrs)</span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onToggleLightHours();
                  }}
                  className="hover:opacity-75 p-0.5 cursor-pointer rounded-full"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}

            {onlySaved && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs"
              >
                <BookmarkCheck className="w-3 h-3 text-blue-500" />
                <span>Saved Roles</span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onToggleSaved();
                  }}
                  className="hover:opacity-75 p-0.5 cursor-pointer rounded-full"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Clear All Active Filters */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClearAllFilters();
              }}
              className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-medium ml-auto cursor-pointer flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
