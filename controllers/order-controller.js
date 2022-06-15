const orderModel = require("../models/order-model");
const errorResponse = require("../utils/errorResponse");

exports.placeOrder = async (req, res) => {
  try {
    req.body.orderedBy = req.user._id;
    const order = await orderModel.create(req.body);
    res.status(200).json({
      success: true,
      data: order,
      message: "Your Order has been Placed:)",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

exports.myOrders = async (req, res) => {
  try {
    const { getQuery } = req.query;
    const { myOrdersPipeline } = require("../utils/aggregation");
    const query = myOrdersPipeline(req.user._id, req.user.role);
    if (getQuery) return res.send(query);
    const orders = await orderModel.aggregate(query);
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
