"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-[var(--bg)]"
      aria-label="Services section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-16"
        >
          <div className="flex items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <motion.span
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
              >
                Practice Areas
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                What we do,
                <br />
                <span className="text-[var(--primary)]">exceptionally well.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeInUp}
              className="hidden lg:block text-[var(--text-secondary)] text-base leading-relaxed max-w-xs font-light"
            >
              Nine focused practice areas, each led by advisors with deep
              domain expertise and a track record of outcomes.
            </motion.p>
          </div>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          <div className="lg:col-span-2"><ServiceCard service={services[0]} index={0} /></div>
          <div><ServiceCard service={services[2]} index={1} /></div>
          <div><ServiceCard service={services[4]} index={2} /></div>
          <div className="lg:col-span-2"><ServiceCard service={services[3]} index={3} /></div>
          <div><ServiceCard service={services[1]} index={4} /></div>
          <div><ServiceCard service={services[6]} index={5} /></div>
          <div><ServiceCard service={services[5]} index={6} /></div>
          {/* Row 4: Employment & HR Law + Corporate Investigations — 50/50 */}
          <div className="lg:col-span-1 md:col-span-1"><ServiceCard service={services[7]} index={7} /></div>
          <div className="lg:col-span-2 md:col-span-1"><ServiceCard service={services[8]} index={8} /></div>
        </div>
      </div>
    </section>
  );
}
