"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Shield, Brain, Zap } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { timeline, values } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Shield,
  Brain,
  Zap,
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-[var(--bg)]"
      aria-label="About TALKLAWS"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission + Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
                About Us
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Legal advisory
              <br />
              <span className="text-[var(--primary)]">reimagined.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              TALKLAWS was founded on a belief that the legal profession had
              become too insular — disconnected from the commercial realities
              faced by the businesses it was meant to serve.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-[var(--text-secondary)] text-base leading-relaxed"
            >
              We set out to build something different: a premier legal advisory
              combining the intellectual rigour of top-tier counsel with
              the commercial acuity of strategic consulting. Today, that vision
              drives every engagement we take on.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {[
                {
                  label: "Mission",
                  text: "To make exceptional legal counsel accessible to every ambitious business.",
                },
                {
                  label: "Vision",
                  text: "To become the most trusted legal advisory for India's growth economy.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-2"
                >
                  <div className="text-[var(--luxury-text)] text-xs font-semibold uppercase tracking-wider">
                    {item.label}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="relative"
          >
            <motion.div variants={fadeInUp} className="space-y-0">
              <h3
                className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-8"
              >
                Our Journey
              </h3>

              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  className="group flex gap-6 pb-8 relative"
                >
                  {/* Timeline line */}
                  {i < timeline.length - 1 && (
                    <div
                      className="absolute left-[19px] top-8 bottom-0 w-px bg-[var(--border)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Year bubble */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-[var(--border)] bg-[var(--card)] group-hover:border-[var(--primary)] transition-colors flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[var(--border)] group-hover:bg-[var(--primary)] transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[var(--luxury-text)] text-xs font-bold font-mono">
                      {item.year}
                    </div>
                    <h4
                      className="font-semibold text-[var(--text-primary)] text-base"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
              Our Values
            </span>
            <h3
              className="text-3xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.02em" }}
            >
              The principles we live by.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => {
              const Icon = iconMap[value.icon] || Target;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4 group hover:border-[var(--luxury)]/60 hover:shadow-[0_16px_48px_rgba(166,124,58,0.1)] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] group-hover:bg-[var(--luxury)]/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon
                      size={18}
                      className="text-[var(--luxury)]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4
                      className="font-semibold text-[var(--text-primary)]"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {value.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
