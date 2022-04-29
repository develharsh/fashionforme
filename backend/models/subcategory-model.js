const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.Subcategory ||
  mongoose.model("Subcategory", subCategorySchema);
