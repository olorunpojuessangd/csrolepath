import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { CareerTrack, CareerTrackId } from '../../types/role';

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
  const hasActiveFilters =
    onlyBeginnerFriendly ||
    onlyInternshipAligned ||
    onlyLightHours ||
    onlySaved ||
    searchTerm ||
    selectedTrack !== 'all';

  return (
    <div className="space-y-6 mb-8">
      {/* SEGMENTED TRACK NAVIGATOR */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
          {TRACKS.map((track) => {
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onTrackChange(track.id)}
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

      {/* SEARCH AND QUICK FILTER CHIPS */}
      <div className="liquid-card p-5 sm:p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-lg space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by role title, skill (Python, SQL, Figma), or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Pill Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
          <span className="text-xs text-zinc-400 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Filters:</span>
          </span>

          <button
            type="button"
            onClick={onToggleBeginner}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border ${
              onlyBeginnerFriendly
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                : 'bg-black/[0.02] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 border-black/5 dark:border-white/10 hover:border-blue-500/30'
            }`}
          >
            Beginner-Friendly
          </button>

          <button
            type="button"
            onClick={onToggleInternship}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border ${
              onlyInternshipAligned
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                : 'bg-black/[0.02] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 border-black/5 dark:border-white/10 hover:border-blue-500/30'
            }`}
          >
            Internship Trajectory
          </button>

          <button
            type="button"
            onClick={onToggleLightHours}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border ${
              onlyLightHours
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                : 'bg-black/[0.02] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 border-black/5 dark:border-white/10 hover:border-blue-500/30'
            }`}
          >
            Secondary Eligible (5 hrs)
          </button>

          {savedCount > 0 && (
            <button
              type="button"
              onClick={onToggleSaved}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border ${
                onlySaved
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                  : 'bg-black/[0.02] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 border-black/5 dark:border-white/10 hover:border-blue-500/30'
              }`}
            >
              Saved ({savedCount})
            </button>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAllFilters}
              className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-medium ml-auto cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
