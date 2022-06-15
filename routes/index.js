const express = require("express");
const router = express.Router();
//const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

// @Base Url
router.use((req, res, next) => {
  req["currentUrl"] = `${req.protocol + "://" + req.headers.host}`;
  next();
});

// @User
const User = require("./user-route");
router.use("/user", User);

//@Product
const Product = require("./product-route");
router.use("/product", Product);

//@Category
const Category = require("./category-route");
router.use("/category", Category);

//@Subcategory
const Subcategory = require("./subcategory-route");
router.use("/subcategory", Subcategory);

//@Order
const Order = require("./order-route");
router.use("/order", Order);

//@Subscriber
const Subscriber = require("./subscriber-route");
router.use("/subscriber", Subscriber);

module.exports = router;
