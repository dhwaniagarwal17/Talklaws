/**
 * routes/adminRoutes.js
 * All admin routes — most are protected by the JWT middleware.
 *
 * Base path (set in server.js): /api/admin
 */

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const { login, getMe, changePassword } = require("../controllers/authController");
const {
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
} = require("../controllers/enquiryController");
const {
  getSubscriberStats,
  getAllSubscribers,
  updateSubscriberStatus,
  deleteSubscriber,
  sendUpdate,
} = require("../controllers/subscriberController");

const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { loginLimiter } = require("../middleware/rateLimiter");

// ─────────────────────────────────────────────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────────────────────────────────────────────

// POST /api/admin/login
const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required"),
];

router.post("/login", loginLimiter, loginValidation, validate, login);

// GET /api/admin/me — get logged-in admin's profile
router.get("/me", protect, getMe);

// POST /api/admin/change-password
const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 }).withMessage("New password must be at least 8 characters"),
];
router.post("/change-password", protect, changePasswordValidation, validate, changePassword);

// ─────────────────────────────────────────────────────────────────────────────
// ENQUIRY ROUTES (all protected)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/admin/enquiries/stats — must come BEFORE /:id to avoid conflict
router.get("/enquiries/stats", protect, getEnquiryStats);

// GET /api/admin/enquiries?page=1&limit=20&status=New&search=tanu&order=desc
router.get("/enquiries", protect, getAllEnquiries);

// GET /api/admin/enquiries/:id
router.get(
  "/enquiries/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid enquiry ID")],
  validate,
  getEnquiry
);

// PATCH /api/admin/enquiries/:id/status
const statusValidation = [
  param("id").isMongoId().withMessage("Invalid enquiry ID"),
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(["New", "Contacted", "Closed"])
    .withMessage("Status must be New, Contacted, or Closed"),
  body("adminNotes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage("Notes cannot exceed 1000 characters"),
];
router.patch("/enquiries/:id/status", protect, statusValidation, validate, updateEnquiryStatus);

// DELETE /api/admin/enquiries/:id
router.delete(
  "/enquiries/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid enquiry ID")],
  validate,
  deleteEnquiry
);

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIBER ROUTES (all protected)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/admin/subscribers/stats — must come BEFORE /:id
router.get("/subscribers/stats", protect, getSubscriberStats);

// GET /api/admin/subscribers
router.get("/subscribers", protect, getAllSubscribers);

// PATCH /api/admin/subscribers/:id/status
router.patch(
  "/subscribers/:id/status",
  protect,
  [
    param("id").isMongoId().withMessage("Invalid subscriber ID"),
    body("status")
      .notEmpty().withMessage("Status is required")
      .isIn(["Active", "Unsubscribed"]).withMessage("Status must be Active or Unsubscribed"),
  ],
  validate,
  updateSubscriberStatus
);

// DELETE /api/admin/subscribers/:id
router.delete(
  "/subscribers/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid subscriber ID")],
  validate,
  deleteSubscriber
);

// POST /api/admin/subscribers/send-update
router.post(
  "/subscribers/send-update",
  protect,
  [
    body("title").trim().notEmpty().withMessage("Article title is required"),
    body("articleUrl").trim().notEmpty().isURL().withMessage("A valid article URL is required"),
    body("excerpt").trim().notEmpty().withMessage("Excerpt is required").isLength({ max: 500 }),
  ],
  validate,
  sendUpdate
);

module.exports = router;
