/**
 * JsonLd.tsx
 * Renders structured data (JSON-LD) for the TALKLAWS homepage.
 *
 * Schema types:
 *   - Organization  — the firm itself
 *   - LegalService  — the legal advisory practice
 *   - Person        — FCS Tanu Agarwal, Founder & Managing Partner
 *
 * All data is sourced exclusively from verified project content.
 * No data has been invented or assumed.
 */

const BASE_URL = "https://www.talklaws.in";

// ─── Organization ─────────────────────────────────────────────────────────────
const organization = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "TALKLAWS",
  alternateName: "TALKLAWS Legal Advisory",
  url: BASE_URL,
  description:
    "Premier corporate legal and compliance advisory for startups, SMEs, investors and enterprises. Expert guidance on compliance, regulatory affairs, and corporate governance.",
  email: "talklaws@gmail.com",
  telephone: "+919839778060",
  address: {
    "@type": "PostalAddress",
    streetAddress: "301, 3rd Floor, Prince Complex, Hazratganj",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226001",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/fcs-tanu-agarwal",
    "https://www.instagram.com/talklaws4",
    "https://www.facebook.com/share/19GNaXB237/",
  ],
  founder: {
    "@id": `${BASE_URL}/#founder`,
  },
};

// ─── LegalService ─────────────────────────────────────────────────────────────
const legalService = {
  "@type": "LegalService",
  "@id": `${BASE_URL}/#legalservice`,
  name: "TALKLAWS",
  alternateName: "TALKLAWS Legal Advisory",
  url: BASE_URL,
  description:
    "Premier corporate legal and compliance advisory helping startups, SMEs, investors and enterprises navigate complex legal landscapes with precision and strategic intelligence.",
  email: "talklaws@gmail.com",
  telephone: "+919839778060",
  address: {
    "@type": "PostalAddress",
    streetAddress: "301, 3rd Floor, Prince Complex, Hazratganj",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226001",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Advisory, CSR & ESG",
          description:
            "Strategic counsel for board structuring, shareholder agreements, and corporate governance frameworks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Startup & Venture Legal",
          description:
            "From incorporation to term sheets, cap table management and founder agreements — covering the full lifecycle.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Regulatory Compliance",
          description:
            "Navigate the complex regulatory landscape across SEBI, RBI, MCA, and sector-specific authorities.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "M&A & Transactions",
          description:
            "End-to-end transaction support for mergers, acquisitions, due diligence, and deal structuring.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Contracts & Agreements",
          description:
            "Bespoke commercial contracts, NDAs, vendor agreements, and licensing frameworks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IP & Technology Law",
          description:
            "Comprehensive intellectual property strategy and protection for tech companies, brands, and innovators.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FDI & Cross-Border",
          description:
            "Expert advisory on foreign direct investment, cross-border transactions, and international regulatory compliance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Employment & HR Law",
          description:
            "HR policies, employment contracts, POSH compliance, and labour law advisory.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Investigations & Litigation",
          description:
            "Strategic representation and advisory in corporate investigations, regulatory enforcement, financial fraud matters, and commercial litigation.",
        },
      },
    ],
  },
  parentOrganization: {
    "@id": `${BASE_URL}/#organization`,
  },
};

// ─── Person — Founder ─────────────────────────────────────────────────────────
const founder = {
  "@type": "Person",
  "@id": `${BASE_URL}/#founder`,
  name: "FCS Tanu Agarwal",
  jobTitle: "Founder & Managing Partner",
  description:
    "Practicing Fellow Company Secretary with over 23 years of specialised experience in corporate governance, company law, and strategic business advisory. Recognised as an Independent Director and faculty member at the Institute of Company Secretaries of India.",
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "FCS" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "LL.B." },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "M.Com." },
  ],
  knowsAbout: [
    "Corporate Governance",
    "Company Law",
    "SEBI Compliance",
    "RBI Compliance",
    "IPO Readiness",
    "Corporate Restructuring",
    "Mergers & Acquisitions",
    "POSH",
  ],
  sameAs: [
    "https://www.linkedin.com/in/fcs-tanu-agarwal",
    "https://www.instagram.com/talklaws4",
    "https://www.facebook.com/share/19GNaXB237/",
  ],
  worksFor: {
    "@id": `${BASE_URL}/#organization`,
  },
  image: `${BASE_URL}/images/team/tanu-agarwal.jpg`,
};

// ─── Graph ────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, legalService, founder],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
