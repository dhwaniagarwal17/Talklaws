import type {
  NavItem,
  Service,
  Industry,
  Testimonial,
  FAQItem,
  TimelineItem,
  Value,
} from "./types";

// Re-export articles as `insights` for backward compatibility with existing components
export { articles as insights } from "./articles";

export const navItems: NavItem[] = [
  { label: "Services",   href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "About",      href: "/#about" },
  { label: "Insights",   href: "/insights" },
  { label: "Ask the CS", href: "/#ask-cs" },
  { label: "FAQs",       href: "/#faq" },
  { label: "Contact",    href: "/#contact" },
];

export const services: Service[] = [
  {
    id: "corporate-advisory",
    title: "Corporate Advisory, CSR & ESG",
    description:
      "Strategic counsel for board structuring, shareholder agreements, and corporate governance frameworks. We help you build companies that are investment-ready and legally sound from day one.",
    icon: "Building2",
    tags: ["Governance", "Shareholder Agreements", "Board Structure"],
    size: "large",
  },
  {
    id: "startup-legal",
    title: "Startup & Venture Legal",
    description:
      "Founders deserve legal support that speaks their language. From incorporation to term sheets, cap table management and founder agreements — we cover the full lifecycle.",
    icon: "Rocket",
    tags: ["Incorporation", "Term Sheets", "Cap Tables"],
    size: "medium",
  },
  {
    id: "compliance",
    title: "Regulatory Compliance",
    description:
      "Navigate the complex regulatory landscape across SEBI, RBI, MCA, and sector-specific authorities with precision and confidence.",
    icon: "ShieldCheck",
    tags: ["SEBI", "RBI", "MCA Filings"],
    size: "medium",
  },
  {
    id: "ma-transactions",
    title: "M&A & Transactions",
    description:
      "End-to-end transaction support for mergers, acquisitions, due diligence, and deal structuring. We protect your interests at every stage of the deal.",
    icon: "ArrowLeftRight",
    tags: ["Due Diligence", "Deal Structuring", "Mergers"],
    size: "large",
  },
  {
    id: "contracts",
    title: "Contracts & Agreements",
    description:
      "Bespoke commercial contracts, NDAs, vendor agreements, and licensing frameworks crafted with precision and clarity.",
    icon: "FileText",
    tags: ["Commercial Contracts", "NDAs", "Licensing"],
    size: "small",
  },
  {
    id: "ip-protection",
    title: "IP & Technology Law",
    description:
      "Comprehensive intellectual property strategy and protection for tech companies, brands, and innovators building proprietary assets.",
    icon: "Lightbulb",
    tags: ["Trademarks", "Patents", "IP Strategy", "DPDP Act"],
    size: "small",
  },
  {
    id: "fdi-foreign",
    title: "FDI & Cross-Border",
    description:
      "Expert advisory on foreign direct investment, cross-border transactions, and international regulatory compliance for global expansion.",
    icon: "Globe",
    tags: ["FDI", "FEMA", "Cross-Border"],
    size: "medium",
  },
  {
    id: "employment",
    title: "Employment & HR Law",
    description:
      "HR policies, employment contracts, POSH compliance, and labour law advisory to build organisations with solid legal foundations.",
    icon: "Users",
    tags: ["HR Policy", "POSH", "Labour Law"],
    size: "small",
  },
  {
    id: "corporate-investigations",
    title: "Corporate Investigations & Litigation",
    description:
      "Strategic representation and advisory in corporate investigations, regulatory enforcement, financial fraud matters, and commercial litigation. We assist clients through investigations, dispute resolution, and appearances before statutory and judicial authorities.",
    icon: "Scale",
    tags: ["SEBI", "RBI", "SFIO", "ED", "EOW", "DRTC", "ROC", "RD", "NCLT"],
    size: "large",
  },
];

