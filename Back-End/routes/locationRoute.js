const express = require("express");
const locationController = require("../controller/locationController");
const authController = require("../controller/authController");
const random = require("../utils/randomTourGenerator");

const localtionRoute = express.Router();
// tourRoute.post("/addrandom", random.addRandomTour);
localtionRoute
  .route("/")
  .get(locationController.getAllLocation)
  .post(
    authController.protect,
    authController.restricTo("admin", "support"),
    locationController.addNewLocation
  );

localtionRoute.route("/find").get(locationController.find);
localtionRoute
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

module.exports = localtionRoute;
