const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const userRoute = express.Router();
userRoute.route("/signup").post(authController.signup);
userRoute.route("/login").post(authController.login);
userRoute
  .route("/promote")
  .patch(
    authController.protect,
    authController.restricTo("admin"),
    userController.adminPromote
  );
userRoute
  .route("/updateme")
  .post(authController.protect, userController.updateMe);
userRoute.route("/showme").get(authController.protect, userController.showMe);
userRoute
  .route("/auth")
  .post(authController.protect, authController.isLoggedIn);
userRoute
  .route("/")
  .get(userController.getAllUser)
  .post(userController.addNewUser);
userRoute
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRoute;
