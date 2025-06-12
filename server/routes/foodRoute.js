const express = require("express");
const multer = require("multer");
const {
  addFood,
  listFood,
  removeFood,
  searchFood,
} = require("../controllers/foodController");

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/search",searchFood)

module.exports = foodRouter;
