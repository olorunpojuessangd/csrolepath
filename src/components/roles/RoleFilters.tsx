import React, { useState } from 'react';
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
  ChevronRight
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
  // Filter options tray is hidden by default
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const activeFilterCount =
    (onlyBeginnerFriendly ? 1 : 0) +
    (onlyInternshipAligned ? 1 : 0) +
    (onlyLightHours ? 1 : 0) +
    (onlySaved ? 1 : 0);

  const filterButtons = [
    {
      id: 'beginner',
      label: 'Beginner-Friendly',
      icon: Sparkles,
      isActive: onlyBeginnerFriendly,
      onToggle: onToggleBeginner,
    },
    {
      id: 'internship',
      label: 'Internship Trajectory',
      icon: Compass,
      isActive: onlyInternshipAligned,
      onToggle: onToggleInternship,
    },
    {
      id: 'secondary',
      label: 'Secondary Eligible (5 hrs)',
      icon: Clock,
      isActive: onlyLightHours,
      onToggle: onToggleLightHours,
    },
    ...(savedCount > 0
      ? [
          {
            id: 'saved',
            label: `Saved (${savedCount})`,
            icon: BookmarkCheck,
            isActive: onlySaved,
            onToggle: onToggleSaved,
          },
        ]
      : []),
  ];

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

      {/* SEARCH AND EXPANDABLE HORIZONTAL FILTER TRAY */}
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

        {/* Filter Trigger Button & Horizontal Expanding Tray */}
        <div className="flex items-center gap-2.5 flex-wrap pt-1">
          {/* Main Filter Toggle Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playClickSound();
              setIsTrayOpen(!isTrayOpen);
            }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none border shadow-xs ${
              isTrayOpen || activeFilterCount > 0
                ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/25'
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
            <ChevronRight
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isTrayOpen ? 'rotate-90' : ''
              }`}
            />
          </motion.button>

          {/* Tray Expanding to the Right */}
          <AnimatePresence>
            {isTrayOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-2 flex-wrap"
              >
                {filterButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <motion.button
                      key={btn.id}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        playClickSound();
                        btn.onToggle();
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer select-none border ${
                        btn.isActive
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-500/40 shadow-xs ring-1 ring-blue-500/20'
                          : 'bg-black/[0.02] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border-black/5 dark:border-white/10 hover:border-blue-500/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.07]'
                      }`}
                    >
                      {btn.isActive ? (
                        <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Icon className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                      )}
                      <span>{btn.label}</span>
                    </motion.button>
                  );
                })}

                {/* Reset Button */}
                {activeFilterCount > 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => {
                      playClickSound();
                      onClearAllFilters();
                    }}
                    className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-medium cursor-pointer flex items-center gap-1 py-1.5 px-2.5 rounded-xl hover:bg-rose-500/10 transition-colors select-none ml-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset</span>
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
