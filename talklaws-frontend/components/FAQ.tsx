"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { faqs } from "@/lib/data";

function FAQItem({
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
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-[var(--primary)]/40 shadow-[0_4px_20px_rgba(128,0,32,0.08)]"
          : "border-[var(--border)] hover:border-[var(--primary)]/25"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className={`font-semibold text-base leading-snug transition-colors ${
            isOpen
              ? "text-[var(--primary)]"
              : "text-[var(--text-primary)] group-hover:text-[var(--primary)]"
          }`}
          style={{ letterSpacing: "-0.01em" }}
        >
          {question}
        </span>
        <div
          className={`shrink-0 ml-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
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
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="region"
          >
            <div className="px-6 pb-6">
              <div className="w-full h-px bg-[var(--border)] mb-5" />
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-[var(--bg)]"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-14 space-y-4"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
          >
            Questions
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Frequently asked.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[var(--text-secondary)] text-base font-light max-w-lg mx-auto"
          >
            Everything you need to know before reaching out. Can&apos;t find
            your answer? Just contact us directly.
          </motion.p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
