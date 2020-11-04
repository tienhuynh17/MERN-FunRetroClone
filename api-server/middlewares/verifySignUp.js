const User = require("../models/user.model");

const checkEmptyInput = (req, res, next) => {
  const { username, password, fullname, email } = req.body;
  let errMessages = {};
  let isAnyEmpty = false;
  if (username === "") {
    errMessages.errUsername = "Username is required";
    isAnyEmpty = true;
  }
  if (password === "") {
    errMessages.errPassword = "Password is required";
    isAnyEmpty = true;
  }
  if (fullname === "") {
    errMessages.errFullname = "Fullname is required";
    isAnyEmpty = true;
  }
  if (email === "") {
    errMessages.errEmail = "Email is required";
    isAnyEmpty = true;
  }
  if (isAnyEmpty) {
    res.json({ errMessages });
    return;
  }

  next();
};

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { username, email } = req.body;
  // Username
  User.findOne({ username }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (user) {
      res.json({ errMessages: { errUsername: "Username is existed" } });
      return;
    }

    User.findOne({ email }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (user) {
        res.json({ errMessages: { errEmail: "Email is existed" } });
        return;
      }
      next();
    });
  });
};

module.exports = { checkEmptyInput, checkDuplicateUsernameOrEmail };
