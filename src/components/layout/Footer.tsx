import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-black/5 dark:border-white/5 py-8 mt-auto">
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center">
          <span>CS</span>
          <span className="text-[#4F46E5] dark:text-indigo-400 animate-slash-blink font-bold mx-[0.5px]">/</span>
          <span className="wordmark-typewriter">RolePath</span>
        </span>
        <span>·</span>
        <span>Berea College Human-Centered Computing</span>
      </div>
    </footer>
  );
}
