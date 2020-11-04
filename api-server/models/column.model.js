const mongoose = require("mongoose");

const Column = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Column", Column);
