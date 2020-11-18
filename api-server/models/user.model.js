const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
