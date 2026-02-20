"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import FlipCard from "@/components/FlipCard";

type DeckCard = {
  id: string;
  title: string;
  image: string;
  alt: string;
  suit: "spade" | "heart" | "diamond" | "club";
  accent: string;
  nx: number;
  ny: number;
  rotate: number;
};

const deck: DeckCard[] = [
  {
    id: "graphic",
    title: "Graphic Design",
    image: "/assets/card-graphic-design.png",
    alt: "Graphic Design category card",
    suit: "spade",
    accent: "#d98f9b",
    nx: -0.28,
    ny: -0.08,
    rotate: -10
  },
  {
    id: "content",
    title: "Content Creation",
    image: "/assets/card-content-creation.png",
    alt: "Content Creation category card",
    suit: "heart",
    accent: "#d98f9b",
    nx: 0.24,
    ny: -0.16,
    rotate: 9
  },
  {
    id: "event",
    title: "Event & Production",
    image: "/assets/card-event-production.png",
    alt: "Event and Production category card",
    suit: "diamond",
    accent: "#d98f9b",
    nx: -0.02,
    ny: 0.22,
    rotate: 4
  },
  {
    id: "logo",
    title: "Althea Villaluna",
    image: "/assets/logo-card.png",
    alt: "Althea Villaluna logo card",
    suit: "club",
    accent: "#d98f9b",
    nx: 0.30,
    ny: 0.14,
    rotate: -5
  }
];

function DeckItem({
  card,
  zIndex,
  bringToFront,
  constraintsRef,
  spread
}: {
  card: DeckCard;
  zIndex: number;
  bringToFront: (id: string) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  spread: number;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(card.nx * spread);
  const y = useMotionValue(card.ny * spread);
  const hasDragged = useRef(false);

  useEffect(() => {
    if (hasDragged.current) return;
    x.set(card.nx * spread);
    y.set(card.ny * spread);
  }, [spread, card.nx, card.ny, x, y]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, zIndex }}
      initial={{ rotate: card.rotate }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={reduceMotion ? 0.02 : 0.18}
      dragMomentum={!reduceMotion}
      dragTransition={{
        bounceStiffness: reduceMotion ? 0 : 320,
        bounceDamping: 26
      }}
      whileDrag={reduceMotion ? undefined : { scale: 1.03 }}
      onPointerDown={() => bringToFront(card.id)}
      onDragStart={() => {
        bringToFront(card.id);
        hasDragged.current = true;
      }}
    >
      <div className="h-[260px] w-[190px] sm:h-[320px] sm:w-[230px]">
        <FlipCard
          frontImage={card.image}
          frontAlt={card.alt}
          backTitle={card.title}
          backSubtitle="Flip to reveal"
          suit={card.suit}
          accent={card.accent}
          onInteract={() => bringToFront(card.id)}
        />
      </div>
    </motion.div>
  );
}

export default function CardDeck() {
  const reduceMotion = useReducedMotion();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const [bounds, setBounds] = useState({ w: 720, h: 520 });

  useEffect(() => {
    if (!constraintsRef.current) return;

    const el = constraintsRef.current;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      setBounds({ w: rect.width, h: rect.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const spread = useMemo(() => {
    const base = Math.min(bounds.w, bounds.h);
    return Math.max(320, Math.min(base, 620));
  }, [bounds.w, bounds.h]);

  const topZ = useRef(10);
  const [zMap, setZMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    deck.forEach((c, i) => (init[c.id] = i + 1));
    topZ.current = deck.length + 2;
    return init;
  });

  const bringToFront = (id: string) => {
    topZ.current += 1;
    setZMap((prev) => ({ ...prev, [id]: topZ.current }));
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 pb-4">
        <span className="sticker-badge">Drag the cards</span>
        <span className="sticker-badge">Flip to reveal</span>
        <span className="sticker-badge">Shuffle your curiosity</span>
      </div>

      <div
        ref={constraintsRef}
        className="relative w-full rounded-[1.25rem] border border-[rgba(18,18,18,0.10)] bg-[rgba(238,234,221,0.18)] shadow-paperSm overflow-hidden"
        style={{ minHeight: 460 }}
      >
        <div className="absolute inset-0 bg-poster-radial opacity-60" />

        <div className="absolute left-4 top-4 z-10">
          <div className="paper-soft rounded-full px-4 py-2 text-xs tracking-[0.22em] uppercase">
            Deal the deck
          </div>
        </div>

        <div className="absolute inset-0">
          {deck.map((card) => (
            <DeckItem
              key={card.id}
              card={card}
              zIndex={zMap[card.id] ?? 1}
              bringToFront={bringToFront}
              constraintsRef={constraintsRef}
              spread={spread}
            />
          ))}
        </div>

        {reduceMotion ? (
          <div className="absolute right-4 bottom-4 z-10">
            <div className="paper-soft rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase opacity-80">
              Motion reduced
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
