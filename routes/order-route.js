const express = require("express");
const router = express.Router();
const { placeOrder, myOrders } = require("../controllers/order-controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/place", isAuthenticated, authorizeRoles("Client"), placeOrder);
router.get(
  "/my-orders",
  isAuthenticated,
  authorizeRoles("Client", "Supplier"),
  myOrders
);

module.exports = router;
