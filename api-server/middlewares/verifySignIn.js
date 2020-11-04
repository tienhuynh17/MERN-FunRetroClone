const checkEmptyInput = (req, res, next) => {
  const { username, password } = req.body;
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

  if (isAnyEmpty) {
    res.json({ errMessages });
    return;
  }

  next();
};

module.exports = { checkEmptyInput };
