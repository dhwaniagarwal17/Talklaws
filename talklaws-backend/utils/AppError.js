/**
 * utils/AppError.js
 * A custom Error class that includes an HTTP status code.
 * Use this instead of plain Error() inside controllers so the
 * errorHandler middleware can set the correct HTTP status.
 *
 * Example:
 *   throw new AppError("Enquiry not found", 404);
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Capture the stack trace (skipping this constructor)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
