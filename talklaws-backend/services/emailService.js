/**
 * services/emailService.js
 * Handles all outbound email via Resend.
 *
 * Future upgrade: when articles move to MongoDB/CMS, call
 * sendArticleUpdate() from an article publish hook — no changes needed here.
 *
 * Setup:
 *   npm install resend
 *   Add RESEND_API_KEY to .env
 *   Set RESEND_FROM_EMAIL to a verified sender (e.g. updates@talklaws.com)
 */

const { Resend } = require("resend");

// Lazy singleton — only instantiated when sendArticleUpdate is first called,
// so the server starts even before RESEND_API_KEY is added to .env.
let _resend = null;
function getResend() {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in .env. Add it before sending emails.");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const SITE_URL = process.env.CLIENT_URL || "https://talklaws.com";

/**
 * Builds the branded HTML email template for an article update.
 */
function buildArticleEmailHTML({ title, excerpt, articleUrl }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#FAF8F6;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E8E4DE;">

          <!-- Header -->
          <tr>
            <td style="background:#0F0A0B;padding:28px 32px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <svg width="22" height="27" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="26.5" y="8" width="3" height="52" rx="1.5" fill="#C4A035"/>
                      <rect x="8" y="22" width="40" height="2.5" rx="1.25" fill="white" opacity="0.8"/>
                      <circle cx="28" cy="23.25" r="4" fill="#C4A035"/>
                      <path d="M5 36 Q12 43 19 36" stroke="#C4A035" stroke-width="2" stroke-linecap="round" fill="none"/>
                      <path d="M37 36 Q44 43 51 36" stroke="#C4A035" stroke-width="2" stroke-linecap="round" fill="none"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">TALKLAWS</span>
                  </td>
                </tr>
              </table>
              <p style="color:rgba(255, 255, 255, 0.94);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:8px 0 0;">
Corporate Law | Governance | Compliance</p>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#6B001A,#C4A035,#6B001A);"></td>
          </tr>

          <!-- Label -->
          <tr>
            <td style="padding:32px 32px 0;">
              <span style="display:inline-block;background:#FAF8F6;border:1px solid #D8D6D0;color:#8B6914;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:999px;">New Insight</span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:16px 32px 0;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#141414;line-height:1.3;letter-spacing:-0.02em;">${title}</h1>
            </td>
          </tr>

          <!-- Excerpt -->
          <tr>
            <td style="padding:16px 32px 0;">
              <p style="margin:0;font-size:15px;color:#2E2E2E;line-height:1.7;font-weight:300;">${excerpt}</p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 32px 32px;">
              <a href="${articleUrl}"
                 style="display:inline-block;background:#6B001A;color:#ffffff;font-size:14px;font-weight:600;padding:14px 28px;border-radius:12px;text-decoration:none;letter-spacing:0.01em;">
                Read Article →
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;"><div style="height:1px;background:#E8E4DE;"></div></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#7A7A7A;">
                You are receiving this because you subscribed to TALKLAWS insights.
              </p>
              <p style="margin:0;font-size:12px;color:#7A7A7A;">
                <a href="${SITE_URL}" style="color:#6B001A;text-decoration:none;">Visit TALKLAWS</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}/api/unsubscribe?email={{email}}" style="color:#7A7A7A;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send an article update to a list of recipient emails.
 * Sends in batches of 50 to stay within Resend's batch limits.
 *
 * @param {Object} params
 * @param {string} params.title       Article title
 * @param {string} params.excerpt     Short excerpt
 * @param {string} params.articleUrl  Full URL to the article
 * @param {string[]} params.recipients Array of email addresses
 * @returns {{ sent: number, failed: number }}
 */
async function sendArticleUpdate({ title, excerpt, articleUrl, recipients }) {
  if (!recipients.length) return { sent: 0, failed: 0 };

  const BATCH_SIZE = 50;
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map((email) => {
        // In non-production environments, redirect to test address if configured.
        // In production, always send to the real subscriber email.
        const to =
          process.env.NODE_ENV !== "production" && process.env.RESEND_TEST_EMAIL
            ? process.env.RESEND_TEST_EMAIL
            : email;
        return getResend().emails.send({
          from: FROM_EMAIL,
          to,
          subject: `New Insight: ${title}`,
          html: buildArticleEmailHTML({ title, excerpt, articleUrl }).replace("{{email}}", encodeURIComponent(email)),
        });
      })
    );

    results.forEach((r) => {
      if (r.status === "fulfilled") {
        // Log the Resend response — if it contains an error object, delivery failed
        if (r.value?.error) {
          console.error("Resend delivery error:", JSON.stringify(r.value.error));
          failed++;
        } else {
          console.log("Resend sent OK — id:", r.value?.data?.id);
          sent++;
        }
      } else {
        console.error("Resend send rejected:", r.reason);
        failed++;
      }
    });
  }

  return { sent, failed };
}

module.exports = { sendArticleUpdate };
