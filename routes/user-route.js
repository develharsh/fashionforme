const express = require("express");
const router = express.Router();
const { signup, login, loadUser } = require("../controllers/user-controller");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);
router.get("/load-user", isAuthenticated, loadUser);
module.exports = router;