export const industries: Industry[] = [
  {
    title: "Technology & SaaS",
    description:
      "From pre-seed to IPO, we understand the technical and legal nuances of building software companies.",
    icon: "Cpu",
  },
  {
    title: "Fintech & BFSI",
    description:
      "RBI regulations, payment aggregator licensing, and NBFC compliance — navigated with expertise.",
    icon: "CreditCard",
  },
  {
    title: "Healthcare & MedTech",
    description:
      "CDSCO compliance, clinical trial regulations, and healthcare data privacy frameworks.",
    icon: "Heart",
  },
  {
    title: "Real Estate & Infrastructure",
    description:
      "RERA compliance, project structuring, and title diligence for real estate developers and investors.",
    icon: "Building",
  },
  {
    title: "Consumer & D2C Brands",
    description:
      "Brand protection, distribution agreements, and e-commerce compliance for consumer businesses.",
    icon: "ShoppingBag",
  },
  {
    title: "Private Equity & VC",
    description:
      "Fund formation, portfolio company advisory, and investment transaction support for PE/VC firms.",
    icon: "TrendingUp",
  },
  {
    title: "EdTech & Media",
    description:
      "Content licensing, platform regulations, and IP strategy for education and media businesses.",
    icon: "BookOpen",
  },
  {
    title: "Manufacturing & Deep Tech",
    description:
      "Industrial compliance, environmental regulations, and deep tech IP protection strategies.",
    icon: "Wrench",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Pankaj Gupta",
    role: "Director",
    company: "MLNO Professional Services Pvt Ltd,Noida",
    content:
      "We have relied on TALKLAWS for our corporate compliance and the vetting of complex national and international agreements. Their professionalism, responsiveness, and attention to detail have made them a trusted legal and compliance partner for our organisation.",
    avatar: "PG",
  },
  {
    id: "2",
    name: "Priya Krishnamurthy",
    role: "HR Head",
    company: "Bangalore",
    content:
      "The POSH advisory and awareness sessions were practical, engaging, and highly relevant to our organisation",
    avatar: "PK",
  },
  {
    id: "3",
    name: "R.S.",
    role: "Managing Director",
    company: "Delhi",
    content:
      "The depth of expertise across regulatory compliance and transaction advisory is unmatched. They navigated a complex cross-border acquisition seamlessly and kept us protected at every step.",
    avatar: "RS",
  },
  {
    id: "4",
    name: "N.M.",
    role: "Founder",
    company: "Technology Sector",
    content:
      "Their expertise in reviewing commercial agreements and corporate compliances has helped us manage legal risks with confidence.",
    avatar: "NM",
  },
];


export const faqs: FAQItem[] = [
  {
    question: "What makes TALKLAWS different from a traditional law firm?",
    answer:
      "We are a premier corporate advisory, not a traditional law firm. We combine the depth of legal expertise with the agility and commercial mindset of a consulting firm. Our advisors have worked across investment banking, corporate strategy and law — bringing multi-dimensional insight to every engagement.",
  },
  {
    question: "Do you work with early-stage startups or only established companies?",
    answer:
      "We work across the entire spectrum — from pre-incorporation founders to Series D companies and large enterprises. For early-stage startups, we offer streamlined engagement models designed for your stage, ensuring you get institutional-quality advice without institutional-scale billing.",
  },
  {
    question: "Which regulatory bodies do you advise on?",
    answer:
      "We advise on matters before and related to SEBI, RBI, MCA, CCI, TRAI, NCLT and various sector-specific regulatory authorities. Our cross-functional team covers the full regulatory landscape relevant to modern businesses.",
  },
  {
    question: "Can you help us with foreign investment and cross-border transactions?",
    answer:
      "Yes — cross-border advisory is a core practice area. We handle FDI structuring, FEMA compliance, pricing approvals, downstream investment rules, and full transaction execution for both inbound investment into India and outbound investments by Indian entities.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "We prioritise responsiveness. After an initial consultation, we can typically onboard a new client and begin substantive work within 24–48 hours. For time-sensitive matters, we accommodate accelerated timelines.",
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2015",
    title: "Founded with a Vision",
    description:
      "TALKLAWS was established with a singular conviction: that exceptional legal advisory should be accessible, intelligent and commercially aligned with client success.",
  },
  {
    year: "2020",
    title: "Expanded Practice Areas",
    description:
      "Built dedicated practices in fintech regulatory advisory and cross-border transactions, responding to India's rapidly evolving business landscape.",
  },
  {
    year: "2022",
    title: "100+ Clients Milestone",
    description:
      "Reached a milestone of over 100 active clients across technology, healthcare, real estate and private equity sectors.",
  },
  
  {
    year: "2026",
    title: "Serving Compliance without borders",
    description:
      "Serving clients across India and International borders",
    },
];

