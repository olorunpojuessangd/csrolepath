"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// GlassFilter kept for backward compatibility (unused in rendering)
export function GlassFilter() {
  return (
    <svg
      className="pointer-events-none fixed -top-[9999px] -left-[9999px] h-0 w-0 opacity-0"
      aria-hidden="true"
    >
      <defs>
        <filter id="container-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// ─── Base Button (shadcn pattern) ─────────────────────────────────────────────
export const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-[0.98]",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-500/20 active:scale-[0.98]",
        cool:
          "bg-gradient-to-t from-blue-600 to-blue-500 text-white border border-b-2 border-blue-950/30 shadow-md shadow-blue-500/20 ring-1 ring-inset ring-white/25 hover:brightness-110 active:brightness-95 dark:border-blue-400/40 dark:ring-white/10 active:scale-[0.98]",
        outline:
          "border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-blue-500/30",
        secondary:
          "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700",
        ghost:
          "hover:bg-black/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-7 text-sm font-semibold",
        xl: "h-12 rounded-2xl px-8 text-base font-semibold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// ─── LiquidButton — clean modern style (less glass, more substance) ───────────
export const liquidbuttonVariants = cva(
  "inline-flex items-center transition-all justify-center cursor-pointer gap-2 whitespace-nowrap rounded-xl text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm duration-150",
        primary:
          "bg-blue-600 text-white hover:bg-blue-500 border border-blue-700 dark:border-blue-500 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 duration-150",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-500 border border-rose-700 shadow-md shadow-rose-500/20 duration-150",
        outline:
          "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 text-zinc-900 dark:text-zinc-100 duration-150",
        secondary:
          "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 duration-150",
        ghost:
          "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 text-zinc-600 dark:text-zinc-300 duration-150",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 text-xs gap-1.5 px-3.5 has-[>svg]:px-3 rounded-lg",
        lg: "h-11 rounded-xl px-6 has-[>svg]:px-4 text-sm font-semibold",
        xl: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base font-semibold",
        xxl: "h-14 rounded-2xl px-10 has-[>svg]:px-8 text-base font-semibold",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="liquid-button"
        className={cn(liquidbuttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

// ─── MetalButton — clean, modern CTA (no chrome bevel, solid + gradient) ─────
export type ColorVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze";

export interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
  size?: "sm" | "default" | "lg" | "xl";
  disabled?: boolean;
}

const metaVariants: Record<
  ColorVariant,
  { base: string; hover: string; shadow: string; text: string }
> = {
  default: {
    base: "bg-zinc-900 dark:bg-zinc-100",
    hover: "hover:bg-zinc-700 dark:hover:bg-zinc-200",
    shadow: "shadow-md shadow-zinc-900/20 dark:shadow-zinc-100/10",
    text: "text-white dark:text-zinc-900",
  },
  primary: {
    base: "bg-blue-600",
    hover: "hover:bg-blue-500",
    shadow: "shadow-md shadow-blue-500/25",
    text: "text-white",
  },
  success: {
    base: "bg-emerald-600",
    hover: "hover:bg-emerald-500",
    shadow: "shadow-md shadow-emerald-500/25",
    text: "text-white",
  },
  error: {
    base: "bg-rose-600",
    hover: "hover:bg-rose-500",
    shadow: "shadow-md shadow-rose-500/25",
    text: "text-white",
  },
  gold: {
    base: "bg-amber-500",
    hover: "hover:bg-amber-400",
    shadow: "shadow-md shadow-amber-500/25",
    text: "text-amber-950 font-bold",
  },
  bronze: {
    base: "bg-orange-700",
    hover: "hover:bg-orange-600",
    shadow: "shadow-md shadow-orange-700/25",
    text: "text-white",
  },
};

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ children, className, variant = "primary", size = "default", disabled, ...props }, ref) => {
    const v = metaVariants[variant];

    const sizeClasses = {
      sm: "h-8 px-3.5 text-xs rounded-lg gap-1.5",
      default: "h-10 px-5 text-sm rounded-xl gap-2",
      lg: "h-11 px-7 text-sm font-semibold rounded-xl gap-2",
      xl: "h-12 px-8 text-base font-semibold rounded-2xl gap-2.5",
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium cursor-pointer",
          "transition-all duration-150 active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
          "disabled:pointer-events-none disabled:opacity-50",
          v.base,
          v.hover,
          v.shadow,
          v.text,
          sizeClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
MetalButton.displayName = "MetalButton";
