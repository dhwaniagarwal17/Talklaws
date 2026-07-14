/**
 * app/insights/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Insights & Resources listing page — /insights
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next";
import InsightsListing from "./InsightsListing";
import { getAllArticles, getCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Insights & Resources — TALKLAWS",
  description:
    "Legal insights, regulatory updates, compliance guides, and thought leadership from the TALKLAWS advisory team.",
};

export default function InsightsPage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return <InsightsListing articles={articles} categories={categories} />;
}
