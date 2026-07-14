/**
 * routes/contactRoutes.js
 * Public route — accessible without any authentication.
 * This is the endpoint the frontend Contact Us form POSTs to.
 *
 * Base path (set in server.js): /api/contact
 */

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { submitEnquiry } = require("../controllers/enquiryController");
const validate = require("../middleware/validate");
const { contactLimiter } = require("../middleware/rateLimiter");

// ─── Validation rules for the contact form ───────────────────────────────────
const contactValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage("Phone number cannot exceed 20 characters"),

  body("service")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage("Subject cannot exceed 200 characters"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

// ─── POST /api/contact ────────────────────────────────────────────────────────
// contactLimiter  → rate limit (max 10 per 15 minutes per IP)
// contactValidation → field-level validation rules
// validate        → checks validation results and returns 400 if failed
// submitEnquiry   → saves to MongoDB and returns success response
router.post("/", contactLimiter, contactValidation, validate, submitEnquiry);

module.exports = router;
