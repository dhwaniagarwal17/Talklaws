import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | TALKLAWS Legal Advisory",
  description:
    "Read the TALKLAWS Disclaimer regarding the use of this website, informational content, and professional advisory services.",
  robots: { index: true, follow: true },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
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
