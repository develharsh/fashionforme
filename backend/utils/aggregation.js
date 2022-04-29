const { ObjectId } = require("mongoose").Types;
exports.get = (
  keyword,
  category,
  subcategory,
  low,
  high,
  page,
  sortBy,
  productsPerPage
) => {
  //
  let matchObj = {},
    sortObj = {};
  let pipeline = [{ $match: matchObj }];
  if (keyword) matchObj.title = { $regex: keyword, $options: "i" };
  if (category) matchObj.category = ObjectId(category);
  if (subcategory) matchObj.subcategory = ObjectId(subcategory);
  if (low || high) {
    matchObj.disCost = {};
    if (low) matchObj.disCost.$gte = Number(low);
    if (high) matchObj.disCost.$lte = Number(high);
  }
  if (sortBy) {
    pipeline.push({ $sort: sortObj });
    if (sortBy == "latest") {
      sortObj.createdAt = -1;
    } else if (sortBy == "oldest") {
      pipeline.pop();
    } else if (sortBy == "low-high") {
      sortObj.disCost = 1;
    } else if (sortBy == "high-low") {
      sortObj.disCost = -1;
    } else pipeline.pop();
  }
  pipeline.push(
    {
      $facet: {
        beforePaginate: [
          {
            $count: "count",
          },
        ],
        afterPaginate: [
          {
            $skip: productsPerPage * (Number(page) - 1),
          },
          {
            $limit: productsPerPage,
          },
        ],
      },
    },
    {
      $unwind: "$beforePaginate",
    }
  );
  return pipeline;
};

exports.myOrdersPipeline = (my, role) => {
  let matchObj = {};
  let pipeline = [{ $match: matchObj }];
  pipeline.push(
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" }
  );
  if (role == "Client") {
    matchObj.orderedBy = my;
    pipeline.push({
      $project: {
        address: 1,
        product: 1,
        quantity: 1,
        otherDetails: 1,
        disCost: 1,
        createdAt: 1,
      },
    });
  } else {
    pipeline.shift();
    pipeline.push(
      {
        $match: {
          "product.postedBy": my,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "orderedBy",
          foreignField: "_id",
          as: "orderedBy",
        },
      },
      {
        $unwind: "$orderedBy",
      },
      {
        $project: {
          "orderedBy._id": 0,
          "orderedBy.phone": 0,
          "orderedBy.email": 0,
          "orderedBy.password": 0,
          "orderedBy.role": 0,
          "orderedBy.createdAt": 0,
          "orderedBy.updatedAt": 0,
          payment_id: 0,
        },
      }
    );
  }
  pipeline.push({
    $sort: {
      createdAt: -1,
    },
  });
  return pipeline;
};
