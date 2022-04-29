const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const SubCategoryModel = require("../models/subcategory-model");
const errorResponse = require("../utils/errorResponse");

exports.add = async (req, res) => {
  try {
    const subcategory = await SubCategoryModel.create(req.body);
    res.status(200).json({
      success: true,
      data: subcategory,
      message: "Sub-Category added successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

exports.getOfCat = async (req, res) => {
  try {
    const { of } = req.query;

    const subcats = await SubCategoryModel.aggregate([
      { $match: { category: of ? ObjectId(of) : { $ne: null } } },
      {
        $project: {
          label: "$title",
          _id: 1,
        },
      },
    ]);
    res.status(200).json({ success: true, data: subcats });
  } catch (err) {
    errorResponse(res, err);
  }
};
