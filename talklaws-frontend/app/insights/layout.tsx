/**
 * app/insights/layout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared layout for /insights and /insights/[slug].
 * Includes the site Navbar and Footer so article pages feel part of the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
