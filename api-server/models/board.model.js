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
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Board", Board);
