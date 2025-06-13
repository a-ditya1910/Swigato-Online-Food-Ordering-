const { cloudinary } = require("../config/cloudinary"); // make sure the path is correct

const uploadImageToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
    });
    return result;
  } catch (err) {
    throw new Error("Cloudinary Upload Failed: " + err.message);
  }
};

module.exports = { uploadImageToCloudinary };
