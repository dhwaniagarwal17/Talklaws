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
const xssClean = require("xss-clean");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const errorHandler = require("./middleware/errorHandler");
const { globalLimiter } = require("./middleware/rateLimiter");

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

const app = express();

// ─── Trust Render / reverse-proxy ────────────────────────────────────────────
// Required so express-rate-limit reads the real client IP from X-Forwarded-For
// rather than the proxy's internal IP (which would make all requests appear
// to come from the same address and break per-IP rate limiting).
app.set("trust proxy", 1);

// ─── Security Middleware ──────────────────────────────────────────────────────

// Helmet sets secure HTTP headers (prevents clickjacking, sniffing, etc.)
// Using conservative defaults that are safe for a JSON API backend.
app.use(helmet());

// CORS — allowlist of permitted origins.
// In production both the apex domain and www variant are accepted.
// localhost:3000 is retained for local development.
// No wildcard origins are used at any point.
const ALLOWED_ORIGINS = [
  "https://talklaws.in",
  "https://www.talklaws.in",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (e.g. Render health checks) that
      // have no Origin header, and any explicitly listed origin.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' is not allowed`));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ─── Request Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Limit body size to prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─── Sanitisation ─────────────────────────────────────────────────────────────
// Strip MongoDB operators ($, .) from req.body / req.query to block NoSQL injection
app.use(mongoSanitize());

// Sanitise user-supplied HTML/JS from req.body, req.params, req.query
// Prevents stored and reflected XSS attacks
app.use(xssClean());

// ─── Global Rate Limiting ─────────────────────────────────────────────────────
// 100 requests per 15 minutes per IP across all /api/* routes.
// Individual route limiters (login, contact, subscribe) are stricter.
app.use("/api", globalLimiter);

// ─── Logging ─────────────────────────────────────────────────────────────────
// "dev" format in development, "combined" (Apache-style) in production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ─── Health Check ────────────────────────────────────────────────────────────
// Useful for deployment platforms (Render, Railway) to check if server is alive.
// NODE_ENV is intentionally omitted from the production response to reduce
// information disclosure.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TALKLAWS API is running",
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
    message: "Route not found.",
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
