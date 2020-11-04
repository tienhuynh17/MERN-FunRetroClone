const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");
const middlewares = require("../middlewares");

router.get("/", middlewares.authJwt.verifyToken, boardController.getBoards);

router.get(
  "/user/:userId",
  middlewares.authJwt.verifyToken,
  boardController.getBoardsByUserId
);

module.exports = router;
