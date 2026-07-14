"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Rocket,
  ShieldCheck,
  ArrowLeftRight,
  FileText,
  Lightbulb,
  Globe,
  Users,
  Scale,
  ArrowRight,
} from "lucide-react";
import type { Service } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Rocket,
  ShieldCheck,
  ArrowLeftRight,
  FileText,
  Lightbulb,
  Globe,
  Users,
  Scale,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || FileText;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden cursor-pointer h-full transition-all duration-300 hover:border-[var(--luxury)]/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, var(--primary) 0%, transparent 60%)",
          opacity: 0.03,
        }}
        aria-hidden="true"
      />

      <div
        className={`p-6 h-full flex flex-col ${
          service.size === "large" ? "p-8" : ""
        }`}
      >
        {/* Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-[var(--surface)] group-hover:bg-[var(--luxury)]/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <Icon
              size={20}
              className="text-[var(--luxury)] transition-transform duration-300"
              aria-hidden="true"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="w-7 h-7 rounded-lg bg-[var(--border)] flex items-center justify-center"
          >
            <ArrowRight size={12} className="text-[var(--text-secondary)]" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3
            className={`font-semibold text-[var(--text-primary)] leading-tight ${
              service.size === "large" ? "text-xl" : "text-lg"
            }`}
            style={{ letterSpacing: "-0.02em" }}
          >
            {service.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-[var(--border)]">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1 rounded-full group-hover:border-[var(--primary)]/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom luxury accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--luxury)] to-[var(--luxury-light)] origin-left"
      />
    </motion.article>
  );
}
