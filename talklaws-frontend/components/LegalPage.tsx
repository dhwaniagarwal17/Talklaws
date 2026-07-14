/**
 * components/LegalPage.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable template for all legal/policy pages (Privacy Policy, Terms of Use,
 * Disclaimer, Cookie Policy, etc.).
 *
 * Usage:
 *   import LegalPage from "@/components/LegalPage";
 *   import { doc } from "./content";        // your page's data
 *   export default function Page() {
 *     return <LegalPage doc={doc} />;
 *   }
 *
 * To add a new legal page:
 *   1. Create app/<route>/layout.tsx  — add Metadata + ThemeProvider wrap
 *   2. Create app/<route>/content.ts  — define a LegalDoc object
 *   3. Create app/<route>/page.tsx    — render <LegalPage doc={...} />
 *   4. Add footer link
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

// ── Public types — import these in each content file ─────────────────────────

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "contact" };

export interface LegalSection {
  number: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  /** Page <h1> */
  title: string;
  /** Shown in the "Legal" badge area — override if needed */
  badge?: string;
  effectiveDate: string;
  /** One or more intro paragraphs shown before the numbered sections */
  intro: string[];
  sections: LegalSection[];
}

// ── Shared contact details ────────────────────────────────────────────────────
const CONTACT_ROWS = [
  { Icon: Mail,   label: "Email",   value: "talklaws@gmail.com",  href: "mailto:talklaws@gmail.com" },
  { Icon: Phone,  label: "Phone",   value: "+91 9839778060",       href: "tel:+919839778060" },
  { Icon: MapPin, label: "Address", value: "301, 3rd Floor, Prince Complex, Hazratganj, Lucknow, Uttar Pradesh, India", href: null },
] as const;

// ── Block renderer ────────────────────────────────────────────────────────────
function RenderBlock({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[var(--text-secondary)] text-base">
              <span
                className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "contact":
      return (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <p className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">
            TALKLAWS Legal Advisory
          </p>
          <div className="space-y-3">
            {CONTACT_ROWS.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={15} className="text-[var(--luxury-text)] mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                    {label}
                  </span>
                  {href ? (
                    <a href={href} className="text-sm text-[var(--primary)] hover:underline font-medium">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

// ── Main template ─────────────────────────────────────────────────────────────
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="bg-[var(--bg)] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Back link */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors group"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to Home
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 bg-[var(--primary)]/8 text-[var(--primary)] border border-[var(--primary)]/20 text-xs font-semibold px-3 py-1.5 rounded-full">
                {doc.badge ?? "Legal"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {doc.title}
            </motion.h1>

            {/* Intro paragraphs */}
            {doc.intro.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                className="text-base text-[var(--text-secondary)] leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Effective date */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 pt-2 border-t border-[var(--border)] text-sm text-[var(--text-secondary)]"
            >
              <CalendarDays size={14} aria-hidden="true" />
              <span>
                Effective Date:{" "}
                <span className="font-medium text-[var(--text-primary)]">
                  {doc.effectiveDate}
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl mx-auto space-y-12">
          {doc.sections.map((section) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <h2
                className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span className="text-[var(--luxury-text)] font-semibold mr-2 text-base">
                  {section.number}.
                </span>
                {section.title}
              </h2>
              <div className="w-8 h-0.5 bg-[var(--luxury)] rounded-full" />
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <RenderBlock key={i} block={block} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-10
                       flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
                Questions?
              </p>
              <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: "-0.02em" }}>
                Speak with our team
              </h2>
              <p className="text-sm text-[var(--text-secondary)] font-light max-w-xs">
                If you have any questions about this policy, we&apos;re happy to help.
              </p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg)]
                         font-semibold text-sm px-6 py-3 rounded-xl
                         hover:bg-[var(--luxury)] hover:text-white
                         transition-all duration-200 shadow-sm"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
