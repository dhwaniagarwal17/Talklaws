import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | TALKLAWS Legal Advisory",
  description:
    "Read the Terms of Use governing access to and use of the TALKLAWS Legal Advisory website.",
  robots: { index: true, follow: true },
};

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) {
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
