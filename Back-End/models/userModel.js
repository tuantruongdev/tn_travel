const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const dbString = process.env.DB_CONNECT_STRING.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
mongoose
  .connect(dbString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection was succesful");
  });
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [false, "user must have a username"],
    trim: true,
    unique: [false, "this username has been taken"],
    validate: [
      validator.isAlphanumeric,
      "username only contains character and number",
    ],
  },
  name: {
    type: String,
    required: [true, "user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "user must have a email"],
    trim: true,
    lowercase: true,
    unique: [true, "this email has been taken"],
    validate: [validator.isEmail, "please enter a valid email"],
  },
  phoneNum: {
    type: String,
    required: [true, "user must have a phone number"],
    trim: true,
    validate: [validator.isMobilePhone, "please enter a valid phone number"],
  },
  address: {
    type: String,
    required: [true, "user must have a address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
    trim: true,
    select: false,
  },

  passwordChangeAt: Date,
  //role problem
  role: {
    type: String,
    enum: ["user", "support", "admin"],
    default: "user",
  },
  dob: Date,
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpries: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangeAt = Date.now() - 1000;

  next();
});

userSchema.methods.checkPassword = async (userPassword, encryptedPassword) => {
  return await bcrypt.compare(userPassword, encryptedPassword);
};
userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changeTimeStamp;
  }
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpries = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
