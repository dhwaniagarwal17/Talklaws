/**
 * lib/articles.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all Insights & Resources content.
 * Add new articles here — no new pages or routes needed.
 *
 * Content types supported via ContentBlock:
 *   paragraph | heading | list | callout | divider
 *
 * To add an external-source link (e.g. LinkedIn), set:
 *   externalSourceUrl: "https://..."
 *   externalSourceLabel: "Originally published on LinkedIn"
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Article } from "./types";

export const articles: Article[] = [
  // ── 1. DPDP Act ─────────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "dpdp-act-startups",
    title: "DPDP Act 2023: What Every Tech Startup Must Know Before Compliance Kicks In",
    excerpt:
      "India's landmark data protection legislation is reshaping the compliance landscape. We break down the key obligations, timelines, and strategic considerations for digital businesses.",
    category: "DPDP Act",
    date: "June 18, 2026",
    readTime: "8 min",
    author: "TALKLAWS Advisory Team",
    authorRole: "Corporate Legal & Compliance Advisory",
    relatedSlugs: ["founder-agreements-clauses", "cross-border-ma-india"],
    content: [
      {
        type: "paragraph",
        text: "India's Digital Personal Data Protection Act, 2023 (DPDP Act) marks a watershed moment in the country's regulatory landscape. For tech startups that collect, process, or store personal data — which is virtually every digital business — the Act creates a clear framework of obligations that will be enforced once the Rules are notified.",
      },
      {
        type: "heading",
        text: "Who Does the DPDP Act Apply To?",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The Act applies to the processing of digital personal data within India, as well as processing outside India if it is in connection with an activity of offering goods or services to persons within India. This extraterritorial reach is significant for cross-border startups and SaaS businesses with Indian user bases.",
      },
      {
        type: "callout",
        text: "Key term: A 'Data Fiduciary' is any person who determines the purpose and means of processing personal data. Most tech startups qualify as Data Fiduciaries and bear the primary compliance obligations.",
        variant: "info",
      },
      {
        type: "heading",
        text: "Core Obligations for Data Fiduciaries",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Obtain free, specific, informed, and unconditional consent before processing personal data",
          "Provide clear and plain-language notice to data principals about what data is being collected and why",
          "Ensure personal data is used only for the stated purpose",
          "Implement reasonable security safeguards to prevent personal data breaches",
          "Notify the Data Protection Board and affected individuals in case of a breach",
          "Erase personal data once the purpose is fulfilled or consent is withdrawn",
          "Establish grievance redressal mechanisms with a nominated Data Protection Officer (for Significant Data Fiduciaries)",
        ],
      },
      {
        type: "heading",
        text: "Significant Data Fiduciaries: Higher Standards",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The Government may designate certain entities as 'Significant Data Fiduciaries' based on the volume and sensitivity of data processed, risk to rights of data principals, and potential impact on national security. These entities face additional obligations including mandatory Data Protection Impact Assessments (DPIAs) and periodic audits.",
      },
      {
        type: "heading",
        text: "Rights of Data Principals",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Right to access information about their data",
          "Right to correction and erasure",
          "Right to grievance redressal",
          "Right to nominate another individual for data rights in case of death or incapacity",
        ],
      },
      {
        type: "heading",
        text: "Penalties: What's at Stake",
        level: 2,
      },
      {
        type: "callout",
        text: "Non-compliance with DPDP Act obligations can attract penalties of up to ₹250 crore per instance, with a maximum cap of ₹500 crore for the most serious violations including inadequate security safeguards resulting in data breaches.",
        variant: "warning",
      },
      {
        type: "heading",
        text: "Immediate Action Points for Startups",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Conduct a data mapping exercise to understand what personal data you collect, where it flows, and for what purpose",
          "Audit your existing privacy policy and consent mechanisms against the Act's requirements",
          "Evaluate whether your current security infrastructure meets 'reasonable safeguards' standards",
          "Identify your cross-border data transfer arrangements and assess compliance with likely Rules",
          "Begin drafting a DPDP compliance roadmap now — don't wait for Rules to be notified",
        ],
      },
      {
        type: "paragraph",
        text: "The DPDP Act is not merely a compliance checkbox — it represents a fundamental shift in how Indian businesses must think about user data. Startups that build privacy-first from the ground up will find compliance far easier and will earn greater user trust in an increasingly privacy-conscious market.",
      },
    ],
  },

  // ── 2. Founder Agreements ────────────────────────────────────────────────────
  {
    id: "2",
    slug: "founder-agreements-clauses",
    title: "Structuring Founder Agreements: The 5 Clauses That Protect Everything",
    excerpt:
      "Most founder agreements get the basics right. The ones that prevent company-destroying disputes get these five critical clauses precisely right — here's what they are.",
    category: "Startups",
    date: "June 10, 2026",
    readTime: "6 min",
    author: "TALKLAWS Advisory Team",
    authorRole: "Startup & Venture Legal",
    relatedSlugs: ["dpdp-act-startups", "cross-border-ma-india"],
    content: [
      {
        type: "paragraph",
        text: "A founders' agreement is not just administrative paperwork — it is the constitutional document of your startup. Done well, it prevents co-founder disputes from becoming company-ending events. Done poorly, it creates ambiguity that investors will flag in due diligence and courts will be asked to resolve.",
      },
      {
        type: "paragraph",
        text: "Over years of advising founders at every stage, we have seen the same five clauses make the difference between a clean outcome and a costly dispute. Here they are.",
      },
      {
        type: "heading",
        text: "1. Vesting Schedules with Cliff and Acceleration",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Every founder's equity should vest over time — typically 4 years with a 1-year cliff. This ensures that if a co-founder leaves in year one, they don't walk away with a disproportionate equity stake that neither reflects their contribution nor is fair to remaining founders and future investors.",
      },
      {
        type: "callout",
        text: "Acceleration clauses matter too: single-trigger acceleration (upon exit event) vs. double-trigger (exit + termination without cause). Get explicit about which applies to each founder.",
        variant: "tip",
      },
      {
        type: "heading",
        text: "2. IP Assignment Provisions",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Every piece of intellectual property created by a founder — whether before incorporation (if related to the business) or after — must be assigned to the company. Failure to get this right creates IP ownership disputes that can kill fundraising rounds. The clause should be broad, specific, and include prior inventions disclosure.",
      },
      {
        type: "heading",
        text: "3. Decision-Making and Reserved Matters",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Define clearly which decisions require unanimous founder consent, which require a majority, and which can be made by a designated founder (typically the CEO). Reserved matters should include: raising new capital, issuing new equity, hiring C-suite, entering material contracts, and changing the business model.",
      },
      {
        type: "heading",
        text: "4. Exit and Transfer Restrictions",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Right of First Refusal (ROFR): Before any founder transfers shares, existing founders have the right to purchase them first",
          "Co-sale rights: If one founder sells, others can join the sale on the same terms",
          "Drag-along rights: A majority can require minority founders to sell in an exit scenario",
          "Lock-up periods: No transfers for a defined period post-incorporation",
        ],
      },
      {
        type: "heading",
        text: "5. Dispute Resolution: Deadlock Mechanism",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Two equal founders can reach an impasse on a critical decision. Without a deadlock mechanism, the company grinds to a halt. Common solutions include: a pre-designated tiebreaker founder, a buy-sell (shotgun) clause, or mandatory mediation before litigation. The specific mechanism matters less than having one — explicitly agreed to before emotions run high.",
      },
      {
        type: "callout",
        text: "The best founders' agreement is one that both parties hope they never need to use — but are grateful exists when they do.",
        variant: "info",
      },
      {
        type: "paragraph",
        text: "A founders' agreement is not a one-time document. As your company evolves — new co-founders join, equity gets reallocated, roles change — revisit and update it. The cost of getting this right at the start is orders of magnitude less than resolving a co-founder dispute mid-scale.",
      },
    ],
  },

  // ── 3. Cross-Border M&A ──────────────────────────────────────────────────────
  {
    id: "3",
    slug: "cross-border-ma-india",
    title: "Cross-Border M&A in India: Navigating FEMA, RBI Approvals and Deal Timelines",
    excerpt:
      "As Indian companies globalise and foreign capital flows in, cross-border deals require a nuanced understanding of FEMA regulations, pricing guidelines and regulatory timelines.",
    category: "M&A",
    date: "May 28, 2026",
    readTime: "10 min",
    author: "TALKLAWS Advisory Team",
    authorRole: "M&A & Transactions Practice",
    relatedSlugs: ["founder-agreements-clauses", "sebi-lodr-amendments-2024"],
    content: [
      {
        type: "paragraph",
        text: "Cross-border M&A transactions involving Indian companies sit at the intersection of corporate law, foreign exchange regulation, tax, and sector-specific rules. Getting any one of these wrong can delay a deal by months or, in extreme cases, render it void. This article provides a framework for understanding the regulatory architecture of inbound and outbound M&A in India.",
      },
      {
        type: "heading",
        text: "The FEMA Framework: Starting Point for Every Cross-Border Deal",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The Foreign Exchange Management Act, 1999 (FEMA) governs all cross-border capital transactions in India. For M&A, the relevant regulations are the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019, which set out sectoral caps, entry routes (automatic vs. government approval), and pricing guidelines for acquisition of shares in Indian companies.",
      },
      {
        type: "heading",
        text: "Inbound Investment: Key Regulatory Touchpoints",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Sectoral FDI caps: Certain sectors (defence, insurance, media, banking) have caps on foreign ownership that must be checked first",
          "Entry route: Most sectors permit 100% FDI under the automatic route; government approval route applies to certain sensitive sectors",
          "Pricing guidelines: Shares acquired by non-residents must be at a price not less than the fair market value (FMV) calculated per internationally accepted pricing methodology or SEBI guidelines for listed entities",
          "Downstream investment compliance: If the Indian entity itself invests downstream, separate rules apply",
          "Reporting obligations: Form FC-TRS must be filed with the Authorised Dealer bank within 60 days of transfer of shares",
        ],
      },
      {
        type: "heading",
        text: "Outbound Investment: The Overseas Direct Investment (ODI) Framework",
        level: 2,
      },
      {
        type: "paragraph",
        text: "When Indian companies acquire foreign entities, the Overseas Direct Investment framework under FEMA governs the transaction. Key rules include: the 400% net worth ceiling for total ODI, the requirement that the foreign entity be an operating entity (not a pure holding company without strategic rationale), and annual performance reporting (APR) obligations.",
      },
      {
        type: "callout",
        text: "Post-2022 ODI Reforms: The liberalised ODI framework introduced in 2022 significantly simplified outbound investment. However, it also introduced new compliance requirements including mandatory filings with the RBI and enhanced reporting obligations.",
        variant: "info",
      },
      {
        type: "heading",
        text: "CCI Pre-Merger Notification",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Where the combined assets or turnover of the parties exceed the prescribed thresholds under the Competition Act, 2002, pre-merger notification to the Competition Commission of India (CCI) is mandatory. The CCI has a 30 working-day initial review period (extendable to 150 days for Phase II review). Deal timelines must account for this, particularly in contested acquisitions.",
      },
      {
        type: "heading",
        text: "Typical Deal Timeline for an Inbound Acquisition",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Term Sheet / MOU: 1–2 weeks",
          "Due Diligence (legal, financial, tax, technical): 4–8 weeks",
          "Definitive Agreement negotiation and execution: 2–4 weeks",
          "Regulatory approvals (CCI, FEMA, sectoral): 4–12 weeks depending on sector",
          "Closing and post-closing filings: 2–4 weeks",
        ],
      },
      {
        type: "callout",
        text: "Total deal timelines typically range from 3 to 6 months for straightforward transactions. Complex deals involving regulated sectors, multiple jurisdictions, or CCI Phase II review can take 9–18 months.",
        variant: "warning",
      },
      {
        type: "heading",
        text: "Common Pitfalls to Avoid",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Ignoring sector-specific approvals (TRAI for telecom, IRDAI for insurance, RBI for banking/NBFCs)",
          "Underestimating CCI filing thresholds — the deal value threshold introduced in 2023 catches more transactions",
          "Pricing non-compliance in share transfers involving non-residents",
          "Inadequate due diligence on legacy FEMA compliance of the target",
          "Missing FC-TRS reporting deadlines post-transfer",
        ],
      },
      {
        type: "paragraph",
        text: "Cross-border M&A in India rewards preparation. The regulatory framework, while complex, is navigable with the right advisory team. The deals that close on time and without post-closing disputes are invariably the ones where regulatory structuring was built into the deal architecture from day one — not retrofitted at the eleventh hour.",
      },
    ],
  },

  // ── 4. SEBI LODR Amendments ──────────────────────────────────────────────────
  {
    id: "4",
    slug: "sebi-lodr-amendments-2024",
    title: "SEBI's LODR Amendments 2024: What Listed Companies Must Do Now",
    excerpt:
      "SEBI's sweeping amendments to the Listing Obligations and Disclosure Requirements Regulations introduce new governance mandates for listed entities. Here's a compliance action plan.",
    category: "SEBI & RBI",
    date: "May 5, 2026",
    readTime: "7 min",
    author: "TALKLAWS Advisory Team",
    authorRole: "Corporate Governance & Compliance Practice",
    relatedSlugs: ["cross-border-ma-india", "corporate-governance-failures"],
    content: [
      {
        type: "paragraph",
        text: "SEBI has been systematically tightening corporate governance standards for listed companies through a series of amendments to the LODR Regulations. The 2024 amendments, effective in tranches, introduce meaningful changes to board composition, related party transaction (RPT) approvals, and disclosure requirements.",
      },
      {
        type: "heading",
        text: "Key Changes in the 2024 LODR Amendments",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Enhanced RPT framework: Material RPTs now require shareholder approval with specific disclosure of commercial rationale and arm's-length pricing basis",
          "Board composition: Strengthened independent director requirements with clearer independence criteria and cooling-off periods",
          "ESG disclosures: Business Responsibility and Sustainability Report (BRSR) mandate expanded with supply-chain disclosures for top 250 listed entities",
          "Shareholder rights: Simplified process for shareholders to seek explanations on financial disclosures",
          "Insider trading: Enhanced controls around designated persons and connected persons definitions",
        ],
      },
      {
        type: "callout",
        text: "The BRSR supply-chain disclosure requirement is particularly significant. Listed entities in the top 250 by market cap must now report on ESG parameters for their top suppliers and vendors.",
        variant: "warning",
      },
      {
        type: "heading",
        text: "Compliance Action Plan",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Audit your RPT register against the amended materiality thresholds",
          "Review board and committee composition for LODR compliance",
          "Update RPT policy and shareholder approval procedures",
          "Prepare BRSR supply-chain disclosure framework if in top 250 by market cap",
          "Review your insider trading code against the updated SEBI (PIT) Regulations",
        ],
      },
      {
        type: "paragraph",
        text: "Non-compliance with LODR requirements exposes listed companies to SEBI enforcement, adjudication proceedings, and reputational risk. Proactive compliance is significantly less costly than regulatory action.",
      },
    ],
  },

  // ── 5. Corporate Governance Failures ────────────────────────────────────────
  {
    id: "5",
    slug: "corporate-governance-failures",
    title: "Anatomy of Corporate Governance Failures: Lessons for Indian Boards",
    excerpt:
      "From Satyam to recent enforcement actions, India's corporate governance failures share common structural weaknesses. Directors and boards can inoculate themselves with these preventive measures.",
    category: "Corporate Governance",
    date: "April 20, 2026",
    readTime: "9 min",
    author: "TALKLAWS Advisory Team",
    authorRole: "Corporate Advisory Practice",
    relatedSlugs: ["sebi-lodr-amendments-2024", "csr-esg-framework"],
    content: [
      {
        type: "paragraph",
        text: "Corporate governance failures rarely happen suddenly. They accumulate over time — weak board oversight, concentrated power, inadequate independent scrutiny, and cultures where inconvenient questions are not asked. Understanding the anatomy of these failures is the first step toward building boards that actually govern.",
      },
      {
        type: "heading",
        text: "Common Structural Weaknesses",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Dominant promoter-director with unchecked authority over management decisions",
          "Independent directors who are independent in name only — relationships, dependencies, or professional conflicts undermine their independence",
          "Audit committee that rubber-stamps rather than interrogates",
          "Remuneration structures that incentivise short-term performance over long-term value creation",
          "Board information asymmetry — management controls what the board sees",
          "Weak whistle-blower mechanisms that deter reporting of concerns",
        ],
      },
      {
        type: "heading",
        text: "The Satyam Template: What Not to Do",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The Satyam scandal remains India's most instructive corporate governance case study. The fraud was enabled by a board that failed to exercise independent judgment on related-party acquisition proposals, an auditor with compromised independence, and institutional shareholders who were passive until the collapse. Every element of failure is replicable in companies today.",
      },
      {
        type: "heading",
        text: "What Good Governance Actually Looks Like",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Board composition: A majority of genuinely independent directors with the expertise to challenge management",
          "Robust audit committee with financial expertise and access to external auditors independent of management",
          "Risk committee that reviews strategic, operational, and compliance risks",
          "Clear demarcation between board oversight and management execution",
          "Regular board evaluations — both self-assessment and external",
          "Functioning whistle-blower mechanism with board-level oversight",
        ],
      },
      {
        type: "callout",
        text: "Directors owe fiduciary duties to the company — not to the promoter, not to the CEO, and not to any single shareholder class. Internalising this distinction is the foundation of effective board governance.",
        variant: "info",
      },
    ],
  },

  // ── 6. CSR & ESG Framework ───────────────────────────────────────────────────
  {
    id: "6",
    slug: "csr-esg-framework",
    title: "CSR and ESG in India: Building a Framework That Goes Beyond Compliance",
    excerpt:
      "India's mandatory CSR regime under Section 135 of the Companies Act is the floor, not the ceiling. Here's how forward-thinking companies are building ESG frameworks that create real value.",
    category: "CSR & ESG",
    date: "April 8, 2026",
    readTime: "7 min",
    author: "TALKLAWS Advisory Team",
    authorRole: "Corporate Advisory, CSR & ESG Practice",
    relatedSlugs: ["corporate-governance-failures", "sebi-lodr-amendments-2024"],
    content: [
      {
        type: "paragraph",
        text: "India was among the first countries to mandate corporate social responsibility through legislation. Section 135 of the Companies Act, 2013 requires qualifying companies to spend 2% of their average net profit on CSR activities. But in 2026, the conversation has evolved well beyond statutory compliance.",
      },
      {
        type: "heading",
        text: "Section 135: The Compliance Baseline",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Companies with a net worth of ₹500 crore or more, or turnover of ₹1,000 crore or more, or net profit of ₹5 crore or more are required to constitute a CSR Committee, formulate a CSR policy, and spend at least 2% of the average net profit of the preceding three years on eligible CSR activities.",
      },
      {
        type: "list",
        items: [
          "Eligible activities include education, healthcare, environmental sustainability, rural development, and more — Schedule VII lists all approved categories",
          "CSR spend can be through registered implementing agencies or the company's own foundation",
          "Unspent amounts must be transferred to specified funds (PM-CARES, national clean energy fund, etc.) within prescribed timelines",
          "Non-compliance attracts penalties under the Companies Act",
        ],
      },
      {
        type: "heading",
        text: "Beyond Compliance: ESG as Business Strategy",
        level: 2,
      },
      {
        type: "paragraph",
        text: "ESG — Environmental, Social, and Governance — represents a broader framework for measuring non-financial performance. Unlike CSR (which is about spending), ESG is about how a company operates. Institutional investors, PE funds, and global supply chains are increasingly applying ESG screens in investment and procurement decisions.",
      },
      {
        type: "callout",
        text: "The SEBI BRSR mandate has made ESG reporting mandatory for top 1,000 listed companies by market cap. For companies with global investors or supply-chain exposure, ESG performance is becoming a commercial necessity, not just a regulatory one.",
        variant: "info",
      },
      {
        type: "heading",
        text: "Building an Integrated CSR-ESG Framework",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Materiality assessment: Identify which ESG factors are most material to your specific business, sector, and stakeholders",
          "Baseline measurement: Establish current performance metrics for carbon footprint, water usage, diversity ratios, supply chain ethics",
          "Policy integration: Embed ESG principles into procurement, HR, and operational policies — not just in a standalone CSR policy",
          "Governance: Assign board-level accountability for ESG, ideally through the CSR/ESG committee",
          "Reporting: Adopt recognised frameworks (GRI, TCFD, BRSR) for credible, comparable disclosure",
          "Targets: Set time-bound, measurable targets with external verification",
        ],
      },
      {
        type: "paragraph",
        text: "Companies that treat CSR as a compliance exercise and ESG as a reporting burden are missing the strategic opportunity. Those that embed sustainability into their business model will find it an advantage in attracting investment, talent, and customers in the decade ahead.",
      },
    ],
  },
  // ── 7. Artificial Intelligence Posh Human Voice ───────────────────────────────────────────────────
  {
  id: "7",
  slug: "artificial-intelligence-posh-human-voice",
  title: "Artificial Intelligence and POSH: When Perfectly Written Complaints Hide Human Emotions",
  excerpt:
    "Artificial Intelligence is making workplace complaints clearer and more structured, but can technology capture the emotions, context, and lived experiences behind every grievance? As AI becomes part of workplace compliance, Internal Committees must ensure that empathy and human judgment remain at the heart of every inquiry.",
  category: "POSH & Workplace Compliance",
  date: "July 12, 2026",
  readTime: "6 min",
  author: "FCS Tanu Agarwal",
  authorRole: "Founder & Managing Partner",
  externalSourceUrl:
    "https://www.linkedin.com/posts/fcs-tanu-agarwal_artificialintelligence-posh-workplaceethics-activity-7480855761422544897-NAN-?utm_source=share&utm_medium=member_android&rcm=ACoAAFRifC0BLZrDj7aa2qm_-HePCzU-BbxtbDY",
  externalSourceLabel: "Originally published on LinkedIn",
  relatedSlugs: [
    "dpdp-act-startups",
    "founder-agreements-clauses"
  ],
  content: [
    {
      type: "paragraph",
      text: "Artificial Intelligence is rapidly transforming workplaces across industries. From legal research and compliance monitoring to policy drafting and employee communication, AI has become an invaluable productivity tool. However, professionals serving on Internal Committees (ICs), Grievance Committees, and Compliance Forums are beginning to witness a different application of AI—its growing role in drafting workplace complaints.",
    },
    {
      type: "heading",
      text: "AI as an Enabler for Complainants",
      level: 2,
    },
    {
      type: "paragraph",
      text: "For many individuals, putting difficult experiences into words can be emotionally overwhelming. AI tools can help complainants organise events chronologically, improve clarity, overcome language barriers, and present facts in a structured manner. In many situations, this enables employees to communicate their concerns with greater confidence and precision.",
    },
    {
      type: "callout",
      text: "Artificial Intelligence should be viewed as an accessibility tool that empowers individuals to communicate—not as a replacement for their personal voice or lived experience.",
      variant: "info",
    },
    {
      type: "heading",
      text: "The Emerging Challenge for Internal Committees",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Members of Internal Committees are trained to evaluate much more than written words. Every complaint represents a human experience involving emotions, workplace dynamics, vulnerability, and context. Increasingly, AI-generated complaints are technically flawless, legally structured, and professionally written. Yet, they may sometimes feel detached from the emotions of the individual who experienced the incident.",
    },
    {
      type: "heading",
      text: "Questions Every Committee May Need to Consider",
      level: 2,
    },
    {
      type: "list",
      items: [
        "How can the Committee distinguish between the complainant's authentic voice and AI-assisted language?",
        "Does a perfectly drafted complaint always reflect the emotional impact of the incident?",
        "Can reliance on AI unintentionally distance decision-makers from the human experience behind the grievance?",
        "How should inquiry processes evolve to preserve fairness while embracing technological advancements?",
      ],
    },
    {
      type: "heading",
      text: "Why Human Judgment Remains Irreplaceable",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Technology can assist in drafting complaints, but it cannot understand fear, dignity, trauma, workplace relationships, or behavioural nuances. Internal Committees must continue to assess credibility, context, consistency, and emotional impact through careful interaction with the parties involved. These responsibilities require empathy, professional judgment, and sensitivity—qualities that no algorithm can replicate.",
    },
    {
      type: "callout",
      text: "Technology can draft a complaint. Only a human being can truly narrate an experience.",
      variant: "warning",
    },
    {
      type: "heading",
      text: "Preparing for the Future",
      level: 2,
    },
    {
      type: "paragraph",
      text: "As Artificial Intelligence becomes a regular part of professional communication, Internal Committees may need to adapt their approach. Greater emphasis should be placed on meaningful conversations, contextual understanding, and active listening rather than relying solely on written submissions. AI should strengthen access to justice—not reduce the human element that is essential to fair workplace investigations.",
    },
    {
      type: "heading",
      text: "Key Takeaways",
      level: 2,
    },
    {
      type: "list",
      items: [
        "AI can improve the clarity and accessibility of workplace complaints.",
        "Well-written complaints should not replace careful evaluation of context and emotions.",
        "Empathy and human judgment remain fundamental to the POSH inquiry process.",
        "Internal Committees should embrace technology while preserving fairness, sensitivity, and natural justice.",
      ],
    },
    {
      type: "heading",
      text: "Conclusion",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Artificial Intelligence is undoubtedly reshaping workplace compliance, but it cannot replace the human values that underpin effective grievance redressal. As organisations adopt AI more widely, the responsibility of Internal Committees extends beyond reading well-drafted complaints—it is about understanding the human story behind them. Technology may assist the process, but justice will always require empathy, integrity, and thoughtful human judgment.",
    },
  ],
},
// ── 8.Why Posh Matter───────────────────────────────────────────────────
{
  id: "8",
  slug: "why-posh-audits-matter",
  title: "When Silence Isn't Safety: Why Every Organisation Needs a POSH Audit",
  excerpt:
    "An organisation with no POSH complaints may appear compliant—but does that necessarily mean employees feel safe? A meaningful POSH Audit goes beyond policies and procedures to evaluate whether workplace culture truly encourages trust, accountability, and respect.",
  category: "POSH & Workplace Compliance",
  date: "July 10, 2026",
  readTime: "5 min",
  author: "FCS Tanu Agarwal",
  authorRole: "Founder & Managing Partner",
  externalSourceUrl:
    "https://www.linkedin.com/posts/fcs-tanu-agarwal_posh-poshaudit-workplaceculture-activity-7480096470885429249-I7KM?utm_source=share&utm_medium=member_android&rcm=ACoAAFRifC0BLZrDj7aa2qm_-HePCzU-BbxtbDY",
  externalSourceLabel: "Originally published on LinkedIn",
  relatedSlugs: [
    "artificial-intelligence-posh-human-voice",
    "dpdp-act-startups"
  ],
  content: [
    {
      type: "paragraph",
      text: "Many organisations proudly state that they have never received a complaint under the Prevention of Sexual Harassment (POSH) Act. At first glance, this may seem like evidence of a healthy workplace. But an important question deserves reflection: Is the absence of complaints truly a sign of a safe workplace—or is it a sign that employees no longer believe they will be heard?",
    },
    {
      type: "callout",
      text: "The absence of complaints does not always indicate the absence of problems. Sometimes, it reflects the absence of trust.",
      variant: "warning",
    },
    {
      type: "heading",
      text: "Compliance Is Only the First Step",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Organisations can draft a POSH Policy, constitute an Internal Committee, and conduct mandatory awareness sessions within a relatively short period. These are important statutory obligations and form the foundation of a compliant workplace. However, compliance alone cannot create a culture where employees genuinely feel safe to raise concerns.",
    },
    {
      type: "heading",
      text: "What Does a POSH Audit Really Measure?",
      level: 2,
    },
    {
      type: "paragraph",
      text: "A meaningful POSH Audit is far more than a review of policies, registers, and documentation. It evaluates whether an organisation's values are reflected in everyday workplace practices and whether employees have confidence in the grievance redressal mechanism.",
    },
    {
      type: "list",
      items: [
        "Do employees know how and where to report concerns?",
        "Is the Internal Committee functioning independently, fairly, and sensitively?",
        "Do employees trust that complaints will be handled confidentially?",
        "Is awareness limited to annual training, or is respectful workplace behaviour reinforced throughout the year?",
        "Does the organisation promote psychological safety alongside legal compliance?",
      ],
    },
    {
      type: "heading",
      text: "Why Trust Matters More Than Documentation",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Policies can be drafted in a day. Committees can be constituted in an hour. Training sessions can be completed within a few hours. Trust, however, is built over time through consistent leadership, transparency, fairness, and accountability. Employees speak up only when they believe their concerns will be heard without fear of retaliation or bias.",
    },
    {
      type: "callout",
      text: "Compliance protects an organisation. Culture protects its people.",
      variant: "info",
    },
    {
      type: "heading",
      text: "The Real Purpose of a POSH Audit",
      level: 2,
    },
    {
      type: "paragraph",
      text: "The objective of a POSH Audit is not to identify faults or assign blame. Instead, it helps organisations recognise gaps, strengthen their compliance framework, improve employee confidence, and create workplaces built on dignity, respect, and accountability.",
    },
    {
      type: "heading",
      text: "Key Takeaways",
      level: 2,
    },
    {
      type: "list",
      items: [
        "The absence of complaints does not necessarily indicate a safe workplace.",
        "A POSH Audit evaluates both legal compliance and workplace culture.",
        "Employee trust is the foundation of an effective grievance redressal mechanism.",
        "Strong Internal Committees combine legal knowledge with empathy, fairness, and confidentiality.",
        "Organisations that prioritise culture alongside compliance create safer and more resilient workplaces.",
      ],
    },
    {
      type: "heading",
      text: "Conclusion",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Every organisation speaks about its values. A POSH Audit asks one important question: Are those values visible when they matter the most? Organisations that invest in trust, accountability, and workplace culture do more than comply with the law—they create environments where employees feel respected, heard, and empowered to thrive.",
    },
  ],
},
// ── 9.company-secretary-corporate-litigation-governance───────────────────────────────────────────────────
{
  id: "9",
  slug: "company-secretary-corporate-litigation-governance",
  title: "Beyond Compliance: The Strategic Role of Company Secretaries in Corporate Litigation",
  excerpt:
    "Company Secretaries are often perceived as compliance professionals, but their role extends far beyond statutory filings. Effective governance, documentation, and regulatory oversight frequently become the strongest defence when disputes arise.",
  category: "Corporate Governance",
  date: "July 11, 2026",
  readTime: "6 min",
  author: "FCS Tanu Agarwal",
  authorRole: "Founder & Managing Partner, TALKLAWS",
  externalSourceUrl: "https://www.linkedin.com/posts/fcs-tanu-agarwal_companysecretary-corporatelitigation-corporategovernance-activity-7467804764840382464-Pnhk?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAFRifC0BLZrDj7aa2qm_-HePCzU-BbxtbDY&utm_campaign=whatsapp",
  externalSourceLabel: "Originally published on LinkedIn",
  relatedSlugs: [
    "board-minutes-governance",
    "dpdp-act-startups",
    "corporate-governance-framework"
  ],
  content: [
    {
      type: "paragraph",
      text: "Company Secretaries are often viewed solely as compliance professionals responsible for statutory filings, registers, and Board meetings. While these responsibilities remain fundamental, they represent only one dimension of a much broader strategic role within an organisation."
    },
    {
      type: "heading",
      text: "Governance Extends Beyond Compliance",
      level: 2
    },
    {
      type: "paragraph",
      text: "When organisations face litigation, regulatory scrutiny, shareholder disputes, recovery proceedings, inspections, adjudications, or insolvency matters, management frequently relies upon the Company Secretary for far more than statutory expertise. Their understanding of governance processes, documentation, and regulatory history becomes an invaluable asset."
    },
    {
      type: "callout",
      variant: "info",
      text: "Corporate disputes are rarely won by legal arguments alone. They are often resolved through well-maintained records, accurate documentation, and sound governance practices established long before the dispute arose."
    },
    {
      type: "heading",
      text: "The Importance of Documentation",
      level: 2
    },
    {
      type: "paragraph",
      text: "Effective corporate governance is reflected through decisions that are properly documented and consistently implemented. Minutes, resolutions, agreements, statutory registers, disclosures, and compliance records collectively create the documentary evidence that organisations rely upon when questioned by regulators or judicial forums."
    },
    {
      type: "list",
      items: [
        "Accurately drafted Board and Committee Minutes",
        "Properly executed agreements and contracts",
        "Timely statutory filings and disclosures",
        "Well-maintained statutory registers",
        "Documented corporate approvals and governance processes"
      ]
    },
    {
      type: "heading",
      text: "Supporting Corporate Litigation",
      level: 2
    },
    {
      type: "paragraph",
      text: "While advocates represent organisations before judicial and quasi-judicial forums, Company Secretaries frequently work behind the scenes by analysing records, coordinating with legal teams, preparing regulatory responses, organising documentary evidence, and ensuring that the organisation's position is supported by both facts and applicable law."
    },
    {
      type: "heading",
      text: "A Strategic Governance Professional",
      level: 2
    },
    {
      type: "paragraph",
      text: "A Company Secretary understands not only the legal framework governing an organisation but also the rationale behind corporate decisions. Their familiarity with historical records, governance practices, and regulatory obligations enables management to identify risks early and respond effectively when challenges arise."
    },
    {
      type: "callout",
      variant: "info",
      text: "Good governance helps prevent disputes. Strong documentation strengthens the organisation's position when disputes arise."
    },
    {
      type: "heading",
      text: "Conclusion",
      level: 2
    },
    {
      type: "paragraph",
      text: "It is time to move beyond the misconception that Company Secretaries are solely compliance professionals. They are governance advisors, risk managers, and strategic contributors whose work supports informed decision-making, strengthens regulatory compliance, and plays a vital role in protecting organisations throughout their business journey."
    }
  ]
},
];

/**
 * Utility helpers
 */

/** Get all articles, newest first */
export function getAllArticles(): Article[] {
  return [...articles].reverse();
}

/** Get a single article by slug */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Get related articles for a given article */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  if (!article.relatedSlugs?.length) {
    // Fall back to same category
    return articles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, limit);
  }
  const related = article.relatedSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));
  return related.slice(0, limit);
}

/** Get all unique categories that have at least one article */
export function getCategories(): string[] {
  return [...new Set(articles.map((a) => a.category))];
}

/** Get articles filtered by category */
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}
