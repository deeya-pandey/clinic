"use client";

import Image from "next/image";
import { useState } from "react";
import type { BeforeAfterResult } from "@/content/clinic";

const sizes = "(min-width: 1024px) 45vw, 100vw";

const labelClass = "absolute top-2 rounded-sm bg-charcoal/75 px-2 py-0.5 text-xs font-medium text-white";

/** Draggable comparison. The native range input provides keyboard and screen reader support. */
export function BeforeAfterCard({ result }: { result: BeforeAfterResult }) {
  const [position, setPosition] = useState(50);
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-paper shadow-card">
      <div className="relative aspect-[4/3] bg-sage-soft">
        <Image src={result.after.src} alt={`After: ${result.after.alt}`} fill sizes={sizes} className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={result.before.src}
            alt={`Before: ${result.before.alt}`}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
        <span aria-hidden className={`${labelClass} left-2`}>
          Before
        </span>
        <span aria-hidden className={`${labelClass} right-2`}>
          After
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label={`Compare before and after photos: ${result.title}`}
          aria-valuetext={`Showing ${position}% before photo`}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
        <div
          aria-hidden
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white peer-focus-visible:w-1 peer-focus-visible:bg-champagne"
        >
          <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm text-forest shadow-card">
            ↔
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-2xl">{result.title}</h3>
        <p className="mt-1 text-sm font-medium text-forest-soft">
          {result.treatment}
          {result.timeframe && ` · ${result.timeframe}`}
        </p>
        <p className="mt-2 text-muted">{result.description}</p>
      </div>
    </article>
  );
}
