const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

const getUserInfo = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const updateUserInfo = (req, res, next) => {
  const { username, password, fullname, email, isChangedPassword } = req.body;

  if (isChangedPassword) {
    User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.userId) },
      {
        username: username,
        password: bcrypt.hashSync(password, 8),
        fullname: fullname,
        email: email,
      }
    ).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ user });
    });
  } else {
    User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.userId) },
      {
        $set: {
          username: username,
          fullname: fullname,
          email: email,
        },
      }
    ).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ user });
    });
  }
};

module.exports = { getUserInfo, updateUserInfo };
