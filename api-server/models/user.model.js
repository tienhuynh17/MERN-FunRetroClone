const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", User);
