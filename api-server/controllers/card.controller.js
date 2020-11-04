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

module.exports = { getCardsByBoardId };
