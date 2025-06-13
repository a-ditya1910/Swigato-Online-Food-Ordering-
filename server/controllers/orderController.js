const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Razorpay = require("razorpay");
require("dotenv").config(); // Load environment variables

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Place order and create Razorpay order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const razorpayOrder = await razorpay.orders.create({
      amount: (req.body.amount + 20) * 100, // Delivery fee added
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderDBId: newOrder._id,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Order placement failed!",
    });
  }
};

// Payment verification
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      res.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Payment failed, order deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error verifying payment!",
    });
  }
};

// User's orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};

// List all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({
      success: true,
      message: "Status updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to update status",
    });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
