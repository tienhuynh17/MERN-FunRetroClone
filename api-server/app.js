require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
// const cors = require("cors");

const boardRoute = require("./routes/board.route");
const cardRoute = require("./routes/card.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log("Error: " + error);
});

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // <-- location of the react app were connecting to
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api-users", userRoute);
app.use("/api-boards", boardRoute);
app.use("/api-cards", cardRoute);
app.use("/api-auth", authRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
