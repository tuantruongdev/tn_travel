const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const filterObj = (obj, ...alowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (alowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users: users },
  });
});
exports.addNewUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "this function on develop",
  });
};
exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  // const update = await updatedUser.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "this function on develop",
    data: { user },
  });
});
exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "this function on develop",
  });
};
exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "address", "phoneNum");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  await updatedUser.save();
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.showMe = catchAsync(async (req, res, next) => {
  const myUser = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      user: myUser,
    },
  });
});
exports.adminPromote = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.role) {
    return next(new AppError("request not vaild", 401));
  }
  // console.log(req.body.email + req.body.role);

  const updatedUser = await User.findOneAndUpdate(
    { email: req.body.email },
    { role: req.body.role },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return next(new AppError("user with that email not found!", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
