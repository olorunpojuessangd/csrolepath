import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-black/5 dark:border-white/5 py-8 mt-auto">
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">CS RolePath</span>
        <span>·</span>
        <span>Berea College Human-Centered Computing</span>
      </div>
    </footer>
  );
}
