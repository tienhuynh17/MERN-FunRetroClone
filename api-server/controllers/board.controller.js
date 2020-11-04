const Board = require("../models/board.model");

const getBoards = (req, res) => {
  Board.find()
    .then((boards) => {
      res.status(200).json({ boards });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBoardsByUserId = (req, res) => {
  Board.find({ users: req.params.userId })
    .then((boards) => {
      res.status(200).json({ boards });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getBoards, getBoardsByUserId };
