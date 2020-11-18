const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.controller");
const middlewares = require("../middlewares");

router.get("/:id", cardController.getCardsByBoardId);

router.get("/:boardId/:columnId", cardController.getCardsByColumn);

router.post(
  "/create",
  middlewares.authJwt.verifyToken,
  cardController.createCard
);

router.post(
  "/delete/:id",
  middlewares.authJwt.verifyToken,
  cardController.deleteCard
);

router.post(
  "/update-name/:id",
  middlewares.authJwt.verifyToken,
  cardController.updateCardName
);

router.post(
  "/update-column/:id",
  middlewares.authJwt.verifyToken,
  cardController.updateColumn
);

module.exports = router;
