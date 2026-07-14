/**
 * services/enquiryService.js
 * Business logic for enquiries — separated from the controller
 * so it can be reused (e.g. future email notifications, webhooks, etc.)
 */

const Enquiry = require("../models/Enquiry");

/**
 * Create a new enquiry from the contact form submission.
 */
const createEnquiry = async (data) => {
  const enquiry = await Enquiry.create(data);
  return enquiry;
};

/**
 * Get all enquiries with optional filtering, searching, and pagination.
 * @param {Object} queryParams - Express req.query object
 */
const getAllEnquiries = async (queryParams) => {
  const {
    page = 1,
    limit = 20,
    status,
    search,
    sortBy = "createdAt",
    order = "desc",
  } = queryParams;

  // Build filter object
  const filter = {};

  if (status && ["New", "Contacted", "Closed"].includes(status)) {
    filter.status = status;
  }

  // Search by name OR email (case-insensitive)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .lean(), // .lean() returns plain JS objects — faster for read-only
    Enquiry.countDocuments(filter),
  ]);

  return {
    enquiries,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * Get a single enquiry by its MongoDB _id.
 */
const getEnquiryById = async (id) => {
  return await Enquiry.findById(id);
};

/**
 * Update the status (and optional admin notes) of an enquiry.
 */
const updateEnquiryStatus = async (id, updates) => {
  return await Enquiry.findByIdAndUpdate(
    id,
    { status: updates.status, adminNotes: updates.adminNotes },
    { new: true, runValidators: true } // Return updated doc, run schema validators
  );
};

/**
 * Delete an enquiry by its _id.
 */
const deleteEnquiry = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};

/**
 * Get summary counts for the dashboard (New / Contacted / Closed).
 */
const getEnquiryStats = async () => {
  const stats = await Enquiry.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Convert array to a readable object
  const result = { New: 0, Contacted: 0, Closed: 0, total: 0 };
  stats.forEach((s) => {
    result[s._id] = s.count;
    result.total += s.count;
  });

  return result;
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
};
