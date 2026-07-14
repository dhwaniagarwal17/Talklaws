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
const { contactLimiter } = require("../middleware/rateLimiter");

const subscribeValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail(),
];

// POST /api/subscribe
router.post("/subscribe", contactLimiter, subscribeValidation, validate, subscribe);

// GET /api/unsubscribe?email=...
router.get("/unsubscribe", unsubscribe);

module.exports = router;
