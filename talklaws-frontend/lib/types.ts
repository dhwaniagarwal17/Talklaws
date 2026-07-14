export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  size?: "large" | "medium" | "small";
}

export interface Industry {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

// ── Legacy alias kept for backward compatibility ──────────────────────────────
export type InsightArticle = Article;

// ── Article categories ────────────────────────────────────────────────────────
export type ArticleCategory =
  | "Corporate Law"
  | "Corporate Governance"
  | "Compliance"
  | "Startups"
  | "SEBI & RBI"
  | "CSR & ESG"
  | "Intellectual Property"
  | "DPDP Act"
  | "Employment Law"
  | "Regulatory Updates"
  | "M&A"
  | "Regulatory"
  | "POSH & Workplace Compliance";

// ── Content block types for rich article body ─────────────────────────────────
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; text: string; variant?: "info" | "warning" | "tip" }
  | { type: "divider" };

// ── Full Article ──────────────────────────────────────────────────────────────
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readTime: string;
  author: string;
  authorRole?: string;
  coverImage?: string;
  /** Rich article body rendered on the article page */
  content: ContentBlock[];
  /** Optional — only for articles originally published elsewhere */
  externalSourceUrl?: string;
  externalSourceLabel?: string;
  /** IDs or slugs of related articles */
  relatedSlugs?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}
