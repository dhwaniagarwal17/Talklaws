"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Tag, Search, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ArticleIllustration from "@/components/ArticleIllustration";

interface Props {
  articles: Article[];
  categories: string[];
}

export default function InsightsListing({ articles, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesQuery =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]"
          >
            Insights &amp; Perspectives
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mt-4 text-5xl sm:text-6xl font-bold text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Insights &amp;
            <br />
            Resources.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-xl"
          >
            Legal intelligence, regulatory updates, compliance guides, and thought leadership from
            the TALKLAWS advisory team.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-56">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)]/40 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Article grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + query}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-[0_16px_48px_rgba(128,0,32,0.08)] transition-all duration-300"
                >
                  <Link href={`/insights/${article.slug}`} className="flex flex-col h-full">
                    {/* Category illustration */}
                    <ArticleIllustration
                      category={article.category}
                      coverImage={article.coverImage}
                      title={article.title}
                      className="h-40 w-full"
                    />
                    {/* Category badge — sits just below the illustration */}
                    <div className="relative -mt-8 mx-4 mb-2">
                      <span className="inline-flex items-center gap-1.5 bg-[var(--card)]/90 backdrop-blur-sm border border-[var(--border)] text-[var(--text-secondary)] text-xs font-medium px-2.5 py-1 rounded-full">
                        <Tag size={10} />
                        {article.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {article.readTime} read
                        </span>
                      </div>

                      <h2
                        className="font-semibold text-[var(--text-primary)] text-base leading-snug group-hover:text-[var(--primary)] transition-colors duration-200"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {article.title}
                      </h2>

                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light line-clamp-2 flex-1">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-[var(--text-secondary)]">{article.author}</span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)]">
                          Read
                          <ArrowRight size={11} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <BookOpen size={40} className="text-[var(--border-strong)]" />
              <p className="text-[var(--text-secondary)] text-sm">
                No articles found for &ldquo;{query}&rdquo; in &ldquo;{activeCategory}&rdquo;.
              </p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
