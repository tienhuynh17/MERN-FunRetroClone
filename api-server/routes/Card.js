const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

router.get("/:id", (req, res) => {
  const boardId = req.params.id;
  Card.find({ boardId: boardId })
    .then((cards) => {
      res.status(200).json({ count: cards.length, cards });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {});

module.exports = router;
