/* eslint-disable prefer-object-spread */
const catchAsync = require("../utils/catchAsync");
const Tour = require("../models/tourModel");
const Location = require("../models/locationModel");
const User = require("../models/userModel");
const Request = require("../models/requestModel");
const AppError = require("../utils/appError");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    //remove unwated object
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    //convertQueryobject to mongo queries
    let querystr = JSON.stringify(queryObj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(querystr));
    return this;
  }

  sortBy() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const sortBy = this.queryString.fields.split(",").join(" ");
      this.query.select(sortBy);
    } else {
      this.query.select("-__v");
    }
    return this;
  }

  paging() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //limit
    this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.getAllTour = catchAsync(async (req, res) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .fields()
    .sortBy()
    .paging();

  const tours = await features.query;
  // await tours.forEach(async (tour) => {
  //   const location = await location.findById(tour.locationId);

  //   tour.location = location;
  // });

  // eslint-disable-next-line no-restricted-syntax
  for await (const tour of tours) {
    const mylocation = await Location.findById(tour.locationId);
    tour.location = mylocation;
  }
  //console.log(tours[0].name);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours: tours },
  });
});
const countby = (id, stt, list) => {
  let count = 0;
  list.forEach((req) => {
    if (req.tourId === id && req.status === stt) {
      count += 1;
    }
  });
  return count;
};
exports.getAllRawTour = catchAsync(async (req, res) => {
  const features = new APIFeatures(Tour.find().select("+createdAt"), req.query)
    .filter()
    .fields()
    .sortBy()
    .paging();

  const tours = await features.query;
  // await tours.forEach(async (tour) => {
  //   const location = await location.findById(tour.locationId);

  //   tour.location = location;
  // });
  const reqlist = await Request.find();
  // eslint-disable-next-line no-restricted-syntax
  for await (const tour of tours) {
    // console.log(tour.id);
    // const waiting = await Request.count({ tourId: tour.id, status: 1 });
    // const accepted = await Request.count({ tourId: tour.id, status: 4 });
    // console.log(countby(tour.id, 4, reqlist));
    tour.waiting = countby(tour.id, 1, reqlist);
    tour.accepted = countby(tour.id, 4, reqlist);
  }
  // eslint-disable-next-line no-restricted-syntax

  //console.log(tours[0].name);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours: tours },
  });
});
exports.addNewTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});
exports.getTour = catchAsync(
  async (req, res) => {
    const tour = await Tour.findById(req.params.id);

    const mylocation = await Location.findById(tour.locationId);
    tour.location = mylocation;

    //console.log(tours[0].name);
    res.status(200).json({
      status: "success",
      results: tour.length,
      data: { tours: tour },
    });
  }

  // const id = req.params.id * 1;
  // const findTour = tours.find((item) => item.id === id);
  // res.status(200).json({
  //   status: "success",
  //   data: { findTour },
  // });
);
exports.updateTour = catchAsync(async (req, res) => {
  const editTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      editTour,
    },
  });
});
exports.deleteTour = catchAsync(async (req, res) => {
  const editTour = await Tour.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      editTour,
    },
  });
});
exports.checkoutTour = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const tourId = req.params.id;
  const tour = await Tour.findById(tourId);
  const user = await User.findById(userId);
  if (!user || !tour) {
    return next(new AppError("some error appear!"), 400);
  }
  if (tour.status === "ended") {
    return next(new AppError("tour has ended"), 403);
  }

  const request = await Request.create({
    tourId: tourId,
    userId: userId,
  });

  res.status(200).json({
    status: "success",
    message: "checkout successfully",
    data: { request },
    //updatedUser,
  });
});
exports.findRawTour = catchAsync(async (req, res) => {
  //create indexes first!!
  //db.locations.createIndex({ "name": "text", "description": "text" });
  const searchString = req.query.text;
  let query = ``;
  if (req.query.startAt) {
    const querydate = new Date(req.query.startAt);
    querydate.setHours(0, 0, 0, 0);
    query = {
      $text: { $search: searchString },
      startDate: {
        $gte: new Date(querydate.getTime() - 86400000),
        $lt: new Date(querydate.getTime() + 86400000),
      },
    };
  } else {
    query = {
      $text: { $search: searchString },
    };
  }
  let tours = ``;
  //console.log(searchString);
  // console.log(searchString);

  tours = ``;
  if (searchString === "") {
    tours = await Tour.find().select("+createdAt").sort("-createdAt");
  } else {
    tours = await Tour.find(query).select("+createdAt").sort("-createdAt");
  }

  // eslint-disable-next-line no-restricted-syntax
  const reqlist = await Request.find();
  // eslint-disable-next-line no-restricted-syntax
  for await (const tour of tours) {
    tour.waiting = countby(tour.id, 1, reqlist);
    tour.accepted = countby(tour.id, 4, reqlist);
  }

  res.status(200).json({
    status: "success",
    data: { tours },
    //updatedUser,
  });
});
exports.find = catchAsync(async (req, res) => {
  //create indexes first!!
  //db.locations.createIndex({ "name": "text", "description": "text" });
  const searchString = req.query.text;
  let query = ``;
  if (req.query.startAt) {
    const querydate = new Date(req.query.startAt);
    querydate.setHours(0, 0, 0, 0);
    query = {
      $text: { $search: searchString },
      startDate: {
        $gte: new Date(querydate.getTime() - 86400000),
        $lt: new Date(querydate.getTime() + 86400000),
      },
    };
  } else {
    query = {
      $text: { $search: searchString },
    };
  }

  // console.log(searchString);
  const tours = await Tour.find(query);
  // eslint-disable-next-line no-restricted-syntax
  for await (const tour of tours) {
    const mylocation = await Location.findById(tour.locationId);
    tour.location = mylocation;
  }

  res.status(200).json({
    status: "success",
    data: { tours },
    //updatedUser,
  });
});
exports.findbyTourId = catchAsync(async (req, res) => {
  let query = ``;
  if (req.query.startAt) {
    const querydate = new Date(req.query.startAt);
    querydate.setHours(0, 0, 0, 0);
    query = {
      locationId: req.params.id,
      startDate: {
        $gte: new Date(querydate.getTime() - 86400000),
        $lt: new Date(querydate.getTime() + 86400000),
      },
    };
  } else {
    query = {
      locationId: req.params.id,
    };
  }

  const tours = await Tour.find(query);
  //  console.log(new Date(querydate.getTime() - 86400000));
  // eslint-disable-next-line no-restricted-syntax
  for await (const tour of tours) {
    const mylocation = await Location.findById(tour.locationId);
    tour.location = mylocation;
  }

  // console.log(tours);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
});
