import React from 'react';
import { CheckCircle2, Circle, Check, Sparkles } from 'lucide-react';
import { PrereqCheckItem } from '../../types/role';

interface PrereqChecklistProps {
  items: PrereqCheckItem[];
  checkedIds: string[];
  onToggleCheck: (id: string) => void;
}

export function PrereqChecklist({ items, checkedIds, onToggleCheck }: PrereqChecklistProps) {
  const total = items.length;
  const completed = checkedIds.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 100;
  const isComplete = total > 0 && completed === total;

  return (
    <div className="liquid-card rounded-3xl p-6 sm:p-7 border border-black/5 dark:border-white/10 specular-highlight shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Prerequisite Readiness Checklist
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Check off your qualifications to gauge your readiness.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            {completed} / {total}
          </span>
          <span className="text-[10px] text-zinc-400 block font-mono">
            {percentage}% Ready
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-black/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/10 shadow-inner mb-5">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.4)]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Items */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => onToggleCheck(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3 select-none active:scale-[0.99] ${
                isChecked
                  ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500/40 text-zinc-900 dark:text-zinc-100 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                  : 'bg-white/60 dark:bg-zinc-900/60 border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/25 hover:shadow-xs'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isChecked ? (
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                ) : (
                  <Circle className="w-4 h-4 text-zinc-400" />
                )}
              </div>
              <div className="flex-1 text-xs leading-relaxed">
                <span className={isChecked ? 'font-semibold text-blue-900 dark:text-blue-200' : ''}>{item.label}</span>
                {item.courseCode && (
                  <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-semibold border border-blue-500/20">
                    {item.courseCode}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div
          className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2.5 shadow-xs transition-all"
        >
          <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0 animate-bounce" />
          <span>
            <strong>Prerequisite criteria fulfilled!</strong> You're an excellent candidate for this labor position.
          </span>
        </div>
      )}
    </div>
  );
}
