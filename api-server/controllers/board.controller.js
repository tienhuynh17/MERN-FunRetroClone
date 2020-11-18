const mongoose = require("mongoose");

const Board = require("../models/board.model");
const Card = require("../models/card.model");

const getBoards = (req, res) => {
  Board.find()
    .then((boards) => {
      res.status(200).json({ boards });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getBoardsByUserId = (req, res) => {
  Board.find({ users: req.userId })
    .then((boards) => {
      res.status(200).json({ boards });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const createBoard = (req, res, next) => {
  if (req.body.name === "") {
    res.status(200).json({ errMessages: { errName: "Board name is empty" } });
    return;
  }
  const users = [mongoose.Types.ObjectId(req.userId)];
  const newBoard = new Board({
    name: req.body.name,
    createdAt: Date.now(),
    users: users,
  });

  newBoard.save((err, board) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.status(200).json({ board });
  });
};

const deleteBoard = (req, res, next) => {
  Board.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      Card.deleteMany(
        { boardId: mongoose.Types.ObjectId(req.params.id) },
        (err) => {
          if (err) {
            res.status(500).json({ message: err });
          } else {
            res.status(200).json({ message: "Successful" });
          }
        }
      );
    }
  });
};

const updateBoardName = (req, res, next) => {
  if (req.body.name === "") {
    res.status(200).json({ errMessages: { errName: "Board name is empty" } });
    return;
  }

  Board.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $set: { name: req.body.name } }
  ).exec((err, board) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.status(200).json({ board });
  });
};

const detailBoard = (req, res, next) => {
  const { id } = req.params;
  Board.findById(id).exec((err, board) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ board });
    }
  });
};

module.exports = {
  getBoards,
  getBoardsByUserId,
  createBoard,
  deleteBoard,
  updateBoardName,
  detailBoard,
};
