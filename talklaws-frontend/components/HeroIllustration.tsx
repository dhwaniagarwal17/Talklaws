"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ─── Particle positions (viewBox 400×500) ────────────────────────────────────
const PARTICLES = [
  { cx: 60,  cy: 80  },
  { cx: 340, cy: 120 },
  { cx: 80,  cy: 380 },
  { cx: 320, cy: 400 },
  { cx: 200, cy: 40  },
  { cx: 160, cy: 450 },
] as const;

// ─── HeroIllustration ─────────────────────────────────────────────────────────
export default function HeroIllustration() {
  const { theme, mounted } = useTheme();

  // Use ThemeProvider's own `mounted` flag — it only becomes true AFTER the
  // provider has read localStorage and set the real theme. This means
  // `isDark` is stable and correct on first client paint, with no flash.
  const isDark = mounted ? theme === "dark" : true; // server-safe default

  // ── Image source ──────────────────────────────────────────────────────────
  const imageSrc = isDark
    ? "/images/hero-office-dark.png"
    : "/images/hero-office-light.png";

  // ── Object position ───────────────────────────────────────────────────────
  const objectPosition = isDark ? "68% center" : "50% center";

  // ── Per-theme image filter ────────────────────────────────────────────────
  const imgFilter = isDark
    ? "brightness(0.88) contrast(1.05) saturate(0.92)"
    : "brightness(1.01) contrast(1.03) saturate(1.02)";

  // ── Opacity ───────────────────────────────────────────────────────────────
  const imgOpacity = isDark ? 0.96 : 1;

  // ── Brand overlay ─────────────────────────────────────────────────────────
  const overlay = isDark
    ? "linear-gradient(135deg, rgba(107,0,26,0.15) 0%, transparent 50%, rgba(196,160,53,0.08) 100%)"
    : "none";

  return (
    <div
      className="relative w-full h-full min-h-[500px] hidden md:block overflow-visible"
      aria-label="Office illustration"
    >
      {/* ── Image container ───────────────────────────────────────────────── */}
      {/*
        suppressHydrationWarning on this div allows React to silently reconcile
        the theme-driven style differences between SSR and client first paint.
        Only the direct element attributes are suppressed — children are unaffected.
      */}
      <div
        suppressHydrationWarning
        className="absolute inset-y-0 overflow-hidden"
        style={{ right: "-8%", width: "130%", zIndex: 1 }}
      >
        {/* Image */}
        <Image
          suppressHydrationWarning
          src={imageSrc}
          alt="Luxury corporate law office with scales of justice"
          fill
          priority
          quality={100}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{
            objectPosition,
            opacity:    imgOpacity,
            filter:     imgFilter,
            transition: mounted
              ? "opacity 0.4s ease, filter 0.4s ease"
              : undefined,
          }}
        />

        {/* Brand overlay — dark mode only */}
        {isDark && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: overlay,
              zIndex:     2,
            }}
          />
        )}

        {/* Left edge blend — 8% feather into page background */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width:      "8%",
            background: "linear-gradient(to right, var(--bg) 0%, transparent 100%)",
            zIndex:     3,
          }}
        />

        {/* Bottom edge blend */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height:     "10%",
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
            zIndex:     3,
          }}
        />
      </div>

      {/* ── Decorative SVG — above image ─────────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 4 }}
      >
        {/* Dashed grid lines */}
        <line x1="50"  y1="0"   x2="50"  y2="500" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="350" y1="0"   x2="350" y2="500" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="0"   y1="100" x2="400" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="0"   y1="400" x2="400" y2="400" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />

        {/* Diagonal accent lines */}
        <line x1="30"  y1="50"  x2="150" y2="200" stroke="var(--primary)" strokeWidth="0.5" strokeOpacity="0.25" />
        <line x1="370" y1="50"  x2="250" y2="200" stroke="var(--luxury)"  strokeWidth="0.5" strokeOpacity="0.30" />

        {/* Corner brackets */}
        <path d="M20 20 L20 40 L40 40"       stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M380 20 L380 40 L360 40"    stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M20 480 L20 460 L40 460"    stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M380 480 L380 460 L360 460" stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
      </svg>

      {/* ── Animated particles — topmost layer ───────────────────────────── */}
      {PARTICLES.map((dot, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute w-1.5 h-1.5 rounded-full bg-[var(--luxury)] pointer-events-none"
          style={{
            left:   `${(dot.cx / 400) * 100}%`,
            top:    `${(dot.cy / 500) * 100}%`,
            zIndex: 5,
          }}
          animate={{
            opacity: [0.3, 0.85, 0.3],
            scale:   [1,   1.2,  1],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat:   Infinity,
            delay:    i * 0.6,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
