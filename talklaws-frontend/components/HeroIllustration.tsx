"use client";

import React from "react";
import { motion } from "framer-motion";
import { floatAnimation, rotateAnimation } from "@/lib/animations";

export default function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Soft spotlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-80 h-80 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Outer rotating ring */}
      <motion.div
        animate={rotateAnimation}
        className="absolute w-72 h-72 rounded-full border border-[var(--primary)]/20"
        style={{ borderStyle: "dashed" }}
        aria-hidden="true"
      />

      {/* Second ring counter-rotate */}
      <motion.div
        animate={{
          rotate: [0, -360],
          transition: { duration: 18, repeat: Infinity, ease: "linear" },
        }}
        className="absolute w-52 h-52 rounded-full border border-[var(--luxury)]/30"
        aria-hidden="true"
      />

      {/* Main floating card */}
      <motion.div animate={floatAnimation} className="relative z-10" aria-hidden="true">
        <div
          className="w-52 h-64 rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm shadow-2xl overflow-hidden relative"
          style={{ boxShadow: "0 24px 64px rgba(128,0,32,0.12)" }}
        >
          {/* Document header */}
          <div className="bg-[var(--primary)] px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-white/20" />
              <div className="h-2 w-24 rounded bg-white/40" />
            </div>
            <div className="h-1.5 w-full rounded bg-white/20 mb-1" />
            <div className="h-1.5 w-3/4 rounded bg-white/20" />
          </div>

          {/* Document body lines */}
          <div className="p-4 space-y-2">
            {[100, 90, 100, 75, 90, 60, 85, 70].map((width, i) => (
              <div
                key={i}
                className="h-1.5 rounded bg-[var(--border)]"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>

          {/* Gold accent mark */}
          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-[var(--luxury)]/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded bg-[var(--luxury)]/60" />
          </div>
        </div>
      </motion.div>

      {/* Floating satellite cards */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
        className="absolute top-8 right-4 z-10"
        aria-hidden="true"
      >
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2.5 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
            </div>
            <div>
              <div className="h-1.5 w-16 rounded bg-[var(--border)] mb-1" />
              <div className="h-1.5 w-10 rounded bg-[var(--luxury)]/40" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        className="absolute bottom-12 left-2 z-10"
        aria-hidden="true"
      >
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2.5 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[var(--luxury)]/15 flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-[var(--luxury)]" />
            </div>
            <div>
              <div className="h-1.5 w-14 rounded bg-[var(--border)] mb-1" />
              <div className="h-1.5 w-8 rounded bg-[var(--secondary)]/30" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Geometric lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="50" y1="0" x2="50" y2="500" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="350" y1="0" x2="350" y2="500" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="0" y1="400" x2="400" y2="400" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="30" y1="50" x2="150" y2="200" stroke="var(--primary)" strokeWidth="0.5" strokeOpacity="0.25" />
        <line x1="370" y1="50" x2="250" y2="200" stroke="var(--luxury)" strokeWidth="0.5" strokeOpacity="0.3" />
        <path d="M20 20 L20 40 L40 40" stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M380 20 L380 40 L360 40" stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M20 480 L20 460 L40 460" stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M380 480 L380 460 L360 460" stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
      </svg>

      {/* Animated particles */}
      {[
        { cx: 60, cy: 80 },
        { cx: 340, cy: 120 },
        { cx: 80, cy: 380 },
        { cx: 320, cy: 400 },
        { cx: 200, cy: 40 },
        { cx: 160, cy: 450 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
            transition: { duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.6 },
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-[var(--luxury)]"
          style={{
            left: `${(dot.cx / 400) * 100}%`,
            top: `${(dot.cy / 500) * 100}%`,
            opacity: 0.5,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
