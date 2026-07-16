/**
 * middleware/rateLimiter.js
 * Rate limiters for all public and admin endpoints.
 * trust proxy is set in server.js so Render's reverse proxy IP is handled correctly.
 */

const rateLimit = require("express-rate-limit");

// ─── Global API limiter ───────────────────────────────────────────────────────
// Applied to all /api/* routes in server.js
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
});

// ─── Contact form limiter ─────────────────────────────────────────────────────
// POST /api/contact — 10 per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many submissions from this IP. Please try again after 15 minutes.",
  },
});

// ─── Newsletter subscribe limiter ─────────────────────────────────────────────
// POST /api/subscribe — 10 per 15 minutes per IP
const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many subscribe requests from this IP. Please try again after 15 minutes.",
  },
});

// ─── Unsubscribe limiter ──────────────────────────────────────────────────────
// GET /api/unsubscribe — 10 per 15 minutes per IP (prevent mass-unsubscribe abuse)
const unsubscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many unsubscribe requests from this IP. Please try again after 15 minutes.",
  },
});

// ─── Admin login limiter ──────────────────────────────────────────────────────
// POST /api/admin/login — 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

module.exports = { globalLimiter, contactLimiter, subscribeLimiter, unsubscribeLimiter, loginLimiter };
