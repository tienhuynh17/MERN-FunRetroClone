const mongoose = require("mongoose");

const User = require("../models/user.model");

const checkEmptyInput = (req, res, next) => {
  const { username, password, confirmedPassword, fullname, email } = req.body;

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
  if (confirmedPassword === "") {
    errMessages.errConfirmedPassword = "Confirmed password is required";
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

const checkDuplicateUsernameOrEmailAndMatchedPassword = (req, res, next) => {
  const {
    username,
    email,
    password,
    confirmedPassword,
    isChangedPassword,
  } = req.body;

  // Password
  if (isChangedPassword && password !== confirmedPassword) {
    res.status(200).json({
      errMessages: { errUpdate: "Passwords are not matched" },
    });
    return;
  }

  User.find({
    _id: { $ne: new mongoose.Types.ObjectId(req.userId) },
  }).exec((err, users) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (users) {
      users.map((user) => {
        if (user.username === username) {
          return res.json({
            errMessages: { errUpdate: "Username is existed" },
          });
        } else if (user.email === email) {
          return res.json({ errMessages: { errUpdate: "Email is existed" } });
        }
      });
    }
  });
  next();
};

module.exports = {
  checkEmptyInput,
  checkDuplicateUsernameOrEmailAndMatchedPassword,
};
