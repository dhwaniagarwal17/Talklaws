/**
 * config/db.js
 * Connects to MongoDB using Mongoose.
 * Call connectDB() once in server.js before starting the server.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options prevent deprecation warnings
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Exit with failure — no point running without a database
    process.exit(1);
  }
};

module.exports = connectDB;
