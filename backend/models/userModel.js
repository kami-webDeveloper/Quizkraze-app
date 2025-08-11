const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a username"],
      minlength: 8,
      maxlength: 60,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [128, "Password must be at most 128 characters long"],
      validate: {
        validator: function (val) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/.test(
            val
          );
        },
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // Only works on CREATE and SAVE (not update)
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hashing user password & removing password confirm before save in database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Comparing input password with user password
userSchema.methods.correctPassword = async function (
  inpPassword,
  userPassword
) {
  return await bcrypt.compare(inpPassword, userPassword);
};

// Checking password change after a specefic time
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // It has been changed
    return JWTTimestamp < changedTimestamp;
  }

  // It's not changed
  return false;
};

// Creating reset
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
