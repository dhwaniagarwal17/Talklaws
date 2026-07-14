/**
 * utils/generateToken.js
 * Creates a signed JWT for an admin after successful login.
 * The token is sent to the frontend and stored there (localStorage or memory).
 * It must be sent with every admin API request in the Authorization header.
 */

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },                          // Payload — stores admin's MongoDB _id
    process.env.JWT_SECRET,          // Secret key from .env
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // Token validity
  );
};

module.exports = generateToken;
