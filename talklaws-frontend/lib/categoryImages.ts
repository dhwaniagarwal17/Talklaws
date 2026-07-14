/**
 * lib/categoryImages.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Maps every ArticleCategory to an image path under /public/images/articles/categories/.
 *
 * HOW TO ADD A COVER IMAGE FOR A CATEGORY:
 *   1. Drop the image into public/images/articles/categories/
 *      e.g. public/images/articles/categories/corporate-law.jpg
 *   2. Set the value here to "/images/articles/categories/corporate-law.jpg"
 *
 * HOW TO ADD A NEW CATEGORY:
 *   1. Add the category string to ArticleCategory in lib/types.ts
 *   2. Add it here with a path (or null to use the SVG fallback)
 *
 * Setting a value to null means the SVG illustration will be used instead.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ArticleCategory } from "./types";

export const CATEGORY_IMAGES: Record<ArticleCategory, string | null> = {
  "Corporate Law":               null,
  "Corporate Governance":        "/images/articles/categories/corporate-governance.jpeg",
  "Compliance":                  null,
  "Startups":                    "/images/articles/categories/startups.jpeg",
  "SEBI & RBI":                  "/images/articles/categories/sebi-rbi.webp",
  "CSR & ESG":                   "/images/articles/categories/csr-esg.jpeg",
  "Intellectual Property":       null,
  "DPDP Act":                    "/images/articles/categories/dpdp-act.webp",
  "Employment Law":              null,
  "Regulatory Updates":          null,
  "M&A":                         "/images/articles/categories/ma.jpeg",
  "Regulatory":                  null,
  "POSH & Workplace Compliance": "/images/articles/categories/posh.jpeg",
};

/**
 * Returns the resolved cover image path for a given category,
 * or null if no image is configured (SVG illustration will be used).
 */
export function getCategoryImage(category: ArticleCategory): string | null {
  return CATEGORY_IMAGES[category] ?? null;
}
