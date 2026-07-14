"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { csQA } from "@/lib/data";

const INITIAL_COUNT = 8;

// ── Single accordion item ─────────────────────────────────────────────────────
function CSQAItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % INITIAL_COUNT) * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-[var(--primary)]/40 shadow-[0_4px_20px_rgba(128,0,32,0.08)]"
          : "border-[var(--border)] hover:border-[var(--primary)]/25"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`csqa-answer-${index}`}
      >
        <span
          className={`font-semibold text-sm sm:text-base leading-snug transition-colors pr-4 ${
            isOpen
              ? "text-[var(--primary)]"
              : "text-[var(--text-primary)] group-hover:text-[var(--primary)]"
          }`}
          style={{ letterSpacing: "-0.01em" }}
        >
          {question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--surface)] text-[var(--text-secondary)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)]"
          }`}
          aria-hidden="true"
        >
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`csqa-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="region"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="w-full h-px bg-[var(--border)] mb-4" />
              {/* Gold left-border accent to visually distinguish answer from FAQ */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed pl-3 border-l-2 border-[var(--luxury)]/50">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function AskCS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? csQA : csQA.slice(0, INITIAL_COUNT);
  const remaining = csQA.length - INITIAL_COUNT;

  const handleToggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="ask-cs"
      className="py-24 lg:py-32 bg-[var(--card)]"
      aria-label="Ask the Company Secretary"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-14 space-y-4"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2">
            <MessageCircle size={14} className="text-[var(--luxury-text)]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
              Ask the Company Secretary
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Straight answers.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[var(--text-secondary)] text-base font-light max-w-xl mx-auto leading-relaxed"
          >
            Practical answers to some of the most common questions on corporate
            governance, compliance, contracts, workplace policies, and business law.
          </motion.p>
        </motion.div>

        {/* ── Accordion ────────────────────────────────────────────── */}
        <div className="space-y-3">
          {visible.map((item, i) => (
            <CSQAItem
              key={i}
              question={item.question}
              answer={item.answer}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        {/* ── Show more / less ──────────────────────────────────────── */}
        {!showAll && remaining > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            className="mt-6 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] border border-[var(--border)] hover:border-[var(--primary)]/30 px-5 py-3 rounded-xl transition-all duration-200"
            >
              <Plus size={14} aria-hidden="true" />
              Show {remaining} more question{remaining !== 1 ? "s" : ""}
            </motion.button>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={() => { setShowAll(false); setOpenIndex(null); }}
              className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              <Minus size={14} aria-hidden="true" />
              Show fewer questions
            </button>
          </motion.div>
        )}

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 bg-[var(--bg)] border border-[var(--border)] rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Have another corporate governance or compliance question?
            </p>
            <p className="text-xs text-[var(--text-secondary)] font-light">
              Our advisory team is ready to help.
            </p>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0 inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg)] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[var(--luxury)] hover:text-white transition-all duration-200 shadow-sm"
          >
            Book a Consultation
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
