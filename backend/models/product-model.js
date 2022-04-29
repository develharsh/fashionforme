const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Number,
      required: true,
    },
    images: {
      type: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      default: [],
    },
    colours: {
      type: Array,
      default: [],
    },
    inStock: {
      type: Number,
      default: 0,
    },
    productId: {
      type: String,
      default: null,
    },
    specifications: {
      isExchangable: {
        type: String,
        default: null,
      },
      isReturnable: {
        type: String,
        default: null,
      },
    },
    disCost: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    avgRating: {
      type: Number,
      required: true,
    },
    ratings: [
      {
        by: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        value: { type: Number, required: true },
        comment: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
