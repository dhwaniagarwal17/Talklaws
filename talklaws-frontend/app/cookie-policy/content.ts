import type { LegalDoc } from "@/components/LegalPage";

export const doc: LegalDoc = {
  title: "Cookie Policy",
  effectiveDate: "12 July 2026",
  intro: [
    'This Cookie Policy explains how TALKLAWS Legal Advisory ("TALKLAWS", "we", "our", or "us") uses cookies and similar technologies when you visit our website.',
    "By continuing to browse our website, you consent to the use of cookies in accordance with this Cookie Policy, unless you disable them through your browser settings.",
  ],
  sections: [
    {
      number: "1",
      title: "What Are Cookies?",
      blocks: [
        { type: "paragraph", text: "Cookies are small text files stored on your device by your web browser when you visit a website. They help websites function efficiently, remember your preferences, and improve your browsing experience." },
        { type: "paragraph", text: "Cookies do not typically contain personally identifiable information but may be associated with information you have voluntarily provided to us." },
      ],
    },
    {
      number: "2",
      title: "Cookies We Use",
      blocks: [
        { type: "paragraph", text: "TALKLAWS currently uses only essential cookies that are necessary for the proper operation, security, and functionality of the website." },
        { type: "paragraph", text: "These cookies enable features such as:" },
        {
          type: "list",
          items: [
            "Secure website functionality",
            "Form submission support",
            "Basic website performance",
            "User session management (where applicable)",
          ],
        },
        { type: "paragraph", text: "These cookies cannot be disabled without affecting the operation of the website." },
      ],
    },
    {
      number: "3",
      title: "Analytics and Performance Cookies",
      blocks: [
        { type: "paragraph", text: "At present, TALKLAWS does not use analytics, advertising, or marketing cookies." },
        { type: "paragraph", text: "If services such as Google Analytics or similar tools are implemented in the future, this Cookie Policy will be updated accordingly, and visitors will be informed of any changes." },
      ],
    },
    {
      number: "4",
      title: "Managing Cookies",
      blocks: [
        { type: "paragraph", text: "Most web browsers allow you to:" },
        {
          type: "list",
          items: [
            "View stored cookies",
            "Delete existing cookies",
            "Block cookies entirely",
            "Receive notifications before cookies are stored",
          ],
        },
        { type: "paragraph", text: "Please note that disabling essential cookies may affect the functionality and user experience of certain parts of this website." },
        { type: "paragraph", text: "For browser-specific guidance, please refer to your browser's help documentation." },
      ],
    },
    {
      number: "5",
      title: "Third-Party Services",
      blocks: [
        { type: "paragraph", text: "Certain third-party services accessible through this website, including Google Maps or LinkedIn, may place their own cookies when you interact with their content." },
        { type: "paragraph", text: "These cookies are governed by the respective privacy and cookie policies of those third-party providers." },
        { type: "paragraph", text: "TALKLAWS does not control or assume responsibility for third-party cookies." },
      ],
    },
    {
      number: "6",
      title: "Changes to this Cookie Policy",
      blocks: [
        { type: "paragraph", text: "TALKLAWS may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or website functionality." },
        { type: "paragraph", text: "Any updates will be published on this page together with the revised Effective Date." },
      ],
    },
    {
      number: "7",
      title: "Contact Us",
      blocks: [
        { type: "paragraph", text: "If you have any questions regarding this Cookie Policy, please contact:" },
        { type: "contact" },
      ],
    },
  ],
};
