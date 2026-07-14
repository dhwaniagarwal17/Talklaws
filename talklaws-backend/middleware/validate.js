/**
 * middleware/validate.js
 * Reads results from express-validator and returns a 400 if any field failed.
 * Place this AFTER your validation chain in a route.
 *
 * Example usage in a route file:
 *   router.post("/contact", contactValidation, validate, submitEnquiry);
 */

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      // Return all field errors so the frontend can highlight them
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

module.exports = validate;
