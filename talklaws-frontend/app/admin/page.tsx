"use client";

/**
 * app/admin/page.tsx
 * Admin login page — accessible at /admin
 * Redirects to /admin/dashboard after successful login.
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/lib/adminAuth";

function LoginForm() {
  const { login, admin, loading } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    if (!loading && admin) {
      router.replace("/admin/dashboard");
    }
  }, [admin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const err = await login(email, password);
    if (err) {
      setError(err);
      setSubmitting(false);
    } else {
      router.replace("/admin/dashboard");
    }
  };

  if (loading) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Logo + heading */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <svg
            width="40" height="48"
            viewBox="0 0 56 72" fill="none"
            style={{ margin: "0 auto 1rem" }}
          >
            <rect x="26.5" y="8" width="3" height="52" rx="1.5" fill="#C4A035" />
            <rect x="16" y="58" width="24" height="3" rx="1.5" fill="#2E2E2E" opacity="0.6" />
            <rect x="8" y="22" width="40" height="2.5" rx="1.25" fill="#2E2E2E" opacity="0.8" />
            <circle cx="28" cy="23.25" r="4" fill="#C4A035" />
            <circle cx="28" cy="23.25" r="2" fill="#FAF8F6" />
            <circle cx="28" cy="9" r="3" fill="#C4A035" />
            <line x1="12" y1="24.5" x2="12" y2="36" stroke="#6B001A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="44" y1="24.5" x2="44" y2="36" stroke="#6B001A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 36 Q12 43 19 36" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M37 36 Q44 43 51 36" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", letterSpacing: "-0.03em", margin: 0 }}>
            TALKLAWS
          </h1>
          <p style={{ color: "#7A7A7A", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #E5E5E5",
            borderRadius: "1.25rem",
            padding: "2rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            Sign in to your account
          </h2>

          {error && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                marginBottom: "1rem",
                color: "#991B1B",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="talklaws@gmail.com"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #E5E5E5",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  color: "#111",
                  backgroundColor: "#FAF8F6",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6B001A")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E5E5")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #E5E5E5",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  color: "#111",
                  backgroundColor: "#FAF8F6",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6B001A")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E5E5")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "0.875rem",
                backgroundColor: submitting ? "#9CA3AF" : "#6B001A",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
                marginTop: "0.5rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => { if (!submitting) (e.currentTarget.style.backgroundColor = "#8B2040"); }}
              onMouseLeave={(e) => { if (!submitting) (e.currentTarget.style.backgroundColor = "#6B001A"); }}
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "#7A7A7A", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          This page is for authorised personnel only.
        </p>
      </div>
    </div>
  );
}

// Wrap with the auth provider
export default function AdminLoginPage() {
  return (
    <AdminAuthProvider>
      <LoginForm />
    </AdminAuthProvider>
  );
}
