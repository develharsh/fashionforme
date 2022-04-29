const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/config", ".env") });
const route = require("./routes");
const app = express();

const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const logger = require("morgan");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(fileUpload());
app.use(cookieParser());
app.use(cors());

app.use(expressSanitizer());
require("./config/DBConnect");
require("cloudinary").config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use("/api/v1", route);
app.use("/test", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is working fine." });
});

// /*Frontend hai
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Express app running on port " + port);
});
