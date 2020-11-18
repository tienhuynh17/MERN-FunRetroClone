const Column = require("../models/column.model");

const getAllColumns = (req, res, next) => {
  Column.find().exec((err, columns) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ columns });
    }
  });
};

module.exports = { getAllColumns };
