const { uploadImageToCloudinary } = require("../utils/uploadImage");
const foodModel = require("../models/foodModel");

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const image = req.files.image;

    const uploadedImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME || "food_images"
    );

    const foodItem = await foodModel.create({
      name,
      description,
      price,
      category,
      image: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id, // 👈 add this
    });

    res.status(200).json({
      success: true,
      message: "Food item added successfully",
      data: foodItem,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};



const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch error", error });
  }
};

const removeFood = async (req, res) => {
  try {
    console.log("Received request to remove food with ID:", req.body.id);

    const food = await foodModel.findById(req.body.id);
    if (!food) {
      console.log("Food not found");
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    console.log("Found food:", food);

    // Only try to delete from Cloudinary if imagePublicId exists
    if (food.imagePublicId) {
      const result = await cloudinary.uploader.destroy(food.imagePublicId);
      console.log("Cloudinary destroy result:", result);
    } else {
      console.warn("imagePublicId not found. Skipping Cloudinary deletion.");
    }

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error in removeFood:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove food",
      error: error.message,
    });
  }
};


const searchFood = async (req, res) => {
  const { query } = req.query;
  if (!query || typeof query !== "string") {
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
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addFood, listFood, removeFood, searchFood };
