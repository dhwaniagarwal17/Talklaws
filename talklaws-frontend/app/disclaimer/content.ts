import type { LegalDoc } from "@/components/LegalPage";

export const doc: LegalDoc = {
  title: "Disclaimer",
  effectiveDate: "12 July 2026",
  intro: [
    'The information contained on the TALKLAWS Legal Advisory website ("Website") is provided solely for general informational and educational purposes. While every effort is made to ensure that the information published is accurate, current, and reliable, TALKLAWS makes no representations or warranties, express or implied, regarding the completeness, accuracy, reliability, or suitability of any information available on this Website.',
  ],
  sections: [
    {
      number: "1",
      title: "No Professional Advice",
      blocks: [
        { type: "paragraph", text: "The content published on this Website, including articles, legal insights, regulatory updates, publications, and other resources, is intended for general informational purposes only." },
        { type: "paragraph", text: "Nothing on this Website should be interpreted as legal, secretarial, regulatory, financial, tax, or professional advice." },
        { type: "paragraph", text: "Every legal or regulatory matter depends upon its specific facts and circumstances. Visitors should obtain professional advice before making any business or legal decisions." },
      ],
    },
    {
      number: "2",
      title: "No Professional-Client Relationship",
      blocks: [
        { type: "paragraph", text: "Accessing this Website, reading its content, downloading materials, or submitting an enquiry does not create a professional-client, advisor-client, or fiduciary relationship between TALKLAWS and any visitor." },
        { type: "paragraph", text: "A professional relationship is established only after formal engagement and acceptance by TALKLAWS." },
      ],
    },
    {
      number: "3",
      title: "No Guarantee of Outcomes",
      blocks: [
        { type: "paragraph", text: "Past experience, publications, or professional insights available on this Website should not be interpreted as a guarantee of future results." },
        { type: "paragraph", text: "Every matter is unique and outcomes depend upon the specific facts, applicable laws, regulatory requirements, and individual circumstances." },
      ],
    },
    {
      number: "4",
      title: "Third-Party Links",
      blocks: [
        { type: "paragraph", text: "This Website may contain links to third-party websites, including LinkedIn, Google Maps, government portals, or other external resources." },
        { type: "paragraph", text: "Such links are provided solely for user convenience." },
        { type: "paragraph", text: "TALKLAWS neither controls nor endorses the content, accuracy, availability, or privacy practices of third-party websites and accepts no responsibility for them." },
      ],
    },
    {
      number: "5",
      title: "Intellectual Property",
      blocks: [
        { type: "paragraph", text: "Unless otherwise stated, all content available on this Website—including articles, publications, graphics, branding, logos, website design, and other materials—is the intellectual property of TALKLAWS or is used with appropriate permission." },
        { type: "paragraph", text: "No material may be reproduced, distributed, modified, or commercially exploited without prior written permission." },
      ],
    },
    {
      number: "6",
      title: "Limitation of Liability",
      blocks: [
        { type: "paragraph", text: "To the fullest extent permitted under applicable law, TALKLAWS shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:" },
        {
          type: "list",
          items: [
            "Use of this Website;",
            "Reliance on any information published on this Website;",
            "Temporary interruption or unavailability of the Website;",
            "Errors, omissions, or inaccuracies in published content.",
          ],
        },
        { type: "paragraph", text: "Visitors use this Website entirely at their own discretion and risk." },
      ],
    },
    {
      number: "7",
      title: "Regulatory Information",
      blocks: [
        { type: "paragraph", text: "TALKLAWS provides corporate legal, governance, compliance, and advisory services through qualified professionals." },
        { type: "paragraph", text: "Nothing contained on this Website should be construed as solicitation where such communication is prohibited under applicable law or professional regulations." },
      ],
    },
    {
      number: "8",
      title: "Changes to this Disclaimer",
      blocks: [
        { type: "paragraph", text: "TALKLAWS reserves the right to modify this Disclaimer at any time." },
        { type: "paragraph", text: "Any changes will become effective upon publication on this page together with the revised Effective Date." },
      ],
    },
    {
      number: "9",
      title: "Contact Us",
      blocks: [
        { type: "paragraph", text: "For any questions regarding this Disclaimer or the information published on this Website, please contact:" },
        { type: "contact" },
      ],
    },
  ],
};
