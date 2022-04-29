const categoryModel = require("../models/category-model");
const errorResponse = require("../utils/errorResponse");

exports.add = async (req, res) => {
  try {
    const category = await categoryModel.create(req.body);
    res.status(200).json({
      success: true,
      data: category,
      message: "Category added successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
exports.getAll = async (req, res) => {
  const categories = await categoryModel.aggregate([
    {
      $project: {
        label: "$title",
        _id: 1,
      },
    },
  ]);
  res.status(200).json({ success: true, data: categories });
};
