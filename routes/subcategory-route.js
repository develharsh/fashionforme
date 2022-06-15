const express = require("express");
const router = express.Router();
const { add, getOfCat } = require("../controllers/subcategory-controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/add", isAuthenticated, authorizeRoles("Admin"), add);
router.get("/get", getOfCat);
module.exports = router;
