import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full rounded-[15px] bg-[#f5f5f5] shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img
          className="w-full h-75 object-cover rounded-t-[15px]"
          src={`${url}/images/${image}`}
          alt={name}
        />
        {!cartItems[id] ? (
          <></>
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2 p-1.5 rounded-full bg-white">
            <img
              className="w-[30px] cursor-pointer"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              className="w-[30px] cursor-pointer"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
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

        {/* Price & Add */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">₹{price}</span>
          <button
            onClick={() => addToCart(id)}
            className="py-2 px-4 border border-[#a40404] text-[#a40404] hover:bg-[#a40404] hover:text-white rounded-md transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
