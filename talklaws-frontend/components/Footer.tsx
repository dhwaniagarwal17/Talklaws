"use client";

/**
 * Footer.tsx
 * Fixed: footer nav links now scroll to the correct section IDs.
 * Root cause: all links had href="#" which always scrolled to the top.
 * Fix: replaced with a scrollTo helper that targets real section IDs.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

// ─── Footer link map ──────────────────────────────────────────────────────────
// Each entry maps a visible label to its target section ID (or null for
// pages/items that don't have a section yet).
const footerLinks: Record<string, { label: string; sectionId: string | null; href?: string }[]> = {
  Services: [
    { label: "Corporate Advisory",      sectionId: null, href: "/#services" },
    { label: "Startup & Venture Legal", sectionId: null, href: "/#services" },
    { label: "Regulatory Compliance",   sectionId: null, href: "/#services" },
    { label: "M&A & Transactions",      sectionId: null, href: "/#services" },
    { label: "Contracts & Agreements",  sectionId: null, href: "/#services" },
    { label: "IP & Technology Law",     sectionId: null, href: "/#services" },
  ],
  Company: [
    { label: "About TALKLAWS", sectionId: null, href: "/#about" },
    { label: "Meet the Team",  sectionId: null, href: "/team" },
    { label: "Insights",       sectionId: null, href: "/insights" },
    { label: "Careers",        sectionId: null },
    { label: "Contact",        sectionId: null, href: "/#contact" },
  ],
  Legal: [
    { label: "Privacy Policy",   sectionId: null, href: "/privacy-policy" },
    { label: "Terms of Use",     sectionId: null, href: "/terms-of-use" },
    { label: "Disclaimer",      sectionId: null, href: "/disclaimer" },
    { label: "Cookie Policy",   sectionId: null, href: "/cookie-policy" },
  ],
};

// Smooth-scroll helper — scrolls to a section by ID
function scrollToSection(sectionId: string | null) {
  if (!sectionId) return;
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Footer() {
  const currentYear = 2026;
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subMsg, setSubMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    setSubState("loading");
    setSubMsg("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), source: "footer" }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setSubState("success");
        setSubMsg(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setSubState("error");
        setSubMsg(data.errors?.[0]?.message || data.message || "Something went wrong.");
      }
    } catch {
      setSubState("error");
      setSubMsg("Could not connect. Please try again.");
    }
  };

  return (
    <footer
      style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
      aria-label="Site footer"
    >
      {/* Newsletter bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* Left — copy */}
            <motion.div variants={fadeInUp} className="space-y-1">
              <h3
                className="font-semibold text-base"
                style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
              >
                Stay Updated with TALKLAWS
              </h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", fontWeight: 300 }}>
                Receive an email when we publish a new insight or regulatory update. No spam.
              </p>
            </motion.div>

            {/* Right — input + button */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-2 w-full sm:w-auto"
            >
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center rounded-xl overflow-hidden flex-1 sm:w-64"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1D1D1" }}
                >
                  <Mail
                    size={14}
                    className="ml-4 shrink-0"
                    style={{ color: "#9CA3AF" }}
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubState("idle"); setSubMsg(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className="px-3 py-3 flex-1 focus:outline-none font-light text-sm"
                    style={{ backgroundColor: "transparent", color: "#1F1F1F" }}
                    aria-label="Email for newsletter"
                    disabled={subState === "loading" || subState === "success"}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: subState === "loading" ? 1 : 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubscribe}
                  disabled={subState === "loading" || subState === "success"}
                  className="text-sm font-semibold px-4 py-3 rounded-xl whitespace-nowrap"
                  style={{
                    backgroundColor: subState === "success" ? "#166534" : "#C4A035",
                    color: "#FFFFFF",
                    opacity: subState === "loading" ? 0.7 : 1,
                    cursor: subState === "loading" || subState === "success" ? "not-allowed" : "pointer",
                  }}
                >
                  {subState === "loading" ? "…" : subState === "success" ? "Subscribed ✓" : "Subscribe"}
                </motion.button>
              </div>
              {/* Feedback message */}
              {subMsg && (
                <p style={{
                  fontSize: "0.75rem",
                  color: subState === "success" ? "#86EFAC" : "#FCA5A5",
                  margin: 0,
                }}>
                  {subMsg}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="col-span-2 space-y-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              className="flex items-center gap-3"
            >
              <svg width="28" height="34" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="26.5" y="8" width="3" height="52" rx="1.5" fill="#C4A035" />
                <rect x="16" y="58" width="24" height="3" rx="1.5" fill="white" opacity="0.5" />
                <rect x="8" y="22" width="40" height="2.5" rx="1.25" fill="white" opacity="0.7" />
                <circle cx="28" cy="23.25" r="4" fill="#C4A035" />
                <circle cx="28" cy="23.25" r="2" fill="#0A0A0A" opacity="0.6" />
                <circle cx="28" cy="9" r="3" fill="#C4A035" />
                <line x1="12" y1="24.5" x2="12" y2="36" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                <line x1="44" y1="24.5" x2="44" y2="36" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M5 36 Q12 43 19 36" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M37 36 Q44 43 51 36" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold text-sm tracking-[0.08em] uppercase"
                  style={{ color: "#FFFFFF" }}
                >
                  TALKLAWS
                </span>
                <span
                  className="text-[9px] tracking-[0.15em] uppercase font-medium mt-0.5"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Legal Advisory
                </span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.1 }}
              className="text-sm leading-relaxed font-light max-w-xs"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Premier corporate legal and compliance advisory for India&apos;s
              most ambitious businesses.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {[
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/fcs-tanu-agarwal" },
                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/19GNaXB237/" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/talklaws4" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#FFFFFF" }}
                  aria-label={label}
                >
                  <Icon size={14} aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>

            {/* Offices */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              {["Lucknow — Hazratganj", "New Delhi", "Mumbai"].map((office) => (
                <div
                  key={office}
                  className="text-xs font-light"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {office}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <div key={category} className="space-y-5">
              <motion.h4
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: i * 0.05 }}
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {category}
              </motion.h4>
              <ul className="space-y-3" role="list">
                {links.map((link, j) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ delay: i * 0.05 + j * 0.03 }}
                  >
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm font-light transition-colors duration-150"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(link.sectionId)}
                        className="text-sm font-light transition-colors duration-150 text-left"
                        style={{ color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: link.sectionId ? "pointer" : "default", padding: 0 }}
                        onMouseEnter={(e) => { if (link.sectionId) e.currentTarget.style.color = "#FFFFFF"; }}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      >
                        {link.label}
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-xs font-light"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              © {currentYear} TALKLAWS. All rights reserved. Not a law firm. Advisory services only.
            </p>
            <div className="flex items-center gap-6">
              {["Bar Council Compliance", "Disclaimer"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
