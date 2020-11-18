const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const signUp = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    fullname: req.body.fullname,
    email: req.body.email ? req.body.email : "",
    phone: req.body.phone ? req.body.phone : "",
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 30, // 30 mins
    });

    res.status(200).json({
      accessToken: token,
    });
  });
};

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (!user) {
      res.json({ errMessages: { errSignin: "User Not found." } });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.json({
        accessToken: null,
        errMessages: { errSignin: "Invalid Password!" },
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24, // 24 hours
    });

    res.status(200).json({
      accessToken: token,
    });
  });
};

module.exports = { signUp, signIn };
