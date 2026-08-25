"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function GlassFilter() {
  return (
    <svg
      className="pointer-events-none fixed -top-[9999px] -left-[9999px] h-0 w-0 opacity-0"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="container-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />

          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />

          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />

          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />

          {/* Output the result */}
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

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
          "border border-black/10 dark:border-white/15 bg-white/70 dark:bg-zinc-850/70 hover:bg-white dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 backdrop-blur-md hover:border-blue-500/30",
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

export const liquidbuttonVariants = cva(
  "inline-flex items-center transition-all justify-center cursor-pointer gap-2 whitespace-nowrap rounded-2xl text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
  {
    variants: {
      variant: {
        default:
          "bg-white/40 dark:bg-zinc-800/40 text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-[1.03] active:scale-[0.98] duration-200 border border-white/60 dark:border-white/10 backdrop-blur-xl",
        primary:
          "bg-blue-600/90 text-white hover:bg-blue-500 hover:scale-[1.03] active:scale-[0.98] duration-200 border border-blue-400/40 shadow-[0_0_16px_rgba(59,130,246,0.3)] backdrop-blur-xl",
        destructive:
          "bg-rose-600/90 text-white hover:bg-rose-500 hover:scale-[1.03] active:scale-[0.98] duration-200 border border-rose-400/40 shadow-[0_0_16px_rgba(244,63,94,0.3)] backdrop-blur-xl",
        outline:
          "border border-black/10 dark:border-white/15 bg-white/30 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.03] active:scale-[0.98] text-zinc-900 dark:text-zinc-100 backdrop-blur-xl",
        secondary:
          "bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 hover:scale-[1.03] active:scale-[0.98] backdrop-blur-xl",
        ghost:
          "hover:bg-white/40 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-[1.03] active:scale-[0.98] text-zinc-700 dark:text-zinc-300",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 text-xs gap-1.5 px-3.5 has-[>svg]:px-3 rounded-xl",
        lg: "h-11 rounded-2xl px-6 has-[>svg]:px-4 text-sm font-semibold",
        xl: "h-12 rounded-2xl px-8 has-[>svg]:px-6 text-base font-semibold",
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
        className={cn(
          "group relative isolate overflow-hidden select-none",
          liquidbuttonVariants({ variant, size, className })
        )}
        {...props}
      >
        {/* Specular Liquid Ambient Glow & Inset Reflections */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-all duration-300
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.06),inset_2px_2px_1px_-1px_rgba(255,255,255,0.9),inset_-2px_-2px_1px_-1px_rgba(0,0,0,0.08),inset_0_0_6px_rgba(0,0,0,0.04),0_0_12px_rgba(255,255,255,0.2)]
            group-hover:shadow-[0_0_14px_rgba(59,130,246,0.25),0_4px_12px_rgba(0,0,0,0.08),inset_2px_2px_1px_-1px_rgba(255,255,255,1),inset_-2px_-2px_1px_-1px_rgba(0,0,0,0.12),inset_0_0_8px_rgba(59,130,246,0.15),0_0_16px_rgba(255,255,255,0.4)]
            dark:shadow-[0_0_8px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.5),inset_2px_2px_1px_-1px_rgba(255,255,255,0.25),inset_-2px_-2px_1px_-1px_rgba(0,0,0,0.7),inset_0_0_6px_rgba(255,255,255,0.08),0_0_12px_rgba(0,0,0,0.3)]
            dark:group-hover:shadow-[0_0_16px_rgba(59,130,246,0.4),0_4px_16px_rgba(0,0,0,0.7),inset_2px_2px_1px_-1px_rgba(255,255,255,0.45),inset_-2px_-2px_1px_-1px_rgba(0,0,0,0.9),inset_0_0_10px_rgba(59,130,246,0.25),0_0_20px_rgba(59,130,246,0.2)]"
        />

        {/* Liquid Glass Distortion Layer — pure CSS backdrop-blur to avoid SVG filter compositing region overflow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] overflow-hidden opacity-90 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-xl"
        />

        {/* Ambient illumination beam on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-full z-0 bg-gradient-to-tr from-transparent via-white/15 dark:via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Interactive Content */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>
      </Comp>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

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
}

const metalColorVariants: Record<
  ColorVariant,
  {
    outer: string;
    inner: string;
    button: string;
    textColor: string;
    textShadow: string;
  }
> = {
  default: {
    outer: "bg-gradient-to-b from-[#27272a] to-[#71717a] dark:from-[#3f3f46] dark:to-[#18181b]",
    inner: "bg-gradient-to-b from-[#ffffff] via-[#e4e4e7] to-[#d4d4d8] dark:from-[#27272a] dark:via-[#18181b] dark:to-[#09090b]",
    button: "bg-gradient-to-b from-[#f4f4f5] to-[#e4e4e7] dark:from-[#27272a] dark:to-[#18181b]",
    textColor: "text-zinc-900 dark:text-zinc-100",
    textShadow: "[text-shadow:_0_1px_1px_rgba(255,255,255,0.8)] dark:[text-shadow:_0_-1px_1px_rgba(0,0,0,0.8)]",
  },
  primary: {
    outer: "bg-gradient-to-b from-[#1e40af] to-[#60a5fa] dark:from-[#1e3a8a] dark:to-[#3b82f6]",
    inner: "bg-gradient-to-b from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",
    button: "bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgba(15,23,42,0.8)]",
  },
  success: {
    outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner: "bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857]",
    button: "bg-gradient-to-b from-[#10b981] to-[#047857]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgba(6,78,59,0.8)]",
  },
  error: {
    outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner: "bg-gradient-to-b from-[#f43f5e] via-[#e11d48] to-[#be123c]",
    button: "bg-gradient-to-b from-[#f43f5e] to-[#be123c]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgba(136,19,55,0.8)]",
  },
  gold: {
    outer: "bg-gradient-to-b from-[#917100] to-[#EAD98F]",
    inner: "bg-gradient-to-b from-[#f59e0b] via-[#d97706] to-[#b45309]",
    button: "bg-gradient-to-b from-[#fbbf24] to-[#d97706]",
    textColor: "text-amber-950 font-bold",
    textShadow: "[text-shadow:_0_1px_1px_rgba(255,255,255,0.6)]",
  },
  bronze: {
    outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]",
    inner: "bg-gradient-to-b from-[#b45309] via-[#92400e] to-[#78350f]",
    button: "bg-gradient-to-b from-[#d97706] to-[#92400e]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgba(69,26,3,0.8)]",
  },
};

export const MetalButton = React.forwardRef<
  HTMLButtonElement,
  MetalButtonProps
>(({ children, className, variant = "primary", size = "default", ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const colors = metalColorVariants[variant];
  const transitionStyle = "all 200ms cubic-bezier(0.16, 1, 0.3, 1)";

  const sizeClasses = {
    sm: "h-8 px-3.5 text-xs rounded-lg",
    default: "h-10 px-5 text-sm rounded-xl",
    lg: "h-11 px-7 text-sm font-semibold rounded-2xl",
    xl: "h-12 px-8 text-base font-semibold rounded-2xl",
  }[size];

  return (
    <div
      className={cn(
        "relative inline-flex transform-gpu rounded-2xl p-[1.25px] select-none",
        colors.outer
      )}
      style={{
        transform: isPressed
          ? "translateY(1.5px) scale(0.985)"
          : isHovered && !isTouchDevice
          ? "translateY(-1px) scale(1.01)"
          : "translateY(0) scale(1)",
        boxShadow: isPressed
          ? "0 1px 2px rgba(0, 0, 0, 0.2)"
          : isHovered && !isTouchDevice
          ? "0 8px 20px rgba(37, 99, 235, 0.25), 0 2px 6px rgba(0, 0, 0, 0.1)"
          : "0 3px 8px rgba(0, 0, 0, 0.12)",
        transition: transitionStyle,
      }}
    >
      <div
        className={cn(
          "absolute inset-[1px] transform-gpu rounded-[inherit]",
          colors.inner
        )}
        style={{
          transition: transitionStyle,
          filter:
            isHovered && !isPressed && !isTouchDevice
              ? "brightness(1.08)"
              : "none",
        }}
      />
      <button
        ref={ref}
        className={cn(
          "relative z-10 m-[1px] inline-flex items-center justify-center gap-2 transform-gpu cursor-pointer overflow-hidden leading-none font-medium outline-none transition-all",
          sizeClasses,
          colors.button,
          colors.textColor,
          colors.textShadow,
          className
        )}
        style={{
          transition: transitionStyle,
        }}
        {...props}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => {
          setIsPressed(false);
          setIsHovered(false);
        }}
        onMouseEnter={() => {
          if (!isTouchDevice) setIsHovered(true);
        }}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
      >
        {/* Specular Shine Sweep on Press / Hover */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300",
            isPressed || isHovered ? "opacity-30" : "opacity-0"
          )}
        >
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse" />
        </div>

        {children}
      </button>
    </div>
  );
});

MetalButton.displayName = "MetalButton";
