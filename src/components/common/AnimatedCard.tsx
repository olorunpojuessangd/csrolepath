import React from "react";

interface AnimatedCardProps {
  imgSrc?: string;
  title: string;
  aboutProduct: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  imgSrc,
  title,
  aboutProduct,
  badge,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl shadow-lg border-white dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${className}`}
    >
      <div className="p-5 flex flex-col items-center text-center">
        {imgSrc && (
          <img
            className="w-24 h-24 object-contain mb-3"
            src={imgSrc}
            alt={`${title} logo`}
          />
        )}
        {badge && (
          <span className="mb-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {badge}
          </span>
        )}
        <div className="space-y-1">
          <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            {aboutProduct}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
