"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import CardDeck from "@/components/CardDeck";

export default function HomeView() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="poster-container py-12 sm:py-16">
      <div className="grid gap-10">
        <div className="max-w-3xl">
          <motion.h1
            className="script-accent text-5xl sm:text-6xl md:text-7xl leading-[0.95]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 200, damping: 22 }
            }
          >
            Creativity, played with intention.
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg opacity-85 max-w-2xl"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 180, damping: 22, delay: 0.05 }
            }
          >
            A portfolio built like a deck, explore and interact.
          </motion.p>
        </div>

        <CardDeck />

        <div className="flex items-center justify-center pt-2">
          <Link href="/work" className="tab-button text-sm sm:text-base px-6 py-3">
            View My Work <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
