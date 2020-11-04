const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
