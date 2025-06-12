const foodModel = require("../models/foodModel");
const fs = require("fs");

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try{
    await food.save();
    res.json({
      success: true,
      message: "Food Added",
    });
  } 
  catch(error){
    console.log(error);
    res.json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};


const listFood = async (req, res) => {
  try{
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};



const removeFood = async (req, res) => {
  try{
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food Removed",
    });
  } 
  catch(error){
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const searchFood = async (req, res) => {
  const { query } = req.query;

  if (typeof query !== "string") {
    return res.status(400).json({ error: "Invalid query" });
  }

  try {
    const foods = await foodModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ data: foods });
  } 
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { addFood, listFood, removeFood,searchFood };
