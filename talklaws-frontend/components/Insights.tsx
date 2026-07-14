"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { getAllArticles } from "@/lib/articles";
import ArticleIllustration from "@/components/ArticleIllustration";

const PREVIEW_COUNT = 3;

export default function Insights() {
  const articles = getAllArticles().slice(0, PREVIEW_COUNT);

  return (
    <section
      id="insights"
      className="py-24 lg:py-32 bg-[var(--bg)]"
      aria-label="Insights & Resources section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex items-end justify-between gap-8 mb-14"
        >
          <div className="space-y-4">
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
            >
              Insights &amp; Perspectives
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Insights &amp;
              <br />
              Resources.
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp}>
            <Link
              href="/insights"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] border border-[var(--border)] px-4 py-2.5 rounded-xl transition-all duration-200 hover:border-[var(--primary)] shrink-0"
            >
              View all articles
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Article cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden cursor-pointer hover:border-[var(--primary)]/30 hover:shadow-[0_16px_48px_rgba(128,0,32,0.08)] transition-all duration-300"
            >
              <Link href={`/insights/${article.slug}`} className="flex flex-col h-full" tabIndex={0}>
                {/* Category illustration */}
                <ArticleIllustration
                  category={article.category}
                  coverImage={article.coverImage}
                  title={article.title}
                  className="h-44 w-full"
                />
                {/* Category badge — overlaid on illustration */}
                <div className="relative -mt-8 mx-4 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-[var(--card)]/90 backdrop-blur-sm border border-[var(--border)] text-[var(--text-secondary)] text-xs font-medium px-2.5 py-1 rounded-full">
                    <Tag size={10} />
                    {article.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6 space-y-4 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {article.readTime} read
                    </span>
                  </div>

                  <h3
                    className="font-semibold text-[var(--text-primary)] text-base leading-snug group-hover:text-[var(--primary)] transition-colors duration-200"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] pt-2">
                    Read article
                    <motion.span animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight size={12} />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* ── Mobile "View all" button ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          className="mt-8 flex justify-center md:hidden"
        >
          <Link
            href="/insights"
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] border border-[var(--border)] px-5 py-3 rounded-xl"
          >
            View all articles
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
