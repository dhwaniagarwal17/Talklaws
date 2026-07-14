"use client";

/**
 * app/admin/subscribers/page.tsx
 * Subscriber management — view, search, mark unsubscribed, delete.
 * Protected: redirects to /admin if not logged in.
 */

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminAuthProvider, useAdminAuth, apiFetch } from "@/lib/adminAuth";

interface Subscriber {
  _id: string;
  email: string;
  status: "Active" | "Unsubscribed";
  source: string;
  createdAt: string;
}

interface Stats { Active: number; Unsubscribed: number; total: number }
interface Pagination { total: number; page: number; limit: number; totalPages: number }

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Active:       { bg: "#DCFCE7", color: "#166534" },
  Unsubscribed: { bg: "#F3F4F6", color: "#6B7280" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Shared admin header ───────────────────────────────────────────────────────
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
        {/* Nav links */}
        <nav style={{ display: "flex", gap: "0.25rem" }}>
          {[
            { label: "Enquiries",   href: "/admin/dashboard" },
            { label: "Subscribers", href: "/admin/subscribers" },
            { label: "Send Update", href: "/admin/send-update" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                backgroundColor: item.href === "/admin/subscribers" ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{name}</span>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "rgba(255,255,255,0.08)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.5rem",
            padding: "0.375rem 0.875rem", fontSize: "0.8rem", cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function SubscribersPage() {
  const { admin, token, loading, logout } = useAdminAuth();
  const router = useRouter();

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ Active: 0, Unsubscribed: 0, total: 0 });
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => { if (!loading && !admin) router.replace("/admin"); }, [admin, loading, router]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setFetching(true);
    const params = new URLSearchParams({
      page: String(page), limit: "20", order: "desc",
      ...(search && { search }),
      ...(statusFilter && { status: statusFilter }),
    });
    const [subRes, statsRes] = await Promise.all([
      apiFetch(`/api/admin/subscribers?${params}`, token),
      apiFetch("/api/admin/subscribers/stats", token),
    ]);
    if (subRes.ok) { const d = await subRes.json(); setSubscribers(d.subscribers); setPagination(d.pagination); }
    if (statsRes.ok) { const d = await statsRes.json(); setStats(d.data); }
    setFetching(false);
  }, [token, page, search, statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const markUnsubscribed = async (id: string) => {
    if (!token) return;
    const res = await apiFetch(`/api/admin/subscribers/${id}/status`, token, {
      method: "PATCH", body: JSON.stringify({ status: "Unsubscribed" }),
    });
    if (res.ok) { setActionMsg("Marked as unsubscribed."); fetchData(); }
    else setActionMsg("Action failed.");
    setTimeout(() => setActionMsg(""), 3000);
  };

  const deleteSub = async (id: string, email: string) => {
    if (!confirm(`Delete subscriber ${email}? This cannot be undone.`)) return;
    if (!token) return;
    const res = await apiFetch(`/api/admin/subscribers/${id}`, token, { method: "DELETE" });
    if (res.ok) { setActionMsg("Subscriber deleted."); fetchData(); }
    else setActionMsg("Delete failed.");
    setTimeout(() => setActionMsg(""), 3000);
  };

  if (loading || !admin) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F6" }}>
      <AdminHeader name={admin.name} onLogout={() => { logout(); router.replace("/admin"); }} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.03em" }}>Subscribers</h1>
          <p style={{ color: "#7A7A7A", fontSize: "0.875rem", marginTop: "0.25rem" }}>Manage newsletter subscribers</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total",        value: stats.total,        color: "#111",    bg: "#fff" },
            { label: "Active",       value: stats.Active,       color: "#166534", bg: "#DCFCE7" },
            { label: "Unsubscribed", value: stats.Unsubscribed, color: "#6B7280", bg: "#F3F4F6" },
          ].map((s) => (
            <div key={s.label}
              onClick={() => setStatusFilter(s.label === "Total" ? "" : s.label)}
              style={{ backgroundColor: s.bg, border: "1px solid #E5E5E5", borderRadius: "1rem", padding: "1.25rem 1.5rem", cursor: "pointer" }}
            >
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: s.color, fontWeight: 500, marginTop: "0.25rem", opacity: 0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {actionMsg && (
          <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#166534" }}>
            {actionMsg}
          </div>
        )}

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <input type="text" placeholder="Search by email…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: "200px", padding: "0.625rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111", backgroundColor: "#fff", outline: "none" }}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "0.625rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111", backgroundColor: "#fff", outline: "none", cursor: "pointer" }}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Unsubscribed">Unsubscribed</option>
          </select>
          <button onClick={fetchData}
            style={{ padding: "0.625rem 1.25rem", backgroundColor: "#6B001A", color: "#fff", border: "none", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E5E5E5", borderRadius: "1rem", overflow: "hidden" }}>
          {fetching ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#7A7A7A" }}>Loading…</div>
          ) : subscribers.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#7A7A7A" }}>No subscribers found.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#FAF8F6", borderBottom: "1px solid #E5E5E5" }}>
                    {["Email", "Date Subscribed", "Status", "Source", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr key={sub._id}
                      style={{ borderBottom: i < subscribers.length - 1 ? "1px solid #F3F4F6" : "none" }}
                    >
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 500, color: "#111" }}>{sub.email}</td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: "#7A7A7A", whiteSpace: "nowrap" }}>{formatDate(sub.createdAt)}</td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <span style={{ ...STATUS_COLORS[sub.status], padding: "0.25rem 0.625rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>
                          {sub.status}
                        </span>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: "#7A7A7A" }}>{sub.source || "footer"}</td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {sub.status === "Active" && (
                            <button onClick={() => markUnsubscribed(sub._id)}
                              style={{ padding: "0.25rem 0.625rem", backgroundColor: "#FEF9C3", color: "#854D0E", border: "1px solid #FDE68A", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
                            >
                              Unsubscribe
                            </button>
                          )}
                          <button onClick={() => deleteSub(sub._id, sub.email)}
                            style={{ padding: "0.25rem 0.625rem", backgroundColor: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              style={{ padding: "0.5rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem", backgroundColor: "#fff", fontSize: "0.875rem", cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#9CA3AF" : "#111" }}
            >← Previous</button>
            <span style={{ fontSize: "0.875rem", color: "#7A7A7A" }}>Page {pagination.page} of {pagination.totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages}
              style={{ padding: "0.5rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem", backgroundColor: "#fff", fontSize: "0.875rem", cursor: page === pagination.totalPages ? "not-allowed" : "pointer", color: page === pagination.totalPages ? "#9CA3AF" : "#111" }}
            >Next →</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SubscribersPageWrapper() {
  return <AdminAuthProvider><SubscribersPage /></AdminAuthProvider>;
}
