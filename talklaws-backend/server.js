/**
 * server.js
 * Entry point for the TALKLAWS backend.
 * Configures Express, connects to MongoDB, mounts routes.
 */

// Load environment variables first — before any other imports
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const errorHandler = require("./middleware/errorHandler");

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

const app = express();

// ─── Security Middleware ──────────────────────────────────────────────────────

// Helmet sets secure HTTP headers (prevents clickjacking, XSS, etc.)
app.use(helmet());

// CORS — only allow requests from your frontend URL
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ─── Request Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Limit body size to prevent large payload attacks
app.use(express.urlencoded({ extended: true }));

// ─── Sanitisation ─────────────────────────────────────────────────────────────
// Removes MongoDB operators ($, .) from user input to prevent injection
app.use(mongoSanitize());

// ─── Logging ─────────────────────────────────────────────────────────────────
// "dev" format in development, "combined" (Apache-style) in production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ─── Health Check ────────────────────────────────────────────────────────────
// Useful for deployment platforms (Render, Railway) to check if server is alive
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TALKLAWS API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/contact", contactRoutes);     // Public: contact form
app.use("/api/admin", adminRoutes);         // Protected: admin panel
app.use("/api", subscribeRoutes);           // Public: subscribe + unsubscribe

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── Global Error Handler (must be LAST) ─────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 TALKLAWS API running on port ${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});

// Handle unhandled promise rejections (e.g. DB query errors not caught)
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});
