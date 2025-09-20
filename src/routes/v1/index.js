const express = require("express");
const UserController = require("../../controllers/user-controller");
const router = express.Router();
const { AuthRequestValidator } = require("../../middlewares/index");

router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);

router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  UserController.signIn
);

router.get("/isAuthenticated", UserController.isAthenticated);

router.get("/isAdmin",AuthRequestValidator.validateIsAdminRequest,UserController.isAdmin);

// router.get("dummy", (req, res) => {
//   return res.status(200).json({ message: "ok" });
// });

module.exports = router;
