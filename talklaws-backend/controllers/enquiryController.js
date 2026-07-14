/**
 * controllers/enquiryController.js
 * Handles HTTP request/response for enquiry-related routes.
 * Delegates actual database work to enquiryService.js.
 */

const enquiryService = require("../services/enquiryService");
const AppError = require("../utils/AppError");

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: POST /api/contact
// Called by the Contact Us form on the frontend.
// ─────────────────────────────────────────────────────────────────────────────
const submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    const enquiry = await enquiryService.createEnquiry({
      name,
      email,
      phone: phone || "",
      subject: service || "", // "service" from frontend maps to "subject" in DB
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your enquiry has been received. We will be in touch shortly.",
      data: {
        id: enquiry._id,
        name: enquiry.name,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: GET /api/admin/enquiries
// Returns paginated, filterable list of all enquiries.
// ─────────────────────────────────────────────────────────────────────────────
const getAllEnquiries = async (req, res, next) => {
  try {
    const result = await enquiryService.getAllEnquiries(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: GET /api/admin/enquiries/:id
// Returns a single enquiry by MongoDB _id.
// ─────────────────────────────────────────────────────────────────────────────
const getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await enquiryService.getEnquiryById(req.params.id);

    if (!enquiry) {
      return next(new AppError("Enquiry not found", 404));
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: PATCH /api/admin/enquiries/:id/status
// Updates the status of an enquiry (New → Contacted → Closed).
// Optionally saves admin notes.
// ─────────────────────────────────────────────────────────────────────────────
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    const enquiry = await enquiryService.updateEnquiryStatus(req.params.id, {
      status,
      adminNotes,
    });

    if (!enquiry) {
      return next(new AppError("Enquiry not found", 404));
    }

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to "${status}"`,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: DELETE /api/admin/enquiries/:id
// Permanently deletes an enquiry from the database.
// ─────────────────────────────────────────────────────────────────────────────
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await enquiryService.deleteEnquiry(req.params.id);

    if (!enquiry) {
      return next(new AppError("Enquiry not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: GET /api/admin/enquiries/stats
// Returns counts by status for the dashboard summary cards.
// ─────────────────────────────────────────────────────────────────────────────
const getEnquiryStats = async (req, res, next) => {
  try {
    const stats = await enquiryService.getEnquiryStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
};