export const values: Value[] = [
  {
    title: "Precision",
    description:
      "Every word in an agreement matters. We approach every document with the exactness of surgeons.",
    icon: "Target",
  },
  {
    title: "Integrity",
    description:
      "We give honest advice, even when it's not what clients want to hear. Our reputation is our most valuable asset.",
    icon: "Shield",
  },
  {
    title: "Intelligence",
    description:
      "Legal advice divorced from commercial reality is just theory. We combine both in every recommendation.",
    icon: "Brain",
  },
  {
    title: "Responsiveness",
    description:
      "Business doesn't wait for office hours. We are available when our clients need us most.",
    icon: "Zap",
  },
];

// ── Ask the Company Secretary Q&A ────────────────────────────────────────────
// Add new questions here — no component changes required.
export interface CSQAItem {
  question: string;
  answer: string;
}

export const csQA: CSQAItem[] = [
  {
    question: "Can a company be legally compliant but ethically weak?",
    answer: "Compliance satisfies the law; governance reflects values. Great organisations strive for both.",
  },
  {
    question: "Does silence from regulators mean everything is in order?",
    answer: "Not necessarily. Compliance is determined by law, not by the absence of notices.",
  },
  {
    question: "Can a five-minute Board Meeting create years of legal trouble?",
    answer: "Yes. Poorly planned meetings and inadequate documentation often become the weakest link during scrutiny.",
  },
  {
    question: "Is an unsigned agreement just a piece of paper?",
    answer: "Sometimes worse—it creates uncertainty. Clear execution protects everyone involved.",
  },
  {
    question: "Can a simple email become legal evidence?",
    answer: "Absolutely. Emails often play a crucial role in proving intent, approvals, commitments, and disputes.",
  },
  {
    question: "Is \"We've always done it this way\" a legal defence?",
    answer: "Never. Laws evolve, and compliance must evolve with them.",
  },
  {
    question: "Can a startup ignore governance until it becomes successful?",
    answer: "Success attracts scrutiny. Governance should begin on Day One.",
  },
  {
    question: "Can one missing clause in a contract cost more than the entire deal?",
    answer: "Yes. The clauses you skip are often the ones you need most.",
  },
  {
    question: "Do companies fail because of non-compliance?",
    answer: "Rarely because of one default—but often because of repeated neglect.",
  },
  {
    question: "Can workplace culture reduce legal risk?",
    answer: "More than any policy. Respectful workplaces naturally generate fewer disputes.",
  },
  {
    question: "Is POSH only an HR responsibility?",
    answer: "No. It is a leadership responsibility, an organisational commitment, and every employee's duty.",
  },
  {
    question: "Can a joke amount to workplace sexual harassment?",
    answer: "If it is unwelcome, sexually coloured, or creates a hostile environment, it certainly can.",
  },
  {
    question: "Is having a POSH policy enough?",
    answer: "A policy on paper creates compliance. A policy in practice creates trust.",
  },
  {
    question: "Can confidentiality be maintained even after a POSH inquiry?",
    answer: "It must be. Confidentiality is both a legal obligation and an ethical responsibility.",
  },
  {
    question: "Why do employees hesitate to report harassment?",
    answer: "Fear of judgment, retaliation, career impact, or simply not being believed.",
  },
  {
    question: "Can HR solve every workplace conflict?",
    answer: "HR manages people; culture is shaped by leadership and every individual.",
  },
  {
    question: "Does an appointment letter prevent employment disputes?",
    answer: "It helps—but fair processes and proper documentation matter even more.",
  },
  {
    question: "Can verbal promises become legal obligations?",
    answer: "Sometimes they can. Written documentation always offers stronger protection.",
  },
  {
    question: "What's more expensive than legal advice?",
    answer: "Correcting avoidable mistakes after they become disputes.",
  },
  {
    question: "What is the first sign of good governance?",
    answer: "Decisions are documented before they're questioned.",
  },
];
