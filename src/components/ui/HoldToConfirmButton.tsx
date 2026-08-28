import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ExternalLink, Check, Sparkles } from "lucide-react";
import { cn } from "./utils";
import { playClickSound } from "../../lib/sound";

export interface HoldToConfirmButtonProps {
  /** Fires exactly once when the hold reaches completion */
  onConfirm: () => void;
  /** How long the button must be held, in milliseconds. Default 1000 */
  duration?: number;
  /** Idle label. Default "Hold for Handshake Search" */
  label?: string;
  /** Label shown after a completed hold. Default "Opening Handshake..." */
  confirmedLabel?: string;
  /** Replaces the default icon */
  icon?: React.ReactNode;
  /** Visual size of the button. Default "md" */
  size?: "sm" | "md" | "lg";
  /** Milliseconds before resetting to idle after confirming; 0 stays confirmed. Default 1800 */
  resetDelay?: number;
  /** Disables pointer and keyboard interaction */
  disabled?: boolean;
  className?: string;
}

type HoldSource = "pointer" | "keyboard";

const SIZES = {
  sm: { button: "h-8 gap-1.5 pl-2 pr-3 text-xs", icon: 12, ring: 20, stroke: 2 },
  md: { button: "h-10 gap-2 pl-2.5 pr-4 text-xs sm:text-sm font-semibold", icon: 14, ring: 22, stroke: 2 },
  lg: { button: "h-12 gap-2.5 pl-3 pr-5 text-sm sm:text-base font-semibold", icon: 16, ring: 26, stroke: 2.5 },
} as const;

const SNAPPY_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const;
const SWAP_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;
const CHECK_POP_SPRING = { type: "spring", stiffness: 500, damping: 22 } as const;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HOLD_SCALE = 0.97;
const HOLD_SCALE_DURATION = 0.2;
const CHECK_DRAW_DELAY = 0.05;
const CHECK_DRAW_DURATION = 0.25;
const LABEL_STAGGER = 0.12;
const RING_RESET_DURATION = 0.3;

const CHECK_PATH = "M20 6 9 17l-5-5";

