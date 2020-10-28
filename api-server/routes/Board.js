const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.get("/", (req, res) => {
  Board.find()
    .then((boards) => {
      res.status(200).json({ boards });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
