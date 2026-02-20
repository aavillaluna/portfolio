"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn("tab-button text-xs sm:text-sm", isActive && "bg-[rgba(238,234,221,0.98)]")}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-[rgba(238,234,221,0.72)] backdrop-blur-[2px]" />
        <div className="relative poster-container py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(18,18,18,0.25)] rounded-full pr-2"
            aria-label="Go to home"
          >
            <div className="relative h-11 w-9 sm:h-12 sm:w-10 shrink-0">
              <Image
                src="/assets/logo-card.png"
                alt="Althea Villaluna logo card"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg sm:text-xl tracking-wide">Althea Villaluna</div>
              <div className="text-[11px] sm:text-xs opacity-75 tracking-widest uppercase">
                Marketing, Multimedia
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink href="/about" label="About Me" />
            <NavLink href="/work" label="Work" />
          </nav>
        </div>
        <div className="divider-dashed" />
      </div>
    </header>
  );
}
