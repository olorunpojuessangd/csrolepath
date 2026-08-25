import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { playSwitchClickSound } from '../../lib/sound';
import { Moon, Sun } from 'lucide-react';

export const AnimatedThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    try {
      playSwitchClickSound(!isDark);
    } catch (e) {}
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer outline-none transition-all duration-200 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/5 dark:border-white/10 shadow-xs hover:scale-105 active:scale-95"
      title={isDark ? "Dark mode active — Click to switch to Light" : "Light mode active — Click to switch to Dark"}
      aria-label="Toggle light and dark theme"
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] transition-transform duration-200" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-transform duration-200" />
      )}
    </button>
  );
};
