const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const userRoute = express.Router();
userRoute
  .route("/find")
  .get(
    authController.protect,
    authController.restricTo("admin"),
    userController.find
  );

userRoute
  .route("/changePassword")
  .patch(authController.protect, authController.updatePassword);
userRoute.route("/forgotPassword").post(authController.forgotPassword);
userRoute.route("/resetPassword/:token").patch(authController.resetPassword);

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
  .get(
    authController.protect,
    authController.restricTo("admin"),
    userController.getAllUser
  )
  .post(userController.addNewUser);
userRoute
  .route("/:id")
  .get(
    authController.protect,
    authController.restricTo("admin"),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restricTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restricTo("admin"),
    userController.deleteUser
  );

module.exports = userRoute;
