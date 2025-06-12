const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // load environment variables

const { connect } = require("./config/database");

connect();

const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// App config
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // Serve static images
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