const labelVariants = {
  enter: (reduce: boolean) => (reduce ? { opacity: 0 } : { y: 6, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (reduce: boolean) =>
    reduce
      ? { opacity: 0, transition: { duration: 0 } }
      : { y: -6, opacity: 0, transition: SWAP_SPRING },
};

export function HoldToConfirmButton({
  onConfirm,
  duration = 900,
  label = "Hold for Handshake Search",
  confirmedLabel = "Opening Handshake...",
  icon,
  size = "md",
  resetDelay = 1800,
  disabled = false,
  className,
}: HoldToConfirmButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const [holding, setHolding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const progress = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmedRef = useRef(false);
  const holdSourcesRef = useRef<Set<HoldSource>>(new Set());

  const { button: sizeClasses, icon: iconSize, ring, stroke } = SIZES[size];
  const radius = (ring - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = useTransform(progress, (p) => circumference * (1 - p));
  const ringOpacity = useTransform(progress, [0, 0.05], [0, 1]);

  const handleComplete = useCallback(() => {
    if (confirmedRef.current) return;
    confirmedRef.current = true;
    holdSourcesRef.current.clear();
    setHolding(false);
    setConfirmed(true);
    playClickSound();
    onConfirm();

    if (resetDelay > 0) {
      resetTimerRef.current = setTimeout(() => {
        setConfirmed(false);
        confirmedRef.current = false;
        animationRef.current?.stop();
        animationRef.current = animate(progress, 0, {
          duration: shouldReduceMotion ? 0.1 : RING_RESET_DURATION,
          ease: "easeOut",
        });
      }, resetDelay);
    }
  }, [onConfirm, progress, resetDelay, shouldReduceMotion]);

  const startHold = useCallback(
    (source: HoldSource) => {
      if (disabled || confirmedRef.current) return;
      const sources = holdSourcesRef.current;
      const alreadyHolding = sources.size > 0;
      sources.add(source);
      if (alreadyHolding) return;
      setHolding(true);
      animationRef.current?.stop();
      animationRef.current = animate(progress, 1, {
        duration: (duration * (1 - progress.get())) / 1000,
        ease: "linear",
        onComplete: handleComplete,
      });
    },
    [disabled, duration, handleComplete, progress],
  );

  const cancelHold = useCallback(
    (source?: HoldSource) => {
      const sources = holdSourcesRef.current;
      if (source) sources.delete(source);
      else sources.clear();
      if (sources.size > 0) return;
      setHolding(false);
      if (confirmedRef.current) return;
      animationRef.current?.stop();
      animationRef.current = animate(
        progress,
        0,
        shouldReduceMotion ? { duration: 0.15, ease: "linear" } : SNAPPY_SPRING,
      );
    },
    [progress, shouldReduceMotion],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {}
      startHold("pointer");
    },
    [startHold],
  );

  const cancelPointerHold = useCallback(() => cancelHold("pointer"), [cancelHold]);
  const cancelAllHolds = useCallback(() => cancelHold(), [cancelHold]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      if (event.repeat) return;
      startHold("keyboard");
    },
    [startHold],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      cancelHold("keyboard");
    },
    [cancelHold],
  );

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-label={`${label}. Press and hold to open Handshake`}
      onPointerDown={handlePointerDown}
      onPointerUp={cancelPointerHold}
      onPointerLeave={cancelPointerHold}
      onPointerCancel={cancelPointerHold}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={cancelAllHolds}
      onContextMenu={(event) => event.preventDefault()}
      animate={{ scale: holding && !shouldReduceMotion ? HOLD_SCALE : 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : holding
            ? { duration: HOLD_SCALE_DURATION, ease: EASE_OUT }
            : SNAPPY_SPRING
      }
      className={cn(
        "relative inline-flex touch-none select-none items-center justify-center rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        "disabled:pointer-events-none disabled:opacity-50",
        confirmed
          ? "border-emerald-500/50 bg-emerald-600 text-white shadow-emerald-500/25 shadow-md"
          : holding
            ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-md ring-2 ring-emerald-500/20"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-500/40 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20",
        sizeClasses,
        className,
      )}
    >
      {/* Progress Ring & Icon */}
      <span
        className="relative inline-flex shrink-0 items-center justify-center text-emerald-600 dark:text-emerald-400"
        style={{ width: ring, height: ring }}
        aria-hidden="true"
      >
        <motion.span
          className="inline-flex items-center justify-center"
          initial={false}
          animate={{
            scale: confirmed ? 0 : 1,
            opacity: confirmed ? 0 : 1,
          }}
          transition={shouldReduceMotion ? { duration: 0 } : SNAPPY_SPRING}
        >
          {icon ?? <ExternalLink size={iconSize} strokeWidth={2.2} className={confirmed ? "text-white" : "text-emerald-600 dark:text-emerald-400"} />}
        </motion.span>

        {/* Success check */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-white"
          initial={false}
          animate={{
            scale: confirmed ? 1 : 0,
            opacity: confirmed ? 1 : 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  ...CHECK_POP_SPRING,
                  delay: confirmed ? CHECK_DRAW_DELAY : 0,
                }
          }
        >
          <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d={CHECK_PATH}
              initial={false}
              animate={{ pathLength: confirmed ? 1 : 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : confirmed
                    ? {
                        duration: CHECK_DRAW_DURATION,
                        ease: EASE_OUT,
                        delay: CHECK_DRAW_DELAY,
                      }
                    : { duration: 0.1 }
              }
            />
          </svg>
        </motion.span>

        {/* Circular Progress Ring */}
        <motion.svg
          viewBox={`0 0 ${ring} ${ring}`}
          width={ring}
          height={ring}
          className="absolute inset-0 -rotate-90 pointer-events-none"
          style={{ opacity: ringOpacity }}
        >
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={stroke}
            className="text-emerald-500"
          />
          <motion.circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
            className="text-emerald-500"
          />
        </motion.svg>
      </span>

      {/* Button Label */}
      <span
        className={cn(
          "relative inline-flex overflow-hidden transition-opacity duration-200 font-medium",
          holding && "opacity-80",
        )}
      >
        <AnimatePresence
          mode="popLayout"
          initial={false}
          custom={shouldReduceMotion ?? false}
        >
          <motion.span
            key={confirmed ? "confirmed" : "idle"}
            className="inline-block whitespace-nowrap"
            custom={shouldReduceMotion ?? false}
            variants={labelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    ...SWAP_SPRING,
                    delay: confirmed ? CHECK_DRAW_DELAY + LABEL_STAGGER : 0,
                  }
            }
          >
            {confirmed ? confirmedLabel : label}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
