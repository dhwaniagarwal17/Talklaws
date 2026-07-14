import type { LegalDoc } from "@/components/LegalPage";

export const doc: LegalDoc = {
  title: "Terms of Use",
  effectiveDate: "12 July 2026",
  intro: [
    'Welcome to TALKLAWS Legal Advisory ("TALKLAWS", "we", "our", or "us"). These Terms of Use govern your access to and use of this website.',
    "By accessing or using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use. If you do not agree with these terms, please refrain from using this website.",
  ],
  sections: [
    {
      number: "1",
      title: "Purpose of the Website",
      blocks: [
        { type: "paragraph", text: "The TALKLAWS website has been developed to provide information about our professional services, legal and regulatory insights, corporate governance resources, and facilitate communication with prospective and existing clients." },
        { type: "paragraph", text: "The content published on this website is intended solely for general informational purposes." },
      ],
    },
    {
      number: "2",
      title: "Professional Advice",
      blocks: [
        { type: "paragraph", text: "The information available on this website, including articles, publications, regulatory updates, and other resources, does not constitute legal, financial, or professional advice." },
        { type: "paragraph", text: "No professional-client relationship is created merely by accessing this website, reading its content, or communicating through the contact forms." },
        { type: "paragraph", text: "Professional advice should always be obtained based on the specific facts and circumstances of your matter." },
      ],
    },
    {
      number: "3",
      title: "Intellectual Property",
      blocks: [
        { type: "paragraph", text: "Unless otherwise stated, all content available on this website, including but not limited to:" },
        {
          type: "list",
          items: [
            "Text",
            "Articles",
            "Publications",
            "Graphics",
            "Logos",
            "Website design",
            "Icons",
            "Layout",
            "Branding",
            "Images",
          ],
        },
        { type: "paragraph", text: "is the intellectual property of TALKLAWS or is used with appropriate permission." },
        { type: "paragraph", text: "No content may be copied, reproduced, modified, distributed, or commercially exploited without prior written consent from TALKLAWS." },
      ],
    },
    {
      number: "4",
      title: "Permitted Use",
      blocks: [
        { type: "paragraph", text: "You may use this website solely for lawful purposes, including:" },
        {
          type: "list",
          items: [
            "Learning about our services",
            "Reading our publications",
            "Contacting TALKLAWS",
            "Requesting consultations",
          ],
        },
        { type: "paragraph", text: "You agree not to misuse the website or attempt to interfere with its operation or security." },
      ],
    },
    {
      number: "5",
      title: "User Conduct",
      blocks: [
        { type: "paragraph", text: "While using this website, you agree not to:" },
        {
          type: "list",
          items: [
            "Submit false or misleading information.",
            "Upload malicious software or harmful code.",
            "Attempt unauthorised access to any part of the website or its systems.",
            "Use the website for unlawful or fraudulent purposes.",
            "Interfere with the normal functioning of the website.",
          ],
        },
      ],
    },
    {
      number: "6",
      title: "Third-Party Links",
      blocks: [
        { type: "paragraph", text: "This website may contain links to third-party websites, including LinkedIn, Google Maps, and other external resources." },
        { type: "paragraph", text: "These links are provided solely for user convenience." },
        { type: "paragraph", text: "TALKLAWS does not control, endorse, or assume responsibility for the content, privacy practices, or availability of any third-party website." },
      ],
    },
    {
      number: "7",
      title: "Limitation of Liability",
      blocks: [
        { type: "paragraph", text: "While reasonable efforts are made to ensure that the information on this website is accurate and up to date, TALKLAWS makes no warranties or representations regarding its completeness, accuracy, or suitability for any particular purpose." },
        { type: "paragraph", text: "To the fullest extent permitted by applicable law, TALKLAWS shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of or reliance upon this website." },
      ],
    },
    {
      number: "8",
      title: "Privacy",
      blocks: [
        { type: "paragraph", text: "Your use of this website is also governed by our Privacy Policy, which explains how personal information is collected, used, and protected." },
      ],
    },
    {
      number: "9",
      title: "Modifications",
      blocks: [
        { type: "paragraph", text: "TALKLAWS reserves the right to modify these Terms of Use at any time without prior notice." },
        { type: "paragraph", text: "Any updates will become effective upon publication on this page together with the revised Effective Date." },
      ],
    },
    {
      number: "10",
      title: "Governing Law",
      blocks: [
        { type: "paragraph", text: "These Terms of Use shall be governed by and interpreted in accordance with the laws of India." },
        { type: "paragraph", text: "Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Lucknow, Uttar Pradesh, unless otherwise required by applicable law." },
      ],
    },
    {
      number: "11",
      title: "Contact Us",
      blocks: [
        { type: "paragraph", text: "If you have any questions regarding these Terms of Use, please contact:" },
        { type: "contact" },
      ],
    },
  ],
};
