const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Email = require("../utils/email");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const crypto = require("crypto");

// Generates token based on user ID
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

// Sends token with cookie & json response
const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const isDev = process.env.NODE_ENV !== "production";

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    path: "/",
  });

  // Removing password from json response
  user.password = undefined;

  res.status(statusCode).json({ status: "success", token, data: { user } });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user entered email & password
  if (!email || !password)
    return next(new AppError("Please provide email & password", 400));

  const user = await User.findOne({ email }).select("+password");

  // Checking if user with email & correct password exists
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  // if ok, send token
  createSendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ status: "success" });
};

// protecting routes
exports.protect = catchAsync(async (req, res, next) => {
  // Checking token validation coming from request headers or cookie
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    return next(new AppError("You are logged out! Please login again.", 401));

  // decoding token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // Checking if user logged out or not
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser)
    return next(
      new AppError("User belonging to this token does no longer exist", 401)
    );

  if (currentUser.changedPasswordAfter(decodedToken.iat))
    return next(
      new AppError("User recently changed password. Please login again!", 401)
    );

  req.user = currentUser;

  next();
});

// Restricting users from accessing author pages
// exports.restrictUsers = catchAsync(async (req, res, next) => {
//   const { quizId } = req.params;

//   const targetQuiz = await Quiz.findById(quizId);

//   if (req.user._id !== targetQuiz.author)
//     return next(
//       new AppError("You are not allowed to access this content!", 403)
//     );

//   next();
// });

// sending resetToken via email for pasword reset ability
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(
      new AppError(
        `User with email ${req.body.email} does not exist in the system!`,
        404
      )
    );

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${process.env.FRONTEND_URL}auth/reset-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "An email has been sent to you for reseting your password",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email! Please try again",
        500
      )
    );
  }
});

// password reset
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Finding user based on sent token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new AppError(
        "Token is expired or invalid! try forgot password again.",
        400
      )
    );

  // Changing password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  // Sending token
  createSendToken(user, 200, res);
});

// Updating user password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError("Incorrect current password", 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  createSendToken(user, 200, res);
});

// update username
exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user)
    return next(new AppError(`There is no user with id: ${req.user._id}`));

  user.username = req.body.username;

  await user.save({ validateModifiedOnly: true });

  createSendToken(user, 200, res);
});

// Get user data
exports.getMe = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated", 401));

  res.status(200).json({ status: "success", data: { user: req.user } });
});
