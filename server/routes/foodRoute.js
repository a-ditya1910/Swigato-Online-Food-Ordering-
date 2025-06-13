const express = require("express");
const {
  addFood,
  listFood,
  removeFood,
  searchFood,
} = require("../controllers/foodController");

const foodRouter = express.Router();

foodRouter.post("/add", addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/search", searchFood);

module.exports = foodRouter;
