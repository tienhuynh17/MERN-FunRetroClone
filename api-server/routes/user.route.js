const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const userControllers = require("../controllers/user.controller");

router.get("/me", middlewares.authJwt.verifyToken, userControllers.getUserInfo);

router.post(
  "/me/update",
  middlewares.authJwt.verifyToken,
  middlewares.verifyUpdateUserInfo.checkEmptyInput,
  middlewares.verifyUpdateUserInfo
    .checkDuplicateUsernameOrEmailAndMatchedPassword,
  userControllers.updateUserInfo
);

module.exports = router;
