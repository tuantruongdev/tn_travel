const jwt = require("jsonwebtoken");
const util = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
