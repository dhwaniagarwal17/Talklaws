/**
 * controllers/authController.js
 * Handles admin login and profile retrieval.
 */

const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/login
// Admin logs in with email + password.
// Returns a JWT on success.
// ─────────────────────────────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Manually select password — it's excluded by default in the schema
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      // Use a vague message so attackers can't enumerate valid emails
      return next(new AppError("Invalid email or password", 401));
    }

    if (!admin.isActive) {
      return next(new AppError("This account has been deactivated", 401));
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: `Welcome back, ${admin.name}`,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/me
// Returns the logged-in admin's profile.
// Protected — requires a valid JWT.
// ─────────────────────────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    // req.admin is set by the protect middleware
    res.status(200).json({
      success: true,
      data: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        lastLogin: req.admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/change-password
// Allows admin to change their own password.
// Protected — requires a valid JWT.
// ─────────────────────────────────────────────────────────────────────────────
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select("+password");

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return next(new AppError("Current password is incorrect", 400));
    }

    admin.password = newPassword; // Pre-save hook will hash it
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully. Please log in again.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, changePassword };
