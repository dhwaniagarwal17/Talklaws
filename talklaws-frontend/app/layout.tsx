import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TALKLAWS — Corporate Legal & Compliance Advisory",
  description:
    "Premier corporate legal advisory for startups, SMEs, investors and enterprises. Expert guidance on compliance, regulatory affairs, and corporate governance.",
  keywords: [
    "corporate legal advisory",
    "compliance consultancy",
    "startup legal",
    "regulatory affairs",
    "corporate governance",
    "TALKLAWS",
  ],
  authors: [{ name: "TALKLAWS" }],
  creator: "TALKLAWS",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://talklaws.com",
    siteName: "TALKLAWS",
    title: "TALKLAWS — Corporate Legal & Compliance Advisory",
    description:
      "Premier corporate legal advisory for startups, SMEs, investors and enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TALKLAWS — Corporate Legal & Compliance Advisory",
    description:
      "Premier corporate legal advisory for startups, SMEs, investors and enterprises.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
