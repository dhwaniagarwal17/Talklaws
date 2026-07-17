"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { navItems } from "@/lib/data";

/**
 * Smoothly scrolls to a section by id.
 * Wrapped in requestAnimationFrame so it runs after any layout paint.
 */
function scrollToSection(id: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
}

/**
 * Given a nav href like "/#services" or "/insights", returns whether it
 * should be treated as "active" based on the current pathname + section.
 */
function isActive(href: string, pathname: string, activeSection: string): boolean {
  if (href === "/insights") return pathname.startsWith("/insights");
  // href is like "/#services" — extract the hash part
  const hash = href.split("#")[1];
  return hash ? activeSection === `#${hash}` : false;
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  // ── Scroll shadow ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Active section tracker (homepage only) ───────────────────────────────
  useEffect(() => {
    if (!isHomepage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHomepage]);

  // ── Scroll-to-hash after arriving on homepage via a /#section link ────────
  // pathname is the dep so this re-runs every time the route changes.
  // The pathname === "/" guard means it only acts when we're on the homepage,
  // covering both initial load and arriving via router.push("/#section").
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash; // e.g. "#services"
    if (hash) scrollToSection(hash.slice(1));
  }, [pathname]);

  // ── Navigation handler ───────────────────────────────────────────────────
  const handleNavClick = useCallback(
    (href: string) => {
      setMenuOpen(false);

      // Pure page route (no hash) — just navigate
      if (!href.includes("#")) {
        router.push(href);
        return;
      }

      const hash = href.split("#")[1];

      if (isHomepage) {
        // Already on homepage — scroll directly, no navigation needed
        scrollToSection(hash);
      } else {
        // On any other page — navigate to homepage with hash;
        // the useEffect above will scroll once pathname becomes "/"
        router.push(`/#${hash}`);
      }
    },
    [isHomepage, router]
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 rounded-2xl ${
          scrolled
            ? "bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="flex items-center justify-between px-5 py-3"
          aria-label="Main navigation"
        >
          {/* ── Logo — always navigates to / ────────────────────────── */}
          <Link href="/" aria-label="TALKLAWS — Home">
            <motion.span
              className="flex items-center gap-2.5 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="15" y="24" width="2" height="6" rx="1" fill="var(--primary)" />
                  <rect x="5" y="11" width="22" height="1.5" rx="0.75" fill="var(--primary)" />
                  <circle cx="16" cy="11.75" r="2" fill="var(--luxury)" />
                  <rect x="15" y="4" width="2" height="8" rx="1" fill="var(--primary)" />
                  <rect x="11" y="28" width="10" height="1.5" rx="0.75" fill="var(--primary)" />
                  <line x1="8" y1="12" x2="8" y2="18" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="24" y1="12" x2="24" y2="18" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M4 18 Q8 22 12 18" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                  <path d="M20 18 Q24 22 28 18" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                  <circle cx="16" cy="4" r="1.5" fill="var(--luxury)" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[var(--text-primary)] font-bold text-sm tracking-[0.08em] uppercase">
                  TALKLAWS
                </span>
                <span className="text-[var(--text-secondary)] text-[9px] tracking-[0.15em] uppercase font-semibold mt-0.5">
                  Legal Advisory
                </span>
              </div>
            </motion.span>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => {
              const active = isActive(item.href, pathname, activeSection);
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-[var(--border)] rounded-lg -z-10"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Right side actions ───────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
              aria-label="Toggle colour mode"
            >
              {mounted ? (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                  </motion.span>
                </AnimatePresence>
              ) : (
                <span className="w-4 h-4" />
              )}
            </motion.button>

            {/* Book Consultation CTA */}
            <motion.button
              onClick={() => handleNavClick("/#contact")}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-1.5 bg-[var(--text-primary)] text-[var(--bg)] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[var(--luxury)] hover:text-white transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(166,124,58,0.35)]"
            >
              Book Consultation
              <ArrowRight size={14} />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 bg-[var(--card)]/95 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
          >
            <ul className="p-4 space-y-1" role="list">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--border)] transition-colors"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="pt-2"
              >
                <button
                  onClick={() => handleNavClick("/#contact")}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-medium py-3 rounded-xl hover:bg-[var(--secondary)] transition-colors"
                >
                  Book Consultation
                  <ArrowRight size={16} />
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
