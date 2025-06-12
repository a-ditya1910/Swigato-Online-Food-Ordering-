const Razorpay = require("razorpay");
require('dotenv').config(); // Ensure you load environment variables

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,    // Your Razorpay API Key
    key_secret: process.env.RAZORPAY_SECRET, // Your Razorpay API Secret
});

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY); // For debugging (remove in production)
module.exports = { instance };
