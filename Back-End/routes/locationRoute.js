const express = require("express");
const locationController = require("../controller/locationController");
const authController = require("../controller/authController");
const random = require("../utils/randomTourGenerator");

const tourRoute = express.Router();
// tourRoute.post("/addrandom", random.addRandomTour);
tourRoute
  .route("/")
  .get(locationController.getAllLocation)
  .post(
    authController.protect,
    authController.restricTo("admin", "support"),
    locationController.addNewLocation
  );

tourRoute
  .route("/:id")
  .get(locationController.getLocation)
  .patch(
    authController.protect,
    authController.restricTo("admin", "support"),
    locationController.updateLocation
  )
  .delete(
    authController.protect,
    authController.restricTo("admin", "support"),
    locationController.deleteLocation
  );

module.exports = tourRoute;
