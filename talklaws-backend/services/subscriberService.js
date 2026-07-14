/**
 * services/subscriberService.js
 * Business logic for subscriber management.
 * Separated from the controller for reusability and testability.
 *
 * Future upgrade path: when articles move to MongoDB/CMS, the
 * sendArticleUpdate function can be called automatically from
 * an article publish hook without touching the controller.
 */

const Subscriber = require("../models/Subscriber");

/** Subscribe a new email. Returns null if already subscribed (and active). */
const createSubscriber = async (email, source = "footer") => {
  // Check for existing subscriber
  const existing = await Subscriber.findOne({ email });

  if (existing) {
    if (existing.status === "Active") {
      // Already subscribed — return a specific flag so the controller
      // can respond with a friendly "already subscribed" message
      return { alreadySubscribed: true, subscriber: existing };
    }
    // Was unsubscribed — reactivate
    existing.status = "Active";
    await existing.save();
    return { reactivated: true, subscriber: existing };
  }

  const subscriber = await Subscriber.create({ email, source });
  return { subscriber };
};

/** Get all subscribers with optional filtering, searching, and pagination. */
const getAllSubscribers = async (queryParams) => {
  const {
    page = 1,
    limit = 20,
    status,
    search,
    order = "desc",
  } = queryParams;

  const filter = {};

  if (status && ["Active", "Unsubscribed"].includes(status)) {
    filter.status = status;
  }

  if (search) {
    filter.email = { $regex: search, $options: "i" };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  const [subscribers, total] = await Promise.all([
    Subscriber.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Subscriber.countDocuments(filter),
  ]);

  return {
    subscribers,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/** Update a subscriber's status (Active / Unsubscribed). */
const updateSubscriberStatus = async (id, status) => {
  return await Subscriber.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
};

/** Unsubscribe by email — used by the public unsubscribe endpoint. */
const unsubscribeByEmail = async (email) => {
  return await Subscriber.findOneAndUpdate(
    { email },
    { status: "Unsubscribed" },
    { new: true }
  );
};

/** Permanently delete a subscriber record. */
const deleteSubscriber = async (id) => {
  return await Subscriber.findByIdAndDelete(id);
};

/** Get subscriber counts for the admin dashboard. */
const getSubscriberStats = async () => {
  const stats = await Subscriber.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const result = { Active: 0, Unsubscribed: 0, total: 0 };
  stats.forEach((s) => {
    result[s._id] = s.count;
    result.total += s.count;
  });

  return result;
};

/**
 * Get all active subscriber emails — used by the Send Update feature.
 * Returns a plain array of email strings for the email service to consume.
 */
const getActiveEmails = async () => {
  const subscribers = await Subscriber.find({ status: "Active" }, { email: 1, _id: 0 }).lean();
  return subscribers.map((s) => s.email);
};

module.exports = {
  createSubscriber,
  getAllSubscribers,
  updateSubscriberStatus,
  unsubscribeByEmail,
  deleteSubscriber,
  getSubscriberStats,
  getActiveEmails,
};
