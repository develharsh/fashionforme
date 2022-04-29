const userModel = require("../models/user-model");
const errorResponse = require("../utils/errorResponse");
const { userSignup, userLogin } = require("../middlewares/validatepayload");
exports.signup = async (req, res) => {
  try {
    const data = userSignup(req.body);
    const user = await userModel.create(data);
    const token = user.getJWTToken();
    res.status(200).json({
      success: true,
      data: user,
      token,
      message: "Registered Successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

exports.login = async (req, res) => {
  try {
    req.body = userLogin(req.body);
    const { password } = req.body;
    delete req.body.password;
    const user = await userModel.findOne(req.body).select("+password");
    if (!user) throw { message: "No Such User Found" };
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw { message: "No Such User Found" };
    const token = user.getJWTToken();
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: user,
      token,
      message: "Logged In Successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

exports.loadUser = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};
