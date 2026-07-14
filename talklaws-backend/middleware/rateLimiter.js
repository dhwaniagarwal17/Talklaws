/**
 * middleware/rateLimiter.js
 * Limits how often a single IP can submit the contact form.
 * Default: 10 requests per 15 minutes — enough for genuine users,
 * blocks bots and spam submissions.
 */

const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 10,
  message: {
    success: false,
    message:
      "Too many submissions from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,  // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
});

// A stricter limiter for the login route — 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { contactLimiter, loginLimiter };
