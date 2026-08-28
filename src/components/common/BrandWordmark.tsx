import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandWordmark({ className = '', size = 'md' }: BrandWordmarkProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  }[size];

  const prefixChars = ['C', 'S'];
  const suffixChars = ['R', 'o', 'l', 'e', 'P', 'a', 't', 'h'];

  return (
    <span
      className={`font-bold tracking-tight text-zinc-950 dark:text-white leading-none inline-flex items-center select-none animate-wordmark-load ${sizeClasses} ${className}`}
    >
      {/* "CS" characters with hover ripple */}
      <span className="inline-flex">
        {prefixChars.map((char, index) => (
          <span
            key={index}
            className="inline-block transition-transform animate-char-ripple"
            style={{ animationDelay: `${index * 0.04}s` }}
          >
            {char}
          </span>
        ))}
      </span>

      {/* Indigo "/" slash cursor with terminal blink */}
      <span className="text-[#4F46E5] dark:text-indigo-400 font-bold mx-[0.5px] animate-slash-blink">
        /
      </span>

      {/* "RolePath" characters with staggered hover ripple */}
      <span className="inline-flex">
        {suffixChars.map((char, index) => (
          <span
            key={index}
            className="inline-block transition-transform animate-char-ripple"
            style={{ animationDelay: `${(index + 3) * 0.04}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
