/**
 * app/admin/layout.tsx
 * Separate layout for the admin panel.
 * Does NOT include the public site Navbar or Footer.
 * All pages under /admin use this layout.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — TALKLAWS",
  description: "TALKLAWS internal admin dashboard",
  robots: { index: false, follow: false }, // Never index admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </div>
  );
}
