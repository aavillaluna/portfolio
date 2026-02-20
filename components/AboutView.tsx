"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const competencies = [
  "Graphic Design",
  "Content Creation",
  "Content Strategy",
  "Social Media Management",
  "Video & Audio Editing",
  "Event Planning"
];

const education = [
  {
    school: "University of the Philippines Los Baños",
    program: "BS Development Communication",
    level: "Undergraduate",
    years: "2021–2025"
  },
  {
    school: "iACADEMY",
    program: "Multimedia Arts – Arts and Design Track",
    level: "Senior High School",
    years: "2019–2021"
  }
];

function ContactItem({
  label,
  value,
  href,
  icon
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <a
      href={href}
      className="paper-soft rounded-[1.25rem] px-4 py-4 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(18,18,18,0.25)]"
      aria-label={`${label}: ${value}`}
    >
      <motion.span
        aria-hidden
        className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[rgba(18,18,18,0.12)] bg-[rgba(238,234,221,0.92)]"
        whileHover={reduceMotion ? undefined : { y: -2 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 340, damping: 18 }
        }
      >
        {icon}
      </motion.span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.22em] opacity-70">{label}</div>
        <div className="font-serif text-base sm:text-lg truncate">{value}</div>
      </div>
    </a>
  );
}

export default function AboutView() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="poster-container py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] items-start">
        <motion.div
          className="paper rounded-[1.25rem] p-4 sm:p-5"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 24 }
          }
        >
          <div className="relative aspect-[3/4] rounded-[1rem] overflow-hidden border border-[rgba(18,18,18,0.12)]">
            <Image
              src="/assets/profile-photo.png"
              alt="Profile photo of Althea Villaluna"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="sticker-badge">UPLB DevComm</span>
            <span className="sticker-badge">Multimedia, Marketing</span>
            <span className="sticker-badge">Story first</span>
          </div>
        </motion.div>

        <div className="space-y-10">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl tracking-tight">About Me</h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed opacity-85">
              I believe creativity works best when it’s played with intention. As a Development
              Communication graduate, I design and produce work that blends visual storytelling,
              strategic planning, and audience understanding, creating communication that feels both
              thoughtful and impactful.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Education</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {education.map((item) => (
                <div key={item.school} className="paper rounded-[1.25rem] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] opacity-70">{item.years}</div>
                  <div className="mt-2 font-serif text-lg leading-snug">{item.school}</div>
                  <div className="mt-2 text-sm opacity-85">{item.program}</div>
                  <div className="mt-1 text-sm opacity-70">{item.level}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Competencies</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {competencies.map((c) => (
                <span key={c} className="sticker-badge">
                  <span aria-hidden>✦</span>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Contact</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ContactItem
                label="Email"
                value="aavillaluna13@gmail.com"
                href="mailto:aavillaluna13@gmail.com"
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path d="M4 6h16v12H4V6zm8 6L4.8 7.5h14.4L12 12z" fill="currentColor" />
                  </svg>
                }
              />
              <ContactItem
                label="Phone"
                value="09171558134"
                href="tel:09171558134"
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.9.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 2c0-.6.4-1 1-1h4.1c.6 0 1 .4 1 1 0 1.4.2 2.7.6 3.9.1.4 0 .8-.3 1.1l-2.8 2.8z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
