const express = require("express");
const requestController = require("../controller/requestController");
const authController = require("../controller/authController");

const requestRoute = express.Router();

requestRoute
  .route("/user")
  .get(authController.protect, requestController.getAllRequestByUser);

requestRoute
  .route("/cancel/:id")
  .patch(authController.protect, requestController.cancelRequestByUser);

requestRoute
  .route("/user/:id")
  .get(
    authController.protect,
    authController.restricTo("admin", "support"),
    requestController.getAllRequestByUserId
  );

requestRoute
  .route("/tour/:id")
  .get(
    authController.protect,
    authController.restricTo("admin", "support"),
    requestController.getAllRequestByTourId
  );

requestRoute
  .route("/:id")
  .get(
    authController.protect,
    authController.restricTo("admin", "support"),
    requestController.getRequestById
  )
  .patch(
    authController.protect,
    authController.restricTo("admin", "support"),
    requestController.updateRequestById
  );

requestRoute
  .route("/")
  .get(
    authController.protect,
    authController.restricTo("admin", "support"),
    requestController.getAllRequest
  );

module.exports = requestRoute;
