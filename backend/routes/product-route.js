const express = require("express");
const router = express.Router();
const {
  addProduct,
  get,
  specific,
} = require("../controllers/product-controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/add",
  isAuthenticated,
  authorizeRoles("Supplier", "Admin"),
  addProduct
);
router.get("/get", get);
router.get("/:_id", specific);
module.exports = router;
