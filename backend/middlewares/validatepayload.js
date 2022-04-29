exports.userSignup = (payload) => {
  if (!payload.role) throw { message: "Role is missing" };
  if (!["Client", "Supplier"].includes(payload.role))
    throw { message: "Allowed Roles: Client or Supplier" };
  return payload;
};
exports.userLogin = (payload) => {
  if (!payload.ID) throw { message: "phone or email is missing" };
  if (!payload.password) throw { message: "phone or email is missing" };
  if (payload.ID.includes("@")) payload.email = payload.ID;
  else payload.phone = payload.ID;
  delete payload.ID;
  return payload;
};

exports.addProduct = async (payload, _id) => {
  payload.postedBy = _id;
  payload.avgRating = 0;
  const cloudinary = require("cloudinary");
  if (!payload.theimages) throw { message: "Images Are Missing" };
  if (payload.theimages.length == 0)
    throw { message: "At least One image of product must be choosen" };
  if (!payload.colours) throw { message: "Colours Are Missing" };
  if (payload.colours.length == 0)
    throw { message: "At least One Colour of product must be choosen" };
  if (!payload.sizes) throw { message: "Sizes Are Missing" };
  if (payload.sizes.length == 0)
    throw { message: "At least One size of product must be choosen" };
  let images = [];

  if (typeof payload.theimages === "string") {
    //single image
    images.push(payload.theimages);
  } else {
    images = payload.theimages;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  payload.images = imagesLinks;
  payload.theimages = undefined;
  return payload;
};
