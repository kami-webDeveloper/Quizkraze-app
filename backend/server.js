const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const connectDB = require("./db");

const port = process.env.PORT || 3000;

(async () => {
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });

  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    server.close(() => process.exit(1));
  });

  process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => console.log("💥 Process terminated!"));
  });
})();
