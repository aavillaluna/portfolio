"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Suit = "spade" | "heart" | "diamond" | "club";

function SuitIcon({ suit, className }: { suit: Suit; className?: string }) {
  switch (suit) {
    case "heart":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <path
            d="M32 56s-20-12.6-27-25C-1.3 18.4 6.6 6 19.4 8.2c5.2.9 9 4.6 12.6 9.4 3.6-4.8 7.4-8.5 12.6-9.4C57.4 6 65.3 18.4 59 31c-7 12.4-27 25-27 25z"
            fill="currentColor"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <path d="M32 4 60 32 32 60 4 32 32 4z" fill="currentColor" />
        </svg>
      );
    case "club":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <path
            d="M32 12c6.2-8.6 20-4.3 19.5 6.8-.4 8.6-10.4 11.7-16.7 7.1 3.1 8.7 14.9 6.7 16.8 16.5 1.3 6.9-4.2 13.5-11.2 13.6-3.7 0-6.7-1.7-8.4-4.2-.7 5.1 1.1 8.8 2.9 12H27.1c1.8-3.2 3.6-6.9 2.9-12-1.7 2.5-4.7 4.2-8.4 4.2-7-.1-12.5-6.7-11.2-13.6 1.9-9.8 13.7-7.8 16.8-16.5-6.3 4.6-16.3 1.5-16.7-7.1C10 7.7 23.8 3.4 30 12c.7 1 1.3 2 2 3.1.7-1.1 1.3-2.1 2-3.1z"
            fill="currentColor"
          />
        </svg>
      );
    case "spade":
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <path
            d="M32 4C20 16 10 24.8 10 36.4c0 7.7 6.2 12.8 13.4 12.8 3.9 0 7.2-1.5 9.2-3.8-1.1 4.4-3.9 8.5-6.5 12.6h12.8c-2.6-4.1-5.4-8.2-6.5-12.6 2 2.3 5.3 3.8 9.2 3.8 7.2 0 13.4-5.1 13.4-12.8C54 24.8 44 16 32 4z"
            fill="currentColor"
          />
          <path d="M28 58h8l-1.2-6.5h-5.6L28 58z" fill="currentColor" />
        </svg>
      );
  }
}

function CardBack({
  title,
  subtitle,
  suit,
  accent
}: {
  title: string;
  subtitle?: string;
  suit: Suit;
  accent: string;
}) {
  const value = title.toLowerCase().includes("althea")
    ? "A"
    : title.trim().charAt(0).toUpperCase();

  return (
    <div className="paper-surface h-full w-full rounded-[1.25rem] overflow-hidden relative">
      <div className="absolute inset-3 rounded-[1rem] border border-[rgba(18,18,18,0.10)]" />

      <div className="absolute left-4 top-4 flex flex-col items-start gap-1">
        <div className="font-serif text-lg leading-none" style={{ color: accent }}>
          {value}
        </div>
        <SuitIcon suit={suit} className="h-5 w-5" />
      </div>

      <div className="absolute right-4 bottom-4 flex flex-col items-start gap-1 rotate-180">
        <div className="font-serif text-lg leading-none" style={{ color: accent }}>
          {value}
        </div>
        <SuitIcon suit={suit} className="h-5 w-5" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="opacity-[0.14]" style={{ color: accent }}>
          <SuitIcon suit={suit} className="h-44 w-44 sm:h-52 sm:w-52" />
        </div>
      </div>

      <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6">
        <div className="script-accent text-3xl sm:text-4xl" style={{ color: accent }}>
          Flip side
        </div>
        <div className="mt-2 font-serif text-2xl sm:text-3xl text-poster-ink">
          {title}
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.22em] opacity-70">
          {subtitle ?? "Tap to flip back"}
        </div>
      </div>
    </div>
  );
}

export default function FlipCard({
  frontImage,
  frontAlt,
  backTitle,
  backSubtitle,
  suit = "spade",
  accent = "#d98f9b",
  className,
  onInteract
}: {
  frontImage: string;
  frontAlt: string;
  backTitle: string;
  backSubtitle?: string;
  suit?: Suit;
  accent?: string;
  className?: string;
  onInteract?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const tiltXSpring = useSpring(tiltX, {
    stiffness: reduceMotion ? 0 : 220,
    damping: 18
  });
  const tiltYSpring = useSpring(tiltY, {
    stiffness: reduceMotion ? 0 : 220,
    damping: 18
  });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    tiltX.set(-py * 10);
    tiltY.set(px * 12);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const toggleFlip = () => {
    onInteract?.();
    setFlipped((v) => !v);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onPointerDown={() => onInteract?.()}
      onClick={toggleFlip}
      onKeyDown={onKeyDown}
      onMouseMove={onMouseMove}
      onMouseLeave={resetTilt}
      className={cn(
        "relative h-full w-full rounded-[1.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(18,18,18,0.25)]",
        className
      )}
      style={{
        transformPerspective: 1100,
        rotateX: tiltXSpring,
        rotateY: tiltYSpring
      }}
      aria-label={`Flip card: ${backTitle}`}
    >
      <motion.div
        className="relative h-full w-full preserve-3d rounded-[1.25rem]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 280, damping: 22 }
        }
      >
        <div className="absolute inset-0 backface-hidden rounded-[1.25rem] overflow-hidden">
          <div className="absolute inset-0 rounded-[1.25rem] shadow-paperSm" />
          <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden">
            <Image
              src={frontImage}
              alt={frontAlt}
              fill
              sizes="(max-width: 768px) 220px, 260px"
              className="object-contain select-none"
              draggable={false}
            />
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rounded-[1.25rem] overflow-hidden [transform:rotateY(180deg)]">
          <div className="absolute inset-0 rounded-[1.25rem] shadow-paperSm" />
          <CardBack title={backTitle} subtitle={backSubtitle} suit={suit} accent={accent} />
        </div>
      </motion.div>
    </motion.button>
  );
}
