"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) =>
      dir > 0
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-[var(--primary)]"
      aria-label="Client testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                Client Stories
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Hear from
              <br />
              those we served.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/60 text-base leading-relaxed font-light max-w-sm"
            >
              We measure our success by the success of our clients. Here is what
              they say about working with TALKLAWS.
            </motion.p>

            {/* Dots */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 pt-4"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </motion.div>

            {/* Navigation */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <motion.button
                onClick={() => go(-1)}
                whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Card */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.blockquote
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 space-y-6"
              >
                <Quote size={28} className="text-[var(--luxury)]" aria-hidden="true" />

                <p className="text-white text-lg leading-relaxed font-light">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                  <div
                    className="w-12 h-12 rounded-full bg-[var(--luxury)] flex items-center justify-center text-white font-bold text-sm shrink-0"
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-white/60 font-light">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
        {/* Confidentiality note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="mt-12 text-center text-xs text-white/35 font-light tracking-wide"
        >
          Some testimonials have been published without company names at the request of clients
          to respect confidentiality and professional obligations.
        </motion.p>
      </div>
    </section>
  );
}
