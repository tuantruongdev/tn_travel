const express = require("express");
const tourController = require("../controller/tourController");
const authController = require("../controller/authController");

const tourRoute = express.Router();

tourRoute
  .route("/")
  // .get(authController.protect, tourController.getAllTour)
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restricTo("admin", "support"),
    tourController.addNewTour
  );
tourRoute
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restricTo("admin", "support"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restricTo("admin", "support"),
    tourController.deleteTour
  );

module.exports = tourRoute;
