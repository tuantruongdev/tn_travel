const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Request = require("../models/requestModel");
const AppError = require("../utils/appError");

exports.getAllRequest = catchAsync(async (req, res) => {
  const requests = await Request.find().sort("-requestAt");
  res.status(200).json({
    status: "success",
    results: requests.length,
    data: { requests },
  });
});
exports.getAllRequestByTourId = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(AppError("tour not valid!", 404));
  }
  const requests = await Request.find({ tourId: req.params.id }).sort(
    "-requestAt"
  );
  res.status(200).json({
    status: "success",
    results: requests.length,
    data: { requests },
  });
});

exports.getAllRequestByUserId = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(AppError("userid not valid!", 404));
  }
  const requests = await Request.find({ userId: req.params.id }).sort(
    "-requestAt"
  );
  res.status(200).json({
    status: "success",
    results: requests.length,
    data: { requests },
  });
});
exports.getRequestById = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(AppError("request not valid!", 404));
  }
  const request = await Request.findById(req.params.id);
  res.status(200).json({
    status: "success",
    results: request.length,
    data: { request },
  });
});

exports.updateRequestById = catchAsync(async (req, res, next) => {
  if (!req.params.id || !req.body.status) {
    return next(new AppError("request not valid!", 404));
  }

  // console.log(req.body.status);
  const updatedRequest = await Request.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!updatedRequest) {
    return next(AppError("request id not valid!", 404));
  }
  res.status(200).json({
    status: "success",
    data: { updatedRequest },
  });
});

exports.getAllRequestByUser = catchAsync(async (req, res, next) => {
  if (!req.user.id) {
    return next(AppError("userid not valid!", 404));
  }
  const requests = await Request.find({ userId: req.user.id }).sort(
    "-requestAt"
  );
  res.status(200).json({
    status: "success",
    results: requests.length,
    data: { requests },
  });
});

exports.cancelRequestByUser = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(AppError("request id not valid!", 404));
  }
  const updatedrequest = await Request.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { status: 2 },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: { updatedrequest },
  });
});
