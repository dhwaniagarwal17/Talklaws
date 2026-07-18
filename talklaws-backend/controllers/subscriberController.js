/**
 * controllers/subscriberController.js
 * HTTP request/response handlers for subscriber routes.
 * Delegates business logic to subscriberService and emailService.
 */

const subscriberService = require("../services/subscriberService");
const emailService = require("../services/emailService");
const AppError = require("../utils/AppError");

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: POST /api/subscribe
// ─────────────────────────────────────────────────────────────────────────────
const subscribe = async (req, res, next) => {
  try {
    const { email, source } = req.body;

    const result = await subscriberService.createSubscriber(email, source);

    if (result.alreadySubscribed) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed. Thank you!",
      });
    }

    if (result.reactivated) {
      return res.status(200).json({
        success: true,
        message: "Welcome back! You have been resubscribed successfully.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Thank you for subscribing! You will receive our next insight.",
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: GET /api/unsubscribe?email=...
// One-click unsubscribe from email footer links
// ─────────────────────────────────────────────────────────────────────────────
const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    // Validate and normalise the email before touching the database
    const decoded = decodeURIComponent(email).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(decoded)) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    await subscriberService.unsubscribeByEmail(decoded);

    // Respond with a plain HTML confirmation page
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Unsubscribed — TALKLAWS</title>
<style>body{font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#FAF8F6;margin:0;}
.box{background:#fff;border:1px solid #E8E4DE;border-radius:16px;padding:48px;max-width:420px;text-align:center;}
h1{color:#141414;font-size:1.4rem;letter-spacing:-0.02em;margin:0 0 12px;}
p{color:#4A4A4A;font-size:0.9rem;line-height:1.6;margin:0 0 24px;}
a{color:#6B001A;font-weight:600;text-decoration:none;}</style>
</head>
<body><div class="box">
<h1>You have been unsubscribed.</h1>
<p>Your email has been removed from the TALKLAWS insights mailing list. You will no longer receive updates from us.</p>
<a href="${process.env.CLIENT_URL || "https://www.talklaws.in"}">Return to TALKLAWS</a>
</div></body></html>`);
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: GET /api/admin/subscribers/stats
// ─────────────────────────────────────────────────────────────────────────────
const getSubscriberStats = async (req, res, next) => {
  try {
    const stats = await subscriberService.getSubscriberStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: GET /api/admin/subscribers
// ─────────────────────────────────────────────────────────────────────────────
const getAllSubscribers = async (req, res, next) => {
  try {
    const result = await subscriberService.getAllSubscribers(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: PATCH /api/admin/subscribers/:id/status
// ─────────────────────────────────────────────────────────────────────────────
const updateSubscriberStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const subscriber = await subscriberService.updateSubscriberStatus(req.params.id, status);

    if (!subscriber) return next(new AppError("Subscriber not found", 404));

    res.status(200).json({
      success: true,
      message: `Subscriber marked as ${status}.`,
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: DELETE /api/admin/subscribers/:id
// ─────────────────────────────────────────────────────────────────────────────
const deleteSubscriber = async (req, res, next) => {
  try {
    const subscriber = await subscriberService.deleteSubscriber(req.params.id);

    if (!subscriber) return next(new AppError("Subscriber not found", 404));

    res.status(200).json({ success: true, message: "Subscriber deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: POST /api/admin/subscribers/send-update
// Sends an article update email to all Active subscribers via Resend.
// ─────────────────────────────────────────────────────────────────────────────
const sendUpdate = async (req, res, next) => {
  try {
    const { title, articleUrl, excerpt } = req.body;

    const recipients = await subscriberService.getActiveEmails();

    if (!recipients.length) {
      return res.status(200).json({
        success: true,
        message: "No active subscribers to send to.",
        sent: 0,
        failed: 0,
      });
    }

    const { sent, failed } = await emailService.sendArticleUpdate({
      title,
      excerpt,
      articleUrl,
      recipients,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${sent} subscriber${sent !== 1 ? "s" : ""}.${failed ? ` ${failed} failed.` : ""}`,
      sent,
      failed,
      total: recipients.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getSubscriberStats,
  getAllSubscribers,
  updateSubscriberStatus,
  deleteSubscriber,
  sendUpdate,
};
