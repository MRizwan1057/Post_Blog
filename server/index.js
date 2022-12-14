const express = require("express");
const app = express();
// const PORT = 5050;
require("dotenv").config();
const authRoute = require("./routes/auth");
const userhRoute = require("./routes/users");
const posthRoute = require("./routes/posts");
const categshRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const mongoose = require("mongoose");
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected"))
  .catch((error) => {
    console.log(error);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userhRoute);
app.use("/api/posts", posthRoute);
app.use("/api/categories", categshRoute);

app.listen(process.env.PORT, () => {
  console.log(` Blog app running on port ${process.env.PORT}`);
});
