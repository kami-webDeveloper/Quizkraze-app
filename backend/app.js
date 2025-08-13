const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionCommentsRoutes = require("./routes/questionCommentsRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Trust Vercel’s proxy so req.ip works
app.set("trust proxy", 1);

// Parsing JSON
app.use(express.json({ limit: "10kb", strict: false }));

// Parsing cookies
app.use(cookieParser());

// Secure HTTP headers
app.use(helmet());

// NoSQL injection prevention (body + params only)
app.use((req, res, next) => {
  if (req.body) mongosanitize.sanitize(req.body);
  if (req.params) mongosanitize.sanitize(req.params);
  next();
});

// prevent XSS
// app.use(xss());

// Rate limiting with IP fallback for serverless env
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, Please try again after 1 hour",
    keyGenerator: (req) => {
      return (
        req.ip ||
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        "unknown"
      );
    },
    skipFailedRequests: true, // optional
  })
);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/results", resultsRoutes);
app.use("/api/v1/questions", questionCommentsRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
