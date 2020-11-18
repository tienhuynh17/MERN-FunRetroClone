const mongoose = require("mongoose");

const Card = require("../models/card.model");

const getCardsByBoardId = (req, res) => {
  const boardId = req.params.id;
  Card.find({ boardId: boardId })
    .then((cards) => {
      res.status(200).json({ count: cards.length, cards });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCardsByColumn = (req, res) => {
  const { boardId, columnId } = req.params;
  Card.find({ boardId, columnId }).exec((err, cards) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ cards });
    }
  });
};

const createCard = (req, res) => {
  const { boardId, columnId, name } = req.body;
  const newCard = new Card({
    boardId: mongoose.Types.ObjectId(boardId),
    columnId: mongoose.Types.ObjectId(columnId),
    name,
  });

  newCard.save((err, card) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ card });
    }
  });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.deleteOne({ _id: mongoose.Types.ObjectId(id) }, (err) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ message: "Successful" });
    }
  });
};

const updateCardName = (req, res) => {
  Card.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $set: { name: req.body.name } }
  ).exec((err, card) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.status(200).json({ card });
  });
};

const updateColumn = (req, res) => {
  Card.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $set: { columnId: mongoose.Types.ObjectId(req.body.columnId) } }
  ).exec((err, card) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.status(200).json({ card });
  });
};

module.exports = {
  getCardsByBoardId,
  getCardsByColumn,
  createCard,
  deleteCard,
  updateCardName,
  updateColumn,
};
