/**
 * routes/subscribeRoutes.js
 * Public subscribe and unsubscribe routes.
 * Base path (set in server.js): /api
 */

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { subscribe, unsubscribe } = require("../controllers/subscriberController");
const validate = require("../middleware/validate");
const { subscribeLimiter, unsubscribeLimiter } = require("../middleware/rateLimiter");

const subscribeValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail(),
];

// POST /api/subscribe
router.post("/subscribe", subscribeLimiter, subscribeValidation, validate, subscribe);

// GET /api/unsubscribe?email=...
router.get("/unsubscribe", unsubscribeLimiter, unsubscribe);

module.exports = router;
