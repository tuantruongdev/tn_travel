const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const util = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIE,
  });
};
const createSendToken = (user, statusCode, res) => {
  const cookieOpts = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPRIE_COOKIE * 24 * 60 * 60 * 1000
    ),
    //set true to use https
    secure: false,
    httpOnly: false,
  };

  const token = signToken(user._id);
  user.password = "";
  res.cookie("jwt", token, cookieOpts);
  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,

    address: req.body.address,
    phoneNum: req.body.phoneNum,
  });
  //const token = signToken(newUser._id);

  createSendToken(newUser, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
  // console.log("lg");
  const { email, password } = req.body;
  //if no email or passsword then throw a error
  if (!email || !password) {
    return next(new AppError("please include email and password!"), 400);
  }
  // query a user and select password, +password to show a hidden default properties
  const user = await User.findOne({ email }).select("+password");
  //checkPassword defined at the schema
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("username or password is incorrect"), 401);
  }
  //console.log("login");
  createSendToken(user, 201, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  //get token
  let token;
  if (!req.jwt) {
    return next(new AppError("you're not logged in!"), 401);
  }
  //console.log(req.jwt[0]);
  if (req.jwt[0]) {
    token = req.jwt[0].split("=")[1];
  }
  if (!token) {
    return next(new AppError("you're not logged in!"), 401);
  }
  //verify token
  // console.log(token);
  //convert callback to await
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //basicly done here
  //check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("user not exist anymore", 401));
  }

  //check if user change password
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError("password changed recently", 401));
  }

  req.user = freshUser;
  next();
});
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
    message: "youre logged in",
  });
});

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you dont have permission", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get email
  //  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    return next(new AppError("no user with that email", 404));
  }
  //generate random token
  const resetToken = user.createPasswordResetToken();

  // console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  //send email

  //specify for both development and product
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const newResetURl = `http://127.0.0.1:5555/Front-End/forgot_password.html?code=${resetToken}`;
  const message = `forgot password? click this link: ${newResetURl}\n , and enter your password, if you not requesting this, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "TnTravel: password reset",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpries = undefined;
    await user.save({ validateBeforeSave: false });
    return new AppError("there was an error while sending the email.", 500);
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1 get user with that token
  const hasedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hasedToken,
    passwordResetExpries: { $gt: Date.now() },
  });

  //2 if token not expried. set the new password
  if (!user) {
    return next(new AppError("token expried", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.password;
  user.photo = " ";
  user.passwordResetToken = undefined;
  user.passwordResetExpries = undefined;

  await user.save();

  createSendToken(user, 201, res);

  //4 log the user in. send jwt
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  //console.log(req.user.id);
  const user = await User.findOne({
    id: req.user.id,
  }).select("+password");
  if (!user) {
    return next(new AppError("no user with that id", 403));
  }

  if (!(await user.checkPassword(req.body.password, user.password))) {
    return next(new AppError("password is incorrect", 403));
  }
  user.password = req.body.newpassword;
  user.confirmPassword = req.body.newpassword;
  user.photo = " ";
  await user.save();
  createSendToken(user, 201, res);
});
