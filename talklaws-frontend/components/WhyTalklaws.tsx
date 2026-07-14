"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const differentiators = [
  {
    number: "01",
    title: "Commercial intelligence, not just legal advice",
    description:
      "We understand that legal decisions have business consequences. Our advisors combine legal precision with commercial awareness to give you counsel that actually moves your business forward.",
  },
  {
    number: "02",
    title: "Senior attention on every mandate",
    description:
      "At TALKLAWS, every engagement is handled by senior advisors — not passed to juniors after the first meeting. You get experienced minds on your matter every time.",
  },
  {
    number: "03",
    title: "Built for the pace of modern business",
    description:
      "We respond quickly, think strategically, and deliver with precision. No bureaucracy, no delays. Just clear, actionable advice when you need it most.",
  },
  {
    number: "04",
    title: "Transparent, aligned fees",
    description:
      "No billing surprises. We structure engagements around outcomes, not hours. Our success is tied to yours — which is exactly how it should be.",
  },
];

export default function WhyTalklaws() {
  return (
    <section
      id="why-talklaws"
      className="py-24 lg:py-32 bg-[var(--bg)]"
      aria-label="Why TALKLAWS section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — sticky editorial heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="lg:sticky lg:top-28 space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
                Our Approach
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Why the best
              <br />
              companies choose
              <br />
              <span className="text-[var(--primary)]">TALKLAWS.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md"
            >
              We are not a traditional law firm. We are a thinking partner — a
              premier legal advisory that understands both the legal and business
              dimensions of every decision you face.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
                    fill="white" fillOpacity="0.9"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  Recognised legal advisory
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  Ranked by leading startup ecosystems
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Differentiators */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-0"
          >
            {differentiators.map((item, i) => (
              <motion.div key={item.number} variants={fadeInUp} className="group">
                <div className={`py-8 ${i < differentiators.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                  <div className="flex items-start gap-6">
                    <span className="text-xs font-bold text-[var(--luxury-text)] mt-1 font-mono shrink-0" aria-hidden="true">
                      {item.number}
                    </span>
                    <div className="space-y-3">
                      <h3
                        className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
