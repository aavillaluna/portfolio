"use client";

import { useId } from "react";

export default function NoiseOverlay() {
  const id = useId().replace(/:/g, "");

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div className="absolute inset-0 opacity-[0.09] mix-blend-multiply">
        <svg className="h-full w-full">
          <filter id={id}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={3}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${id})`} />
        </svg>
      </div>

      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px circle at 50% 10%, rgba(238,234,221,0.22), transparent 60%), radial-gradient(1200px circle at 50% 120%, rgba(18,18,18,0.18), transparent 55%)"
        }}
      />
    </div>
  );
}
