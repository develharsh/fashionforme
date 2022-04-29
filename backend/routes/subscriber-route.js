const express = require("express");
const router = express.Router();
const { add } = require("../controllers/subscriber-controller");

router.post("/add", add);

module.exports = router;
