import React from 'react';
import { Link } from 'react-router-dom';
import { X, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { Role } from '../../types/role';
import { Badge } from '../common/Badge';
import { LiquidButton, MetalButton } from '../ui/liquid-glass-button';

interface SavedRolesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedRoles: Role[];
  onRemoveRole: (roleId: string, e: React.MouseEvent) => void;
}

export function SavedRolesDrawer({
  isOpen,
  onClose,
  savedRoles,
  onRemoveRole,
}: SavedRolesDrawerProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-md transition-opacity">
      <div
        onClick={onClose}
        className="absolute inset-0"
      />

      <div
        className="relative z-10 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-2xl w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-black/5 dark:border-white/10 transition-transform duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-xs">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">My Saved Pathway</h2>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{savedRoles.length} bookmarked roles</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3.5">
          {savedRoles.length === 0 ? (
            <div className="text-center py-24 text-zinc-500">
              <div className="w-14 h-14 rounded-3xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/20 shadow-xs">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No saved roles yet</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
                Click the bookmark icon on any role card to save it to your personal pathway.
              </p>
            </div>
          ) : (
            savedRoles.map((role) => (
              <div
                key={role.id}
                className="p-4 rounded-2xl liquid-card border border-black/5 dark:border-white/10 flex flex-col justify-between shadow-xs hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <Badge variant="accent" className="text-[10px] mb-1.5">{role.category}</Badge>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{role.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => onRemoveRole(role.id, e)}
                    className="text-xs text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                  {role.description}
                </p>

                <div className="flex items-center justify-between pt-2.5 border-t border-black/5 dark:border-white/10 text-xs">
                  <Link
                    to={`/role/${role.id}`}
                    onClick={onClose}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{role.timeCommitment}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          {savedRoles.length >= 2 ? (
            <Link
              to={`/compare?roles=${savedRoles.slice(0, 3).map(r => r.id).join(',')}`}
              className="w-full inline-flex items-center justify-center gap-2 h-10 px-5 text-sm rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
              onClick={onClose}
            >
              Compare Saved Roles ({savedRoles.length})
            </Link>
          ) : (
            <LiquidButton
              variant="outline"
              size="default"
              onClick={onClose}
              className="w-full"
            >
              Close Drawer
            </LiquidButton>
          )}

        </div>
      </div>
    </div>
  );
}
