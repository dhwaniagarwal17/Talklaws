"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerFast, viewportConfig } from "@/lib/animations";

const clients = [
  "MCA",
  "SEBI",
  "RBI",
  "ROC",
  "NCLT",
  "RD",
  "SFIO",
  "ED",
  "EOW",
  "DRT",
];

export default function TrustedBy() {
  return (
    <section
      className="py-16 border-y border-[var(--border)] bg-[var(--bg)]"
      aria-label="Regulatory ecosystem"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-8"
        >
          <motion.p
            variants={fadeInUp}
            className="text-center text-xs text-[var(--text-secondary)] font-semibold tracking-widest uppercase"
          >
           Strategic Advisory Across India's Regulatory Ecosystem
          </motion.p>

          {/* Logo marquee */}
          <div className="relative overflow-hidden">
            {/* Gradient fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--bg), transparent)",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, var(--bg), transparent)",
              }}
            />

            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-16 whitespace-nowrap"
              aria-hidden="true"
            >
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={i}
                  className="text-[var(--text-secondary)] font-semibold text-sm tracking-tight opacity-60 hover:opacity-100 transition-opacity cursor-default"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
