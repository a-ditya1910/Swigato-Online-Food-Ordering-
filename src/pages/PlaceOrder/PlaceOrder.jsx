import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, url, food_list } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    apartment: "",
    landmark: "",
    instructions: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePayment = async (e) => {
  e.preventDefault();

  const orderItems = food_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      ...item,
      quantity: cartItems[item._id],
    }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(), // Don't add delivery here. Backend adds it.
    };

    try {
      const res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      const { orderId, amount, currency, orderDBId } = res.data;

      // Load Razorpay widget
      const options = {
        key: "rzp_test_t4LUM04KXw6wHc", // Replace with `process.env.RAZORPAY_KEY` if using env on frontend
        amount: amount,
        currency: currency,
        name: "Food Delivery",
        description: "Order Payment",
        order_id: orderId,
        handler: function (response) {
          // Redirect with success=true
          navigate(`/verify?success=true&orderId=${orderDBId}`);
        },
        prefill: {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#F37254",
        },
      };
      

      const rzp = new window.Razorpay(options);
      
      rzp.on("payment.failed", function () {
        // Redirect with success=false
        navigate(`/verify?success=false&orderId=${orderDBId}`);
      });

      rzp.open();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Payment initialization failed!");
    }
  };


  useEffect(() => {
    if (!token) {
      alert("Login to checkout!");
      navigate("/");
    } else if (getTotalCartAmount() === 0) {
      alert("Cart is empty!");
      navigate("/");
    }
  }, [token]);

  const copyToClipboard = () => {
    const textToCopy = "4242 4242 4242 4242";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyButtonText("Copied");
      setTimeout(() => setCopyButtonText("Copy"), 2000);
    });
  };

  return (
    <form
      onSubmit={handlePayment}
      className="flex flex-col lg:flex-row gap-10 p-6 mt-20"
    >
      {/* LEFT - Form Fields */}
      <div className="w-full lg:max-w-xl space-y-4 mx-24">
        <h2 className="text-2xl font-semibold text-gray-800">Delivery Information</h2>
        <div className="flex gap-4">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          name="apartment"
          onChange={onChangeHandler}
          value={data.apartment}
          type="text"
          placeholder="Apartment / Flat No."
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="landmark"
          onChange={onChangeHandler}
          value={data.landmark}
          type="text"
          placeholder="Landmark"
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <textarea
          name="instructions"
          onChange={onChangeHandler}
          value={data.instructions}
          placeholder="Delivery Instructions"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <div className="flex gap-4">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="tel"
          placeholder="Phone"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* RIGHT - Cart Summary */}
      <div className="w-full lg:max-w-md bg-gray-50 p-6 rounded-lg shadow-md space-y-4 mt-16">
        <h2 className="text-xl font-semibold text-gray-700">Cart Total</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{getTotalCartAmount()}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>₹{getTotalCartAmount() === 0 ? 0 : 20}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total</span>
          <span>₹{getTotalCartAmount() + 20}</span>
        </div>

        <div className="bg-white p-4 border rounded-md flex justify-between items-center">
          <div>
            <h3 className="font-medium">Card No:</h3>
            <p className="text-sm">4242 4242 4242 4242</p>
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            {copyButtonText}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#a40404] text-white p-3 rounded-md hover:bg-[gray]"
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
