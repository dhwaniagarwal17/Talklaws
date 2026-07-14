/**
 * models/Enquiry.js
 * Mongoose schema for contact form submissions.
 * Every time someone fills the Contact Us form, a document is created here.
 */

const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },

    // Maps to the "Area of Interest" dropdown on the frontend
    subject: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },

    // Admin can update this to track progress
    status: {
      type: String,
      enum: {
        values: ["New", "Contacted", "Closed"],
        message: "Status must be New, Contacted, or Closed",
      },
      default: "New",
    },

    // Optional admin notes — not visible to the enquirer
    adminNotes: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Admin notes cannot exceed 1000 characters"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Index for fast lookups and searches
EnquirySchema.index({ email: 1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ createdAt: -1 }); // Most recent first

module.exports = mongoose.model("Enquiry", EnquirySchema);
