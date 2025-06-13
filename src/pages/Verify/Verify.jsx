import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success"); // Payment success (true/false)
  const orderId = searchParams.get("orderId"); // Order ID from Razorpay

  const { url, clearCart } = useContext(StoreContext); // URL for your backend and clearCart function
  const navigate = useNavigate();

  // Function to verify the payment status with backend
  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        // Clear the cart immediately after successful payment
        clearCart(); // This will clear the cart in your frontend state

        // Redirect to 'myorders' page or success page
        navigate("/myorders");
      } else {
        // If payment fails, redirect to home or any other page
        alert("Payment failed! Please try again.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error verifying payment. Please try again.");
      navigate("/");
    }
  };

  useEffect(() => {
    // Call the payment verification function on page load
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner">Verifying Payment...</div>
    </div>
  );
};

export default Verify;


