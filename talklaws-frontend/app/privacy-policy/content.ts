import type { LegalDoc } from "@/components/LegalPage";

export const doc: LegalDoc = {
  title: "Privacy Policy",
  effectiveDate: "12 July 2026",
  intro: [
    'Welcome to TALKLAWS Legal Advisory ("TALKLAWS", "we", "our", or "us"). We are committed to protecting your privacy and handling your personal information responsibly.',
    "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit an enquiry, subscribe to our updates, or communicate with us.",
    "By using this website, you agree to the practices described in this Privacy Policy.",
  ],
  sections: [
    {
      number: "1",
      title: "Information We Collect",
      blocks: [
        { type: "paragraph", text: "We may collect information that you voluntarily provide, including:" },
        {
          type: "list",
          items: [
            "Full Name",
            "Email Address",
            "Phone Number",
            "Company or Organisation Name (if provided)",
            "Information submitted through consultation requests, contact forms, or other enquiries",
          ],
        },
        { type: "paragraph", text: "We may also collect limited technical information necessary for website security and performance, such as browser type, device information, IP address, and pages visited." },
      ],
    },
    {
      number: "2",
      title: "How We Use Your Information",
      blocks: [
        { type: "paragraph", text: "The information collected may be used to:" },
        {
          type: "list",
          items: [
            "Respond to your enquiries and consultation requests.",
            "Communicate regarding our professional services.",
            "Schedule meetings or consultations.",
            "Improve the functionality and user experience of our website.",
            "Send newsletters, legal updates, or insights where you have chosen to subscribe.",
            "Comply with applicable legal and regulatory obligations.",
          ],
        },
      ],
    },
    {
      number: "3",
      title: "Information Sharing",
      blocks: [
        { type: "paragraph", text: "TALKLAWS does not sell, rent, or trade your personal information." },
        { type: "paragraph", text: "Your information may only be shared:" },
        {
          type: "list",
          items: [
            "Where required by law or regulatory authorities.",
            "With trusted service providers assisting in the operation of our website or communication systems, subject to appropriate confidentiality obligations.",
            "To protect the legal rights, safety, or property of TALKLAWS or others.",
          ],
        },
      ],
    },
    {
      number: "4",
      title: "Data Security",
      blocks: [
        { type: "paragraph", text: "We implement reasonable administrative, technical, and organisational measures to safeguard the information submitted through our website." },
        { type: "paragraph", text: "While every effort is made to protect your information, no method of electronic transmission or storage can be guaranteed to be completely secure." },
      ],
    },
    {
      number: "5",
      title: "Data Retention",
      blocks: [
        { type: "paragraph", text: "Personal information is retained only for as long as necessary to:" },
        {
          type: "list",
          items: [
            "Respond to your enquiries.",
            "Deliver our professional services.",
            "Meet legal, regulatory, or professional obligations.",
            "Resolve disputes where applicable.",
          ],
        },
      ],
    },
    {
      number: "6",
      title: "Third-Party Links",
      blocks: [
        { type: "paragraph", text: "Our website may contain links to external websites, including LinkedIn, Google Maps, and other third-party platforms." },
        { type: "paragraph", text: "These websites operate independently and maintain their own privacy policies. TALKLAWS is not responsible for the privacy practices or content of external websites." },
      ],
    },
    {
      number: "7",
      title: "Cookies",
      blocks: [
        { type: "paragraph", text: "Our website may use essential cookies required for the proper functioning of the website." },
        { type: "paragraph", text: "For detailed information regarding our use of cookies, please refer to our Cookie Policy." },
      ],
    },
    {
      number: "8",
      title: "Your Rights",
      blocks: [
        { type: "paragraph", text: "Subject to applicable law, you may request to:" },
        {
          type: "list",
          items: [
            "Access your personal information.",
            "Correct inaccurate information.",
            "Request deletion of information where appropriate.",
            "Withdraw consent for future communications, where applicable.",
          ],
        },
        { type: "paragraph", text: "Requests may be submitted using the contact information provided below." },
      ],
    },
    {
      number: "9",
      title: "Changes to this Privacy Policy",
      blocks: [
        { type: "paragraph", text: "TALKLAWS may update this Privacy Policy periodically to reflect changes in legal requirements or website functionality." },
        { type: "paragraph", text: "The revised version will be published on this page together with the updated Effective Date." },
      ],
    },
    {
      number: "10",
      title: "Contact Us",
      blocks: [
        { type: "paragraph", text: "For questions regarding this Privacy Policy or the handling of your personal information, please contact:" },
        { type: "contact" },
      ],
    },
  ],
};
