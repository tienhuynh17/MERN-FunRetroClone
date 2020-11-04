const express = require("express");

const authController = require("../controllers/auth.controller");
const middlewares = require("../middlewares");

const router = express.Router();

router.post(
  "/register",
  middlewares.verifySignUp.checkEmptyInput,
  middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
  authController.signUp
);

router.post(
  "/login",
  middlewares.verifySignIn.checkEmptyInput,
  authController.signIn
);

module.exports = router;
