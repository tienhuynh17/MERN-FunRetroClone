const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");
const middlewares = require("../middlewares");

router.get("/", middlewares.authJwt.verifyToken, boardController.getBoards);

router.get(
  "/me",
  middlewares.authJwt.verifyToken,
  boardController.getBoardsByUserId
);
router.post(
  "/create",
  middlewares.authJwt.verifyToken,
  boardController.createBoard
);

router.post(
  "/delete/:id",
  middlewares.authJwt.verifyToken,
  boardController.deleteBoard
);

router.post(
  "/update-name/:id",
  middlewares.authJwt.verifyToken,
  boardController.updateBoardName
);

router.get(
  "/detail-board/:id",
  middlewares.authJwt.verifyToken,
  boardController.detailBoard
);

module.exports = router;
