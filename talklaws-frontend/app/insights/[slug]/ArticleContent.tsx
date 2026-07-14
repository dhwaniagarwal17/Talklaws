"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CalendarDays,
  User,
  Tag,
  ExternalLink,
  AlertCircle,
  Lightbulb,
  Info,
} from "lucide-react";
import Link from "next/link";
import type { Article, ContentBlock } from "@/lib/types";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ArticleIllustration from "@/components/ArticleIllustration";

interface Props {
  article: Article;
  related: Article[];
}

// ── Content block renderer ────────────────────────────────────────────────────
function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[var(--text-secondary)] leading-relaxed font-light text-base">
          {block.text}
        </p>
      );

    case "heading":
      if (block.level === 3) {
        return (
          <h3
            className="text-xl font-semibold text-[var(--text-primary)] mt-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            {block.text}
          </h3>
        );
      }
      return (
        <h2
          className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          {block.text}
        </h2>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="space-y-2 pl-1">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[var(--text-secondary)] font-light text-base">
                <span
                  className="shrink-0 w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[var(--text-secondary)] font-light text-base">
              <span
                className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const variants = {
        info: {
          icon: <Info size={16} />,
          bg: "bg-[var(--primary)]/5",
          border: "border-[var(--primary)]/20",
          text: "text-[var(--primary)]",
        },
        warning: {
          icon: <AlertCircle size={16} />,
          bg: "bg-amber-50 dark:bg-amber-950/20",
          border: "border-amber-200 dark:border-amber-800/40",
          text: "text-amber-700 dark:text-amber-400",
        },
        tip: {
          icon: <Lightbulb size={16} />,
          bg: "bg-[var(--luxury)]/5",
          border: "border-[var(--luxury)]/20",
          text: "text-[var(--luxury-text)]",
        },
      };
      const v = variants[block.variant ?? "info"];
      return (
        <div
          className={`flex gap-3 p-4 rounded-xl border ${v.bg} ${v.border}`}
          role="note"
        >
          <span className={`shrink-0 mt-0.5 ${v.text}`}>{v.icon}</span>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{block.text}</p>
        </div>
      );
    }

    case "divider":
      return <hr className="border-[var(--border)]" />;

    default:
      return null;
  }
}

// ── Related article card ──────────────────────────────────────────────────────
function RelatedCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-[0_12px_36px_rgba(128,0,32,0.07)] transition-all duration-300"
    >
      <Link href={`/insights/${article.slug}`} className="flex flex-col h-full">
        {/* Illustration thumbnail */}
        <ArticleIllustration
          category={article.category}
          coverImage={article.coverImage}
          title={article.title}
          className="h-28 w-full"
        />
        <div className="p-5 flex flex-col gap-3 flex-1">
          <span className="inline-flex items-center gap-1.5 w-fit bg-[var(--surface)] text-[var(--text-secondary)] text-xs font-medium px-2.5 py-1 rounded-full">
            <Tag size={9} />
            {article.category}
          </span>
          <h3
            className="font-semibold text-[var(--text-primary)] text-sm leading-snug group-hover:text-[var(--primary)] transition-colors"
            style={{ letterSpacing: "-0.01em" }}
          >
            {article.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mt-auto">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {article.readTime} read
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ArticleContent({ article, related }: Props) {
  return (
    <div className="bg-[var(--bg)] min-h-screen">
      {/* ── Article hero ───────────────────────────────────────────────── */}
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
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors group"
              >
                <ArrowLeft
                  size={13}
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                />
                All Insights &amp; Resources
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 bg-[var(--primary)]/8 text-[var(--primary)] border border-[var(--primary)]/20 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Tag size={10} />
                {article.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-[var(--text-secondary)] font-light leading-relaxed"
            >
              {article.excerpt}
            </motion.p>

            {/* Meta row */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-5 text-sm text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]"
            >
              <span className="flex items-center gap-2">
                <User size={14} className="text-[var(--text-secondary)]" />
                <span className="font-medium text-[var(--text-primary)]">{article.author}</span>
                {article.authorRole && (
                  <span className="text-xs text-[var(--text-secondary)]">· {article.authorRole}</span>
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {article.readTime} read
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Article body ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl mx-auto space-y-8">
          {article.content.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <RenderBlock block={block} />
            </motion.div>
          ))}

          {/* Optional external source attribution */}
          {article.externalSourceUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-4 border-t border-[var(--border)] flex items-center gap-2"
            >
              <ExternalLink size={14} className="text-[var(--text-secondary)] shrink-0" />
              <p className="text-sm text-[var(--text-secondary)]">
                {article.externalSourceLabel ?? "Originally published on"}{" "}
                <a
                  href={article.externalSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] font-semibold hover:underline"
                >
                  {new URL(article.externalSourceUrl).hostname.replace("www.", "")}
                </a>
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Book a Consultation CTA ────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-14">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
                Need expert guidance?
              </p>
              <h2
                className="text-2xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Book a Consultation
              </h2>
              <p className="text-sm text-[var(--text-secondary)] font-light max-w-sm">
                Speak with our advisory team about your specific legal and compliance needs.
              </p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg)] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[var(--luxury)] hover:text-white transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(166,124,58,0.3)]"
            >
              Get in touch
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Related articles ───────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-24 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto pt-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="mb-8"
            >
              <motion.span
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
              >
                Continue reading
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Related Articles
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <RelatedCard key={r.id} article={r} index={i} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] border border-[var(--border)] hover:border-[var(--primary)]/30 px-5 py-3 rounded-xl transition-all duration-200"
              >
                View all Insights &amp; Resources
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
