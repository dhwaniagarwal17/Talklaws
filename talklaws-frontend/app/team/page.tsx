"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Linkedin, Instagram, Github, Mail,
  Award, BookOpen, Shield, CheckCircle2,
  Code2, Globe, LayoutDashboard, Briefcase,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

// ─────────────────────────────────────────────────────────────────────────────
// Data — add future team members here; layout scales automatically
// ─────────────────────────────────────────────────────────────────────────────

interface SocialLink {
  Icon: React.ElementType;
  label: string;
  href: string | null;
}

interface Highlight {
  Icon: React.ElementType;
  text: string;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  chips: string[];
  quote: string;
  bio: string[];
  highlightsLabel: string;
  highlights: Highlight[];
  socials: SocialLink[];
  isFounder?: boolean;
  /** Optional badge label shown top-left of the portrait, like "Founder" */
  badge?: string;
  /** Path under /public — e.g. "/images/team/tanu-agarwal.jpg" */
  photo?: string;
  /** CSS object-position value — fine-tunes face framing after scale */
  photoPosition?: string;
}

const team: TeamMember[] = [
  {
    id: "tanu-agarwal",
    name: "FCS Tanu Agarwal",
    designation: "Founder & Managing Partner",
    chips: ["FCS", "23+ Years", "Ind. Director", "ICSI"],
    isFounder: true,
    photo: "/images/team/tanu-agarwal.jpg",
    photoPosition: "center 20%",
    quote:
      "Strong governance is not merely about compliance—it is about building trust, accountability, and sustainable organisations.",
    bio: [
      "FCS Tanu Agarwal is a Practising Fellow Company Secretary with over 23 years of experience in corporate governance, company law, regulatory compliance, mergers & acquisitions, and strategic business advisory.",
      "She advises listed companies, startups, NBFCs, and emerging enterprises on governance, restructuring, SEBI & RBI compliance, ESG, CSR, and board-level matters. Her approach combines legal precision with practical business insight to help organisations build sustainable governance frameworks.",
    ],
    highlightsLabel: "Professional Highlights",
    highlights: [
      { Icon: Award,        text: "Practising Fellow Company Secretary" },
      { Icon: Shield,       text: "Independent Director" },
      { Icon: BookOpen,     text: "Faculty – Institute of Company Secretaries of India" },
      { Icon: CheckCircle2, text: "Member – Quality Review Board, ICSI" },
      { Icon: Shield,       text: "Chairperson, POSH ICC – Ministry of Corporate Affairs" },
      { Icon: Award,        text: "Lifetime Member – ID Repository" },
      { Icon: CheckCircle2, text: "POSH Trainer & Corporate Governance Advisor" },
    ],
    socials: [
      { Icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/fcs-tanu-agarwal" },
      { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/talklaws4" },
    ],
  },
  {
    id: "dhwani-agarwal",
    name: "Dhwani Agarwal",
    designation: "Technology & Digital Initiatives Intern",
    chips: ["Digital Initiatives", "Website Development", "User Experience", "Content Management"],
    quote:
      "Every meaningful digital experience begins with understanding the people it is built for.",
    bio: [
      "Dhwani Agarwal supports TALKLAWS' digital initiatives by contributing to the development and continuous enhancement of the firm's online platform.",
      "She is involved in website development, content publishing, user experience improvements, and the implementation of digital solutions that strengthen client engagement and knowledge sharing. Passionate about technology, user experience, and continuous learning, she is committed to building digital solutions that improve accessibility, engagement, and the overall client experience.",
    ],
    highlightsLabel: "Key Contributions",
    highlights: [
      { Icon: Code2,           text: "Website Development & Maintenance" },
      { Icon: Globe,           text: "Digital Platform Management" },
      { Icon: LayoutDashboard, text: "User Experience Enhancement" },
      { Icon: BookOpen,        text: "Insights & Resources Publishing" },
      { Icon: Briefcase,       text: "Content & Technical Support" },
      { Icon: CheckCircle2,    text: "Digital Innovation Initiatives" },
    ],
    socials: [
      { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/dhwani-agarwal-2b9166336?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      
    ],
    badge: "Digital Initiatives",
    photo: "/images/team/dhwani-agarwal.jpg",
    photoPosition: "center 15%",
  },
  {
    id: "ankur-agarwal",
    name: "CS Ankur Agarwal",
    designation: "Consulting Partner (External)",
    chips: ["Corporate Law", "Governance", "Compliance", "Advisory"],
    badge: "Consulting Partner",
    quote:
      "Sustainable business growth is built on a strong foundation of governance, integrity, and informed decision-making.",
    bio: [
      "CS Ankur Agarwal is associated with TALKLAWS as an External Consulting Partner, contributing to select corporate and regulatory advisory engagements.",
      "He collaborates with the firm in providing practical, business-oriented guidance across corporate governance, secretarial compliance, regulatory matters, and strategic advisory. His collaborative approach complements TALKLAWS' commitment to delivering client-focused solutions built on integrity, professionalism, and sound governance principles.",
    ],
    highlightsLabel: "Professional Highlights",
    highlights: [
      { Icon: Shield,       text: "Corporate Governance Advisory" },
      { Icon: CheckCircle2, text: "Mergers & Acquisitions" },
      { Icon: BookOpen,     text: "Regulatory Advisory" },
      { Icon: Briefcase,    text: "Strategic Business Consulting" },
      { Icon: Award,        text: "Corporate Law Support" },
      { Icon: CheckCircle2, text: "Governance & Compliance" },
    ],
    socials: [
      { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ankur-agarwal-b2308611?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      
    ],
    photo: "/images/team/ankur-agarwal.jpeg",
    photoPosition: "center 20%",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ProfileCard — self-contained premium card, equal for every member
// ─────────────────────────────────────────────────────────────────────────────
function ProfileCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden
                 hover:border-[var(--primary)]/25 hover:shadow-[0_20px_60px_rgba(107,0,26,0.09)]
                 transition-all duration-500"
    >
      {/* ── Portrait area ──────────────────────────────────────────── */}
      {/*
        Structured header: surface background, portrait centred as a
        contained image (not full-bleed), badges top-left, socials top-right.
        Name + designation sit below the portrait on the card background.
      */}
      <div className="relative bg-[var(--surface)] shrink-0 px-6 pt-6 pb-5">
        {/* Corner decoration — subtle brand accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(107,0,26,0.05) 0%, rgba(196,160,53,0.04) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Founder / role badge — top-left */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div>
            {member.isFounder && (
              <span
                className="text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                  color: "#fff",
                }}
              >
                Founder
              </span>
            )}
            {!member.isFounder && member.badge && (
              <span
                className="text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #6B001A, #8B2040)",
                  color: "#fff",
                }}
              >
                {member.badge}
              </span>
            )}
          </div>

          {/* Social icons — top-right */}
          <div className="flex items-center gap-1.5">
            {member.socials.map(({ Icon, label, href }) =>
              href ? (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-[var(--card)] border border-[var(--border)]
                             rounded-xl flex items-center justify-center text-[var(--text-secondary)]
                             hover:text-[var(--primary)] hover:border-[var(--primary)]/40
                             hover:shadow-[0_4px_12px_rgba(107,0,26,0.15)] transition-all duration-200 shadow-sm"
                  aria-label={label}
                >
                  <Icon size={13} />
                </motion.a>
              ) : (
                <div
                  key={label}
                  title={`${label} — coming soon`}
                  className="w-8 h-8 bg-[var(--card)] border border-[var(--border)]
                             rounded-xl flex items-center justify-center text-[var(--border-strong)]
                             cursor-not-allowed shadow-sm"
                  aria-label={`${label} (coming soon)`}
                >
                  <Icon size={13} />
                </div>
              )
            )}
          </div>
        </div>

        {/* Portrait — 4:5 contained image, centred */}
        <div className="relative z-10 mx-auto w-52 sm:w-60">
          <div
            className="relative w-full rounded-2xl overflow-hidden border-2 border-[var(--border)]"
            style={{
              aspectRatio: "4 / 5",
              boxShadow: "0 8px 32px rgba(107,0,26,0.14), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={`${member.name} — ${member.designation}`}
                fill
                className="object-cover"
                style={{
                  objectPosition: member.photoPosition ?? "center center",
                }}
                sizes="(max-width: 640px) 208px, 240px"
              />
            ) : (
              /* Fallback silhouette */
              <div
                className="absolute inset-0 flex items-center justify-center bg-[var(--surface)]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 80 100" fill="none" className="w-16 h-20 opacity-30">
                  <circle cx="40" cy="32" r="20" fill="var(--border-strong)" />
                  <path d="M8 100 Q20 68 40 64 Q60 68 72 100Z" fill="var(--border-strong)" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Name + designation — below portrait, on surface background */}
        <div className="relative z-10 mt-4 text-center">
          <p
            className="font-bold text-lg text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {member.name}
          </p>
          <p className="text-xs text-[var(--luxury-text)] font-medium mt-0.5 leading-snug">
            {member.designation}
          </p>
          {/* Gold rule */}
          <div className="mt-3 w-8 h-0.5 bg-[var(--luxury)] rounded-full mx-auto" />
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-5">

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5">
          {member.chips.map((chip) => (
            <span
              key={chip}
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
                style={{
                  width: "4px", height: "4px",
                  backgroundColor: "var(--luxury)",
                  borderRadius: "50%", display: "inline-block", flexShrink: 0,
                }}
                aria-hidden="true"
              />
              {chip}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div className="space-y-3">
          {member.bio.map((para, i) => (
            <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative pl-4 border-l-2 border-[var(--luxury)]/50">
          <Quote size={14} className="text-[var(--primary)]/30 mb-1.5" aria-hidden="true" />
          <p
            className="text-sm italic text-[var(--text-secondary)] leading-relaxed"
            style={{ letterSpacing: "-0.01em" }}
          >
            &ldquo;{member.quote}&rdquo;
          </p>
        </blockquote>

        {/* Highlights */}
        <div className="space-y-2.5 mt-auto">
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
            {member.highlightsLabel}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {member.highlights.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-2 bg-[var(--bg)] border border-[var(--border)]
                           rounded-xl px-3 py-2 hover:border-[var(--luxury)]/40 transition-colors"
              >
                <Icon size={12} className="text-[var(--luxury-text)] mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
            >
              Our People
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="mt-4 text-5xl sm:text-6xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Meet the
              <br />
              Team.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed font-light"
            >
              Our multidisciplinary team combines corporate governance expertise, strategic
              advisory, and digital innovation to deliver practical, client-focused solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards grid ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/*
            Two-column grid on md+, single column on mobile.
            items-start so cards are top-aligned; each card grows to fill its column
            (flex-col + flex-1 on the body ensures cards of equal height on desktop).
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {team.map((member, i) => (
              <ProfileCard key={member.id} member={member} index={i} />
            ))}
          </div>

          {/* Future members note — only visible if > 2 members */}
          {team.length > 2 && (
            <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
              Showing {team.length} team members
            </p>
          )}

          {/* Closing statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center text-sm text-[var(--text-secondary)] font-light
                       max-w-xl mx-auto leading-relaxed"
            style={{ letterSpacing: "-0.01em" }}
          >
            Together, we combine legal expertise with digital innovation to deliver
            a modern advisory experience for businesses.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-10
                       text-center space-y-4"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
              Work with us
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ready to talk to the team?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-light max-w-md mx-auto">
              Book a consultation with our advisory team and get clarity on your
              legal and compliance needs.
            </p>
            <Link href="/#contact">
              <motion.span
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg)]
                           font-semibold text-sm px-6 py-3 rounded-xl mt-2 cursor-pointer
                           hover:bg-[var(--luxury)] hover:text-white
                           transition-all duration-200 shadow-sm"
              >
                Book a Consultation
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
