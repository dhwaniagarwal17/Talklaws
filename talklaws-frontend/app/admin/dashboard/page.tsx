"use client";

/**
 * app/admin/dashboard/page.tsx
 * Main admin dashboard — shows enquiry stats and the full enquiries table.
 * Protected: redirects to /admin if not logged in.
 */

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth, apiFetch } from "@/lib/adminAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Contacted" | "Closed";
  adminNotes: string;
  createdAt: string;
}

interface Stats {
  New: number;
  Contacted: number;
  Closed: number;
  total: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New:       { bg: "#DCFCE7", color: "#166534" },
  Contacted: { bg: "#FEF9C3", color: "#854D0E" },
  Closed:    { bg: "#F3F4F6", color: "#374151" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ─── Enquiry Detail Modal ─────────────────────────────────────────────────────
function EnquiryModal({
  enquiry,
  token,
  onClose,
  onUpdated,
}: {
  enquiry: Enquiry;
  token: string;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.adminNotes || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async () => {
    setSaving(true);
    setMsg("");
    const res = await apiFetch(`/api/admin/enquiries/${enquiry._id}/status`, token, {
      method: "PATCH",
      body: JSON.stringify({ status, adminNotes: notes }),
    });
    if (res.ok) {
      setMsg("Saved successfully.");
      onUpdated();
    } else {
      setMsg("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  const deleteEnquiry = async () => {
    if (!confirm(`Delete enquiry from ${enquiry.name}? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await apiFetch(`/api/admin/enquiries/${enquiry._id}`, token, { method: "DELETE" });
    if (res.ok) {
      onUpdated();
      onClose();
    } else {
      setMsg("Failed to delete.");
      setDeleting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff", borderRadius: "1.25rem",
          padding: "2rem", width: "100%", maxWidth: "540px",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#111", margin: 0 }}>
              {enquiry.name}
            </h2>
            <p style={{ color: "#7A7A7A", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
              {formatDate(enquiry.createdAt)}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#7A7A7A", padding: "0.25rem" }}>✕</button>
        </div>

        {/* Contact info */}
        <div style={{ backgroundColor: "#FAF8F6", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { label: "Email", value: enquiry.email },
            { label: "Phone", value: enquiry.phone || "—" },
            { label: "Service", value: enquiry.subject || "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem" }}>
              <span style={{ color: "#7A7A7A", minWidth: "56px", fontWeight: 500 }}>{label}</span>
              <span style={{ color: "#111" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Message */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Message</p>
          <p style={{ fontSize: "0.9rem", color: "#2E2E2E", lineHeight: 1.6, backgroundColor: "#FAF8F6", padding: "0.875rem", borderRadius: "0.75rem" }}>
            {enquiry.message}
          </p>
        </div>

        {/* Status */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Enquiry["status"])}
            style={{
              width: "100%", padding: "0.75rem 1rem", border: "1px solid #E5E5E5",
              borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111",
              backgroundColor: "#FAF8F6", outline: "none",
            }}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Admin notes */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>
            Admin Notes (private)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Add private notes about this enquiry…"
            style={{
              width: "100%", padding: "0.75rem 1rem", border: "1px solid #E5E5E5",
              borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111",
              backgroundColor: "#FAF8F6", outline: "none", resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {msg && (
          <p style={{ fontSize: "0.875rem", color: msg.includes("Failed") ? "#991B1B" : "#166534", marginBottom: "1rem" }}>
            {msg}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={save}
            disabled={saving}
            style={{
              flex: 1, padding: "0.75rem", backgroundColor: saving ? "#9CA3AF" : "#6B001A",
              color: "#fff", border: "none", borderRadius: "0.75rem",
              fontSize: "0.875rem", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            onClick={deleteEnquiry}
            disabled={deleting}
            style={{
              padding: "0.75rem 1.25rem", backgroundColor: "#FEF2F2",
              color: "#991B1B", border: "1px solid #FECACA", borderRadius: "0.75rem",
              fontSize: "0.875rem", fontWeight: 600, cursor: deleting ? "not-allowed" : "pointer",
            }}
          >
            {deleting ? "…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard() {
  const { admin, token, loading, logout } = useAdminAuth();
  const router = useRouter();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ New: 0, Contacted: 0, Closed: 0, total: 0 });
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !admin) {
      router.replace("/admin");
    }
  }, [admin, loading, router]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setFetching(true);

    const params = new URLSearchParams({
      page: String(page),
      limit: "15",
      order: "desc",
      ...(search && { search }),
      ...(statusFilter && { status: statusFilter }),
    });

    const [enqRes, statsRes] = await Promise.all([
      apiFetch(`/api/admin/enquiries?${params}`, token),
      apiFetch("/api/admin/enquiries/stats", token),
    ]);

    if (enqRes.ok) {
      const data = await enqRes.json();
      setEnquiries(data.enquiries);
      setPagination(data.pagination);
    }
    if (statsRes.ok) {
      const data = await statsRes.json();
      setStats(data.data);
    }

    setFetching(false);
  }, [token, page, search, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounce search
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  if (loading || !admin) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F6" }}>

      {/* Top navbar */}
      <header style={{
        backgroundColor: "#0A0A0A", color: "#fff",
        padding: "0 2rem", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
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
            <a key={item.href} href={item.href}
              style={{
                color: "rgba(255,255,255,0.6)", fontSize: "0.8rem",
                padding: "0.375rem 0.75rem", borderRadius: "0.5rem", textDecoration: "none",
                backgroundColor: item.href === "/admin/dashboard" ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >{item.label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
            {admin.name}
          </span>
          <button
            onClick={() => { logout(); router.replace("/admin"); }}
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

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Page title */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.03em" }}>
            Enquiries
          </h1>
          <p style={{ color: "#7A7A7A", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Manage all contact form submissions
          </p>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total", value: stats.total, color: "#111", bg: "#fff" },
            { label: "New", value: stats.New, color: "#166534", bg: "#DCFCE7" },
            { label: "Contacted", value: stats.Contacted, color: "#854D0E", bg: "#FEF9C3" },
            { label: "Closed", value: stats.Closed, color: "#374151", bg: "#F3F4F6" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: s.bg, border: "1px solid #E5E5E5",
                borderRadius: "1rem", padding: "1.25rem 1.5rem",
                cursor: "pointer",
              }}
              onClick={() => setStatusFilter(s.label === "Total" ? "" : s.label)}
            >
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: s.color, fontWeight: 500, marginTop: "0.25rem", opacity: 0.8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: "200px", padding: "0.625rem 1rem",
              border: "1px solid #E5E5E5", borderRadius: "0.75rem",
              fontSize: "0.875rem", color: "#111", backgroundColor: "#fff", outline: "none",
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.625rem 1rem", border: "1px solid #E5E5E5",
              borderRadius: "0.75rem", fontSize: "0.875rem", color: "#111",
              backgroundColor: "#fff", outline: "none", cursor: "pointer",
            }}
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
          <button
            onClick={fetchData}
            style={{
              padding: "0.625rem 1.25rem", backgroundColor: "#6B001A", color: "#fff",
              border: "none", borderRadius: "0.75rem", fontSize: "0.875rem",
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E5E5E5", borderRadius: "1rem", overflow: "hidden" }}>
          {fetching ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#7A7A7A" }}>Loading…</div>
          ) : enquiries.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#7A7A7A" }}>
              No enquiries found.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#FAF8F6", borderBottom: "1px solid #E5E5E5" }}>
                    {["Name", "Email", "Service", "Date", "Status", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.875rem 1rem", textAlign: "left",
                          fontSize: "0.75rem", fontWeight: 600, color: "#7A7A7A",
                          textTransform: "uppercase", letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq, i) => (
                    <tr
                      key={enq._id}
                      style={{
                        borderBottom: i < enquiries.length - 1 ? "1px solid #F3F4F6" : "none",
                        cursor: "pointer",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF8F6")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      onClick={() => setSelected(enq)}
                    >
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 500, color: "#111" }}>
                        {enq.name}
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#7A7A7A" }}>
                        {enq.email}
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: "#7A7A7A", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {enq.subject || "—"}
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: "#7A7A7A", whiteSpace: "nowrap" }}>
                        {formatDate(enq.createdAt)}
                      </td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <span style={{
                          ...STATUS_COLORS[enq.status],
                          padding: "0.25rem 0.625rem", borderRadius: "999px",
                          fontSize: "0.75rem", fontWeight: 600,
                        }}>
                          {enq.status}
                        </span>
                      </td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "#6B001A", fontWeight: 500 }}>View →</span>
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
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "0.5rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem",
                backgroundColor: "#fff", fontSize: "0.875rem", cursor: page === 1 ? "not-allowed" : "pointer",
                color: page === 1 ? "#9CA3AF" : "#111",
              }}
            >
              ← Previous
            </button>
            <span style={{ fontSize: "0.875rem", color: "#7A7A7A" }}>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              style={{
                padding: "0.5rem 1rem", border: "1px solid #E5E5E5", borderRadius: "0.75rem",
                backgroundColor: "#fff", fontSize: "0.875rem",
                cursor: page === pagination.totalPages ? "not-allowed" : "pointer",
                color: page === pagination.totalPages ? "#9CA3AF" : "#111",
              }}
            >
              Next →
            </button>
          </div>
        )}

      </main>

      {/* Enquiry detail modal */}
      {selected && (
        <EnquiryModal
          enquiry={selected}
          token={token!}
          onClose={() => setSelected(null)}
          onUpdated={() => { setSelected(null); fetchData(); }}
        />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AdminAuthProvider>
      <Dashboard />
    </AdminAuthProvider>
  );
}
