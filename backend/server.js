const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// environment configuration
dotenv.config({ path: "./config.env" });

// MongoDB connection
const port = process.env.PORT || 3000;

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL).then(() => {
  console.log("MongoDB connected");

  const server = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
  );

  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    server.close(() => process.exit(1));
  });

  process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
      console.log("💥 Process terminated!");
    });
  });
});

module.exports = app;
