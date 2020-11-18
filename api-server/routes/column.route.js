const express = require("express");
const columnController = require("../controllers/column.controller");

const router = express.Router();

router.get("/", columnController.getAllColumns);

module.exports = router;
