/**
 * middleware/auth.js
 * Protects admin routes by verifying the JWT token.
 * Usage: add `protect` as middleware before any admin route handler.
 *
 * Example:
 *   router.get("/enquiries", protect, getAllEnquiries);
 */

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  // Token should arrive in the Authorization header as: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorised. Please log in.",
    });
  }

  try {
    // Verify the token signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the admin document to req so controllers can use it
    req.admin = await Admin.findById(decoded.id).select("-password");

    if (!req.admin || !req.admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account not found or deactivated.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

module.exports = { protect };
