import React from 'react';
import { BrandWordmark } from '../common/BrandWordmark';

export function Footer() {
  return (
    <footer className="w-full border-t border-black/5 dark:border-white/5 py-8 mt-auto">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <BrandWordmark size="sm" />
          <span>·</span>
          <span>Berea College Human-Centered Computing</span>
        </div>

        <div>
          <a
            href="https://www.linkedin.com/in/david-olorunpoju-essang-208748228/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            Built by David Olorunpoju-Essang
          </a>
        </div>
      </div>
    </footer>
  );
}
