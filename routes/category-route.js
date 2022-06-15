const express = require("express");
const router = express.Router();
const { add, getAll } = require("../controllers/category-controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/add", isAuthenticated, authorizeRoles("Admin"), add);
router.get("/get-all", getAll);
module.exports = router;
