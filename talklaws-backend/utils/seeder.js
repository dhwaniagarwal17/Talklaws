/**
 * utils/seeder.js
 * One-time script to create the admin account in MongoDB.
 *
 * Run ONCE with:  node utils/seeder.js
 * (Make sure your .env file exists with ADMIN_* variables filled in)
 *
 * After running, delete or do not run this again unless you reset the DB.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const connectDB = require("../config/db");

const seedAdmin = async () => {
  await connectDB();

  try {
    // Check if an admin already exists to avoid duplicates
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existing) {
      console.log("⚠️  Admin already exists. Seeder will not overwrite.");
      process.exit(0);
    }

    await Admin.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // Will be hashed by pre-save hook
      role: "superadmin",
    });

    console.log(`✅ Admin created successfully!`);
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: (the one you set in .env)`);
    console.log(`\n⚠️  Keep your .env file secret and never share it.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
