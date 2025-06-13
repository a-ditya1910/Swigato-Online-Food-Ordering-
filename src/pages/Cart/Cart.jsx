import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const hasItems = food_list.some((item) => cartItems[item._id] > 0);

  return (
    <div className="mt-24 px-4 mx-20">
      <div className="mb-10">
        {/* Cart Headers */}
        {hasItems && (
          <>
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-sm font-medium">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr className="my-2 border-gray-300 hidden md:block" />
          </>
        )}

        {/* Cart Items */}
        {food_list
          .filter((item) => cartItems[item._id] > 0)
          .map((item) => (
            <div key={item._id} className="my-2">
              <div className="grid grid-cols-2 md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2 text-black text-sm md:text-base">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[50px] rounded"
                />
                <p>{item.name}</p>
                <p className="hidden md:block">₹{item.price}</p>
                <p className="hidden md:block">{cartItems[item._id]}</p>
                <p className="hidden md:block">
                  ₹{item.price * cartItems[item._id]}
                </p>
                <p
                  className="text-lg text-red-500 cursor-pointer"
                  onClick={() => removeFromCart(item._id)}
                >
                  ×
                </p>
              </div>
              <hr className="border-gray-300 my-2" />
            </div>
          ))}

        {!hasItems && (
          <div className="text-center text-gray-500 py-10 text-lg">
            Your cart is empty.
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-6">
        {/* Cart Total */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Cart Total</h2>
          <div className="text-gray-700 space-y-3 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{isNaN(getTotalCartAmount()) ? 0 : getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className="bg-[#a40404] text-white py-3 rounded w-[max(15vw,200px)]"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code */}
        <div className="flex-1">
          <p className="text-gray-600 mb-2">
            If you have a promo code, enter it here!
          </p>
          <div className="flex items-center justify-between bg-gray-200 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Promo code"
              className="bg-transparent outline-none px-3 py-3 flex-1"
            />
            <button className="bg-black text-white px-4 py-3">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
