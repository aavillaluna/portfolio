"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ModalPreview({
  open,
  src,
  alt,
  caption,
  onClose
}: {
  open: boolean;
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.16 }}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative paper rounded-[1.25rem] w-full max-w-4xl p-4 sm:p-6"
            initial={reduceMotion ? { y: 0, scale: 1 } : { y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduceMotion ? { y: 0, scale: 1 } : { y: 10, scale: 0.98 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 240, damping: 22 }
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.22em] opacity-70">Preview</div>
                <div className="font-serif text-lg sm:text-xl truncate">{caption ?? alt}</div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="tab-button text-xs sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>

            <div className="mt-4 relative w-full aspect-[4/3] rounded-[1rem] overflow-hidden border border-[rgba(18,18,18,0.12)] bg-[rgba(238,234,221,0.55)]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
