"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import WorkCategorySection from "@/components/WorkCategorySection";
import ModalPreview from "@/components/ModalPreview";
import { categories } from "@/lib/projects";

export default function WorkView() {
  const reduceMotion = useReducedMotion();
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const [modal, setModal] = useState<{
    open: boolean;
    src: string;
    alt: string;
    caption?: string;
  }>({ open: false, src: "", alt: "" });

  const heading = useMemo(() => {
    return {
      title: "Work",
      subtitle: "Tap a card to unfold projects, then click an image to preview."
    };
  }, []);

  return (
    <section className="poster-container py-12 sm:py-16">
      <div className="max-w-3xl">
        <motion.h1
          className="font-serif text-4xl sm:text-5xl tracking-tight"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 24 }
          }
        >
          {heading.title}
        </motion.h1>

        <p className="mt-4 text-base sm:text-lg opacity-85">{heading.subtitle}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="sticker-badge">Deck style browsing</span>
          <span className="sticker-badge">Smooth reveals</span>
          <span className="sticker-badge">Modal previews</span>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {categories.map((cat) => (
          <WorkCategorySection
            key={cat.title}
            category={cat}
            open={openTitle === cat.title}
            onToggle={() => setOpenTitle((prev) => (prev === cat.title ? null : cat.title))}
            onImageClick={(src, alt, caption) => setModal({ open: true, src, alt, caption })}
          />
        ))}
      </div>

      <ModalPreview
        open={modal.open}
        src={modal.src}
        alt={modal.alt}
        caption={modal.caption}
        onClose={() => setModal({ open: false, src: "", alt: "" })}
      />
    </section>
  );
}
