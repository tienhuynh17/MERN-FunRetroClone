require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const boardRoute = require("./routes/Board");
const cardRoute = require("./routes/Card");

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api-boards", boardRoute);
app.use("/api-cards", cardRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
