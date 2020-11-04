const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.controller");

router.get("/:id", cardController.getCardsByBoardId);

module.exports = router;
