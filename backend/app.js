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

// Parsing json
app.use(express.json({ limit: "10kb", strict: false }));

// Parsing cookies
app.use(cookieParser());

// Secure http headers
app.use(helmet());

// NoSQL injection prevention
// NOTE: express-mongo-sanitize causes an error in Express >= 4.19
// because req.query is now a getter-only property
// so we sanitize only body & params manually

app.use((req, res, next) => {
  if (req.body) mongosanitize.sanitize(req.body);
  if (req.params) mongosanitize.sanitize(req.params);

  next();
});

// prevent XSS
// app.use(xss());

// Rate limiting
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, Please try again after 1 hour",
  })
);

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

// project phase
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/results", resultsRoutes);
app.use("/api/v1/questions", questionCommentsRoutes);

// Occurs pathRegexpError
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
