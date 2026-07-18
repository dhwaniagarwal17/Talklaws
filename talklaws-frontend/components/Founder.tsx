"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Linkedin, Facebook, Instagram, Quote,
  Award, Briefcase, BookOpen, Shield, CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { fadeInLeft, fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

// ─── Credential chips shown inside the portrait card under the name ───────────
const chips = ["FCS", "23+ Years", "Ind. Director", "ICSI"];

// ─── Executive profile rows ───────────────────────────────────────────────────
const credentials = [
  {
    label: "Qualifications",
    value: "FCS | LL.B. | M.Com.",
  },
  {
    label: "Experience",
    value: "23+ Years in Corporate Governance, Company Law & Strategic Advisory",
  },
  {
    label: "Core Practice",
    value: "SEBI & RBI Compliance · IPO Readiness · Corporate Restructuring · M&A",
  },
  {
    label: "Professional Roles",
    value: "Independent Director · Faculty, ICSI · Member, Quality Review Board (ICSI) · POSH Trainer",
  },
];

// ─── Professional highlights grid ────────────────────────────────────────────
const highlights = [
  { Icon: Award,        text: "Fellow Member, ICSI" },
  { Icon: Shield,       text: "Independent Director" },
  { Icon: BookOpen,     text: "Faculty — Institute of Company Secretaries of India" },
  { Icon: CheckCircle2, text: "Member — Quality Review Board, ICSI" },
  { Icon: CheckCircle2, text: "Peer Reviewed Certified Firm" },
  { Icon: Briefcase,    text: "POSH Trainer — Ministry of Defence" },
  { Icon: Award,        text: "Lifetime Member — ID Repository" },
  { Icon: Shield,       text: "Chairperson — POSH ICC, Ministry of Corporate Affairs" },
];

export default function Founder() {
  return (
    <section
      id="founder"
      className="py-24 lg:py-32 bg-[var(--card)]"
      aria-label="Founder section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          items-start — aligns both columns to their top edge so the card
          top sits near the "Message from Founder" label, not centered.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left — Portrait card ─────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInLeft}
            className="relative"
          >
            {/* Outer glow container — decorative only, must not intercept touch */}
            <div
              className="absolute -inset-3 rounded-3xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(107,0,26,0.05) 0%, rgba(196,160,53,0.05) 100%)",
                border: "1px solid var(--border)",
              }}
              aria-hidden="true"
            />

            {/* Social icons — inside the outer container, right edge, vertically centred */}
            <div className="absolute top-0 bottom-0 right-[-0.75rem] hidden lg:flex flex-col items-center justify-center gap-2.5 pr-3 z-10">
              {[
                { Icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/fcs-tanu-agarwal" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/talklaws4" },
                { Icon: Facebook,  label: "Facebook",  href: "https://www.facebook.com/share/19GNaXB237/" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 hover:shadow-[0_4px_12px_rgba(107,0,26,0.15)] transition-all duration-200 shadow-sm"
                  aria-label={label}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>

            {/* Portrait card */}
            <div
              className="relative aspect-[4/5] max-w-sm mx-auto rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
              style={{ overflow: "hidden" }}
            >
              {/* Real photograph */}
              <Image
                src="/images/team/tanu-agarwal.jpg"
                alt="FCS Tanu Agarwal — Founder & Managing Partner, TALKLAWS"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 384px"
                priority
              />

              {/* Subtle bottom gradient so name overlay remains legible over any photo */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 75%)",
                }}
                aria-hidden="true"
              />

              {/* Name + chips overlay — bottom of card */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10"
                style={{ background: "transparent" }}
              >
                {/* Name */}
                <div
                  className="font-bold text-xl text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  FCS Tanu Agarwal
                </div>

                {/* Designation */}
                <div className="text-sm text-white/80 mt-0.5 font-medium">
                  Founder &amp; Managing Partner
                </div>

                {/* Gold rule */}
                <div className="mt-3 mb-3 w-8 h-0.5 bg-[var(--luxury)] rounded-full" />

                {/* Credential chips — inline under the name */}
                <div className="flex flex-wrap gap-1.5">
                  {chips.map((chip, i) => (
                    <motion.span
                      key={chip}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportConfig}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border-strong)",
                        fontSize: "9.5px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "var(--text-primary)",
                      }}
                    >
                      <span
                        className="rounded-full"
                        style={{ width: "4px", height: "4px", backgroundColor: "var(--luxury)", display: "inline-block", flexShrink: 0 }}
                        aria-hidden="true"
                      />
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social icons — mobile: row below card */}
            <div className="flex lg:hidden items-center justify-center gap-3 mt-5">
              {[
                { Icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/fcs-tanu-agarwal" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/talklaws4" },
                { Icon: Facebook,  label: "Facebook",  href: "https://www.facebook.com/share/19GNaXB237/" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all shadow-sm"
                  aria-label={label}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>

            {/* Professional Highlights — under the portrait card */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                Professional Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map(({ Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 hover:border-[var(--luxury)]/40 transition-colors"
                  >
                    <Icon
                      size={14}
                      className="text-[var(--luxury-text)] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right — Quote + Bio + Credentials ───────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Section label */}
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
                Message from Founder
              </span>
            </motion.div>

            {/* Quote */}
            <motion.div variants={fadeInUp} className="relative">
              <Quote size={32} className="text-[var(--primary)]/12 mb-4" aria-hidden="true" />
              <blockquote className="space-y-4">
                <p
                  className="text-2xl sm:text-3xl font-light text-[var(--text-primary)] leading-snug"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  &ldquo;Good governance isn&apos;t just about compliance — it&apos;s about
                  building businesses that earn trust, attract investment,
                  and grow sustainably.&rdquo;
                </p>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                  FCS Tanu Agarwal is a Practicing Fellow Company Secretary with over
                  23 years of specialised experience in corporate governance, company
                  law, and strategic business advisory. She advises listed companies,
                  startups, NBFCs, and emerging enterprises across SEBI &amp; RBI
                  compliance, IPO readiness, corporate restructuring, and mergers &amp; acquisitions.
                </p>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                  Recognised as an Independent Director and a faculty member at the
                  Institute of Company Secretaries of India, she brings institutional
                  depth and board-level perspective to every engagement. TALKLAWS was
                  built on a single conviction: that governance done right is not a
                  cost — it is a competitive advantage.
                </p>
              </blockquote>
            </motion.div>

            {/* Executive profile card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                Executive Profile
              </h3>
              <div className="space-y-3.5">
                {credentials.map((cred) => (
                  <div key={cred.label} className="flex items-start gap-3 text-sm">
                    <span className="text-[var(--luxury-text)] font-semibold shrink-0 w-28 pt-px">
                      {cred.label}
                    </span>
                    <span className="text-[var(--text-secondary)] leading-relaxed">
                      {cred.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
