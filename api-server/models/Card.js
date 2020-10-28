const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Card = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  boardId: {
    type: ObjectId,
    ref: "Board",
    require: true,
  },
  columnId: {
    type: ObjectId,
    ref: "Column",
    require: true,
  },
});

module.exports = mongoose.model("Card", Card);
