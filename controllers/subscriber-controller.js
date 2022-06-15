const SubscriberModel = require("../models/subscriber-model");
const errorResponse = require("../utils/errorResponse");

exports.add = async (req, res) => {
  try {
    const subscriber = await SubscriberModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
