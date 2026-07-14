/**
 * models/Subscriber.js
 * Schema for newsletter subscribers.
 * Stores email, subscription status, and signup date.
 */

const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    status: {
      type: String,
      enum: {
        values: ["Active", "Unsubscribed"],
        message: "Status must be Active or Unsubscribed",
      },
      default: "Active",
    },

    // Source of subscription (footer, article page, etc.) — for future analytics
    source: {
      type: String,
      trim: true,
      default: "footer",
      maxlength: [50, "Source cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true, // createdAt = date subscribed, updatedAt = last status change
  }
);

SubscriberSchema.index({ status: 1 });
SubscriberSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Subscriber", SubscriberSchema);
