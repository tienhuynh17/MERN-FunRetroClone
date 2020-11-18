const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authController = require("../controllers/auth.controller");
const middlewares = require("../middlewares");

const { BASE_CLIENT_URL } = require("../utils/constants");

const router = express.Router();

router.post(
  "/register",
  middlewares.verifySignUp.checkEmptyInput,
  middlewares.verifySignUp.checkDuplicateUsernameOrEmailAndMatchedPassword,
  authController.signUp
);

router.post(
  "/login",
  middlewares.verifySignIn.checkEmptyInput,
  authController.signIn
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: BASE_CLIENT_URL + "?successByGoogle",
    failureRedirect: "/api-auth/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.status(200).json({ message: "success" });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

router.get("/auth-token", (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 30, // 30 mins
  });

  console.log(token);

  res.status(200).json({
    accessToken: token,
  });
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: BASE_CLIENT_URL + "?successByFacebook",
    failureRedirect: "/api-auth/login/failed",
  })
);

module.exports = router;
