import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Bookmark, BookmarkCheck, CheckSquare, Square, ArrowRight } from 'lucide-react';
import { Role } from '../../types/role';
import { Badge } from '../common/Badge';

interface RoleCardProps {
  role: Role;
  isSaved: boolean;
  isSelectedForCompare: boolean;
  onToggleSave: (roleId: string, e: React.MouseEvent) => void;
  onToggleCompare: (roleId: string, e: React.MouseEvent) => void;
  index?: number;
  isTopMatch?: boolean;
}

export function RoleCard({
  role,
  isSaved,
  isSelectedForCompare,
  onToggleSave,
  onToggleCompare,
  isTopMatch = false,
}: RoleCardProps) {
  const navigate = useNavigate();
  const isBeginner = role.bestFor.some(bf => 
    bf.toLowerCase().includes('first-year') || bf.toLowerCase().includes('beginner')
  );

  return (
    <div
      onClick={() => navigate(`/role/${role.id}`)}
      className={`rounded-2xl border shadow-md hover:shadow-xl bg-neutral-50/90 dark:bg-neutral-900/90 border-white/80 dark:border-neutral-700/80 overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] cursor-pointer flex flex-col justify-between group relative backdrop-blur-xl ${
        isTopMatch
          ? 'ring-1 ring-blue-500/30 border-blue-500/30 dark:border-blue-400/30'
          : ''
      } ${
        isSelectedForCompare 
          ? 'ring-2 ring-blue-500 border-blue-500/80 shadow-[0_0_24px_rgba(59,130,246,0.25)]' 
          : 'hover:border-blue-500/40 dark:hover:border-blue-400/40'
      }`}
    >
      {/* Specular Ambient Glow Overlay */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-blue-500/[0.03] via-white/10 to-transparent -z-10"
      />

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Header: Category, Top Match & Action Buttons */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              {isTopMatch && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                  ★ Top Match
                </span>
              )}
              <Badge variant="default">{role.category}</Badge>
              {isBeginner && <Badge variant="success">Beginner Friendly</Badge>}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => onToggleSave(role.id, e)}
                className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSaved
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs'
                    : 'text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title={isSaved ? "Remove from saved" : "Save role"}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={(e) => onToggleCompare(role.id, e)}
                className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelectedForCompare
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title={isSelectedForCompare ? "Remove from compare" : "Select for compare"}
              >
                {isSelectedForCompare ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Role Title & Commitment */}
          <h2 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {role.title}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-3.5 font-normal">
            <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span>{role.timeCommitment}</span>
            <span>·</span>
            <span>{role.department.split('/')[0]}</span>
          </div>

          {/* Role Description */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-4 font-normal">
            {role.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {role.skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="default">{skill}</Badge>
            ))}
          </div>
        </div>

        {/* Card Footer Metadata */}
        <div className="pt-3 border-t border-black/5 dark:border-neutral-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            <span className="truncate text-[11px]">{role.hiringCycle.split('·')[0]}</span>
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            {role.prerequisiteChecklist.length} prereq{role.prerequisiteChecklist.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Full-Width Footer Strip */}
      <div className="px-5 sm:px-6 py-3 bg-zinc-100/90 dark:bg-zinc-850/90 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-end group-hover:bg-blue-50/80 dark:group-hover:bg-blue-950/30 transition-colors">
        <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
