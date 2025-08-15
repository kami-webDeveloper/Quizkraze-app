// api/index.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../backend/app"); // Adjust path to app.js

// Load environment variables
dotenv.config({ path: "./config.env" });

// Keep a cached DB connection in serverless environment
let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  // Pass request to Express app
  return app(req, res);
};
