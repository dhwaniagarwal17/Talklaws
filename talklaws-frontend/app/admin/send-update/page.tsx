"use client";

/**
 * app/admin/send-update/page.tsx
 * Send an article update email to all Active subscribers via Resend.
 * Protected: redirects to /admin if not logged in.
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminAuthProvider, useAdminAuth, apiFetch } from "@/lib/adminAuth";

function AdminHeader({ name, onLogout }: { name: string; onLogout: () => void }) {
  return (
    <header style={{
      backgroundColor: "#0A0A0A", color: "#fff",
      padding: "0 2rem", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <svg width="22" height="27" viewBox="0 0 56 72" fill="none">
            <rect x="26.5" y="8" width="3" height="52" rx="1.5" fill="#C4A035" />
            <rect x="8" y="22" width="40" height="2.5" rx="1.25" fill="white" opacity="0.8" />
            <circle cx="28" cy="23.25" r="4" fill="#C4A035" />
            <path d="M5 36 Q12 43 19 36" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M37 36 Q44 43 51 36" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em" }}>TALKLAWS ADMIN</span>
        </div>
        <nav style={{ display: "flex", gap: "0.25rem" }}>
          {[
            { label: "Enquiries",   href: "/admin/dashboard" },
            { label: "Subscribers", href: "/admin/subscribers" },
            { label: "Send Update", href: "/admin/send-update" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              style={{
                color: "rgba(255,255,255,0.6)", fontSize: "0.8rem",
                padding: "0.375rem 0.75rem", borderRadius: "0.5rem", textDecoration: "none",
                backgroundColor: item.href === "/admin/send-update" ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{name}</span>
        <button onClick={onLogout}
          style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.5rem", padding: "0.375rem 0.875rem", fontSize: "0.8rem", cursor: "pointer" }}
        >Sign Out</button>
      </div>
    </header>
  );
}

function SendUpdatePage() {
  const { admin, token, loading, logout } = useAdminAuth();
  const router = useRouter();

  const [title, setTitle]       = useState("");
  const [articleUrl, setUrl]    = useState("");
  const [excerpt, setExcerpt]   = useState("");
  const [sending, setSending]   = useState(false);
  const [result, setResult]     = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => { if (!loading && !admin) router.replace("/admin"); }, [admin, loading, router]);

  const handleSend = async () => {
    if (!title.trim() || !articleUrl.trim() || !excerpt.trim()) {
      setResult({ success: false, message: "All three fields are required before sending." });
      return;
    }
    if (!confirm(`Send this update to all Active subscribers?\n\nTitle: ${title}\nURL: ${articleUrl}`)) return;

    setSending(true);
    setResult(null);
    try {
      const res = await apiFetch("/api/admin/subscribers/send-update", token!, {
        method: "POST",
        body: JSON.stringify({ title, articleUrl, excerpt }),
      });
      const data = await res.json();
      setResult({ success: res.ok && data.success, message: data.message || "Something went wrong." });
      if (res.ok && data.success) { setTitle(""); setUrl(""); setExcerpt(""); }
    } catch {
      setResult({ success: false, message: "Could not connect to the server." });
    }
    setSending(false);
  };

  if (loading || !admin) return null;

  const field = (label: string, hint: string, value: string, onChange: (v: string) => void, multiline = false) => (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
        {label}
      </label>
      <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: "0 0 0.5rem" }}>{hint}</p>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4}
          style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111", backgroundColor: "#FAF8F6", outline: "none", resize: "vertical", boxSizing: "border-box" }}
        />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111", backgroundColor: "#FAF8F6", outline: "none", boxSizing: "border-box" }}
        />
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F6" }}>
      <AdminHeader name={admin.name} onLogout={() => { logout(); router.replace("/admin"); }} />

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.03em" }}>Send Update</h1>
          <p style={{ color: "#7A7A7A", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Send a branded email to all Active subscribers about a new article or insight.
          </p>
        </div>

        <div style={{ backgroundColor: "#fff", border: "1px solid #E5E5E5", borderRadius: "1.25rem", padding: "2rem" }}>
          {field("Article Title", "The headline shown in the email subject and body.", title, setTitle)}
          {field("Article URL", "Full URL — e.g. https://talklaws.com/insights/dpdp-act-startups", articleUrl, setUrl)}
          {field("Short Excerpt", "1–3 sentences. Appears below the title in the email body. Max 500 characters.", excerpt, setExcerpt, true)}

          {result && (
            <div style={{
              padding: "0.875rem 1rem", borderRadius: "0.75rem", marginBottom: "1.25rem",
              backgroundColor: result.success ? "#F0FDF4" : "#FEF2F2",
              border: `1px solid ${result.success ? "#BBF7D0" : "#FECACA"}`,
              color: result.success ? "#166534" : "#991B1B",
              fontSize: "0.875rem",
            }}>
              {result.message}
            </div>
          )}

          <button onClick={handleSend} disabled={sending}
            style={{
              width: "100%", padding: "0.875rem", backgroundColor: sending ? "#9CA3AF" : "#6B001A",
              color: "#fff", border: "none", borderRadius: "0.75rem",
              fontSize: "0.9rem", fontWeight: 600, cursor: sending ? "not-allowed" : "pointer",
              letterSpacing: "0.01em",
            }}
          >
            {sending ? "Sending…" : "Send Email to All Active Subscribers"}
          </button>

          <p style={{ fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center", marginTop: "0.875rem" }}>
            Only Active subscribers receive this email. Unsubscribed addresses are automatically excluded.
          </p>
        </div>

        {/* Preview note */}
        <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", backgroundColor: "#fff", border: "1px solid #E5E5E5", borderRadius: "1rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", margin: "0 0 0.5rem" }}>📋 What the email contains</p>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.8 }}>
            <li>TALKLAWS branding header (dark, with gold logo)</li>
            <li>Gold divider and "New Insight" badge</li>
            <li>Article title and excerpt</li>
            <li>"Read Article →" button linking to the provided URL</li>
            <li>One-click unsubscribe link in the footer</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default function SendUpdatePageWrapper() {
  return <AdminAuthProvider><SendUpdatePage /></AdminAuthProvider>;
}
