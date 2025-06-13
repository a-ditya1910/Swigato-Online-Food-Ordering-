import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  const quantity = cartItems[id] || 0;

  return (
    <div className="w-full rounded-[15px] bg-[#f5f5f5] shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img
          className="w-full h-75 object-cover rounded-t-[15px]"
          src={image} // Directly use the image URL from Cloudinary
          alt={name}
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title & Rating */}
        <div className="flex justify-between items-center">
          <h5 className="text-lg font-bold text-gray-900">{name}</h5>
          <span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold px-2 py-0.5 border border-yellow-300 rounded-full bg-yellow-100">
            ⭐ 4.6
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* Price & Add/Remove */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">₹{price}</span>
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(id)}
              className="py-2 px-4 border border-[#a40404] text-[#a40404] hover:bg-[#a40404] hover:text-white rounded-md transition"
            >
              Add to cart
            </button>
          ) : (
            <div className="flex items-center gap-3 border border-gray-300 px-3 py-1 rounded-full bg-white shadow-sm">
              <button
                onClick={() => removeFromCart(id)}
                className="text-lg text-[#a40404] font-bold px-2 hover:text-red-600"
              >
                -
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                onClick={() => addToCart(id)}
                className="text-lg text-[#0a9c3e] font-bold px-2 hover:text-green-600"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
