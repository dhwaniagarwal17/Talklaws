"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  const handleScrollToServices = () => {
    document
      .querySelector("#services")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document
      .querySelector("#contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[var(--bg)]"
      aria-label="Hero section"
    >
      {/* Background grid — z-0, content sits above it */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.45,
        }}
      />

      {/* Radial soft light — behind content */}
      <div
        className="absolute top-0 left-1/4 w-[700px] h-[700px] pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--luxury) 0%, transparent 65%)",
          opacity: 0.05,
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, var(--primary) 0%, transparent 65%)",
          opacity: 0.04,
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Left — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] text-xs font-medium px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--luxury)]" />
                Corporate Legal &amp; Compliance Advisory
              </span>
            </motion.div>

            {/* Headline with inline logomark */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-bold text-[var(--text-primary)] leading-[0.95]"
                style={{ letterSpacing: "-0.04em" }}
              >
                <span className="inline-flex items-center gap-4">
                  {/* Scales logomark beside headline */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex shrink-0 items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      width="56"
                      height="68"
                      viewBox="0 0 56 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-90"
                    >
                      <rect x="26.5" y="8" width="3" height="52" rx="1.5" fill="var(--luxury)" />
                      <rect x="16" y="58" width="24" height="3" rx="1.5" fill="var(--text-primary)" opacity="0.7"/>
                      <rect x="8" y="22" width="40" height="2.5" rx="1.25" fill="var(--text-primary)" opacity="0.85"/>
                      <circle cx="28" cy="23.25" r="4" fill="var(--luxury)" />
                      <circle cx="28" cy="23.25" r="2" fill="var(--bg)" />
                      <circle cx="28" cy="9" r="3" fill="var(--luxury)" />
                      <line x1="12" y1="24.5" x2="12" y2="36" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
                      <line x1="44" y1="24.5" x2="44" y2="36" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
                      <path d="M5 36 Q12 43 19 36" stroke="var(--luxury)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      <path d="M37 36 Q44 43 51 36" stroke="var(--luxury)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </motion.span>
                  Legal clarity
                </span>
                <br />
                <span
                  className="relative inline-block"
                  style={{ color: "var(--luxury)" }}
                >
                  for ambitious
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-0.5 bg-[var(--luxury)] origin-left opacity-60"
                  />
                </span>
                <br />
                companies.
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-base text-[var(--text-secondary)] max-w-lg leading-relaxed"
            >
              TALKLAWS is a premier corporate legal and compliance advisory
              helping startups, SMEs, investors and enterprises navigate complex
              legal landscapes with precision and strategic intelligence.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 pt-2"
            >
              {[
                { value: "500+", label: "Matters handled" },
                { value: "20+", label: "Years of expertise" },
                { value: "100+", label: "Active clients" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-0.5">
                  <div
                    className="text-2xl font-bold text-[var(--text-primary)]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.button
                onClick={handleScrollToContact}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg)] font-semibold px-7 py-4 rounded-xl transition-all shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:bg-[var(--luxury)] hover:shadow-[0_8px_32px_rgba(166,124,58,0.35)]"
              >
                Book a Consultation
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>

              <motion.button
                onClick={handleScrollToServices}
                whileHover={{ scale: 1.03, y: -2, borderColor: "var(--luxury)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 border-2 border-[var(--border-strong)] bg-transparent text-[var(--text-primary)] font-semibold px-7 py-4 rounded-xl transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                Explore Services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block relative md:h-[500px] lg:h-[560px]"
          >
            <HeroIllustration />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center gap-2 mt-16"
          aria-hidden="true"
        >
          <span className="text-xs text-[var(--text-tertiary)] font-medium tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ChevronDown size={16} className="text-[var(--text-secondary)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
