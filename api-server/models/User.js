const mongoose = require("mongoose");

const Board = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("Board", Board);
