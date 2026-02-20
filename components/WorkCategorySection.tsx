"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Category } from "@/lib/projects";

export default function WorkCategorySection({
  category,
  open,
  onToggle,
  onImageClick
}: {
  category: Category;
  open: boolean;
  onToggle: () => void;
  onImageClick: (src: string, alt: string, caption?: string) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="paper rounded-[1.25rem] overflow-hidden">
      <motion.button
        type="button"
        className="w-full px-5 pt-6 pb-5 sm:px-7 sm:pt-7 sm:pb-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(18,18,18,0.25)]"
        onClick={onToggle}
        aria-expanded={open}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        transition={
          reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 }
        }
      >
        <div className="flex flex-col items-center text-center gap-4">
          <motion.div
            className="relative w-[210px] sm:w-[260px] aspect-[3/4]"
            initial={false}
            animate={reduceMotion ? undefined : { rotate: open ? 0 : -2 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 20 }
            }
          >
            <Image
              src={category.cardImage}
              alt={`${category.title} category card`}
              fill
              sizes="260px"
              className="object-contain"
              draggable={false}
            />
          </motion.div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">{category.title}</h2>
            <p className="mt-2 text-sm opacity-80">
              {open ? "Tap to tuck the projects back in." : "Tap to deal the projects below."}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] opacity-70">
            <span>{open ? "Fold" : "Reveal"}</span>
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 180 : 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            >
              ▾
            </motion.span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="px-5 pb-6 sm:px-7 sm:pb-8"
            initial={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
          >
            <div className="divider-dashed my-5" />

            <div className="space-y-8">
              {category.projects.map((p) => (
                <div key={`${p.client}-${p.year}`} className="paper-soft rounded-[1.25rem] p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-serif text-lg sm:text-xl leading-snug">{p.client}</div>
                      <div className="text-xs uppercase tracking-[0.22em] opacity-70 mt-1">
                        {p.role} • {p.year}
                      </div>
                    </div>
                    <div className="sticker-badge self-start">
                      <span aria-hidden>✦</span>
                      Deck entry
                    </div>
                  </div>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-85">
                    {p.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {p.images.map((src) => (
                      <motion.button
                        key={src}
                        type="button"
                        className="relative aspect-[4/3] rounded-[1rem] overflow-hidden border border-[rgba(18,18,18,0.12)] bg-[rgba(238,234,221,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(18,18,18,0.25)]"
                        onClick={() =>
                          onImageClick(src, `${category.title} project image`, p.client)
                        }
                        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                        transition={
                          reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18 }
                        }
                      >
                        <Image
                          src={src}
                          alt={`${category.title} project image`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
