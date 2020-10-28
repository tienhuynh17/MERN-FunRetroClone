const mongoose = require("mongoose");

const Board = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Board", Board);
