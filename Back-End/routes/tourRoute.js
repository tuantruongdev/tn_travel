const express = require("express");
const tourController = require("../controller/tourController");
const authController = require("../controller/authController");
const random = require("../utils/randomTourGenerator");

const tourRoute = express.Router();
tourRoute.post("/addrandom", random.addRandomTour);
tourRoute
  .route("/checkout/:id")
  .post(authController.protect, tourController.checkoutTour);

tourRoute
  .route("/")
  // .get(authController.protect, tourController.getAllTour)
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restricTo("admin", "support"),
    tourController.addNewTour
  );

tourRoute.route("/find").get(tourController.find);
tourRoute.route("/find/:id").get(tourController.findbyTourId);

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
