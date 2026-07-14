/**
 * app/insights/[slug]/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Dynamic article page — /insights/[slug]
 * One reusable template serves every article in lib/articles.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/articles";
import ArticleContent from "./ArticleContent";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Pre-generate all article paths at build time */
export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

/** Dynamic metadata per article */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found — TALKLAWS" };

  return {
    title: `${article.title} — TALKLAWS`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      siteName: "TALKLAWS",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return <ArticleContent article={article} related={related} />;
}
