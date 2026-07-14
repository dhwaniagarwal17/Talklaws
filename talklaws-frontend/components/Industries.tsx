"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  CreditCard,
  Heart,
  Building,
  ShoppingBag,
  TrendingUp,
  BookOpen,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { industries } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  CreditCard,
  Heart,
  Building,
  ShoppingBag,
  TrendingUp,
  BookOpen,
  Wrench,
};

export default function Industries() {
  return (
    <section
      id="industries"
      className="py-24 lg:py-32 bg-[var(--card)]"
      aria-label="Industries section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-16 space-y-4"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
          >
            Sectors We Serve
          </motion.span>
          <div className="flex items-end justify-between gap-8">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Deep expertise
              <br />
              across industries.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="hidden lg:block text-[var(--text-secondary)] text-base leading-relaxed max-w-xs"
            >
              We serve clients across eight industries with the domain fluency
              that only comes from years of immersion.
            </motion.p>
          </div>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111111] rounded-2xl overflow-hidden">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon] || Cpu;
            return (
              <motion.article
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ backgroundColor: "#6B001A" }}
                className="group relative bg-[#1a1a1a] p-7 cursor-pointer transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon
                      size={18}
                      className="text-white/60 group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-4">
                  <h3
                    className="font-semibold text-white text-base leading-tight"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {industry.title}
                  </h3>
                  <p className="text-sm text-white/50 group-hover:text-white/70 leading-relaxed font-light transition-colors duration-300">
                    {industry.description}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 text-xs font-medium text-[var(--luxury)]"
                >
                  Learn more
                  <ArrowRight size={12} />
                </motion.div>

                {/* Bottom gold accent on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--luxury)] origin-left"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
