require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
require("./config/passport-google");
require("./config/passport-facebook");

const boardRoute = require("./routes/board.route");
const cardRoute = require("./routes/card.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const columnRoute = require("./routes/column.route");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log("Error: " + error);
});

//Configure Session Storage
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24h
    keys: [process.env.COOKIE_KEY],
  })
);

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// app.use(
//   cors({
//     methods: ["GET", "POST"],
//     origin: "http://localhost:3000", // <-- location of the react app were connecting to
//     credentials: true,
//   })
// );

app.use("/api-users", userRoute);
app.use("/api-boards", boardRoute);
app.use("/api-cards", cardRoute);
app.use("/api-auth", authRoute);
app.use("/api-columns", columnRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
