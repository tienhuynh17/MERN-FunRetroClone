const mongoose = require("mongoose");

const ColumnSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Column", ColumnSchema);
